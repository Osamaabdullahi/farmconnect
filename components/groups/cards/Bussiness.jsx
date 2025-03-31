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
import {
  MapPin,
  Phone,
  Mail,
  Briefcase,
  CreditCard,
  User,
  FileText,
  Building,
  Store,
  Calendar,
  Check,
  X,
} from "lucide-react";

export default function BusinessProfile({ businessData, onSave }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(null);

  // Initialize editedData when entering edit mode
  const handleStartEditing = () => {
    setEditedData({ ...businessData });
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

  // Handle nested business object input changes
  const handleBusinessInputChange = (field, value) => {
    setEditedData((prev) => ({
      ...prev,
      business: {
        ...prev.business,
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

  // Use editedData if in edit mode, otherwise use original businessData
  const displayData = isEditing ? editedData : businessData;

  console.log("-------------->", displayData);

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <Card className="shadow-lg border-0">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-t-lg">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <Avatar className="h-24 w-24 border-4 border-white shadow-md">
              <AvatarFallback className="bg-white text-blue-600 text-xl font-bold">
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
                        className="bg-white text-blue-800 font-bold"
                      />
                      <Input
                        value={displayData.last_name}
                        onChange={(e) =>
                          handleInputChange("last_name", e.target.value)
                        }
                        className="bg-white text-blue-800 font-bold"
                      />
                      <Input
                        value={displayData.business.business_name}
                        onChange={(e) =>
                          handleBusinessInputChange(
                            "business_name",
                            e.target.value
                          )
                        }
                        className="bg-white text-blue-800"
                      />
                    </div>
                  ) : (
                    <>
                      <CardTitle className="text-2xl md:text-3xl font-bold">
                        {displayData.first_name} {displayData.last_name}
                      </CardTitle>
                      <CardDescription className="text-blue-100 text-lg">
                        {displayData.business?.business_name}
                      </CardDescription>
                    </>
                  )}
                </div>
                <Badge className="bg-white text-blue-600 capitalize mt-2 md:mt-0">
                  {displayData.role}
                </Badge>
              </div>
              <div className="flex items-center gap-2 text-blue-100">
                <MapPin size={16} />
                {isEditing ? (
                  <Input
                    value={displayData.business.business_location}
                    onChange={(e) =>
                      handleBusinessInputChange(
                        "business_location",
                        e.target.value
                      )
                    }
                    className="bg-white text-blue-800 w-full max-w-xs"
                  />
                ) : (
                  <span>{displayData.business.business_location}</span>
                )}
              </div>
            </div>
          </div>
        </CardHeader>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="w-full bg-blue-50 p-0 rounded-none">
            <TabsTrigger
              value="overview"
              className="flex-1 py-3 data-[state=active]:bg-white data-[state=active]:text-blue-600 rounded-none"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="business"
              className="flex-1 py-3 data-[state=active]:bg-white data-[state=active]:text-blue-600 rounded-none"
            >
              Business Details
            </TabsTrigger>
            <TabsTrigger
              value="photo"
              className="flex-1 py-3 data-[state=active]:bg-white data-[state=active]:text-blue-600 rounded-none"
            >
              Business Photo
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="m-0">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium flex items-center gap-2">
                      <User size={18} className="text-blue-500" />
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
                            value={displayData.business.phone_number}
                            onChange={(e) =>
                              handleBusinessInputChange(
                                "phone_number",
                                e.target.value
                              )
                            }
                            className="flex-1"
                          />
                        ) : (
                          <span>{displayData.business.phone_number}</span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <User size={16} className="text-gray-500" />
                        {isEditing ? (
                          <Input
                            value={displayData.business.contact_person_name}
                            onChange={(e) =>
                              handleBusinessInputChange(
                                "contact_person_name",
                                e.target.value
                              )
                            }
                            className="flex-1"
                          />
                        ) : (
                          <span>
                            {displayData.business.contact_person_name}
                          </span>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium flex items-center gap-2">
                      <FileText size={18} className="text-blue-500" />
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

          <TabsContent value="business" className="m-0">
            <CardContent className="p-6 space-y-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-700 mb-4 flex items-center gap-2">
                  <Building size={20} />
                  Business Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Business Type
                      </label>
                      {isEditing ? (
                        <Input
                          value={displayData.business.business_type}
                          onChange={(e) =>
                            handleBusinessInputChange(
                              "business_type",
                              e.target.value
                            )
                          }
                          className="mt-1"
                        />
                      ) : (
                        <p className="text-gray-900">
                          {displayData.business.business_type}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Business Location
                      </label>
                      <div className="flex items-center gap-2 text-gray-900">
                        <MapPin size={16} className="text-blue-500" />
                        {isEditing ? (
                          <Input
                            value={displayData.business.business_location}
                            onChange={(e) =>
                              handleBusinessInputChange(
                                "business_location",
                                e.target.value
                              )
                            }
                          />
                        ) : (
                          displayData.business.business_location
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Contact Person
                      </label>
                      <div className="flex items-center gap-2 text-gray-900">
                        <User size={16} className="text-blue-500" />
                        {isEditing ? (
                          <Input
                            value={displayData.business.contact_person_name}
                            onChange={(e) =>
                              handleBusinessInputChange(
                                "contact_person_name",
                                e.target.value
                              )
                            }
                          />
                        ) : (
                          displayData.business.contact_person_name
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
                        <CreditCard size={16} className="text-blue-500" />
                        {isEditing ? (
                          <Input
                            value={displayData.business.preferred_payment}
                            onChange={(e) =>
                              handleBusinessInputChange(
                                "preferred_payment",
                                e.target.value
                              )
                            }
                          />
                        ) : (
                          displayData.business.preferred_payment
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Verification ID
                      </label>
                      {isEditing ? (
                        <Input
                          value={displayData.business.verification_id}
                          onChange={(e) =>
                            handleBusinessInputChange(
                              "verification_id",
                              e.target.value
                            )
                          }
                          className="mt-1"
                        />
                      ) : (
                        <p className="text-gray-900">
                          {displayData.business.verification_id}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Last Updated
                      </label>
                      <p className="text-gray-900">
                        {formatDate(displayData.business.updated_at)}
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
                <Store size={20} className="text-blue-500" />
                Business Photo
              </h3>

              <div className="overflow-hidden rounded-lg shadow-md">
                <Dialog>
                  <DialogTrigger asChild>
                    <div
                      className="cursor-pointer h-64 bg-cover bg-center rounded-lg w-full"
                      style={{
                        backgroundImage: `url(${displayData.business.photos})`,
                      }}
                    />
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl">
                    <DialogHeader>
                      <DialogTitle>Business Photo</DialogTitle>
                      <DialogDescription>
                        {displayData.business.business_name} -{" "}
                        {displayData.business.business_location}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="w-full h-96 overflow-hidden rounded-md">
                      <img
                        src={displayData.business.photos}
                        alt={`${displayData.business.business_name}`}
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
                    value={displayData.business.photos}
                    onChange={(e) =>
                      handleBusinessInputChange("photos", e.target.value)
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
            <span>ID: {displayData.business.id.substring(0, 8)}...</span>
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
                className="bg-blue-600 hover:bg-blue-700 flex items-center gap-1"
                onClick={handleSaveEdit}
              >
                <Check size={16} />
                Save Changes
              </Button>
            </div>
          ) : (
            <Button
              className="bg-blue-600 hover:bg-blue-700"
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
import BusinessProfile from '@/components/BusinessProfile';
import { useState } from 'react';

export default function ProfilePage() {
  const [businessData, setBusinessData] = useState({
    "id": "3756beea-49d8-45d9-8c9c-ae1e54ecce05",
    "first_name": "Sarah",
    "last_name": "Wilson",
    "email": "sarah.wilson@example.com",
    "onboarding": true,
    "role": "logistics",
    "status": "active",
    "created_at": "2025-01-20T19:30:00+03:00",
    "updated_at": "2025-03-17T18:18:45.600278+03:00",
    "business": {
      "id": "5d65de7f-f1df-4b10-8940-364636931172",
      "user_id": "3756beea-49d8-45d9-8c9c-ae1e54ecce05",
      "business_name": "FreshMart Supermarket",
      "business_type": "Grocery Store",
      "business_location": "Nairobi, Kenya",
      "verification_id": "BUS-KE-987654",
      "preferred_payment": "M-Pesa",
      "contact_person_name": "Jane Doe",
      "phone_number": "+254722123456",
      "created_at": "2025-03-17T18:18:45.591347+03:00",
      "updated_at": "2025-03-17T18:18:45.591347+03:00",
      "photos": "https://i.pinimg.com/474x/2b/aa/a0/2baaa0afb408a3c1cd341946f2effbab.jpg"
    }
  });

  const handleSaveBusinessData = (updatedData) => {
    // Here you can send the updated data to your API
    console.log("Saving updated data:", updatedData);
    
    // Update the state with the new data
    setBusinessData(updatedData);
  };

  return (
    <div className="container mx-auto py-8">
      <BusinessProfile 
        businessData={businessData} 
        onSave={handleSaveBusinessData} 
      />
    </div>
  );
}
*/
