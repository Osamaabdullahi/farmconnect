import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Calendar,
  MapPin,
  Phone,
  Mail,
  Clock,
  CreditCard,
  User,
  FileText,
  Crop,
  Home,
  Save,
  X,
  Check,
} from "lucide-react";

export default function FarmerProfile({ farmerData, onSave }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(null);

  // Initialize editedData when entering edit mode
  const handleStartEditing = () => {
    setEditedData({ ...farmerData });
    setIsEditing(true);
  };

  // Handle canceling edits
  const handleCancelEdit = () => {
    setEditedData(null);
    setIsEditing(false);
  };

  // Handle saving edits
  const handleSaveEdit = () => {
    if (onSave) {
      onSave(editedData);
    }
    setIsEditing(false);
    // Note: We don't reset editedData here to preserve changes until a fresh edit session
  };

  // Handle input changes
  const handleInputChange = (field, value) => {
    setEditedData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle nested farmer object input changes
  const handleFarmerInputChange = (field, value) => {
    setEditedData((prev) => ({
      ...prev,
      farmer: {
        ...prev.farmer,
        [field]: value,
      },
    }));
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getInitials = (firstName, lastName) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`;
  };

  // Use editedData if in edit mode, otherwise use original farmerData
  const displayData = isEditing ? editedData : farmerData;

  console.log(displayData);

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <Card className="shadow-lg border-0">
        <CardHeader className="bg-gradient-to-r from-green-600 to-green-400 text-white rounded-t-lg">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <Avatar className="h-24 w-24 border-4 border-white shadow-md">
              <AvatarFallback className="bg-white text-green-600 text-xl font-bold">
                {getInitials(displayData.first_name, displayData.last_name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                <div>
                  {isEditing ? (
                    <div className="space-y-2">
                      <Input
                        value={displayData.first_name}
                        onChange={(e) =>
                          handleInputChange("first_name", e.target.value)
                        }
                        className="bg-white text-green-800 font-bold"
                      />
                      <Input
                        value={displayData.last_name}
                        onChange={(e) =>
                          handleInputChange("last_name", e.target.value)
                        }
                        className="bg-white text-green-800 font-bold"
                      />
                      <Input
                        value={displayData.farmer.farm_name}
                        onChange={(e) =>
                          handleFarmerInputChange("farm_name", e.target.value)
                        }
                        className="bg-white text-green-800"
                      />
                    </div>
                  ) : (
                    <>
                      <CardTitle className="text-2xl md:text-3xl font-bold">
                        {displayData.first_name} {displayData.last_name}
                      </CardTitle>
                      <CardDescription className="text-green-100 text-lg">
                        {displayData.farmer.farm_name}
                      </CardDescription>
                    </>
                  )}
                </div>
                <Badge className="bg-white text-green-600 capitalize mt-2 md:mt-0">
                  {displayData.role}
                </Badge>
              </div>
              <div className="flex items-center gap-2 text-green-100">
                <MapPin size={16} />
                {isEditing ? (
                  <Input
                    value={displayData.farmer.farm_location}
                    onChange={(e) =>
                      handleFarmerInputChange("farm_location", e.target.value)
                    }
                    className="bg-white text-green-800 w-full max-w-xs"
                  />
                ) : (
                  <span>{displayData.farmer.farm_location}</span>
                )}
              </div>
            </div>
          </div>
        </CardHeader>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="w-full bg-green-50 p-0 rounded-none">
            <TabsTrigger
              value="overview"
              className="flex-1 py-3 data-[state=active]:bg-white data-[state=active]:text-green-600 rounded-none"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="farm"
              className="flex-1 py-3 data-[state=active]:bg-white data-[state=active]:text-green-600 rounded-none"
            >
              Farm Details
            </TabsTrigger>
            <TabsTrigger
              value="photos"
              className="flex-1 py-3 data-[state=active]:bg-white data-[state=active]:text-green-600 rounded-none"
            >
              Farm Photos
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="m-0">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium flex items-center gap-2">
                      <User size={18} className="text-green-500" />
                      Contact Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Mail size={16} className="text-gray-500" />
                        {isEditing ? (
                          <Input
                            value={displayData.email}
                            onChange={(e) =>
                              handleInputChange("email", e.target.value)
                            }
                            className="flex-1"
                          />
                        ) : (
                          <span>{displayData.email}</span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone size={16} className="text-gray-500" />
                        {isEditing ? (
                          <Input
                            value={displayData.farmer.phone_number}
                            onChange={(e) =>
                              handleFarmerInputChange(
                                "phone_number",
                                e.target.value
                              )
                            }
                            className="flex-1"
                          />
                        ) : (
                          <span>{displayData.farmer.phone_number}</span>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium flex items-center gap-2">
                      <FileText size={18} className="text-green-500" />
                      Account Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            displayData.status === "active"
                              ? "success"
                              : "secondary"
                          }
                          className="capitalize"
                        >
                          {displayData.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-gray-500" />
                        <span>
                          Member since {formatDate(displayData.created_at)}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </TabsContent>

          <TabsContent value="farm" className="m-0">
            <CardContent className="p-6 space-y-6">
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-green-700 mb-4 flex items-center gap-2">
                  <Crop size={20} />
                  Farming Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Types of Crops
                      </label>
                      {isEditing ? (
                        <Input
                          value={displayData.farmer.types_of_crops}
                          onChange={(e) =>
                            handleFarmerInputChange(
                              "types_of_crops",
                              e.target.value
                            )
                          }
                          className="mt-1"
                        />
                      ) : (
                        <p className="text-gray-900">
                          {displayData.farmer.types_of_crops}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Harvest Frequency
                      </label>
                      <div className="flex items-center gap-2 text-gray-900">
                        <Clock size={16} className="text-green-500" />
                        {isEditing ? (
                          <Input
                            value={displayData.farmer.harvest_frequency}
                            onChange={(e) =>
                              handleFarmerInputChange(
                                "harvest_frequency",
                                e.target.value
                              )
                            }
                          />
                        ) : (
                          displayData.farmer.harvest_frequency
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Farm Location
                      </label>
                      <div className="flex items-center gap-2 text-gray-900">
                        <MapPin size={16} className="text-green-500" />
                        {isEditing ? (
                          <Input
                            value={displayData.farmer.farm_location}
                            onChange={(e) =>
                              handleFarmerInputChange(
                                "farm_location",
                                e.target.value
                              )
                            }
                          />
                        ) : (
                          displayData.farmer.farm_location
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Preferred Payment
                      </label>
                      <div className="flex items-center gap-2 text-gray-900">
                        <CreditCard size={16} className="text-green-500" />
                        {isEditing ? (
                          <Input
                            value={displayData.farmer.preferred_payment}
                            onChange={(e) =>
                              handleFarmerInputChange(
                                "preferred_payment",
                                e.target.value
                              )
                            }
                          />
                        ) : (
                          displayData.farmer.preferred_payment
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Verification ID
                      </label>
                      {isEditing ? (
                        <Input
                          value={displayData.farmer.verification_id}
                          onChange={(e) =>
                            handleFarmerInputChange(
                              "verification_id",
                              e.target.value
                            )
                          }
                          className="mt-1"
                        />
                      ) : (
                        <p className="text-gray-900">
                          {displayData.farmer.verification_id}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Last Updated
                      </label>
                      <p className="text-gray-900">
                        {formatDate(displayData.farmer.updated_at)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </TabsContent>

          <TabsContent value="photos" className="m-0">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                <Home size={20} className="text-green-500" />
                Farm Gallery
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {displayData.farmer.farm_photos.map((photo, index) => (
                  <div
                    key={index}
                    className="overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-shadow"
                  >
                    <Dialog>
                      <DialogTrigger asChild>
                        <div
                          className="cursor-pointer h-48 bg-cover bg-center rounded-lg"
                          style={{ backgroundImage: `url(${photo})` }}
                          onClick={() => setSelectedImage(photo)}
                        />
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl">
                        <DialogHeader>
                          <DialogTitle>Farm Photo</DialogTitle>
                          <DialogDescription>
                            {displayData.farmer.farm_name} -{" "}
                            {displayData.farmer.farm_location}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="w-full h-96 overflow-hidden rounded-md">
                          <img
                            src={photo}
                            alt={`${displayData.farmer.farm_name}`}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button variant="outline">Close</Button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                ))}
              </div>
            </CardContent>
          </TabsContent>
        </Tabs>

        <CardFooter className="bg-gray-50 px-6 py-4 flex justify-between rounded-b-lg">
          <div className="text-sm text-gray-500">
            <span>ID: {displayData.farmer.id.substring(0, 8)}...</span>
          </div>

          {isEditing ? (
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex items-center gap-1"
                onClick={handleCancelEdit}
              >
                <X size={16} />
                Cancel
              </Button>
              <Button
                className="bg-green-600 hover:bg-green-700 flex items-center gap-1"
                onClick={handleSaveEdit}
              >
                <Check size={16} />
                Save Changes
              </Button>
            </div>
          ) : (
            <Button
              className="bg-green-600 hover:bg-green-700"
              onClick={handleStartEditing}
            >
              Edit Profile
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}

// Usage example:
/*
import FarmerProfile from '@/components/FarmerProfile';
import { useState } from 'react';

export default function ProfilePage() {
  const [farmerData, setFarmerData] = useState({
    "id": "f71d2050-2496-4e38-bf46-bd8796807338",
    "first_name": "John",
    "last_name": "Doe",
    "email": "john.doe@example.com",
    "onboarding": true,
    "role": "farmer",
    "status": "active",
    "created_at": "2025-01-15T15:00:00+03:00",
    "updated_at": "2025-02-28T19:40:36.483539+03:00",
    "farmer": {
      "id": "0ae2e46f-bf61-4b10-946d-94fd0d7801ca",
      "user_id": "f71d2050-2496-4e38-bf46-bd8796807338",
      "farm_name": "Sunshine Acres",
      "farm_location": "Eldoret, Kenya",
      "types_of_crops": "Potatoes, Cabbages, Carrots",
      "harvest_frequency": "Monthly",
      "verification_id": "FRM-KE-123457",
      "preferred_payment": "Bank Transfer",
      "phone_number": "+254711234567",
      "farm_photos": [
        "https://i.pinimg.com/474x/f1/d4/39/f1d439989a46dbe35389f523a2f6a830.jpg",
        "https://i.pinimg.com/474x/be/16/5a/be165a26a28f20f04319e2b7f6576914.jpg"
      ],
      "created_at": "2025-01-18T18:30:00+03:00",
      "updated_at": "2025-01-18T18:30:00+03:00"
    }
  });

  const handleSaveFarmerData = (updatedData) => {
    // Here you can send the updated data to your API
    console.log("Saving updated data:", updatedData);
    
    // Update the state with the new data
    setFarmerData(updatedData);
  };

  return (
    <div className="container mx-auto py-8">
      <FarmerProfile 
        farmerData={farmerData} 
        onSave={handleSaveFarmerData} 
      />
    </div>
  );
}
*/
