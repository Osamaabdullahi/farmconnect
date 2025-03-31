"use client";

import React from "react";

interface Produce {
  id: number;
  name: string;
  price: string;
  image: string;
  farm: Farm;
}

interface Farm {
  name: string;
  location: string;
  distance: string;
}

const produceData = [
  {
    id: 1,
    name: "Tomatoes",
    price: "4.99",
    image:
      "https://i.pinimg.com/736x/60/84/ad/6084adda1b086f2afc463b160d2022f0.jpg",
    farm: {
      name: "Green Valley Organics",
      location: "Watsonville, CA",
      distance: "15",
    },
  },
  {
    id: 2,
    name: "Spinach",
    price: "3.49",
    image:
      "https://i.pinimg.com/474x/b1/43/f2/b143f2ae286352a37f24b8d78592aaf9.jpg",
    farm: {
      name: "Riverbed Farms",
      location: "Salinas, CA",
      distance: "22",
    },
  },
  {
    id: 3,
    name: "Corn",
    price: "0.99",
    image:
      "https://i.pinimg.com/474x/e9/25/15/e925154b39c7c0f9aebf870809e96eeb.jpg",
    farm: {
      name: "Sunshine Family Farm",
      location: "Gilroy, CA",
      distance: "28",
    },
  },
  {
    id: 4,
    name: "Carrots",
    price: "2.99",
    image:
      "https://i.pinimg.com/474x/b6/c7/5d/b6c75de307bcf0075896a0c03a7a20f4.jpg",
    farm: {
      name: "Terra Bella Farms",
      location: "Half Moon Bay, CA",
      distance: "12",
    },
  },
  {
    id: 5,
    name: "Strawberries",
    price: "5.99",
    image:
      "https://i.pinimg.com/474x/93/20/5d/93205da0ced89287e40a27c3b869f6b3.jpg",
    farm: {
      name: "Berry Good Farms",
      location: "Santa Cruz, CA",
      distance: "18",
    },
  },
  {
    id: 6,
    name: "Kale",
    price: "2.99",
    image:
      "https://i.pinimg.com/474x/7f/5c/4e/7f5c4e9e0b34530453e6a48f49fa4237.jpg",
    farm: {
      name: "Mountain View Organics",
      location: "Morgan Hill, CA",
      distance: "25",
    },
  },
  {
    id: 7,
    name: "Cucumbers",
    price: "3.49",
    image:
      "https://i.pinimg.com/474x/9a/27/95/9a2795bd906a6a623f57365bd6719ef0.jpg",
    farm: {
      name: "Fresh Fields Farm",
      location: "Pescadero, CA",
      distance: "30",
    },
  },
  {
    id: 8,
    name: "Peas",
    price: "4.49",
    image:
      "https://i.pinimg.com/474x/51/71/27/51712709f5520554645ebdee3a2dfef0.jpg",
    farm: {
      name: "Valley Green Farms",
      location: "San Martin, CA",
      distance: "20",
    },
  },
];

const ProduceShowcase = () => {
  return (
    <section className="relative bg-gradient-to-b from-green-50 to-white py-16 lg:py-24">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <svg
          className="absolute left-0 top-0 h-48 w-48 -translate-x-1/2 -translate-y-1/2 text-green-50"
          fill="currentColor"
          viewBox="0 0 100 100"
        >
          <circle cx="50" cy="50" r="50" />
        </svg>
        <svg
          className="absolute right-0 top-1/3 h-64 w-64 translate-x-1/3 text-green-50"
          fill="currentColor"
          viewBox="0 0 100 100"
        >
          <circle cx="50" cy="50" r="50" />
        </svg>
      </div>

      {/* Content Container */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="text-base font-semibold uppercase tracking-wide text-green-600">
            Fresh from Local Farms
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Direct from Farm to Business
          </p>
          <p className="mt-4 text-lg text-gray-600">
            Connect directly with local farmers and access premium quality
            produce at fair prices. Every product showcased here represents a
            direct partnership between farmers and businesses, ensuring
            transparency and value for everyone.
          </p>
        </div>

        {/* Stats */}
        <div className="mb-16 grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { label: "Partner Farms", value: "150+" },
            { label: "Business Clients", value: "450+" },
            { label: "Counties Served", value: "12" },
            { label: "Average Farm Distance", value: "25 mi" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-lg bg-white p-6 text-center shadow-sm"
            >
              <p className="text-2xl font-bold text-green-600">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Produce List */}
        <ProduceList produceItems={produceData} />

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-base text-gray-600">
            Ready to transform your supply chain?
          </p>
          <a
            href="/register"
            className="mt-4 inline-flex items-center justify-center rounded-lg bg-green-600 px-6 py-3 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Join FarmConnect Today
          </a>
        </div>
      </div>
    </section>
  );
};

interface ProduceCardProps {
  produce: Produce;
}

const ProduceCard: React.FC<ProduceCardProps> = ({ produce }) => {
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-white">
      {/* Main Image Container with Overlay */}
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={produce.image}
          alt={produce.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {/* Hover Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-6 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <p className="text-sm text-white/90 line-clamp-3">
            Sustainably grown at {produce.farm.name} in {produce.farm.location}.
            {produce.farm.distance &&
              ` Just ${produce.farm.distance} miles from you.`}
          </p>
        </div>
      </div>

      {/* Farm Info */}
      <div className="absolute left-4 right-4 top-4 flex flex-col gap-2">
        <div className="flex items-start justify-between">
          <div className="backdrop-blur-md bg-white/90 rounded-lg px-3 py-1.5">
            <h3 className="text-lg font-medium text-gray-900">
              {produce.name}
            </h3>
          </div>

          <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-800">
            In Season
          </span>
        </div>

        <div className="w-fit backdrop-blur-md bg-white/90 rounded-lg px-3 py-1.5 flex items-center gap-2">
          <svg
            className="w-4 h-4 text-amber-700"
            fill="none"
            strokeWidth="2"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20.893 13.393l-1.135-1.135a2.252 2.252 0 01-.421-.585l-1.08-2.16a.414.414 0 00-.663-.107.827.827 0 01-.812.21l-1.273-.363a.89.89 0 00-.738 1.595l.587.39c.59.395.674 1.23.172 1.732l-.2.2c-.212.212-.33.498-.33.796v.41c0 .409-.11.809-.32 1.158l-1.315 2.191a2.11 2.11 0 01-1.81 1.025 1.055 1.055 0 01-1.055-1.055v-1.172c0-.92-.56-1.747-1.414-2.089l-.655-.261a2.25 2.25 0 01-1.383-2.46l.007-.042a2.25 2.25 0 01.29-.787l.09-.15a2.25 2.25 0 012.37-1.048l1.178.236a1.125 1.125 0 001.302-.795l.208-.73a1.125 1.125 0 00-.578-1.315l-.665-.332-.091.091a2.25 2.25 0 01-1.591.659h-.18c-.249 0-.487.1-.662.274a.931.931 0 01-1.458-1.137l1.411-2.353a2.25 2.25 0 00.286-.76m11.928 9.869A9 9 0 008.965 3.525m11.928 9.868A9 9 0 118.965 3.525"
            />
          </svg>
          <span className="text-sm font-medium text-gray-800">
            {produce.farm.name}
          </span>
        </div>
      </div>

      {/* Price Tag */}
      <div className="absolute bottom-4 right-4 rounded-lg bg-white/90 px-3 py-1.5 backdrop-blur-md">
        <span className="font-medium text-gray-900">
          ${produce.price}
          <span className="text-sm text-gray-500">/lb</span>
        </span>
      </div>
    </div>
  );
};

interface ProduceListProps {
  produceItems: Produce[];
}

// ProduceList Component
const ProduceList: React.FC<ProduceListProps> = ({ produceItems }) => {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {produceItems.map((item) => (
        <ProduceCard key={item.id} produce={item} />
      ))}
    </div>
  );
};

export default ProduceShowcase;
