"use client";

import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  Truck,
  Store,
  Sprout,
  Leaf,
  CreditCard,
  Zap,
  ShieldCheck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function HowItWorks() {
  const [activeTab, setActiveTab] = useState("farmers");

  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-b from-green-50 to-white min-h-screen pt-16">
        {/* Hero Section */}
        <section className="py-16 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-green-800 mb-6">
              How FarmConnect Works
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Connecting farmers directly with businesses for fresher produce
              and fairer prices, without the middlemen.
            </p>
          </div>

          {/* Value Proposition Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="border-green-100 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Leaf className="text-green-600 w-6 h-6" />
                </div>
                <CardTitle>Direct Farm-to-Business</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Eliminate middlemen and connect directly with verified
                  partners for better margins and fresher produce.
                </p>
              </CardContent>
            </Card>

            <Card className="border-green-100 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Zap className="text-green-600 w-6 h-6" />
                </div>
                <CardTitle>Streamlined Logistics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Integrated delivery services handle transportation, solving
                  the logistics challenge for farmers and businesses.
                </p>
              </CardContent>
            </Card>

            <Card className="border-green-100 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <CreditCard className="text-green-600 w-6 h-6" />
                </div>
                <CardTitle>Secure, Fast Payments</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Receive instant payments via Mobile Money and Bank Transfers,
                  eliminating payment delays.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* User Journey Tabs */}
          <Tabs
            defaultValue="farmers"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full max-w-5xl mx-auto"
          >
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="farmers" className="text-base py-3">
                <Sprout className="w-5 h-5 mr-2" />
                For Farmers
              </TabsTrigger>
              <TabsTrigger value="businesses" className="text-base py-3">
                <Store className="w-5 h-5 mr-2" />
                For Businesses
              </TabsTrigger>
              <TabsTrigger value="logistics" className="text-base py-3">
                <Truck className="w-5 h-5 mr-2" />
                For Logistics
              </TabsTrigger>
            </TabsList>

            {/* Farmers Tab Content */}
            <TabsContent value="farmers" className="mt-0">
              <Card className="border-green-100">
                <CardHeader>
                  <CardTitle className="text-2xl text-green-700">
                    How Farmers Use FarmConnect
                  </CardTitle>
                  <CardDescription>
                    Get your produce directly to businesses with fair prices and
                    less hassle
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    {[
                      {
                        step: 1,
                        title: "Create Your Account",
                        description:
                          "Sign up, verify your identity, and list your farm details including location and produce types.",
                        icon: <ShieldCheck className="text-green-600" />,
                      },
                      {
                        step: 2,
                        title: "List Your Produce",
                        description:
                          "Add available produce with details on quantity, quality, price, and harvest dates.",
                        icon: <Leaf className="text-green-600" />,
                      },
                      {
                        step: 3,
                        title: "Receive Orders",
                        description:
                          "Get notified when businesses place orders for your produce.",
                        icon: <Store className="text-green-600" />,
                      },
                      {
                        step: 4,
                        title: "Arrange Delivery",
                        description:
                          "Confirm orders and arrange pickup with our logistics partners directly through the app.",
                        icon: <Truck className="text-green-600" />,
                      },
                      {
                        step: 5,
                        title: "Get Paid Instantly",
                        description:
                          "Receive payment as soon as the buyer confirms delivery via Mobile Money or Bank Transfer.",
                        icon: <CreditCard className="text-green-600" />,
                      },
                    ].map((item) => (
                      <div key={item.step} className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                          {item.icon}
                        </div>
                        <div>
                          <h3 className="text-lg font-medium flex items-center">
                            <span className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center text-sm mr-3">
                              {item.step}
                            </span>
                            {item.title}
                          </h3>
                          <p className="text-gray-600 mt-1">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Businesses Tab Content */}
            <TabsContent value="businesses" className="mt-0">
              <Card className="border-green-100">
                <CardHeader>
                  <CardTitle className="text-2xl text-green-700">
                    How Businesses Use FarmConnect
                  </CardTitle>
                  <CardDescription>
                    Source fresh produce directly from local farmers for your
                    restaurant, grocery store, or food manufacturing
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    {[
                      {
                        step: 1,
                        title: "Sign Up & Verify",
                        description:
                          "Create an account and verify your business details to access our marketplace.",
                        icon: <ShieldCheck className="text-green-600" />,
                      },
                      {
                        step: 2,
                        title: "Browse Local Produce",
                        description:
                          "Search for available produce from local farmers filtered by type, distance, and quality ratings.",
                        icon: <Leaf className="text-green-600" />,
                      },
                      {
                        step: 3,
                        title: "Place Orders",
                        description:
                          "Select the produce you need, specify quantities, and choose your preferred delivery date.",
                        icon: <CheckCircle className="text-green-600" />,
                      },
                      {
                        step: 4,
                        title: "Track Delivery",
                        description:
                          "Monitor your order's journey in real-time from farm to your business location.",
                        icon: <Truck className="text-green-600" />,
                      },
                      {
                        step: 5,
                        title: "Rate & Review",
                        description:
                          "Provide feedback on produce quality and service to help maintain high standards.",
                        icon: <CreditCard className="text-green-600" />,
                      },
                    ].map((item) => (
                      <div key={item.step} className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                          {item.icon}
                        </div>
                        <div>
                          <h3 className="text-lg font-medium flex items-center">
                            <span className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center text-sm mr-3">
                              {item.step}
                            </span>
                            {item.title}
                          </h3>
                          <p className="text-gray-600 mt-1">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Logistics Tab Content */}
            <TabsContent value="logistics" className="mt-0">
              <Card className="border-green-100">
                <CardHeader>
                  <CardTitle className="text-2xl text-green-700">
                    How Logistics Partners Use FarmConnect
                  </CardTitle>
                  <CardDescription>
                    Provide crucial transportation services connecting farmers
                    with businesses
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    {[
                      {
                        step: 1,
                        title: "Register as a Delivery Partner",
                        description:
                          "Sign up, add your vehicle details, and verify your identity to become a delivery partner.",
                        icon: <ShieldCheck className="text-green-600" />,
                      },
                      {
                        step: 2,
                        title: "Accept Transport Requests",
                        description:
                          "Receive and accept delivery requests from farmers based on your location and schedule.",
                        icon: <CheckCircle className="text-green-600" />,
                      },
                      {
                        step: 3,
                        title: "Pick Up & Deliver Produce",
                        description:
                          "Collect produce from farmers and deliver it safely to the business location.",
                        icon: <Truck className="text-green-600" />,
                      },
                      {
                        step: 4,
                        title: "Confirm Delivery",
                        description:
                          "Get delivery confirmation from businesses through the app to complete the process.",
                        icon: <Store className="text-green-600" />,
                      },
                      {
                        step: 5,
                        title: "Receive Payment",
                        description:
                          "Get paid automatically for each successful delivery via Mobile Money or Bank Transfer.",
                        icon: <CreditCard className="text-green-600" />,
                      },
                    ].map((item) => (
                      <div key={item.step} className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                          {item.icon}
                        </div>
                        <div>
                          <h3 className="text-lg font-medium flex items-center">
                            <span className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center text-sm mr-3">
                              {item.step}
                            </span>
                            {item.title}
                          </h3>
                          <p className="text-gray-600 mt-1">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>

        {/* Testimonials Section */}
        <section className="bg-green-50 py-16 px-4 md:px-8 lg:px-16">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-green-800 mb-12">
              Success Stories
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "John Mwangi",
                  role: "Small-scale Farmer, Nakuru",
                  quote:
                    "Since joining FarmConnect, I've increased my income by 40% by selling directly to restaurants in Nairobi without middlemen.",
                  image: "/api/placeholder/80/80",
                },
                {
                  name: "Sarah Ochieng",
                  role: "Restaurant Owner, Mombasa",
                  quote:
                    "FarmConnect has transformed how we source produce. We get fresher ingredients at better prices, and our customers notice the difference.",
                  image: "/api/placeholder/80/80",
                },
                {
                  name: "David Kimani",
                  role: "Logistics Partner, Kisumu",
                  quote:
                    "As a delivery driver, FarmConnect provides me with consistent work connecting farmers to businesses. The app makes scheduling and payments simple.",
                  image: "/api/placeholder/80/80",
                },
              ].map((testimonial, index) => (
                <Card key={index} className="border-green-100 shadow-md">
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="relative w-20 h-20 rounded-full overflow-hidden mb-4">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          width={80}
                          height={80}
                          className="object-cover"
                        />
                      </div>
                      <p className="text-gray-700 italic mb-4">
                        "{testimonial.quote}"
                      </p>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-gray-500">
                        {testimonial.role}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-green-800 mb-12">
            Frequently Asked Questions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                question: "How does FarmConnect ensure quality of produce?",
                answer:
                  "We implement a verification process for farmers and a rating system for businesses to provide feedback. This creates accountability and helps maintain high quality standards across the platform.",
              },
              {
                question: "What fees does FarmConnect charge?",
                answer:
                  "FarmConnect charges a small transaction fee on successful sales. Farmers still receive significantly more than through traditional channels, and businesses pay less than through conventional suppliers.",
              },
              {
                question: "How are delivery costs calculated?",
                answer:
                  "Delivery costs are calculated based on distance, volume, and weight. You'll see the exact delivery cost before confirming any order to ensure complete transparency.",
              },
              {
                question: "Is FarmConnect available in my region?",
                answer:
                  "FarmConnect is currently available in major agricultural regions with plans for rapid expansion. Create an account to check availability in your specific area.",
              },
              {
                question: "How does FarmConnect handle disputes?",
                answer:
                  "Our dedicated support team handles any disputes between farmers, businesses, and logistics partners. Our goal is fair resolution with clear documentation and communication.",
              },
              {
                question: "How can I get started with FarmConnect?",
                answer:
                  "Simply sign up using the button below, select your user type (farmer, business, or logistics), complete verification, and begin connecting directly with partners.",
              },
            ].map((faq, index) => (
              <Card key={index} className="border-green-100">
                <CardHeader>
                  <CardTitle className="text-lg text-green-700">
                    {faq.question}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-green-700 text-white py-16 px-4 md:px-8 lg:px-16">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              Ready to transform agricultural trade?
            </h2>
            <p className="text-lg mb-8">
              Join thousands of farmers, businesses, and logistics partners
              already benefiting from direct connections.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-green-700 hover:bg-green-50"
              >
                Sign Up Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-green-600"
              >
                Schedule a Demo
              </Button>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
