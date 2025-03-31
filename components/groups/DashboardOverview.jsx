"use client";

import React, { useState } from "react";
import {
  LayoutDashboard,
  ShoppingBasket,
  ClipboardList,
  DollarSign,
  Bell,
  Settings,
  Menu,
  X,
  ChevronRight,
  ArrowUpRight,
  TrendingUp,
  TrendingDown,
  Calendar,
  Clock,
  User,
} from "lucide-react";

const DashboardOverview = () => {
  const stats = [
    { title: "Total Orders", value: "124", change: "+12%", trend: "up" },
    { title: "Monthly Spend", value: "$4,285", change: "-3%", trend: "down" },
    { title: "Active Suppliers", value: "8", change: "+1", trend: "up" },
    { title: "Order Fulfillment", value: "98%", change: "+2%", trend: "up" },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-500">
                {stat.title}
              </h3>
              <span
                className={`flex items-center text-xs font-medium ${
                  stat.trend === "up" ? "text-green-500" : "text-red-500"
                }`}
              >
                {stat.change}
                {stat.trend === "up" ? (
                  <TrendingUp size={16} className="ml-1" />
                ) : (
                  <TrendingDown size={16} className="ml-1" />
                )}
              </span>
            </div>
            <p className="mt-3 text-2xl font-semibold">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Recent Activity and Upcoming Deliveries */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Recent Activity</h2>
            <button className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center">
              View all <ChevronRight size={16} />
            </button>
          </div>
          <div className="space-y-4">
            {[
              {
                action: "Order #3842 has been delivered",
                time: "30 minutes ago",
              },
              { action: "New invoice #INV-2022 received", time: "2 hours ago" },
              { action: "Placed order for 15kg tomatoes", time: "5 hours ago" },
              { action: "Payment of $1,250 processed", time: "Yesterday" },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-start pb-4 border-b border-gray-100 last:border-0 last:pb-0"
              >
                <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center flex-shrink-0">
                  <Clock size={18} className="text-indigo-500" />
                </div>
                <div className="ml-4 flex-1">
                  <p className="text-sm font-medium">{item.action}</p>
                  <p className="text-xs text-gray-500 mt-1">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Deliveries */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Upcoming Deliveries</h2>
            <button className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center">
              Schedule <Calendar size={16} className="ml-1" />
            </button>
          </div>
          <div className="space-y-4">
            {[
              {
                supplier: "Fresh Farms",
                items: "Seasonal Vegetables",
                date: "Tomorrow, 8:00 AM",
              },
              {
                supplier: "Ocean Catch",
                items: "Fresh Seafood",
                date: "Mar 4, 10:30 AM",
              },
              {
                supplier: "Golden Grains",
                items: "Rice and Flour",
                date: "Mar 5, 2:00 PM",
              },
            ].map((delivery, index) => (
              <div
                key={index}
                className="flex p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
              >
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <ShoppingBasket size={18} className="text-green-600" />
                </div>
                <div className="ml-4 flex-1">
                  <div className="flex justify-between">
                    <p className="text-sm font-medium">{delivery.supplier}</p>
                    <span className="text-xs bg-indigo-50 text-indigo-600 py-1 px-2 rounded-full">
                      Confirmed
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{delivery.items}</p>
                  <p className="text-xs font-medium mt-2 flex items-center text-gray-600">
                    <Calendar size={14} className="mr-1" /> {delivery.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trending Products */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">Trending Products</h2>
          <button className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center">
            Explore more <ArrowUpRight size={16} className="ml-1" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              name: "Organic Avocados",
              price: "$2.99/ea",
              trend: "+24%",
              img: "/api/placeholder/96/96",
            },
            {
              name: "Fresh Berries Mix",
              price: "$4.50/lb",
              trend: "+18%",
              img: "/api/placeholder/96/96",
            },
            {
              name: "Local Farm Eggs",
              price: "$5.25/dozen",
              trend: "+12%",
              img: "/api/placeholder/96/96",
            },
          ].map((product, index) => (
            <div
              key={index}
              className="flex items-center p-4 rounded-lg border border-gray-100 hover:border-indigo-100 hover:bg-indigo-50/10 transition-colors cursor-pointer"
            >
              <img
                src={product.img}
                alt={product.name}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="ml-4">
                <h3 className="text-sm font-medium">{product.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{product.price}</p>
                <span className="text-xs text-green-500 font-medium flex items-center mt-2">
                  {product.trend} <TrendingUp size={14} className="ml-1" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
