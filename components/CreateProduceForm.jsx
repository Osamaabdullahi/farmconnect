"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Calendar as CalendarIcon,
  Upload,
  X,
  CheckCircle,
  XCircle,
  Loader2,
} from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { supabase } from "@/utils/supabaseClient";
import useFarmConnectStore from "@/store";
import { toast } from "sonner";
import { formatISO } from "date-fns";

const BACKEND_URL = "http://localhost:8000/produce";

const CreateProduceForm = () => {
  // Predefined options
  const categories = ["Vegetables", "Fruits", "Dairy", "Meat", "Grains"];
  const unitTypes = ["kg", "g", "lb", "crate", "bunch", "piece"];
  const deliveryOptions = ["Pickup", "Local Delivery", "Shipping"];

  const { user } = useFarmConnectStore();
  const [Loading, setLoading] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    pricePerUnit: "",
    unitType: "",
    minimumOrder: "1",
    availableStock: "0",
    deliveryOption: "",
    estimatedDelivery: "",
  });

  // Other state
  const [images, setImages] = useState([]);
  const [harvestDate, setHarvestDate] = useState(new Date());
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null); // null, 'success', or 'error'
  const [submitMessage, setSubmitMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  const handleSelectChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error for this field
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  const uploadToSupabase = async (file) => {
    try {
      // Create a unique file name
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()
        .toString(36)
        .substring(2, 15)}_${Date.now()}.${fileExt}`;
      const filePath = `produce/${fileName}`;

      // Upload file to Supabase Storage
      const { data, error } = await supabase.storage
        .from("farmconnect")
        .upload(filePath, file);

      if (error) throw error;

      // Get public URL for the file
      const { data: publicUrlData } = supabase.storage
        .from("farmconnect")
        .getPublicUrl(filePath);

      return {
        path: filePath,
        url: publicUrlData.publicUrl,
        name: file.name,
      };
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error;
    }
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setIsUploading(true);

      try {
        // Upload all images to Supabase
        const uploadPromises = files.map(async (file) => {
          // Local preview
          const preview = URL.createObjectURL(file);

          // Upload to Supabase and get path
          const uploadResult = await uploadToSupabase(file);

          return {
            file,
            preview,
            name: file.name,
            path: uploadResult.path,
            url: uploadResult.url,
          };
        });

        const newImages = await Promise.all(uploadPromises);
        setImages([...images, ...newImages]);
      } catch (error) {
        console.error("Error uploading images:", error);
        setSubmitStatus("error");
        setSubmitMessage("Failed to upload images. Please try again.");
      } finally {
        setIsUploading(false);
      }
    }
  };

  const removeImage = (index) => {
    const newImages = [...images];

    // If the image was uploaded to Supabase, we should delete it
    const imageToRemove = newImages[index];
    if (imageToRemove.path) {
      // Delete from Supabase storage
      supabase.storage
        .from("farmconnect")
        .remove([imageToRemove.path])
        .then(({ error }) => {
          if (error) {
            console.error("Error removing file from storage:", error);
          }
        });
    }

    // Revoke the object URL to avoid memory leaks
    URL.revokeObjectURL(newImages[index].preview);
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.category) {
      newErrors.category = "Category is required";
    }

    if (!formData.pricePerUnit) {
      newErrors.pricePerUnit = "Price is required";
    } else if (
      isNaN(parseFloat(formData.pricePerUnit)) ||
      parseFloat(formData.pricePerUnit) < 0
    ) {
      newErrors.pricePerUnit = "Price must be a positive number";
    }

    if (!formData.unitType) {
      newErrors.unitType = "Unit type is required";
    }

    if (!formData.deliveryOption) {
      newErrors.deliveryOption = "Delivery option is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus(null);
    setLoading(true);

    // Validate form
    if (!validateForm()) {
      setSubmitStatus("error");
      setSubmitMessage("Please fix the errors before submitting");
      setLoading(false);
      return;
    }

    try {
      // Prepare the data for submission
      const submitData = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        images: images.map((img) => ({
          path: img.path,
          url: img.url,
          name: img.name,
        })),
        price_per_unit: parseFloat(formData.pricePerUnit),
        unit_type: formData.unitType,
        minimum_order: parseInt(formData.minimumOrder),
        available_stock: parseInt(formData.availableStock),
        harvest_date: formatISO(new Date(harvestDate)), // Converts to RFC 3339 format
        farmer_id: user?.farmer.id,
        delivery_options: formData.deliveryOption,
        estimated_delivery: formData.estimatedDelivery,
      };

      console.log(submitData);

      // Submit to backend API
      const response = await fetch(BACKEND_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      });

      if (!response.ok) {
        toast("Error creating produce", {
          description: `Failed to upload produce`,
          style: {
            background: "red",
            color: "white",
          },
          variant: "destructive",
        });
        setLoading(false);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      console.log(response);
      console.log("----->", result);

      // Show success message
      setSubmitStatus("success");
      setSubmitMessage("Produce listing created successfully!");
      setLoading(false);
      toast("success", {
        description: `produce created succusfully`,
        style: {
          background: "green",
          color: "white",
        },
        variant: "default",
      });

      // Reset form (optional)
      setFormData({
        title: "",
        description: "",
        category: "",
        pricePerUnit: "",
        unitType: "",
        minimumOrder: "1",
        availableStock: "0",
        deliveryOption: "",
        estimatedDelivery: "",
      });
      setImages([]);
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
      setSubmitMessage("Failed to create listing. Please try again.");
    }
  };

  return (
    <Card className="w-full max-w-2xl  mb-24">
      <CardHeader>
        <CardTitle>Add New Produce</CardTitle>
        <CardDescription>
          Fill out the details to list your new produce
        </CardDescription>
      </CardHeader>

      {submitStatus && (
        <div className="px-6 pb-4">
          <Alert
            variant={submitStatus === "success" ? "default" : "destructive"}
          >
            {submitStatus === "success" ? (
              <CheckCircle className="h-4 w-4" />
            ) : (
              <XCircle className="h-4 w-4" />
            )}
            <AlertTitle>
              {submitStatus === "success" ? "Success" : "Error"}
            </AlertTitle>
            <AlertDescription>{submitMessage}</AlertDescription>
          </Alert>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {/* Basic Information */}
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Basic Information</h3>

            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="E.g., Fresh Organic Tomatoes"
                />
                {errors.title && (
                  <p className="text-sm text-red-500">{errors.title}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe your produce"
                  className="min-h-32"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) =>
                    handleSelectChange("category", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.category && (
                  <p className="text-sm text-red-500">{errors.category}</p>
                )}
              </div>
            </div>
          </div>

          {/* Pricing & Inventory */}
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Pricing & Inventory</h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="pricePerUnit">Price Per Unit</Label>
                <Input
                  id="pricePerUnit"
                  name="pricePerUnit"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.pricePerUnit}
                  onChange={handleInputChange}
                  placeholder="0.00"
                />
                {errors.pricePerUnit && (
                  <p className="text-sm text-red-500">{errors.pricePerUnit}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="unitType">Unit Type</Label>
                <Select
                  value={formData.unitType}
                  onValueChange={(value) =>
                    handleSelectChange("unitType", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    {unitTypes.map((unit) => (
                      <SelectItem key={unit} value={unit}>
                        {unit}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.unitType && (
                  <p className="text-sm text-red-500">{errors.unitType}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="minimumOrder">Minimum Order</Label>
                <Input
                  id="minimumOrder"
                  name="minimumOrder"
                  type="number"
                  min="1"
                  value={formData.minimumOrder}
                  onChange={handleInputChange}
                  placeholder="1"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="availableStock">Available Stock</Label>
                <Input
                  id="availableStock"
                  name="availableStock"
                  type="number"
                  min="0"
                  value={formData.availableStock}
                  onChange={handleInputChange}
                  placeholder="0"
                />
              </div>

              <div className="space-y-2 col-span-2">
                <Label>Harvest Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                      type="button"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {harvestDate ? (
                        format(harvestDate, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={harvestDate}
                      onSelect={setHarvestDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>

          {/* Delivery Options */}
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Delivery Information</h3>

            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="deliveryOption">Delivery Options</Label>
                <Select
                  value={formData.deliveryOption}
                  onValueChange={(value) =>
                    handleSelectChange("deliveryOption", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select delivery options" />
                  </SelectTrigger>
                  <SelectContent>
                    {deliveryOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.deliveryOption && (
                  <p className="text-sm text-red-500">
                    {errors.deliveryOption}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="estimatedDelivery">Estimated Delivery</Label>
                <Input
                  id="estimatedDelivery"
                  name="estimatedDelivery"
                  value={formData.estimatedDelivery}
                  onChange={handleInputChange}
                  placeholder="E.g., 2-3 business days"
                />
              </div>
            </div>
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Product Images</h3>

            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="images">Upload Images</Label>
                <div className="border border-dashed rounded-md p-4 bg-green-50">
                  <Input
                    id="images"
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleImageUpload}
                    disabled={isUploading}
                  />
                  <label
                    htmlFor="images"
                    className="flex flex-col items-center justify-center cursor-pointer"
                  >
                    <Upload className="h-8 w-8 text-green-600" />
                    <span className="mt-2 text-sm text-green-700">
                      {isUploading ? "Uploading..." : "Click to upload images"}
                    </span>
                  </label>
                </div>
              </div>

              {images.length > 0 && (
                <div className="grid grid-cols-3 gap-2">
                  {images.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={image.preview}
                        alt={`Preview ${index}`}
                        className="h-24 w-full object-cover rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between  ">
          <Button variant="outline" type="button">
            Cancel
          </Button>

          {Loading ? (
            <Button disabled>
              <Loader2 className="animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button type="submit" disabled={isUploading}>
              {isUploading ? "Uploading Images..." : "Create Listing"}
            </Button>
          )}
        </CardFooter>
      </form>
    </Card>
  );
};

export default CreateProduceForm;
