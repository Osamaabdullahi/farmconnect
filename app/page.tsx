"use client";

import Footer from "@/components/Footer";
import HeroSection from "@/components/homepage/HeroSection";
import ProduceShowcase from "@/components/homepage/produce";
import Testimonies from "@/components/homepage/testimonies";
import HowItWorks from "@/components/homepage/work";
import Navbar from "@/components/Navbar";
import React from "react";
import { Suspense } from "react";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Suspense>
        <Navbar />
        <HeroSection />
        <HowItWorks />
        <ProduceShowcase />
        <Testimonies />
        <Footer />
      </Suspense>
    </div>
  );
};

export default HomePage;
