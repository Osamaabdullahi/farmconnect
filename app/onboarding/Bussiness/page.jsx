"use client";
import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Building2,
  MapPin,
  Phone,
  Upload,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { supabase } from "@/utils/supabaseClient";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

const BusinessRegistration = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [photoPreview, setPhotoPreview] = useState([]);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [SelectedFile, setSelectedFile] = useState(null);
  const search = useSearchParams();
  const user_id = search.get("id");

  // Business data state
  const [businessData, setBusinessData] = useState({
    businessName: "",
    businessType: "",
    businessLocation: "",
    contactPersonName: "",
    phoneNumber: "",
    email: "", // Note: Not in your model but useful for communication
    verificationID: "",
    preferredPayment: "",
    paymentDetails: "",
    // Assuming you have user ID available (from context, local storage, etc.)
    userID: "",
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setBusinessData({
      ...businessData,
      [id]: value,
    });
  };

  // Handle select changes
  const handleSelectChange = (id, value) => {
    setBusinessData({
      ...businessData,
      [id]: value,
    });
  };

  // Handle photo uploads
  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFile(files[0]);

    // Preview
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPhotoPreview([...photoPreview, ...newPreviews]);

    // Store files for upload
    setPhotos([...photos, ...files]);
  };

  // Remove a photo
  const removePhoto = (index) => {
    const updatedPhotos = [...photos];
    const updatedPreviews = [...photoPreview];

    updatedPhotos.splice(index, 1);
    updatedPreviews.splice(index, 1);

    setPhotos(updatedPhotos);
    setPhotoPreview(updatedPreviews);
  };

  // Submit form data
  const handleSubmit = async () => {
    if (!termsAccepted) {
      toast("Terms Required", {
        description: "Please accept the terms before submitting.",
        variant: "destructive",
      });

      return;
    }

    setIsSubmitting(true);

    try {
      // First upload photos and get their paths
      let photosPaths = "";

      if (SelectedFile) {
        const { data, error } = await supabase.storage
          .from("farmconnect")
          .upload(`uploads/${SelectedFile.name}`, SelectedFile, {
            cacheControl: "3600",
            upsert: false,
          });

        if (error) {
          throw new Error(`Failed to upload photos ${error}`);
        }

        toast("Image uploaded successfully", {
          description: "Image has been uploaded successfully.",
          variant: "success", // ✅ This makes it green
        });

        photosPaths = data.fullPath;
      }

      // Prepare business data for submission
      const businessPayload = {
        user_id: user_id,
        business_name: businessData.businessName,
        business_type: businessData.businessType,
        business_location: businessData.businessLocation,
        verification_id: businessData.verificationID,
        preferred_payment: businessData.preferredPayment,
        contact_person_name: businessData.contactPersonName,
        phone_number: businessData.phoneNumber,
        photos: photosPaths,
      };

      // Submit business data to backend
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/businesses`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(businessPayload),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Registration failed");
      }

      const result = await response.json();

      toast("Registration Successful", {
        position: "top-right",
        style: { background: "#4CAF50", color: "white" },
      });
      router.push("/browse");
    } catch (error) {
      toast.error(`Registration Failed ${error.message}`, {
        position: "top-right",
        style: { background: "#D32F2F", color: "white" },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    {
      id: 1,
      title: "Business Information",
      subtitle: "Tell us about your business",
    },
    {
      id: 2,
      title: "Contact Details",
      subtitle: "How farmers can reach you",
    },
    {
      id: 3,
      title: "Verification & Payment",
      subtitle: "Complete your business verification",
    },
    {
      id: 4,
      title: "Review & Submit",
      subtitle: "Review your information",
    },
  ];

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="businessName">Business Name</Label>
              <Input
                id="businessName"
                placeholder="Enter your business name"
                value={businessData.businessName}
                onChange={handleInputChange}
              />
              <p className="text-sm text-muted-foreground">
                This will be displayed to farmers
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="businessType">Business Type</Label>
              <Select
                onValueChange={(value) =>
                  handleSelectChange("businessType", value)
                }
                value={businessData.businessType}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select business type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="restaurant">Restaurant</SelectItem>
                  <SelectItem value="grocery">Grocery Store</SelectItem>
                  <SelectItem value="manufacturer">
                    Food Manufacturer
                  </SelectItem>
                  <SelectItem value="wholesaler">Wholesaler</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground">
                Helps with proper categorization
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="businessLocation">Business Location</Label>
              <div className="flex space-x-2">
                <div className="flex-1">
                  <Input
                    id="businessLocation"
                    placeholder="County/Town"
                    value={businessData.businessLocation}
                    onChange={handleInputChange}
                  />
                </div>
                <Button variant="outline" size="icon">
                  <MapPin className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Helps farmers know where orders are going
              </p>
            </div>

            <div className="space-y-2">
              <Label>Business Photos</Label>
              <div className="border-2 border-dashed rounded-md p-4 hover:bg-muted/50 cursor-pointer">
                <input
                  type="file"
                  id="photos"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={handlePhotoUpload}
                />
                <label
                  htmlFor="photos"
                  className="flex flex-col items-center justify-center w-full h-32 cursor-pointer"
                >
                  <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Drag and drop your business photos or click to browse
                  </p>
                </label>
              </div>
              {photoPreview.length > 0 && (
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {photoPreview.map((url, index) => (
                    <div key={index} className="relative">
                      <img
                        src={url}
                        alt={`Preview ${index}`}
                        className="w-full h-24 object-cover rounded-md"
                      />
                      <button
                        type="button"
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 w-6 h-6 flex items-center justify-center"
                        onClick={() => removePhoto(index)}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <p className="text-sm text-muted-foreground">
                Upload photos of your business premise (max 5)
              </p>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="contactPersonName">Contact Person Name</Label>
              <Input
                id="contactPersonName"
                placeholder="Full name of business representative"
                value={businessData.contactPersonName}
                onChange={handleInputChange}
              />
              <p className="text-sm text-muted-foreground">
                Direct contact person for farmers
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <div className="flex space-x-2">
                <div className="flex-1">
                  <Input
                    id="phoneNumber"
                    type="tel"
                    placeholder="Business contact number"
                    value={businessData.phoneNumber}
                    onChange={handleInputChange}
                  />
                </div>
                <Button variant="outline" size="icon">
                  <Phone className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Farmers need to communicate with buyers
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Business Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="business@example.com"
                value={businessData.email}
                onChange={handleInputChange}
              />
              <p className="text-sm text-muted-foreground">
                For order confirmations and updates
              </p>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="verificationID">
                Business Registration Number / Tax ID
              </Label>
              <Input
                id="verificationID"
                placeholder="Enter your business registration number"
                value={businessData.verificationID}
                onChange={handleInputChange}
              />
              <p className="text-sm text-muted-foreground">
                Ensures trust and legitimacy
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="preferredPayment">Preferred Payment Method</Label>
              <Select
                onValueChange={(value) =>
                  handleSelectChange("preferredPayment", value)
                }
                value={businessData.preferredPayment}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mobile">Mobile Money</SelectItem>
                  <SelectItem value="bank">Bank Transfer</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground">
                For seamless transactions with farmers
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="paymentDetails">Payment Details</Label>
              <Input
                id="paymentDetails"
                placeholder="Mobile number or bank account details"
                value={businessData.paymentDetails}
                onChange={handleInputChange}
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-medium mb-4">Review Your Information</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Business Details</p>
                    <div className="ml-4 space-y-1">
                      <p className="text-sm">
                        <span className="font-medium">Name:</span>{" "}
                        {businessData.businessName || "Not provided"}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Type:</span>{" "}
                        {businessData.businessType || "Not provided"}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Location:</span>{" "}
                        {businessData.businessLocation || "Not provided"}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Photos:</span>{" "}
                        {photos.length} uploaded
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium">Contact Information</p>
                    <div className="ml-4 space-y-1">
                      <p className="text-sm">
                        <span className="font-medium">Contact Person:</span>{" "}
                        {businessData.contactPersonName || "Not provided"}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Phone Number:</span>{" "}
                        {businessData.phoneNumber || "Not provided"}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Email:</span>{" "}
                        {businessData.email || "Not provided"}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium">
                      Verification & Payment
                    </p>
                    <div className="ml-4 space-y-1">
                      <p className="text-sm">
                        <span className="font-medium">Business ID:</span>{" "}
                        {businessData.verificationID || "Not provided"}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Payment Method:</span>{" "}
                        {businessData.preferredPayment || "Not provided"}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={termsAccepted}
                onCheckedChange={setTermsAccepted}
              />
              <label htmlFor="terms" className="text-sm text-muted-foreground">
                I confirm that all the information provided is accurate and I am
                authorized to register this business
              </label>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Suspense>
      <div className="min-h-screen bg-background">
        <div className="border-b">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-xl font-semibold">Business Registration</h1>
                <p className="text-sm text-muted-foreground">
                  Join our network of agricultural buyers
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">
                  Step {currentStep} of {steps.length}
                </span>
              </div>
            </div>
            <Progress
              value={((currentStep - 1) / (steps.length - 1)) * 100}
              className="h-2 bg-gray-200 [&>div]:bg-green-500"
            />
          </div>
        </div>

        <main className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold">
              {steps[currentStep - 1].title}
            </h2>
            <p className="mt-1 text-muted-foreground">
              {steps[currentStep - 1].subtitle}
            </p>
          </div>

          <div className="max-w-2xl">
            {renderStepContent()}

            <div className="mt-8 flex items-center justify-between">
              <Button
                variant="outline"
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                disabled={currentStep === 1 || isSubmitting}
                className="flex items-center"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
              {currentStep === 4 ? (
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex items-center bg-green-500 hover:bg-green-600"
                >
                  {isSubmitting ? "Submitting..." : "Submit Registration"}
                </Button>
              ) : (
                <Button
                  onClick={() => setCurrentStep(Math.min(4, currentStep + 1))}
                  disabled={isSubmitting}
                  className="flex items-center bg-green-500 hover:bg-green-600"
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </div>
        </main>
      </div>
    </Suspense>
  );
};

export default BusinessRegistration;
