"use client";
import React from "react";
import { Settings } from "lucide-react";

const Settingss = () => (
  <div className="h-full flex items-center justify-center">
    <div className="text-center">
      <Settings size={48} className="mx-auto text-gray-400" />
      <h2 className="mt-4 text-xl font-semibold text-gray-700">Settings</h2>
      <p className="mt-2 text-gray-500 max-w-md">
        Configure your account settings, preferences, and permissions.
      </p>
    </div>
  </div>
);

export default Settingss;
