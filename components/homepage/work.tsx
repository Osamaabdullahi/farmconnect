"use client";

import { useState } from "react";
import {
  Users,
  Package,
  DollarSign,
  Truck,
  Store,
  ArrowRight,
} from "lucide-react";

// Define type for tab keys
type TabKey = "farmers" | "business" | "logistics";

const tabs: { id: TabKey; label: string }[] = [
  { id: "farmers", label: "For Farmers" },
  { id: "business", label: "For Businesses" },
  { id: "logistics", label: "For Logistics Providers" },
];

// Define type for content
type Content = {
  [key in TabKey]: {
    icon: React.ElementType;
    title: string;
    description: string;
    steps: string[];
  }[];
};

// Define content with explicit type
const content: Content = {
  farmers: [
    {
      icon: Users,
      title: "List & Sell Produce",
      description: "Showcase your fresh produce to potential buyers.",
      steps: [
        "Receive orders from businesses.",
        "Compare prices from different buyers.",
        "Schedule pickup & get paid instantly.",
      ],
    },
    {
      icon: Package,
      title: "Order & Track",
      description: "Manage incoming orders and track shipments.",
      steps: [
        "Set delivery preferences.",
        "Get order notifications.",
        "Track deliveries in real-time.",
      ],
    },
    {
      icon: DollarSign,
      title: "Secure Payments",
      description: "Fast and secure transactions for your produce.",
      steps: [
        "Multiple payment methods.",
        "Instant order confirmations.",
        "Refunds and disputes management.",
      ],
    },
  ],
  business: [
    {
      icon: Store,
      title: "Find Quality Produce",
      description: "Source fresh farm products from verified farmers.",
      steps: [
        "Browse and compare prices.",
        "Place bulk orders easily.",
        "Schedule recurring deliveries.",
      ],
    },
    {
      icon: Package,
      title: "Order & Delivery",
      description: "Get farm produce delivered to your business.",
      steps: [
        "Set delivery schedules.",
        "Receive real-time tracking updates.",
        "Rate and review suppliers.",
      ],
    },
    {
      icon: DollarSign,
      title: "Flexible Payment Options",
      description: "Seamless payment solutions tailored for businesses.",
      steps: [
        "Credit & installment options.",
        "Instant invoices & receipts.",
        "Refund policies & purchase protection.",
      ],
    },
  ],
  logistics: [
    {
      icon: Truck,
      title: "Partner with Us",
      description: "Join as a delivery provider for fresh produce.",
      steps: [
        "Flexible work schedules.",
        "Choose your delivery zones.",
        "Earn per successful delivery.",
      ],
    },
    {
      icon: Package,
      title: "Track & Optimize",
      description: "Enhance logistics efficiency with real-time tracking.",
      steps: [
        "Monitor deliveries on the go.",
        "Reduce delivery times.",
        "Automated routing suggestions.",
      ],
    },
    {
      icon: DollarSign,
      title: "Fast & Secure Payments",
      description:
        "Receive quick and secure payments for completed deliveries.",
      steps: [
        "Instant payment processing.",
        "Bonuses for high-performance deliveries.",
        "Transparent earnings breakdown.",
      ],
    },
  ],
};

const HowItWorks = () => {
  const [activeTab, setActiveTab] = useState<TabKey>("farmers");

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          How FarmConnect Works
        </h2>

        <div className="flex justify-center space-x-6 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`px-6 py-2 text-lg font-medium rounded-full transition-colors ${
                activeTab === tab.id
                  ? "bg-green-600 text-white"
                  : "bg-white text-gray-700 border"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {content[activeTab].map(
            ({ icon: Icon, title, description, steps }) => (
              <div key={title} className="bg-white p-6 rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{title}</h3>
                <p className="text-gray-600 mb-4">{description}</p>
                <ul className="space-y-2">
                  {steps.map((step, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-2 text-gray-600"
                    >
                      <ArrowRight className="w-4 h-4 text-green-600" />
                      {step}
                    </li>
                  ))}
                </ul>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
