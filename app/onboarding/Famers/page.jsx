"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  Eye,
  EyeOff,
  ChevronLeft,
  ChevronRight,
  Camera,
  Loader2,
  Check,
  X,
  Info,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/utils/supabaseClient";
import { toast } from "sonner";
import { Suspense } from "react";

const FarmerOnboarding = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const search = useSearchParams();
  const first_name = search.get("first_name");
  const last_name = search.get("last_name");
  const user_id = search.get("id");

  const router = useRouter();

  // Initial state for the farmer form
  const [farmerData, setFarmerData] = useState({
    user_id: user_id,
    farm_name: "",
    farm_location: "",
    types_of_crops: "",
    harvest_frequency: "",
    verification_id: "",
    preferred_payment: "",
    payment_details: "",
    phone_number: "",
    farm_photos: [], // Array to store file objects
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  // Validation state
  const [validationErrors, setValidationErrors] = useState({});

  // Handle input change for text fields
  const handleChange = (e) => {
    setFarmerData({ ...farmerData, [e.target.name]: e.target.value });
    // Clear validation error when user edits field
    if (validationErrors[e.target.name]) {
      setValidationErrors((prev) => ({ ...prev, [e.target.name]: null }));
    }
  };

  // Handle select change
  const handleSelectChange = (name, value) => {
    setFarmerData({ ...farmerData, [name]: value });
    // Clear validation error when user edits field
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  // Handle file uploads (multiple files)
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setFarmerData({ ...farmerData, farm_photos: files });
      setUploadedFiles(files.map((file) => file.name));
      setValidationErrors((prev) => ({ ...prev, farm_photos: null }));

      toast("Files selected", {
        description: `${files.length} ${
          files.length === 1 ? "file" : "files"
        } selected for upload`,
        variant: "success",
      });
    }
  };

  const FilePath = async (file) => {
    if (!file) {
      console.error("No file selected");
      return;
    }

    try {
      const { data, error } = await supabase.storage
        .from("farmconnect")
        .upload(`uploads/${Date.now()}_${file.name}`, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) {
        console.error("Upload failed:", error);
        throw error;
      }

      console.log("Upload successful:", data);
      return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${data.fullPath}`;
    } catch (error) {
      toast("Upload failed", {
        description: `Failed to upload ${file.name}: ${error.message}`,
        variant: "destructive",
      });
      return "";
    }
  };

  // Validate form for current step
  const validateCurrentStep = () => {
    const errors = {};

    switch (currentStep) {
      case 1:
        if (!farmerData.farm_name) errors.farm_name = "Farm name is required";
        if (!farmerData.farm_location)
          errors.farm_location = "Farm location is required";
        break;
      case 2:
        if (!farmerData.types_of_crops)
          errors.types_of_crops = "Please specify the types of crops you grow";
        if (!farmerData.harvest_frequency)
          errors.harvest_frequency = "Please select a harvest frequency";
        if (farmerData.farm_photos.length === 0)
          errors.farm_photos = "Please upload at least one photo of your farm";
        break;
      case 3:
        if (!farmerData.phone_number)
          errors.phone_number = "Phone number is required";
        break;
      case 4:
        if (!farmerData.preferred_payment)
          errors.preferred_payment = "Please select a payment method";
        if (!farmerData.payment_details)
          errors.payment_details = "Payment details are required";
        break;
      case 5:
        if (!termsAccepted)
          errors.terms = "You must confirm that all information is accurate";
        break;
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleFarmerSubmit = async () => {
    if (!validateCurrentStep()) {
      toast.error(`Please fill in all required fields before submitting.`, {
        position: "top-right",
        style: { background: "#D32F2F", color: "white" },
      });

      return;
    }

    setLoading(true);
    setError(null);

    try {
      toast("Please wait while we upload your farm photos...", {
        position: "top-right",
        style: { background: "#4CAF50", color: "white" },
      });

      // Upload all images and wait for their URLs
      const uploadedPhotos = await Promise.all(
        farmerData.farm_photos.map(async (file) => await FilePath(file))
      );

      // Filter out any failed uploads
      const successfulUploads = uploadedPhotos.filter((url) => url);

      if (successfulUploads.length === 0 && farmerData.farm_photos.length > 0) {
        throw new Error("Failed to upload farm photos. Please try again.");
      }

      toast("Creating profile Setting up your farmer profile...", {
        position: "top-right",
        style: { background: "#4CAF50", color: "white" },
      });

      // Log what we're about to send to the server
      const dataToSend = {
        user_id: String(user_id),
        farm_name: farmerData.farm_name || "",
        farm_location: farmerData.farm_location || "",
        types_of_crops: farmerData.types_of_crops || [],
        harvest_frequency: farmerData.harvest_frequency || "",
        verification_id: farmerData.verification_id || "",
        preferred_payment: farmerData.preferred_payment || "",
        payment_details: farmerData.payment_details || "",
        phone_number: farmerData.phone_number || "",
        farm_photos: successfulUploads || [],
      };
      const jsonString = JSON.stringify(dataToSend);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/farmers`,
        {
          method: "POST",
          body: jsonString,
        }
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create farmer profile");
      }

      toast("Your farmer profile has been created successfully!", {
        position: "top-right",
        style: { background: "#4CAF50", color: "white" },
      });

      // Redirect after a short delay to allow user to see the success message
      setTimeout(() => {
        window.location.href = "/browse";
      }, 1000);
    } catch (err) {
      setError(err.message);
      toast.error(`error creating farmer profile`, {
        position: "top-right",
        style: { background: "#D32F2F", color: "white" },
      });
    } finally {
      setLoading(false);
    }
  };

  const handleNextStep = () => {
    if (validateCurrentStep()) {
      if (currentStep === 5) {
        handleFarmerSubmit();
      } else {
        setCurrentStep((prev) => Math.min(5, prev + 1));
        // Show success toast when moving to next step

        toast(`step completed Moving to step ${currentStep + 1} of 5`, {
          position: "top-right",
          style: { background: "#4CAF50", color: "white" },
        });
      }
    } else {
      toast.error(`Please fill in all required fields before continuing.`, {
        position: "top-right",
        style: { background: "#D32F2F", color: "white" },
      });
    }
  };

  const steps = [
    {
      id: 1,
      title: "Tell Us About Your Farm",
      subtitle: "Basic information about your farming business",
    },
    {
      id: 2,
      title: "What Do You Grow or Produce?",
      subtitle: "Share details about your produce",
    },
    {
      id: 3,
      title: "Verify Your Farm & Identity",
      subtitle: "Help us ensure trust and security",
    },
    {
      id: 4,
      title: "Set Up Your Payment Method",
      subtitle: "Choose how you want to receive payments",
    },
    {
      id: 5,
      title: "Submit for Approval",
      subtitle: "Review and submit your information",
    },
  ];

  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  placeholder={first_name}
                  disabled={true}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" placeholder={last_name} disabled={true} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="farmName">
                Farm Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="farmName"
                placeholder="Name of your farm"
                name="farm_name"
                value={farmerData.farm_name}
                onChange={handleChange}
                className={validationErrors.farm_name ? "border-red-500" : ""}
              />
              {validationErrors.farm_name && (
                <p className="text-sm text-red-500">
                  {validationErrors.farm_name}
                </p>
              )}
              <p className="text-sm text-muted-foreground">
                This helps identify your farming business
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">
                Farm Location <span className="text-red-500">*</span>
              </Label>
              <Input
                id="location"
                placeholder="County/Town"
                name="farm_location"
                value={farmerData.farm_location}
                onChange={handleChange}
                className={
                  validationErrors.farm_location ? "border-red-500" : ""
                }
              />
              {validationErrors.farm_location && (
                <p className="text-sm text-red-500">
                  {validationErrors.farm_location}
                </p>
              )}
              <p className="text-sm text-muted-foreground">
                Helps businesses find local farmers
              </p>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="crops">
                Types of Crops <span className="text-red-500">*</span>
              </Label>
              <Input
                id="crops"
                placeholder="e.g., Maize, Beans, Tomatoes"
                name="types_of_crops"
                value={farmerData.types_of_crops}
                onChange={handleChange}
                className={
                  validationErrors.types_of_crops ? "border-red-500" : ""
                }
              />
              {validationErrors.types_of_crops && (
                <p className="text-sm text-red-500">
                  {validationErrors.types_of_crops}
                </p>
              )}
              <p className="text-sm text-muted-foreground">
                Businesses need to filter by product type
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="frequency">
                Harvest Frequency <span className="text-red-500">*</span>
              </Label>
              <Select
                onValueChange={(value) =>
                  handleSelectChange("harvest_frequency", value)
                }
                value={farmerData.harvest_frequency}
              >
                <SelectTrigger
                  className={
                    validationErrors.harvest_frequency ? "border-red-500" : ""
                  }
                >
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="seasonal">Seasonal</SelectItem>
                </SelectContent>
              </Select>
              {validationErrors.harvest_frequency && (
                <p className="text-sm text-red-500">
                  {validationErrors.harvest_frequency}
                </p>
              )}
              <p className="text-sm text-muted-foreground">
                Helps businesses plan supply
              </p>
            </div>
            <Card
              className={validationErrors.farm_photos ? "border-red-500" : ""}
            >
              <CardContent className="pt-6">
                <div className="text-center">
                  <Camera className="mx-auto h-12 w-12 text-muted-foreground" />
                  <div className="mt-2">
                    <p className="text-sm text-muted-foreground">
                      Upload photos of your farm{" "}
                      <span className="text-red-500">*</span>
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      PNG, JPG up to 10MB
                    </p>
                  </div>

                  {/* Hidden File Input */}
                  <input
                    type="file"
                    ref={fileInputRef}
                    multiple
                    accept="image/png, image/jpeg"
                    className="hidden"
                    onChange={handleFileChange}
                  />

                  {/* Button Triggers File Input */}
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={handleButtonClick}
                  >
                    Select Photos
                  </Button>

                  {uploadedFiles.length > 0 && (
                    <div className="mt-4 text-left">
                      <p className="text-sm font-medium">Selected files:</p>
                      <ul className="text-sm text-muted-foreground mt-1">
                        {uploadedFiles.map((file, index) => (
                          <li key={index} className="flex items-center">
                            <Check className="h-4 w-4 text-green-500 mr-2" />
                            {file}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            {validationErrors.farm_photos && (
              <p className="text-sm text-red-500">
                {validationErrors.farm_photos}
              </p>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="verificationId">Verification ID</Label>
              <Input
                id="verificationId"
                placeholder="National ID or Farmer Registration ID"
                name="verification_id"
                value={farmerData.verification_id}
                onChange={handleChange}
              />
              <p className="text-sm text-muted-foreground">
                Ensures trust and security
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">
                Phone Number <span className="text-red-500">*</span>
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Your contact number"
                name="phone_number"
                value={farmerData.phone_number}
                onChange={handleChange}
                className={
                  validationErrors.phone_number ? "border-red-500" : ""
                }
              />
              {validationErrors.phone_number && (
                <p className="text-sm text-red-500">
                  {validationErrors.phone_number}
                </p>
              )}
              <p className="text-sm text-muted-foreground">
                Businesses need to reach farmers
              </p>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="paymentMethod">
                Preferred Payment Method <span className="text-red-500">*</span>
              </Label>
              <Select
                onValueChange={(value) =>
                  handleSelectChange("preferred_payment", value)
                }
                value={farmerData.preferred_payment}
              >
                <SelectTrigger
                  className={
                    validationErrors.preferred_payment ? "border-red-500" : ""
                  }
                >
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mobile">Mobile Money</SelectItem>
                  <SelectItem value="bank">Bank Transfer</SelectItem>
                </SelectContent>
              </Select>
              {validationErrors.preferred_payment && (
                <p className="text-sm text-red-500">
                  {validationErrors.preferred_payment}
                </p>
              )}
              <p className="text-sm text-muted-foreground">
                Enables seamless transactions
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="paymentDetails">
                Payment Details <span className="text-red-500">*</span>
              </Label>
              <Input
                id="paymentDetails"
                placeholder="Mobile number or bank account"
                name="payment_details"
                value={farmerData.payment_details}
                onChange={handleChange}
                className={
                  validationErrors.payment_details ? "border-red-500" : ""
                }
              />
              {validationErrors.payment_details && (
                <p className="text-sm text-red-500">
                  {validationErrors.payment_details}
                </p>
              )}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-medium mb-4">Review Your Information</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Farm Details</p>
                    <div className="ml-4 space-y-1">
                      <p
                        className={`text-sm flex items-center ${
                          farmerData.farm_name
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {farmerData.farm_name ? (
                          <>
                            <Check className="h-4 w-4 mr-2" />
                            Farm name: {farmerData.farm_name}
                          </>
                        ) : (
                          <>
                            <X className="h-4 w-4 mr-2" />
                            Farm name not provided
                          </>
                        )}
                      </p>
                      <p
                        className={`text-sm flex items-center ${
                          farmerData.farm_location
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {farmerData.farm_location ? (
                          <>
                            <Check className="h-4 w-4 mr-2" />
                            Location: {farmerData.farm_location}
                          </>
                        ) : (
                          <>
                            <X className="h-4 w-4 mr-2" />
                            Farm location not provided
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Produce Information</p>
                    <div className="ml-4 space-y-1">
                      <p
                        className={`text-sm flex items-center ${
                          farmerData.types_of_crops
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {farmerData.types_of_crops ? (
                          <>
                            <Check className="h-4 w-4 mr-2" />
                            Crops: {farmerData.types_of_crops}
                          </>
                        ) : (
                          <>
                            <X className="h-4 w-4 mr-2" />
                            No crops listed
                          </>
                        )}
                      </p>
                      <p
                        className={`text-sm flex items-center ${
                          farmerData.harvest_frequency
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {farmerData.harvest_frequency ? (
                          <>
                            <Check className="h-4 w-4 mr-2" />
                            Harvest schedule: {farmerData.harvest_frequency}
                          </>
                        ) : (
                          <>
                            <X className="h-4 w-4 mr-2" />
                            Harvest schedule not set
                          </>
                        )}
                      </p>
                      <p
                        className={`text-sm flex items-center ${
                          farmerData.farm_photos.length > 0
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {farmerData.farm_photos.length > 0 ? (
                          <>
                            <Check className="h-4 w-4 mr-2" />
                            Farm photos uploaded:{" "}
                            {farmerData.farm_photos.length}
                          </>
                        ) : (
                          <>
                            <X className="h-4 w-4 mr-2" />
                            Farm photos not uploaded
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Verification</p>
                    <div className="ml-4 space-y-1">
                      <p
                        className={`text-sm flex items-center ${
                          farmerData.verification_id
                            ? "text-green-500"
                            : "text-yellow-500"
                        }`}
                      >
                        {farmerData.verification_id ? (
                          <>
                            <Check className="h-4 w-4 mr-2" />
                            ID verified
                          </>
                        ) : (
                          <>
                            <Info className="h-4 w-4 mr-2" />
                            ID not provided (optional)
                          </>
                        )}
                      </p>
                      <p
                        className={`text-sm flex items-center ${
                          farmerData.phone_number
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {farmerData.phone_number ? (
                          <>
                            <Check className="h-4 w-4 mr-2" />
                            Contact: {farmerData.phone_number}
                          </>
                        ) : (
                          <>
                            <X className="h-4 w-4 mr-2" />
                            Contact information not provided
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Payment Setup</p>
                    <div className="ml-4 space-y-1">
                      <p
                        className={`text-sm flex items-center ${
                          farmerData.preferred_payment
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {farmerData.preferred_payment ? (
                          <>
                            <Check className="h-4 w-4 mr-2" />
                            Payment method: {farmerData.preferred_payment}
                          </>
                        ) : (
                          <>
                            <X className="h-4 w-4 mr-2" />
                            Payment method not selected
                          </>
                        )}
                      </p>
                      <p
                        className={`text-sm flex items-center ${
                          farmerData.payment_details
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {farmerData.payment_details ? (
                          <>
                            <Check className="h-4 w-4 mr-2" />
                            Payment details provided
                          </>
                        ) : (
                          <>
                            <X className="h-4 w-4 mr-2" />
                            Payment details not provided
                          </>
                        )}
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
                className={validationErrors.terms ? "border-red-500" : ""}
              />
              <label htmlFor="terms" className="text-sm text-muted-foreground">
                I confirm that all the information provided is accurate
              </label>
            </div>
            {validationErrors.terms && (
              <p className="text-sm text-red-500">{validationErrors.terms}</p>
            )}
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
                <h1 className="text-xl font-semibold text-green-500">
                  Farmer Registration
                </h1>
                <p className="text-sm text-muted-foreground">
                  Complete your profile to join FarmConnect
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
                onClick={() => {
                  setCurrentStep(Math.max(1, currentStep - 1));
                  // Clear validation errors when moving back
                  setValidationErrors({});
                }}
                disabled={currentStep === 1}
                className="flex items-center"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>

              {loading ? (
                <Button
                  disabled
                  className="flex items-center bg-green-500 hover:bg-green-600"
                >
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Please wait
                </Button>
              ) : (
                <Button
                  onClick={handleNextStep}
                  className="flex items-center bg-green-500 hover:bg-green-600"
                >
                  {currentStep === 5 ? "Submit" : "Next"}
                  {currentStep !== 5 && (
                    <ChevronRight className="w-4 h-4 ml-2" />
                  )}
                </Button>
              )}
            </div>
          </div>
        </main>
      </div>
    </Suspense>
  );
};

export default FarmerOnboarding;
