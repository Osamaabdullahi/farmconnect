"use client";
import React, { useState } from "react";
import {
  Truck,
  ChevronRight,
  Leaf,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

function Features() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Why Choose FarmConnect?
          </h2>
          <p className="text-gray-600">
            Our platform brings together farmers, businesses, and logistics
            providers in one seamless ecosystem.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: <Leaf className="w-8 h-8 text-green-600" />,
              title: "Fresh & Direct",
              description:
                "Get produce directly from farms to your business, ensuring maximum freshness.",
            },
            {
              icon: <ShieldCheck className="w-8 h-8 text-green-600" />,
              title: "Quality Assured",
              description:
                "All farmers are verified and produce is quality checked before delivery.",
            },
            {
              icon: <TrendingUp className="w-8 h-8 text-green-600" />,
              title: "Fair Pricing",
              description:
                "Transparent pricing with no hidden fees or middleman markups.",
            },
            {
              icon: <Truck className="w-8 h-8 text-green-600" />,
              title: "Reliable Delivery",
              description:
                "Track your orders in real-time with our trusted delivery partners.",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl border hover:border-green-200 
            hover:shadow-lg transition-all group"
            >
              <div className="mb-6">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 mb-6">{feature.description}</p>
              <a
                href="#"
                className="inline-flex items-center text-green-600 font-medium 
              group-hover:gap-2 transition-all"
              >
                Learn More{" "}
                <ChevronRight
                  className="w-4 h-4 opacity-0 group-hover:opacity-100 
              transition-all"
                />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
