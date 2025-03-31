"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Camera,
  Edit,
  Trash2,
  Plus,
  ShoppingCart,
  ChevronUp,
  ChevronDown,
  AlertTriangle,
  Package,
  Search,
  MoreVertical,
  Check,
} from "lucide-react";

const ProduceManagement = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Mock data for produce statistics
  const stats = {
    totalListings: 24,
    availableStock: 18,
    lowStock: 4,
    soldOut: 2,
  };

  // Mock data for produce listings
  const produce = [
    {
      id: 1,
      name: "Fresh Tomatoes",
      category: "Vegetables",
      price: 120,
      unit: "kg",
      stock: 50,
      status: "in-stock",
      description: "Fresh farm-grown tomatoes with no pesticides",
      image: "/api/placeholder/200/200",
      delivery: ["Self-Delivery", "FarmConnect Partner"],
    },
    {
      id: 2,
      name: "Organic Bananas",
      category: "Fruits",
      price: 80,
      unit: "bunch",
      stock: 5,
      status: "low-stock",
      description: "Organic bananas grown naturally",
      image: "/api/placeholder/200/200",
      delivery: ["Self-Delivery"],
    },
  ];

  const getStatusColor = (status) => {
    const colors = {
      "in-stock": "bg-green-100 text-green-600",
      "low-stock": "bg-yellow-100 text-yellow-600",
      "sold-out": "bg-red-100 text-red-600",
    };
    return colors[status] || "bg-gray-100 text-gray-600";
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Manage Produce</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          <Plus className="w-4 h-4" />
          Add New Produce
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">Total Listings</p>
                <p className="text-2xl font-bold">{stats.totalListings}</p>
                <div className="flex items-center text-green-500 text-sm">
                  <ChevronUp className="w-4 h-4" />
                  <span>3 new this week</span>
                </div>
              </div>
              <ShoppingCart className="w-8 h-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">Available Stock</p>
                <p className="text-2xl font-bold">{stats.availableStock}</p>
                <div className="flex items-center text-green-500 text-sm">
                  <Check className="w-4 h-4" />
                  <span>Ready to sell</span>
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
                <p className="text-sm text-gray-500">Low Stock</p>
                <p className="text-2xl font-bold">{stats.lowStock}</p>
                <div className="flex items-center text-yellow-500 text-sm">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Needs attention</span>
                </div>
              </div>
              <AlertTriangle className="w-8 h-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">Sold Out</p>
                <p className="text-2xl font-bold">{stats.soldOut}</p>
                <div className="flex items-center text-red-500 text-sm">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Update stock</span>
                </div>
              </div>
              <Package className="w-8 h-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-[200px]">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search produce..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
            />
          </div>
        </div>
        <select
          className="px-4 py-2 border rounded-lg"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
          <option value="vegetables">Vegetables</option>
          <option value="fruits">Fruits</option>
          <option value="grains">Grains</option>
        </select>
      </div>

      {/* Produce Listings */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {produce.map((item) => (
          <Card key={item.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-0">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-4 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-lg">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.category}</p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${getStatusColor(
                      item.status
                    )}`}
                  >
                    {item.status
                      .split("-")
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(" ")}
                  </span>
                </div>

                <div className="space-y-2">
                  <p className="text-lg font-bold">
                    KSh {item.price}/{item.unit}
                  </p>
                  <p className="text-sm text-gray-600">{item.description}</p>
                  <p className="text-sm">
                    Stock: {item.stock} {item.unit}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button className="flex-1 px-3 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="flex-1 px-3 py-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200">
                    <Package className="w-4 h-4" />
                  </button>
                  <button className="flex-1 px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200">
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <button className="flex-1 px-3 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add New Produce Button (Mobile) */}
      <button className="fixed bottom-6 right-6 md:hidden p-4 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700">
        <Plus className="w-6 h-6" />
      </button>
    </div>
  );
};

export default ProduceManagement;
