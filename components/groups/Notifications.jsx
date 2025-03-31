"use client";

import React, { useState, useEffect } from "react";
import {
  Bell,
  Check,
  CheckCheck,
  MoreHorizontal,
  Settings,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const Notifications = () => {
  // Sample notification data
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message: "Your payment of $250.00 has been processed successfully",
      timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
      isRead: false,
      type: "payment",
    },
    {
      id: 2,
      message: "New market price update available for corn and wheat",
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
      isRead: false,
      type: "market",
    },
    {
      id: 3,
      message: "Weather alert: Heavy rain expected in your farming region",
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
      isRead: false,
      type: "weather",
    },
    {
      id: 4,
      message: "Your harvest schedule for next week is now available",
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      isRead: true,
      type: "schedule",
    },
    {
      id: 5,
      message: "New farming tips article: Maximizing crop yield in dry seasons",
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      isRead: true,
      type: "tips",
    },
  ]);

  const [activeTab, setActiveTab] = useState("all");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [notificationPreferences, setNotificationPreferences] = useState({
    payment: true,
    market: true,
    weather: true,
    schedule: true,
    tips: false,
  });

  // Get unread count
  const unreadCount = notifications.filter(
    (notification) => !notification.isRead
  ).length;

  // Filter notifications based on active tab
  const filteredNotifications = notifications.filter((notification) => {
    if (activeTab === "all") return true;
    if (activeTab === "unread") return !notification.isRead;
    if (activeTab === "read") return notification.isRead;
    return true;
  });

  // Mark notification as read
  const markAsRead = (id) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({ ...notification, isRead: true }))
    );
  };

  // Delete notification
  const deleteNotification = (id) => {
    setNotifications(
      notifications.filter((notification) => notification.id !== id)
    );
  };

  // Delete all notifications
  const deleteAllNotifications = () => {
    setNotifications([]);
  };

  // Toggle notification preferences
  const toggleNotificationPreference = (type) => {
    setNotificationPreferences({
      ...notificationPreferences,
      [type]: !notificationPreferences[type],
    });
  };

  // Format timestamp to relative time
  const formatRelativeTime = (date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) {
      return "Just now";
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `${diffInMinutes} ${
        diffInMinutes === 1 ? "minute" : "minutes"
      } ago`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours} ${diffInHours === 1 ? "hour" : "hours"} ago`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) {
      return `${diffInDays} ${diffInDays === 1 ? "day" : "days"} ago`;
    }

    return date.toLocaleDateString();
  };

  // Notification Bell with Dropdown in Navbar (for demo purposes)
  const NotificationBell = () => (
    <div className="fixed top-4 right-4 z-50">
      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className="relative">
            <Bell size={18} />
            {unreadCount > 0 && (
              <Badge className="absolute -top-2 -right-2 px-1.5 py-0.5 bg-red-500 text-white text-xs rounded-full">
                {unreadCount}
              </Badge>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-80">
          <DropdownMenuLabel className="flex justify-between items-center">
            <span>Notifications</span>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={markAllAsRead}
                disabled={unreadCount === 0}
                className="h-8 text-xs"
              >
                <Check size={14} className="mr-1" /> Mark all read
              </Button>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <ScrollArea className="h-64">
            {notifications.length > 0 ? (
              notifications.slice(0, 5).map((notification) => (
                <DropdownMenuItem
                  key={notification.id}
                  className={`p-2 cursor-default ${
                    !notification.isRead ? "bg-blue-50" : ""
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex flex-col w-full">
                    <div className="flex justify-between items-start">
                      <span
                        className={`text-sm ${
                          !notification.isRead ? "font-medium" : ""
                        }`}
                      >
                        {notification.message}
                      </span>
                      {!notification.isRead ? (
                        <Badge
                          variant="outline"
                          className="ml-2 h-2 w-2 rounded-full bg-blue-500"
                        />
                      ) : null}
                    </div>
                    <span className="text-xs text-gray-500 mt-1">
                      {formatRelativeTime(notification.timestamp)}
                    </span>
                  </div>
                </DropdownMenuItem>
              ))
            ) : (
              <div className="p-4 text-center text-gray-500 text-sm">
                No notifications to display
              </div>
            )}
          </ScrollArea>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => setIsDropdownOpen(false)}
          >
            <span className="text-center w-full text-blue-500">
              View all notifications
            </span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );

  // Main component content
  return (
    <div className="container mx-auto p-4 max-w-4xl">
      {/* Demo notification bell */}
      <NotificationBell />

      <div className="mb-6">
        <h1 className="text-2xl font-bold">Notifications</h1>
        <p className="text-gray-500">
          Stay updated with important alerts and information
        </p>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="all">
              All
              {notifications.length > 0 && (
                <Badge
                  className="ml-2 bg-gray-200 text-gray-800"
                  variant="secondary"
                >
                  {notifications.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="unread">
              Unread
              {unreadCount > 0 && (
                <Badge
                  className="ml-2 bg-blue-100 text-blue-800"
                  variant="secondary"
                >
                  {unreadCount}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="read">Read</TabsTrigger>
          </TabsList>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={markAllAsRead}
              disabled={unreadCount === 0}
            >
              <CheckCheck size={16} className="mr-1" /> Mark all read
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={deleteAllNotifications}
              disabled={notifications.length === 0}
              className="text-red-500 border-red-200 hover:bg-red-50"
            >
              <Trash2 size={16} className="mr-1" /> Clear all
            </Button>
          </div>
        </div>

        <TabsContent value="all" className="mt-0">
          <Card>
            <CardContent className="p-0">
              {filteredNotifications.length > 0 ? (
                <div className="divide-y">
                  {filteredNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 ${
                        !notification.isRead ? "bg-blue-50" : ""
                      }`}
                    >
                      <div className="flex justify-between">
                        <div className="flex-1">
                          <p
                            className={`${
                              !notification.isRead ? "font-medium" : ""
                            }`}
                          >
                            {notification.message}
                          </p>
                          <div className="flex items-center mt-1">
                            <span className="text-xs text-gray-500">
                              {formatRelativeTime(notification.timestamp)}
                            </span>
                            {!notification.isRead && (
                              <Badge
                                className="ml-2 bg-blue-100 text-blue-800 text-xs"
                                variant="secondary"
                              >
                                New
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                              >
                                <MoreHorizontal size={16} />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              {!notification.isRead ? (
                                <DropdownMenuItem
                                  onClick={() => markAsRead(notification.id)}
                                >
                                  <Check size={14} className="mr-2" /> Mark as
                                  read
                                </DropdownMenuItem>
                              ) : (
                                <DropdownMenuItem
                                  onClick={() => {
                                    setNotifications(
                                      notifications.map((n) =>
                                        n.id === notification.id
                                          ? { ...n, isRead: false }
                                          : n
                                      )
                                    );
                                  }}
                                >
                                  <Check size={14} className="mr-2" /> Mark as
                                  unread
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() =>
                                  deleteNotification(notification.id)
                                }
                                className="text-red-500"
                              >
                                <Trash2 size={14} className="mr-2" /> Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 text-center">
                  <Bell size={36} className="mx-auto text-gray-300 mb-3" />
                  <h3 className="text-lg font-medium text-gray-700">
                    No notifications
                  </h3>
                  <p className="text-gray-500 mt-1">
                    {activeTab === "unread"
                      ? "You've read all your notifications!"
                      : activeTab === "read"
                      ? "No read notifications"
                      : "You don't have any notifications yet"}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="unread" className="mt-0">
          <Card>
            <CardContent className="p-0">
              {filteredNotifications.length > 0 ? (
                <div className="divide-y">
                  {filteredNotifications.map((notification) => (
                    <div key={notification.id} className="p-4 bg-blue-50">
                      <div className="flex justify-between">
                        <div className="flex-1">
                          <p className="font-medium">{notification.message}</p>
                          <div className="flex items-center mt-1">
                            <span className="text-xs text-gray-500">
                              {formatRelativeTime(notification.timestamp)}
                            </span>
                            <Badge
                              className="ml-2 bg-blue-100 text-blue-800 text-xs"
                              variant="secondary"
                            >
                              New
                            </Badge>
                          </div>
                        </div>
                        <div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                              >
                                <MoreHorizontal size={16} />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => markAsRead(notification.id)}
                              >
                                <Check size={14} className="mr-2" /> Mark as
                                read
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() =>
                                  deleteNotification(notification.id)
                                }
                                className="text-red-500"
                              >
                                <Trash2 size={14} className="mr-2" /> Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 text-center">
                  <Bell size={36} className="mx-auto text-gray-300 mb-3" />
                  <h3 className="text-lg font-medium text-gray-700">
                    No unread notifications
                  </h3>
                  <p className="text-gray-500 mt-1">You're all caught up!</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="read" className="mt-0">
          <Card>
            <CardContent className="p-0">
              {filteredNotifications.length > 0 ? (
                <div className="divide-y">
                  {filteredNotifications.map((notification) => (
                    <div key={notification.id} className="p-4">
                      <div className="flex justify-between">
                        <div className="flex-1">
                          <p>{notification.message}</p>
                          <div className="flex items-center mt-1">
                            <span className="text-xs text-gray-500">
                              {formatRelativeTime(notification.timestamp)}
                            </span>
                          </div>
                        </div>
                        <div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                              >
                                <MoreHorizontal size={16} />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => {
                                  setNotifications(
                                    notifications.map((n) =>
                                      n.id === notification.id
                                        ? { ...n, isRead: false }
                                        : n
                                    )
                                  );
                                }}
                              >
                                <Check size={14} className="mr-2" /> Mark as
                                unread
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() =>
                                  deleteNotification(notification.id)
                                }
                                className="text-red-500"
                              >
                                <Trash2 size={14} className="mr-2" /> Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 text-center">
                  <Bell size={36} className="mx-auto text-gray-300 mb-3" />
                  <h3 className="text-lg font-medium text-gray-700">
                    No read notifications
                  </h3>
                  <p className="text-gray-500 mt-1">
                    You have some unread notifications waiting for you.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-lg">Notification Preferences</CardTitle>
          <CardDescription>
            Control which notifications you receive
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="payment-notifications">
                  Payment Notifications
                </Label>
                <p className="text-sm text-gray-500">
                  Get notified about payment updates and receipts
                </p>
              </div>
              <Switch
                id="payment-notifications"
                checked={notificationPreferences.payment}
                onCheckedChange={() => toggleNotificationPreference("payment")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="market-notifications">Market Updates</Label>
                <p className="text-sm text-gray-500">
                  Receive price changes and market trend notifications
                </p>
              </div>
              <Switch
                id="market-notifications"
                checked={notificationPreferences.market}
                onCheckedChange={() => toggleNotificationPreference("market")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="weather-notifications">Weather Alerts</Label>
                <p className="text-sm text-gray-500">
                  Get notifications about weather conditions affecting your farm
                </p>
              </div>
              <Switch
                id="weather-notifications"
                checked={notificationPreferences.weather}
                onCheckedChange={() => toggleNotificationPreference("weather")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="schedule-notifications">Schedule Updates</Label>
                <p className="text-sm text-gray-500">
                  Stay informed about changes to your farming schedules
                </p>
              </div>
              <Switch
                id="schedule-notifications"
                checked={notificationPreferences.schedule}
                onCheckedChange={() => toggleNotificationPreference("schedule")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="tips-notifications">Farming Tips</Label>
                <p className="text-sm text-gray-500">
                  Receive agricultural tips and best practices
                </p>
              </div>
              <Switch
                id="tips-notifications"
                checked={notificationPreferences.tips}
                onCheckedChange={() => toggleNotificationPreference("tips")}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Notifications;
