"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Users,
  Award,
  GanttChart,
  GlobeAfrica,
  SeedingIcon,
  CircleDollarSign,
  HandshakeIcon,
  Leaf,
  Briefcase,
  Heart,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AboutUs() {
  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-b from-green-50 to-white min-h-screen pt-16">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-green-800 opacity-80 z-0"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Our Mission at FarmConnect
              </h1>
              <p className="text-xl max-w-3xl mx-auto">
                Transforming agricultural trade by connecting farmers directly
                with businesses for a more sustainable, equitable, and efficient
                food system.
              </p>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent z-10"></div>
        </section>

        {/* Our Story Section */}
        <section className="py-16 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-green-800 mb-6">
                Our Story
              </h2>
              <div className="space-y-4">
                <p className="text-gray-700">
                  FarmConnect was born from a simple observation: small-scale
                  farmers were struggling to get fair prices for their produce,
                  while businesses were paying premium prices for
                  less-than-fresh food. The disconnect was clear, and the
                  solution became our mission.
                </p>
                <p className="text-gray-700">
                  Founded in 2023 by a team of agricultural experts and
                  technology innovators, FarmConnect set out to eliminate the
                  inefficiencies in the agricultural supply chain. Our founders
                  witnessed firsthand how middlemen created artificial barriers
                  between food producers and businesses, resulting in higher
                  costs and lower quality for everyone involved.
                </p>
                <p className="text-gray-700">
                  What began as a small pilot with 50 farmers and 10 restaurants
                  has grown into a thriving marketplace connecting thousands of
                  farmers with businesses across the region. Every transaction
                  represents our vision in action – creating a direct line
                  between those who grow our food and those who serve it.
                </p>
              </div>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden shadow-xl">
              <Image
                src="https://i.pinimg.com/474x/c1/09/34/c109349e647d961cbf6c9a2d610d939d.jpg"
                alt="Farmers working in field"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* Our Values Section */}
        <section className="py-16 bg-green-50 px-4 md:px-8 lg:px-16">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-green-800 mb-4">
                Our Values
              </h2>
              <p className="text-gray-700 max-w-3xl mx-auto">
                At FarmConnect, our values guide every decision we make and
                every feature we build. They represent our commitment to
                creating a better agricultural ecosystem.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <Leaf className="text-green-600 w-6 h-6" />,
                  title: "Sustainability",
                  description:
                    "We promote environmentally sustainable farming practices and shorter supply chains that reduce carbon footprints.",
                },
                {
                  icon: (
                    <div className="custom-icon">
                      <HandshakeIcon />
                    </div>
                  ),
                  title: "Fairness",
                  description:
                    "We believe in fair compensation for farmers and fair prices for businesses, creating value for everyone in the ecosystem.",
                },
                {
                  icon: <Users className="text-green-600 w-6 h-6" />,
                  title: "Community",
                  description:
                    "We build meaningful connections between food producers and food businesses to strengthen local economies.",
                },
                {
                  icon: <Award className="text-green-600 w-6 h-6" />,
                  title: "Quality",
                  description:
                    "We uphold the highest standards for food quality, ensuring businesses receive the freshest produce possible.",
                },
                {
                  icon: <Award className="text-green-600 w-6 h-6" />,
                  title: "Localism",
                  description:
                    "We prioritize local connections, reducing food miles and supporting regional food systems.",
                },
                {
                  icon: (
                    <div className="custom-icon">
                      <Award />
                    </div>
                  ),
                  title: "Innovation",
                  description:
                    "We continuously evolve our platform with new technologies that make agricultural trade more efficient.",
                },
              ].map((value, index) => (
                <Card key={index} className="border-green-100 h-full">
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                        {value.icon}
                      </div>
                      <h3 className="font-bold text-xl mb-2 text-green-700">
                        {value.title}
                      </h3>
                      <p className="text-gray-600">{value.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Impact Section */}
        <section className="py-16 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-green-800 mb-4">
              Our Impact
            </h2>
            <p className="text-gray-700 max-w-3xl mx-auto">
              We measure our success not just in transactions, but in how we're
              transforming lives and creating a more sustainable food system.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {[
              {
                number: "5,000+",
                title: "Farmers Empowered",
                icon: (
                  <div className="custom-icon">
                    <Award />
                  </div>
                ),
              },
              {
                number: "₹25M+",
                title: "Additional Farmer Income Generated",
                icon: <CircleDollarSign className="text-green-600 w-6 h-6" />,
              },
              {
                number: "1,200+",
                title: "Business Partners",
                icon: <Briefcase className="text-green-600 w-6 h-6" />,
              },
              {
                number: "30%",
                title: "Average Reduction in Food Waste",
                icon: <Leaf className="text-green-600 w-6 h-6" />,
              },
            ].map((stat, index) => (
              <Card key={index} className="border-green-100">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                      {stat.icon}
                    </div>
                    <h3 className="text-3xl font-bold text-green-700 mb-2">
                      {stat.number}
                    </h3>
                    <p className="text-gray-600">{stat.title}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-green-100 rounded-lg p-8 text-center">
            <h3 className="text-2xl font-bold text-green-800 mb-4">
              Sustainability Impact
            </h3>
            <p className="text-gray-700 mb-6 max-w-3xl mx-auto">
              By shortening the food supply chain, FarmConnect has helped reduce
              food miles and carbon emissions while improving food freshness and
              reducing waste.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                {
                  number: "45%",
                  title: "Reduction in Average Food Miles",
                },
                {
                  number: "12,000+",
                  title: "Tons of CO₂ Emissions Saved",
                },
                {
                  number: "35%",
                  title: "Increase in Shelf Life of Produce",
                },
              ].map((impact, index) => (
                <div key={index} className="flex flex-col items-center">
                  <h4 className="text-2xl font-bold text-green-700 mb-2">
                    {impact.number}
                  </h4>
                  <p className="text-gray-700">{impact.title}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-green-800 mb-4">Our Team</h2>
            <p className="text-gray-700 max-w-3xl mx-auto">
              The passionate individuals behind FarmConnect combine expertise in
              agriculture, technology, and business to transform how food moves
              from farm to table.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Priya Sharma",
                title: "Founder & CEO",
                bio: "Former agricultural economist with 15 years of experience working with small-scale farmers across India.",
                image: "/api/placeholder/300/300",
              },
              {
                name: "Raj Patel",
                title: "CTO",
                bio: "Technology innovator with previous experience building marketplace platforms for emerging markets.",
                image: "/api/placeholder/300/300",
              },
              {
                name: "Aisha Okafor",
                title: "Head of Farmer Relations",
                bio: "Agricultural extension specialist who has helped over 1,000 farmers adopt sustainable practices.",
                image: "/api/placeholder/300/300",
              },
              {
                name: "Michael Nguyen",
                title: "Head of Business Development",
                bio: "Former restaurant owner who understands the challenges of sourcing fresh, quality ingredients.",
                image: "/api/placeholder/300/300",
              },
            ].map((member, index) => (
              <Card key={index} className="border-green-100">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="relative w-32 h-32 rounded-full overflow-hidden mb-4">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h3 className="font-bold text-xl mb-1 text-green-700">
                      {member.name}
                    </h3>
                    <p className="text-green-600 font-medium mb-2">
                      {member.title}
                    </p>
                    <p className="text-gray-600">{member.bio}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Join Us CTA */}
        <section className="py-16 px-4 md:px-8 lg:px-16">
          <div className="max-w-7xl mx-auto">
            <div className="bg-green-700 rounded-xl text-white p-8 md:p-12 text-center">
              <h2 className="text-3xl font-bold mb-6">Join Our Mission</h2>
              <p className="text-xl max-w-3xl mx-auto mb-8">
                Whether you're a farmer looking for fair prices, a business
                seeking fresh produce, or a logistics provider wanting to make a
                difference, become part of the FarmConnect community today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-white text-green-700 hover:bg-green-50"
                >
                  Join as a Farmer
                </Button>
                <Button
                  size="lg"
                  className="bg-white text-green-700 hover:bg-green-50"
                >
                  Join as a Business
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-green-600"
                >
                  Partner With Us
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-green-800 mb-6">
                Get in Touch
              </h2>
              <p className="text-gray-700 mb-8">
                Have questions about FarmConnect? We'd love to hear from you.
                Reach out to our team and we'll get back to you as soon as
                possible.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-green-600"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-green-700">Phone</h3>
                    <p className="text-gray-600">+91 98765 43210</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-green-600"
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-green-700">Email</h3>
                    <p className="text-gray-600">info@farmconnect.com</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-green-600"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-green-700">Office</h3>
                    <p className="text-gray-600">
                      123 Tech Park, Kenya 560001, Nairobi
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <div className="relative w-full h-72 md:h-full rounded-lg overflow-hidden">
                <Image
                  src="/api/placeholder/600/500"
                  alt="Map location"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white p-4 rounded-lg shadow-lg text-center">
                    <p className="font-semibold text-green-700">
                      FarmConnect Headquarters
                    </p>
                    <p className="text-sm text-gray-600">
                      123 Tech Park, Nairobi
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
