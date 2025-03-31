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
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  MapPin,
  Phone,
  Mail,
  Briefcase,
  CreditCard,
  User,
  FileText,
  Truck,
  Image,
  Calendar,
  Check,
  X,
  Globe,
  Clock,
} from "lucide-react";

export default function LogisticsProfile({ logisticsData, onSave }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(null);

  // Initialize editedData when entering edit mode
  const handleStartEditing = () => {
    setEditedData({ ...logisticsData });
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
  };

  // Handle input changes
  const handleInputChange = (field, value) => {
    setEditedData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle nested logistics object input changes
  const handleLogisticsInputChange = (field, value) => {
    setEditedData((prev) => ({
      ...prev,
      logistics: {
        ...prev.logistics,
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

  // Use editedData if in edit mode, otherwise use original logisticsData
  const displayData = isEditing ? editedData : logisticsData;

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
                        value={displayData.logistics.company_name}
                        onChange={(e) =>
                          handleLogisticsInputChange(
                            "company_name",
                            e.target.value
                          )
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
                        {displayData.logistics.company_name}
                      </CardDescription>
                    </>
                  )}
                </div>
                <Badge className="bg-white text-green-600 capitalize mt-2 md:mt-0">
                  {displayData.role}
                </Badge>
              </div>
              <div className="flex items-center gap-2 text-green-100">
                <Truck size={16} />
                {isEditing ? (
                  <Input
                    value={displayData.logistics.vehicle_type}
                    onChange={(e) =>
                      handleLogisticsInputChange("vehicle_type", e.target.value)
                    }
                    className="bg-white text-green-800 w-full max-w-xs"
                  />
                ) : (
                  <span>{displayData.logistics.vehicle_type}</span>
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
              value="logistics"
              className="flex-1 py-3 data-[state=active]:bg-white data-[state=active]:text-green-600 rounded-none"
            >
              Logistics Details
            </TabsTrigger>
            <TabsTrigger
              value="photo"
              className="flex-1 py-3 data-[state=active]:bg-white data-[state=active]:text-green-600 rounded-none"
            >
              Vehicle Photo
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
                            value={displayData.logistics.phone_number}
                            onChange={(e) =>
                              handleLogisticsInputChange(
                                "phone_number",
                                e.target.value
                              )
                            }
                            className="flex-1"
                          />
                        ) : (
                          <span>{displayData.logistics.phone_number}</span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone size={16} className="text-gray-500" />
                        {isEditing ? (
                          <Input
                            value={displayData.logistics.alternative_contact}
                            onChange={(e) =>
                              handleLogisticsInputChange(
                                "alternative_contact",
                                e.target.value
                              )
                            }
                            className="flex-1"
                          />
                        ) : (
                          <span>
                            Alt: {displayData.logistics.alternative_contact}
                          </span>
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
                        {displayData.logistics.availability_status ? (
                          <Badge className="bg-green-100 text-green-700">
                            Available
                          </Badge>
                        ) : (
                          <Badge className="bg-gray-100 text-gray-700">
                            Unavailable
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-gray-500" />
                        <span>
                          Member since {formatDate(displayData.created_at)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Briefcase size={16} className="text-gray-500" />
                        <span>{displayData.role}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </TabsContent>

          <TabsContent value="logistics" className="m-0">
            <CardContent className="p-6 space-y-6">
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-green-700 mb-4 flex items-center gap-2">
                  <Truck size={20} />
                  Logistics Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Vehicle Type
                      </label>
                      {isEditing ? (
                        <Input
                          value={displayData.logistics.vehicle_type}
                          onChange={(e) =>
                            handleLogisticsInputChange(
                              "vehicle_type",
                              e.target.value
                            )
                          }
                          className="mt-1"
                        />
                      ) : (
                        <p className="text-gray-900">
                          {displayData.logistics.vehicle_type}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Service Areas
                      </label>
                      <div className="flex items-center gap-2 text-gray-900">
                        <Globe size={16} className="text-green-500" />
                        {isEditing ? (
                          <Input
                            value={displayData.logistics.service_areas}
                            onChange={(e) =>
                              handleLogisticsInputChange(
                                "service_areas",
                                e.target.value
                              )
                            }
                          />
                        ) : (
                          displayData.logistics.service_areas
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Availability Status
                      </label>
                      <div className="flex items-center gap-2 text-gray-900 mt-1">
                        <Clock size={16} className="text-green-500" />
                        {isEditing ? (
                          <Switch
                            checked={displayData.logistics.availability_status}
                            onCheckedChange={(checked) =>
                              handleLogisticsInputChange(
                                "availability_status",
                                checked
                              )
                            }
                          />
                        ) : displayData.logistics.availability_status ? (
                          "Available"
                        ) : (
                          "Unavailable"
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
                            value={displayData.logistics.payment_method}
                            onChange={(e) =>
                              handleLogisticsInputChange(
                                "payment_method",
                                e.target.value
                              )
                            }
                          />
                        ) : (
                          displayData.logistics.payment_method
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Verification ID
                      </label>
                      {isEditing ? (
                        <Input
                          value={displayData.logistics.verification_id}
                          onChange={(e) =>
                            handleLogisticsInputChange(
                              "verification_id",
                              e.target.value
                            )
                          }
                          className="mt-1"
                        />
                      ) : (
                        <p className="text-gray-900">
                          {displayData.logistics.verification_id}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Last Updated
                      </label>
                      <p className="text-gray-900">
                        {formatDate(displayData.logistics.updated_at)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </TabsContent>

          <TabsContent value="photo" className="m-0">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                <Image size={20} className="text-green-500" />
                Vehicle Photo
              </h3>

              <div className="overflow-hidden rounded-lg shadow-md">
                <Dialog>
                  <DialogTrigger asChild>
                    <div
                      className="cursor-pointer h-64 bg-cover bg-center rounded-lg w-full"
                      style={{
                        backgroundImage: `url(${displayData.logistics.photos})`,
                      }}
                    />
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl">
                    <DialogHeader>
                      <DialogTitle>Vehicle Photo</DialogTitle>
                      <DialogDescription>
                        {displayData.logistics.company_name} -{" "}
                        {displayData.logistics.vehicle_type}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="w-full h-96 overflow-hidden rounded-md">
                      <img
                        src={displayData.logistics.photos}
                        alt={`${displayData.logistics.company_name} vehicle`}
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

              {isEditing && (
                <div className="mt-4">
                  <label className="text-sm font-medium text-gray-500">
                    Photo URL
                  </label>
                  <Input
                    value={displayData.logistics.photos}
                    onChange={(e) =>
                      handleLogisticsInputChange("photos", e.target.value)
                    }
                    className="mt-1"
                  />
                </div>
              )}
            </CardContent>
          </TabsContent>
        </Tabs>

        <CardFooter className="bg-gray-50 px-6 py-4 flex justify-between rounded-b-lg">
          <div className="text-sm text-gray-500">
            <span>ID: {displayData.logistics.id.substring(0, 8)}...</span>
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
import LogisticsProfile from '@/components/LogisticsProfile';
import { useState } from 'react';

export default function ProfilePage() {
  const [logisticsData, setLogisticsData] = useState({
    "id": "732b917a-d16a-427b-9f2c-dc40181b09d2",
    "first_name": "Daniel",
    "last_name": "Martinez",
    "email": "daniel.martinez@example.com",
    "onboarding": true,
    "role": "logistics",
    "status": "active",
    "created_at": "2025-01-23T18:30:00+03:00",
    "updated_at": "2025-03-18T21:26:50.621448+03:00",
    "logistics": {
      "id": "cf3d6734-d5a5-487f-bb01-1757883c0034",
      "user_id": "732b917a-d16a-427b-9f2c-dc40181b09d2",
      "company_name": "FastTrack Logistics",
      "vehicle_type": "Truck",
      "service_areas": "Nairobi, Mombasa, Kisumu",
      "verification_id": "LOG-KE-789012",
      "phone_number": "+254712345678",
      "alternative_contact": "+254798765432",
      "payment_method": "Bank Transfer",
      "availability_status": true,
      "photos": "https://i.pinimg.com/474x/2a/ab/fc/2aabfcd0996bb813f16781be9fa7308a.jpg",
      "created_at": "2025-03-17T10:30:00+03:00",
      "updated_at": "2025-03-17T10:30:00+03:00"
    }
  });

  const handleSaveLogisticsData = (updatedData) => {
    // Here you can send the updated data to your API
    console.log("Saving updated data:", updatedData);
    
    // Update the state with the new data
    setLogisticsData(updatedData);
  };

  return (
    <div className="container mx-auto py-8">
      <LogisticsProfile 
        logisticsData={logisticsData} 
        onSave={handleSaveLogisticsData} 
      />
    </div>
  );
}
*/
