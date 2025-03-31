"use client";

import React, { useState } from "react";
import {
  User,
  Lock,
  Bell,
  Farm,
  Camera,
  Mail,
  Phone,
  LogOut,
  Shield,
  Trash2,
  Moon,
  Sun,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";

const FarmerSettings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    whatsapp: true,
    newOrders: true,
    payments: true,
    delivery: false,
  });
  const [security, setSecurity] = useState({
    twoFactor: true,
    biometric: false,
  });

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-6">
      {/* Header with dark mode toggle */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Settings & Profile</h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          {darkMode ? (
            <Moon className="h-5 w-5" />
          ) : (
            <Sun className="h-5 w-5" />
          )}
        </button>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Profile Picture */}
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
                    <User className="w-12 h-12 text-gray-400" />
                  </div>
                  <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-lg border">
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Personal Details Form */}
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Full Name</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded-md"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Farm Name</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded-md"
                      placeholder="Green Acres Farm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Phone Number</label>
                    <input
                      type="tel"
                      className="w-full p-2 border rounded-md"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <input
                      type="email"
                      className="w-full p-2 border rounded-md"
                      placeholder="john@greenacres.com"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Farm Location</label>
                  <textarea
                    className="w-full p-2 border rounded-md"
                    rows={3}
                    placeholder="Enter your farm's address"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Notification Channels</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Mail className="w-5 h-5" />
                      <span>Email Notifications</span>
                    </div>
                    <Switch
                      checked={notifications.email}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, email: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Phone className="w-5 h-5" />
                      <span>SMS Notifications</span>
                    </div>
                    <Switch
                      checked={notifications.sms}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, sms: checked })
                      }
                    />
                  </div>
                </div>

                <div className="space-y-4 pt-4">
                  <h3 className="font-medium">Notification Types</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>New Orders</span>
                      <Switch
                        checked={notifications.newOrders}
                        onCheckedChange={(checked) =>
                          setNotifications({
                            ...notifications,
                            newOrders: checked,
                          })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Payment Confirmations</span>
                      <Switch
                        checked={notifications.payments}
                        onCheckedChange={(checked) =>
                          setNotifications({
                            ...notifications,
                            payments: checked,
                          })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Delivery Updates</span>
                      <Switch
                        checked={notifications.delivery}
                        onCheckedChange={(checked) =>
                          setNotifications({
                            ...notifications,
                            delivery: checked,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <Shield className="w-5 h-5" />
                      <span className="font-medium">
                        Two-Factor Authentication
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <Switch
                    checked={security.twoFactor}
                    onCheckedChange={(checked) =>
                      setSecurity({ ...security, twoFactor: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <Lock className="w-5 h-5" />
                      <span className="font-medium">Biometric Login</span>
                    </div>
                    <p className="text-sm text-gray-500">
                      Use Face ID or Fingerprint to log in
                    </p>
                  </div>
                  <Switch
                    checked={security.biometric}
                    onCheckedChange={(checked) =>
                      setSecurity({ ...security, biometric: checked })
                    }
                  />
                </div>

                <div className="space-y-4 pt-4">
                  <button className="w-full p-4 text-left flex items-center justify-between text-blue-600 hover:bg-blue-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Lock className="w-5 h-5" />
                      <span>Change Password</span>
                    </div>
                  </button>

                  <button className="w-full p-4 text-left flex items-center justify-between text-red-600 hover:bg-red-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Trash2 className="w-5 h-5" />
                      <span>Delete Account</span>
                    </div>
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FarmerSettings;
