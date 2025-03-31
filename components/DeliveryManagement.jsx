"use client";

import React, { useState } from "react";
import {
  Package,
  MapPin,
  Calendar,
  Truck,
  Clock,
  Phone,
  CheckCircle,
  AlertTriangle,
  Info,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const DeliveryManagement = () => {
  const [activeDeliveryId, setActiveDeliveryId] = useState(null);

  const deliveries = {
    ongoing: [
      {
        id: "DEL-001",
        orderId: "ORD-123",
        customer: "Fresh Foods Market",
        status: "in-transit",
        location: "En route to destination",
        estimatedArrival: "14:30",
        driver: {
          name: "John Doe",
          phone: "+254 712 345 678",
          vehicle: "KBZ 123C",
        },
        items: [
          { name: "Tomatoes", quantity: "50kg" },
          { name: "Onions", quantity: "30kg" },
        ],
      },
    ],
    scheduled: [
      {
        id: "DEL-002",
        orderId: "ORD-124",
        customer: "Green Grocers",
        scheduledDate: "2025-02-19",
        scheduledTime: "09:00-12:00",
        type: "recurring",
        frequency: "weekly",
        items: [{ name: "Potatoes", quantity: "100kg" }],
      },
    ],
    completed: [
      {
        id: "DEL-003",
        orderId: "ORD-122",
        customer: "Restaurant Hub",
        deliveredAt: "2025-02-17 15:45",
        proofOfDelivery: "/api/placeholder/200/100",
        type: "partner",
        items: [
          { name: "Carrots", quantity: "25kg" },
          { name: "Cabbage", quantity: "40kg" },
        ],
      },
    ],
  };

  const getStatusColor = (status) => {
    const colors = {
      "in-transit": "bg-yellow-100 text-yellow-800",
      completed: "bg-green-100 text-green-800",
      delayed: "bg-red-100 text-red-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const DeliveryCard = ({ delivery, type }) => (
    <Card className="mb-4">
      <CardContent className="pt-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="flex items-center space-x-3 mb-1">
              <h3 className="font-semibold">{delivery.customer}</h3>
              <span className="text-sm text-gray-500">{delivery.orderId}</span>
            </div>
            {type === "ongoing" && (
              <div
                className={`inline-flex items-center px-2 py-1 rounded-full text-sm ${getStatusColor(
                  delivery.status
                )}`}
              >
                <Clock className="w-4 h-4 mr-1" />
                ETA: {delivery.estimatedArrival}
              </div>
            )}
            {type === "scheduled" && (
              <div className="text-sm text-gray-600">
                <Calendar className="w-4 h-4 inline mr-1" />
                {delivery.scheduledDate} ({delivery.scheduledTime})
              </div>
            )}
          </div>
          {type === "ongoing" && (
            <button className="px-3 py-1 bg-green-50 text-green-600 rounded-md hover:bg-green-100">
              Track Order
            </button>
          )}
        </div>

        <div className="space-y-2 mb-4">
          {delivery.items.map((item, index) => (
            <div key={index} className="flex justify-between text-sm">
              <span>{item.name}</span>
              <span>{item.quantity}</span>
            </div>
          ))}
        </div>

        {type === "ongoing" && delivery.driver && (
          <div className="border-t pt-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <img
                  src="/api/placeholder/32/32"
                  alt="Driver"
                  className="w-8 h-8 rounded-full"
                />
                <div>
                  <div className="font-medium">{delivery.driver.name}</div>
                  <div className="text-sm text-gray-500">
                    {delivery.driver.vehicle}
                  </div>
                </div>
              </div>
              <button className="p-2 bg-green-50 text-green-600 rounded-full hover:bg-green-100">
                <Phone className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {type === "completed" && (
          <div className="border-t pt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-green-600">
                <CheckCircle className="w-5 h-5" />
                <span>Delivered at {delivery.deliveredAt}</span>
              </div>
              <button className="text-sm text-blue-600 hover:underline">
                View Proof of Delivery
              </button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Delivery Management</h1>
        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
          New Delivery Request
        </button>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Quick Stats */}
        <div className="col-span-12 grid grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="bg-yellow-100 p-3 rounded-lg">
                  <Truck className="h-6 w-6 text-yellow-600" />
                </div>
                <span className="text-2xl font-bold">5</span>
              </div>
              <p className="mt-2 text-sm text-gray-600">Ongoing Deliveries</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
                <span className="text-2xl font-bold">12</span>
              </div>
              <p className="mt-2 text-sm text-gray-600">Scheduled</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="bg-green-100 p-3 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <span className="text-2xl font-bold">28</span>
              </div>
              <p className="mt-2 text-sm text-gray-600">Completed Today</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="bg-red-100 p-3 rounded-lg">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                </div>
                <span className="text-2xl font-bold">1</span>
              </div>
              <p className="mt-2 text-sm text-gray-600">Delayed</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="col-span-12">
          <Tabs defaultValue="ongoing">
            <TabsList className="mb-4">
              <TabsTrigger value="ongoing">Ongoing Deliveries</TabsTrigger>
              <TabsTrigger value="scheduled">Scheduled Deliveries</TabsTrigger>
              <TabsTrigger value="completed">Completed Deliveries</TabsTrigger>
            </TabsList>

            <TabsContent value="ongoing">
              {deliveries.ongoing.map((delivery) => (
                <DeliveryCard
                  key={delivery.id}
                  delivery={delivery}
                  type="ongoing"
                />
              ))}
            </TabsContent>

            <TabsContent value="scheduled">
              {deliveries.scheduled.map((delivery) => (
                <DeliveryCard
                  key={delivery.id}
                  delivery={delivery}
                  type="scheduled"
                />
              ))}
            </TabsContent>

            <TabsContent value="completed">
              {deliveries.completed.map((delivery) => (
                <DeliveryCard
                  key={delivery.id}
                  delivery={delivery}
                  type="completed"
                />
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default DeliveryManagement;
