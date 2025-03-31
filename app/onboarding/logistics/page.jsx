"use client";

import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Truck,
  MapPin,
  Phone,
  Camera,
  Image,
  Upload,
  X,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { supabase } from "@/utils/supabaseClient";

const TransporterRegistration = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isCompany, setIsCompany] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [formData, setFormData] = useState({
    user_id: "f72b47a8-8e04-420f-8405-764b4248b46c", // This should be passed in from your authentication context
    full_name: "",
    company_name: "",
    vehicle_type: "",
    service_areas: "",
    verification_id: "",
    phone_number: "",
    alternative_contact: "",
    payment_method: "",
    availability_status: true,
    capacity: "", // This isn't in your backend model but could be useful
    termsAccepted: false,
    photos: "", // Will store the comma-separated URLs
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleSelectChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSwitchChange = (field, checked) => {
    setFormData({
      ...formData,
      [field]: checked,
    });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      // Limit to 5 images
      const newFiles = files.slice(0, 5 - selectedFiles.length);
      setSelectedFiles([...selectedFiles, ...newFiles]);
    }
  };

  const removeFile = (index) => {
    const newFiles = [...selectedFiles];
    newFiles.splice(index, 1);
    setSelectedFiles(newFiles);
  };

  const uploadToSupabase = async () => {
    if (selectedFiles.length === 0) return [];

    const uploadedUrls = [];
    setUploadProgress(0);

    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      const fileExt = file.name.split(".").pop();
      const fileName = `${formData.user_id}-${Date.now()}-${i}.${fileExt}`;
      const filePath = `transporter-photos/${fileName}`;

      try {
        const { data, error } = await supabase.storage
          .from("farmconnect")
          .upload(filePath, file, {
            cacheControl: "3600",
            upsert: false,
          });

        if (error) throw error;

        // Get public URL
        const { data: urlData } = supabase.storage
          .from("farmconnect")
          .getPublicUrl(filePath);

        uploadedUrls.push(urlData.publicUrl);

        // Update progress
        setUploadProgress(((i + 1) / selectedFiles.length) * 100);
      } catch (error) {
        toast("Error uploading image", {
          description: `Failed to upload image: ${error.message}`,
          variant: "destructive",
        });
      }
    }

    return uploadedUrls;
  };

  const handleSubmit = async () => {
    if (!formData.termsAccepted) {
      toast("Error", {
        description: "Please accept the terms of service",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      // Upload images first
      const imageUrls = await uploadToSupabase();
      const allImageUrls = [...uploadedImages, ...imageUrls].join(",");

      // Prepare data for API
      const logisticsData = {
        user_id: formData.user_id,
        company_name: formData.company_name,
        vehicle_type: formData.vehicle_type,
        service_areas: formData.service_areas,
        verification_id: formData.verification_id,
        phone_number: formData.phone_number,
        alternative_contact: formData.alternative_contact,
        payment_method: formData.payment_method,
        availability_status: formData.availability_status,
        photos: allImageUrls,
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/logistics`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(logisticsData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Failed to register as logistics provider"
        );
      }

      toast("Success", {
        description: "Your logistics profile has been created successfully",
        variant: "default",
      });

      // Redirect to dashboard or relevant page
      // router.push('/dashboard');
    } catch (error) {
      toast("Error creating logistics", {
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    {
      id: 1,
      title: "Personal Information",
      subtitle: "Tell us about yourself",
    },
    {
      id: 2,
      title: "Vehicle Details",
      subtitle: "Your transport capabilities",
    },
    {
      id: 3,
      title: "Service & Verification",
      subtitle: "Where and how you operate",
    },
    {
      id: 4,
      title: "Photos & Documents",
      subtitle: "Upload vehicle photos and documents",
    },
    {
      id: 5,
      title: "Review & Submit",
      subtitle: "Verify your information",
    },
  ];

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="full_name">Full Name</Label>
              <Input
                id="full_name"
                placeholder="Your full name"
                className="border-gray-200"
                value={formData.full_name}
                onChange={handleInputChange}
              />
              <p className="text-sm text-gray-500">
                Required - This identifies you as a transport provider
              </p>
            </div>

            <div className="flex items-center space-x-2 py-4">
              <Switch
                id="company-switch"
                checked={isCompany}
                onCheckedChange={setIsCompany}
              />
              <Label htmlFor="company-switch">
                I represent a logistics company
              </Label>
            </div>

            {isCompany && (
              <div className="space-y-2">
                <Label htmlFor="company_name">Company Name</Label>
                <Input
                  id="company_name"
                  placeholder="Your company name"
                  className="border-gray-200"
                  value={formData.company_name}
                  onChange={handleInputChange}
                />
                <p className="text-sm text-gray-500">
                  Optional - Helps verify business status
                </p>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="phone_number">Phone Number</Label>
              <div className="flex space-x-2">
                <div className="flex-1">
                  <Input
                    id="phone_number"
                    type="tel"
                    placeholder="Your contact number"
                    className="border-gray-200"
                    value={formData.phone_number}
                    onChange={handleInputChange}
                  />
                </div>
                <Button variant="outline" size="icon">
                  <Phone className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-sm text-gray-500">
                Required - For coordination with businesses & farmers
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="alternative_contact">
                Alternative Contact (Optional)
              </Label>
              <Input
                id="alternative_contact"
                placeholder="Alternative contact number"
                className="border-gray-200"
                value={formData.alternative_contact}
                onChange={handleInputChange}
              />
              <p className="text-sm text-gray-500">
                Optional - Backup contact method
              </p>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="vehicle_type">Vehicle Type</Label>
              <Select
                onValueChange={(value) =>
                  handleSelectChange("vehicle_type", value)
                }
                value={formData.vehicle_type}
              >
                <SelectTrigger className="border-gray-200">
                  <SelectValue placeholder="Select vehicle type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="motorbike">Motorbike</SelectItem>
                  <SelectItem value="van">Van</SelectItem>
                  <SelectItem value="truck">Truck</SelectItem>
                  <SelectItem value="bicycle">Bicycle</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-gray-500">
                Required - Matches you with suitable delivery requests
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="capacity">Vehicle Capacity</Label>
              <Input
                id="capacity"
                placeholder="Capacity in kg/tons"
                className="border-gray-200"
                value={formData.capacity}
                onChange={handleInputChange}
              />
              <p className="text-sm text-gray-500">
                Optional - Helps optimize logistics
              </p>
            </div>

            <div className="space-y-2">
              <Label>Availability Status</Label>
              <div className="flex items-center space-x-2">
                <Switch
                  id="availability_status"
                  checked={formData.availability_status}
                  onCheckedChange={(checked) =>
                    handleSwitchChange("availability_status", checked)
                  }
                />
                <Label htmlFor="availability_status">
                  Available for deliveries
                </Label>
              </div>
              <p className="text-sm text-gray-500">
                Required - Helps assign delivery tasks efficiently
              </p>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="service_areas">Service Areas</Label>
              <Input
                id="service_areas"
                placeholder="Areas where you operate (comma separated)"
                className="border-gray-200"
                value={formData.service_areas}
                onChange={handleInputChange}
              />
              <p className="text-sm text-gray-500">
                Required - Ensures relevant transport requests
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="verification_id">Verification ID</Label>
              <Input
                id="verification_id"
                placeholder="Driver's License / Business Registration"
                className="border-gray-200"
                value={formData.verification_id}
                onChange={handleInputChange}
              />
              <p className="text-sm text-gray-500">
                Required - Builds trust and security
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="payment_method">Payment Method</Label>
              <Select
                onValueChange={(value) =>
                  handleSelectChange("payment_method", value)
                }
                value={formData.payment_method}
              >
                <SelectTrigger className="border-gray-200">
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mobile">Mobile Money</SelectItem>
                  <SelectItem value="bank">Bank Transfer</SelectItem>
                  <SelectItem value="cash">Cash on Delivery</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-gray-500">
                Required - For receiving payments
              </p>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="photos">Vehicle Photos & Documents</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center">
                <div className="flex flex-col items-center text-center">
                  <Upload className="h-10 w-10 text-gray-400 mb-2" />
                  <h3 className="font-medium text-gray-900">Upload Images</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Upload photos of your vehicle and relevant documents
                  </p>
                </div>
                <Input
                  type="file"
                  id="photos"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleFileChange}
                />
                <Button
                  type="button"
                  variant="outline"
                  className="mt-4"
                  onClick={() => document.getElementById("photos").click()}
                >
                  <Image className="h-4 w-4 mr-2" />
                  Select files
                </Button>
                <p className="text-xs text-gray-500 mt-2">
                  Max 5 files. JPG, PNG or GIF
                </p>
              </div>

              {selectedFiles.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium mb-2">Selected Files</h4>
                  <div className="space-y-2">
                    {selectedFiles.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-gray-50 p-2 rounded-md"
                      >
                        <div className="flex items-center">
                          <Image className="h-4 w-4 text-gray-500 mr-2" />
                          <span className="text-sm truncate max-w-xs">
                            {file.name}
                          </span>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(index)}
                        >
                          <X className="h-4 w-4 text-gray-500" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {uploadProgress > 0 && uploadProgress < 100 && (
                <div className="mt-4">
                  <Label>Upload Progress</Label>
                  <Progress
                    value={uploadProgress}
                    className="h-2 mt-1 bg-gray-200 [&>div]:bg-green-500"
                  />
                </div>
              )}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <Card className="border-gray-200 bg-white">
              <CardContent className="pt-6">
                <h3 className="font-medium mb-4">Review Your Information</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Personal Details</p>
                    <div className="ml-4 space-y-1">
                      <p className="text-sm text-gray-500">
                        Full name:{" "}
                        <span className="font-medium">
                          {formData.full_name || "Not provided"}
                        </span>
                      </p>
                      {isCompany && (
                        <p className="text-sm text-gray-500">
                          Company name:{" "}
                          <span className="font-medium">
                            {formData.company_name || "Not provided"}
                          </span>
                        </p>
                      )}
                      <p className="text-sm text-gray-500">
                        Phone number:{" "}
                        <span className="font-medium">
                          {formData.phone_number || "Not provided"}
                        </span>
                      </p>
                      <p className="text-sm text-gray-500">
                        Alternative contact:{" "}
                        <span className="font-medium">
                          {formData.alternative_contact || "Not provided"}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium">Vehicle Information</p>
                    <div className="ml-4 space-y-1">
                      <p className="text-sm text-gray-500">
                        Vehicle type:{" "}
                        <span className="font-medium">
                          {formData.vehicle_type || "Not selected"}
                        </span>
                      </p>
                      <p className="text-sm text-gray-500">
                        Capacity:{" "}
                        <span className="font-medium">
                          {formData.capacity || "Not provided"}
                        </span>
                      </p>
                      <p className="text-sm text-gray-500">
                        Availability:{" "}
                        <span className="font-medium">
                          {formData.availability_status
                            ? "Available"
                            : "Not available"}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium">
                      Service & Verification
                    </p>
                    <div className="ml-4 space-y-1">
                      <p className="text-sm text-gray-500">
                        Service areas:{" "}
                        <span className="font-medium">
                          {formData.service_areas || "Not provided"}
                        </span>
                      </p>
                      <p className="text-sm text-gray-500">
                        Verification ID:{" "}
                        <span className="font-medium">
                          {formData.verification_id || "Not provided"}
                        </span>
                      </p>
                      <p className="text-sm text-gray-500">
                        Payment method:{" "}
                        <span className="font-medium">
                          {formData.payment_method || "Not selected"}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium">Photos & Documents</p>
                    <div className="ml-4">
                      <p className="text-sm text-gray-500">
                        {selectedFiles.length} file(s) selected for upload
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={formData.termsAccepted}
                onCheckedChange={(checked) =>
                  handleSwitchChange("termsAccepted", checked)
                }
              />
              <label htmlFor="terms" className="text-sm text-gray-500">
                I confirm that all the information provided is accurate and I
                agree to the terms of service
              </label>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const handleNext = () => {
    // Validate current step
    if (currentStep === 1) {
      if (!formData.full_name || !formData.phone_number) {
        toast({
          title: "Missing information",
          description: "Please provide your full name and phone number",
          variant: "destructive",
        });
        return;
      }
    } else if (currentStep === 2) {
      if (!formData.vehicle_type) {
        toast({
          title: "Missing information",
          description: "Please select your vehicle type",
          variant: "destructive",
        });
        return;
      }
    } else if (currentStep === 3) {
      if (
        !formData.service_areas ||
        !formData.verification_id ||
        !formData.payment_method
      ) {
        toast({
          title: "Missing information",
          description: "Please provide all required information",
          variant: "destructive",
        });
        return;
      }
    } else if (currentStep === 5) {
      // Submit the form
      handleSubmit();
      return;
    }

    setCurrentStep(Math.min(5, currentStep + 1));
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="border-b border-gray-200">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-xl font-semibold">
                Transporter Registration
              </h1>
              <p className="text-sm text-gray-500">
                Join our logistics network
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">
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
          <p className="mt-1 text-gray-500">
            {steps[currentStep - 1].subtitle}
          </p>
        </div>

        <div className="max-w-2xl">
          {renderStepContent()}

          <div className="mt-8 flex items-center justify-between">
            <Button
              variant="outline"
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
              className="flex items-center"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            <Button
              onClick={handleNext}
              disabled={loading}
              className="flex items-center bg-green-500 hover:bg-green-600"
            >
              {currentStep === 5
                ? loading
                  ? "Submitting..."
                  : "Submit Registration"
                : "Next"}
              {currentStep !== 5 && <ChevronRight className="w-4 h-4 ml-2" />}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TransporterRegistration;
