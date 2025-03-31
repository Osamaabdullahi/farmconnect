"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Package,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
  ChevronUp,
  ChevronDown,
  Filter,
  MessageCircle,
  Calendar,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

const OrderManagement = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");

  // Mock data for order statistics
  const orderStats = {
    total: 145,
    pending: 23,
    delivered: 98,
    canceled: 24,
  };

  const pieData = [
    { name: "Delivered", value: orderStats.delivered, color: "#22c55e" },
    { name: "Pending", value: orderStats.pending, color: "#eab308" },
    { name: "Canceled", value: orderStats.canceled, color: "#ef4444" },
  ];

  // Mock data for orders
  const orders = [
    {
      id: "ORD001",
      buyer: "John Doe",
      contact: "+254 712 345 678",
      items: [
        { name: "Tomatoes", quantity: "10kg", price: 1200 },
        { name: "Carrots", quantity: "5kg", price: 500 },
      ],
      orderDate: "2025-02-18",
      deliveryDate: "2025-02-20",
      status: "new",
      payment: "paid",
      notes: "Please ensure fresh produce",
      delivery: "FarmConnect Partner",
    },
    {
      id: "ORD002",
      buyer: "Jane Smith",
      contact: "+254 723 456 789",
      items: [{ name: "Potatoes", quantity: "20kg", price: 2400 }],
      orderDate: "2025-02-18",
      deliveryDate: "2025-02-21",
      status: "pending",
      payment: "pending",
      notes: "Delivery in the morning preferred",
      delivery: "Self-Delivery",
    },
  ];

  const getStatusColor = (status) => {
    const colors = {
      new: "bg-green-100 text-green-600",
      pending: "bg-yellow-100 text-yellow-600",
      accepted: "bg-blue-100 text-blue-600",
      delivered: "bg-green-100 text-green-600",
      canceled: "bg-red-100 text-red-600",
      "out-for-delivery": "bg-purple-100 text-purple-600",
    };
    return colors[status] || "bg-gray-100 text-gray-600";
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Order Management</h1>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200">
            <Filter className="w-4 h-4" />
            Filters
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200">
            <Package className="w-4 h-4" />
            New Orders
          </button>
        </div>
      </div>

      {/* Order Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500">Total Orders</p>
                  <p className="text-2xl font-bold">{orderStats.total}</p>
                  <div className="flex items-center text-green-500 text-sm">
                    <ChevronUp className="w-4 h-4" />
                    <span>12% vs last week</span>
                  </div>
                </div>
                <Package className="w-8 h-8 text-gray-400" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500">Pending</p>
                  <p className="text-2xl font-bold">{orderStats.pending}</p>
                  <div className="flex items-center text-yellow-500 text-sm">
                    <Clock className="w-4 h-4" />
                    <span>Needs attention</span>
                  </div>
                </div>
                <Clock className="w-8 h-8 text-gray-400" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500">Delivered</p>
                  <p className="text-2xl font-bold">{orderStats.delivered}</p>
                  <div className="flex items-center text-green-500 text-sm">
                    <ChevronUp className="w-4 h-4" />
                    <span>5% vs last week</span>
                  </div>
                </div>
                <CheckCircle className="w-8 h-8 text-gray-400" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500">Canceled</p>
                  <p className="text-2xl font-bold">{orderStats.canceled}</p>
                  <div className="flex items-center text-red-500 text-sm">
                    <ChevronDown className="w-4 h-4" />
                    <span>2% vs last week</span>
                  </div>
                </div>
                <XCircle className="w-8 h-8 text-gray-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Distribution Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Order Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex gap-4 flex-wrap">
        <select className="px-4 py-2 border rounded-lg">
          <option value="all">All Status</option>
          <option value="new">New Orders</option>
          <option value="pending">Pending</option>
          <option value="accepted">Accepted</option>
          <option value="delivered">Delivered</option>
          <option value="canceled">Canceled</option>
        </select>

        <select className="px-4 py-2 border rounded-lg">
          <option value="all">All Time</option>
          <option value="today">Today</option>
          <option value="week">Last 7 Days</option>
          <option value="month">Last 30 Days</option>
        </select>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {orders.map((order) => (
          <Card key={order.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row justify-between gap-4">
                {/* Order Info */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold">{order.id}</span>
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status.charAt(0).toUpperCase() +
                        order.status.slice(1)}
                    </span>
                  </div>
                  <p className="font-medium">{order.buyer}</p>
                  <p className="text-sm text-gray-500">{order.contact}</p>
                  <div className="space-y-1">
                    {order.items.map((item, index) => (
                      <p key={index} className="text-sm">
                        {item.name} - {item.quantity} (KSh {item.price})
                      </p>
                    ))}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Order: {order.orderDate}
                    </div>
                    <div className="flex items-center gap-1">
                      <Truck className="w-4 h-4" />
                      Delivery: {order.deliveryDate}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex md:flex-col gap-2">
                  <button className="px-4 py-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Accept
                  </button>
                  <button className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 flex items-center gap-2">
                    <XCircle className="w-4 h-4" />
                    Reject
                  </button>
                  <button className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" />
                    Message
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default OrderManagement;
