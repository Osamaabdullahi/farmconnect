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
  User,
} from "lucide-react";

import DashboardOverview from "./DashboardOverview";
import BrowseProducts from "./BrowseProducts";
import OrderHistory from "./OrderHistory";
import Notifications from "./Notifications";
import Profile from "./Profile";
import Settingss from "./Settingss";
import PaymentsInvoices from "./PaymentsInvoices";
import CreateProduceForm from "@/app/one/page";
import Navbar from "../Navbar";

const BusinessDashboard = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    { id: "browse", label: "Produce", icon: <ShoppingBasket size={20} /> },
    { id: "orders", label: "Orders", icon: <ClipboardList size={20} /> },
    { id: "payments", label: "Payments", icon: <DollarSign size={20} /> },
    { id: "notifications", label: "Notifications", icon: <Bell size={20} /> },
    { id: "profile", label: "Profile", icon: <User size={20} /> },
    { id: "settings", label: "Settings", icon: <Settings size={20} /> },
  ];

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardOverview />;
      case "browse":
        return <BrowseProducts setActiveSection={setActiveSection} />;
      case "orders":
        return <OrderHistory />;
      case "payments":
        return <PaymentsInvoices />;
      case "notifications":
        return <Notifications />;
      case "profile":
        return <Profile />;
      case "settings":
        return <Settingss />;
      case "add":
        return <CreateProduceForm />;

      default:
        return <DashboardOverview />;
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex h-screen overflow-hidden bg-gray-50 pt-24">
        {/* Sidebar */}
        <div
          className={`fixed top-0 left-0 h-full ${
            sidebarOpen ? "w-64" : "w-20"
          } bg-white border-r border-gray-200 transition-all duration-300 flex flex-col`}
        >
          {/* Logo and collapse button */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            {sidebarOpen && (
              <div className="text-xl font-bold text-green-600">
                FarmConnect
              </div>
            )}
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-lg hover:bg-gray-100 text-gray-500"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {/* User profile */}
          <div className="p-4 border-b border-gray-200 flex items-center">
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-green-600 font-semibold">
              {/* RC */}
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-lg hover:bg-gray-100 text-gray-500"
              >
                {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
            {sidebarOpen && (
              <div className="ml-3">
                <p className="text-sm font-medium">Green Valley Farm</p>
                <p className="text-xs text-gray-500">Premium Buyer</p>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex-1 py-4 overflow-y-auto">
            <ul className="space-y-2 px-2">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveSection(item.id)}
                    className={`flex items-center ${
                      sidebarOpen ? "justify-start" : "justify-center"
                    } w-full p-3 rounded-lg transition-colors ${
                      activeSection === item.id
                        ? "bg-indigo-50 text-green-600"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <span className="flex-shrink-0">{item.icon}</span>
                    {sidebarOpen && (
                      <span className="ml-3 text-sm font-medium">
                        {item.label}
                      </span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Version info */}
          {/* {sidebarOpen && (
          <div className="p-4 border-t border-gray-200">
            <p className="text-xs text-gray-500">FoodConnect v2.4.1</p>
          </div>
        )} */}
        </div>

        {/* Main content area */}
        <div
          className={`flex-1 h-screen overflow-y-auto transition-all duration-300 ${
            sidebarOpen ? "ml-64" : "ml-20"
          } p-6`}
        >
          {renderContent()}
        </div>
      </div>
    </>
  );
};

export default BusinessDashboard;
