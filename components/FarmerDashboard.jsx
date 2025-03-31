"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import {
  Wallet,
  Download,
  FileText,
  CreditCard,
  TrendingUp,
  Calendar,
  DollarSign,
  AlertCircle,
} from "lucide-react";

const FarmerDashboard = () => {
  const [timeframe, setTimeframe] = useState("weekly");

  // Sample data - would come from API in real implementation
  const earningsData = {
    weekly: [
      { name: "Mon", earnings: 450 },
      { name: "Tue", earnings: 680 },
      { name: "Wed", earnings: 850 },
      { name: "Thu", earnings: 720 },
      { name: "Fri", earnings: 940 },
      { name: "Sat", earnings: 1020 },
      { name: "Sun", earnings: 780 },
    ],
    monthly: Array.from({ length: 12 }, (_, i) => ({
      name: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ][i],
      earnings: Math.floor(Math.random() * 20000 + 15000),
    })),
  };

  const topProducts = [
    { name: "Organic Tomatoes", revenue: 12500 },
    { name: "Sweet Corn", revenue: 9800 },
    { name: "Fresh Lettuce", revenue: 7600 },
    { name: "Bell Peppers", revenue: 6900 },
  ];

  const recentTransactions = [
    { id: "ORD001", date: "2025-02-18", amount: 1250, status: "paid" },
    { id: "ORD002", date: "2025-02-17", amount: 890, status: "pending" },
    { id: "ORD003", date: "2025-02-17", amount: 2100, status: "processing" },
    { id: "ORD004", date: "2025-02-16", amount: 760, status: "paid" },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "paid":
        return "text-green-500";
      case "pending":
        return "text-red-500";
      case "processing":
        return "text-yellow-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Payments & Earnings</h1>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <Download size={20} />
          Export Data
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-green-100 p-3 rounded-full">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Earnings</p>
                <p className="text-2xl font-bold">$45,280</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <AlertCircle className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Pending Payments</p>
                <p className="text-2xl font-bold">$3,890</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-purple-100 p-3 rounded-full">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Average Order</p>
                <p className="text-2xl font-bold">$845</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-orange-100 p-3 rounded-full">
                <Calendar className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">This Month</p>
                <p className="text-2xl font-bold">$12,450</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Earnings Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Earnings Overview</CardTitle>
            <Tabs defaultValue="weekly">
              <TabsList>
                <TabsTrigger
                  value="weekly"
                  onClick={() => setTimeframe("weekly")}
                  className={timeframe === "weekly" ? "bg-green-100" : ""}
                >
                  Weekly
                </TabsTrigger>
                <TabsTrigger
                  value="monthly"
                  onClick={() => setTimeframe("monthly")}
                  className={timeframe === "monthly" ? "bg-green-100" : ""}
                >
                  Monthly
                </TabsTrigger>
              </TabsList>
              <TabsContent value="weekly">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={earningsData.weekly}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="earnings" fill="#16a34a" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
              <TabsContent value="monthly">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={earningsData.monthly}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="earnings" fill="#16a34a" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
            </Tabs>
          </CardHeader>
        </Card>

        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle>Top Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-gray-500">
                      ${product.revenue.toLocaleString()}
                    </p>
                  </div>
                  <div className="w-24">
                    <ResponsiveContainer width="100%" height={30}>
                      <LineChart
                        data={[{ value: 0 }, { value: product.revenue }]}
                      >
                        <Line
                          type="monotone"
                          dataKey="value"
                          stroke="#16a34a"
                          strokeWidth={2}
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Order ID</th>
                  <th className="text-left py-3 px-4">Date</th>
                  <th className="text-left py-3 px-4">Amount</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentTransactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b">
                    <td className="py-3 px-4">{transaction.id}</td>
                    <td className="py-3 px-4">{transaction.date}</td>
                    <td className="py-3 px-4">${transaction.amount}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`capitalize ${getStatusColor(
                          transaction.status
                        )}`}
                      >
                        {transaction.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <button className="text-blue-600 hover:text-blue-800">
                        <FileText size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FarmerDashboard;
