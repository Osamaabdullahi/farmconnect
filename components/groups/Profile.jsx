"use client";
import React, { useState, useEffect } from "react";
import useFarmConnectStore from "@/store";
import FarmerProfile from "./cards/Farmer";
import BusinessProfile from "./cards/Bussiness";
import LogisticsProfile from "./cards/Logistic";
import { toast } from "sonner";

function Profile() {
  const { user } = useFarmConnectStore();
  const [userProfiles, setuserProfiles] = useState(null);
  const [Error, setError] = useState("");
  const [Loading, setLoading] = useState(false);
  const [role, setrole] = useState(null);

  const FetchProfile = async () => {
    setLoading(true);
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/${user?.id}`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("data", data);

      setuserProfiles(data); // First, update userProfiles
      setrole(data.role); // Then, set role from fetched data
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    FetchProfile();
  }, [user]); // Removed `role` from dependencies to prevent infinite loops

  const handleSaveFarmerData = async (updatedData) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/farmers/${updatedData.farmer.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedData),
        }
      );

      if (!response.ok) throw new Error("Failed to update farmer");

      const data = await response.json();
      toast("update successfully", {
        position: "top-right",
        style: { background: "#4CAF50", color: "white" },
      });
    } catch (error) {
      console.error("Error updating farmer:", error);
      toast.error(`Error: ${error.message}`, {
        position: "top-right",
        style: { background: "#D32F2F", color: "white" },
      });
    }

    // Update the state with the new data
    setuserProfiles(updatedData);
  };

  const handleSaveBusinessData = async (updatedData) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/businesses/${updatedData.business.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedData),
        }
      );

      if (!response.ok) throw new Error("Failed to update business");

      const data = await response.json();
      toast("update successfully", {
        position: "top-right",
        style: { background: "#4CAF50", color: "white" },
      });
    } catch (error) {
      console.error("Error updating business:", error);
      toast.error(`Error: ${error.message}`, {
        position: "top-right",
        style: { background: "#D32F2F", color: "white" },
      });
    }
    setuserProfiles(updatedData);
  };

  const handleSaveLogisticsData = async (updatedData) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/logistics/${updatedData.logistics.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedData),
        }
      );

      if (!response.ok) throw new Error("Failed to update business");

      const data = await response.json();
      toast("update successfully", {
        position: "top-right",
        style: { background: "#4CAF50", color: "white" },
      });
    } catch (error) {
      console.error("Error updating business:", error);
      toast.error(`Error: ${error.message}`, {
        position: "top-right",
        style: { background: "#D32F2F", color: "white" },
      });
    }
    setuserProfiles(updatedData);
  };

  const RenderRoles = () => {
    if (Loading) return <div>Loading...</div>;
    if (!role) return <div>No role assigned</div>; // Prevent rendering if role is still null

    switch (role) {
      case "farmer":
        return (
          <div className="container mx-auto py-8">
            <FarmerProfile
              farmerData={userProfiles}
              onSave={handleSaveFarmerData}
            />
          </div>
        );

      case "business":
        return (
          <div className="container mx-auto py-8">
            <BusinessProfile
              businessData={userProfiles}
              onSave={handleSaveBusinessData}
            />
          </div>
        );

      case "logistics":
        return (
          <div className="container mx-auto py-8">
            <LogisticsProfile
              logisticsData={userProfiles}
              onSave={handleSaveLogisticsData}
            />
          </div>
        );

      default:
        return <div className="container mx-auto py-8">Invalid role</div>;
    }
  };

  return (
    <>
      {Loading ? (
        <div>loading......</div>
      ) : (
        <>{userProfiles && <RenderRoles />}</>
      )}
    </>
  );
}

export default Profile;
