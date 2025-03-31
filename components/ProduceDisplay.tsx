"use client";

import React, { useState } from "react";
import {
  Star,
  MapPin,
  Clock,
  Filter,
  ShoppingCart,
  Grid,
  List,
  Search,
  ChevronDown,
  Check,
} from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

const ProduceListings = () => {
  const [viewType, setViewType] = useState("grid");
  const [cartItems, setCartItems] = useState(0);
  const [activeFilters, setActiveFilters] = useState({
    category: "all",
    priceRange: "all",
    location: "all",
    organic: "all",
    sortBy: "recommended",
  });

  // Sample produce data
  const produce = [
    {
      id: 1,
      title: "Organic Tomatoes",
      description: "Freshly picked vine-ripened tomatoes",
      image:
        "https://i.pinimg.com/474x/a3/4f/7a/a34f7a196a6a61f60a0ea832154ea687.jpg",
      price: 24.99,
      unit: "crate",
      farm: "Green Valley Farms",
      verified: true,
      location: "Sacramento, CA",
      rating: 4.8,
      reviews: 156,
      deliveryTime: "2 days",
      stock: "In Stock",
      organic: true,
      category: "vegetables",
    },
    {
      id: 2,
      title: "Fresh Strawberries",
      description: "Sweet and juicy, perfect for restaurants",
      image:
        "https://i.pinimg.com/474x/d6/5d/59/d65d599b194666c0d1c86438c74870b4.jpg",
      price: 34.99,
      unit: "flat",
      farm: "Berry Fields Forever",
      verified: true,
      location: "Watsonville, CA",
      rating: 4.9,
      reviews: 243,
      deliveryTime: "1 day",
      stock: "Limited Stock",
      organic: true,
      category: "fruits",
    },
  ];

  const FilterButton = ({ label, value, options, onChange }) => (
    <div className="relative group">
      <button className="px-4 py-2 border rounded-lg bg-white hover:bg-gray-50 flex items-center gap-2">
        {label}
        <ChevronDown size={16} />
      </button>
      <div
        className="absolute z-10 mt-2 w-48 bg-white border rounded-lg shadow-lg opacity-0 invisible 
                    group-hover:opacity-100 group-hover:visible transition-all duration-200"
      >
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center justify-between"
          >
            {option.label}
            {value === option.value && (
              <Check size={16} className="text-green-600" />
            )}
          </button>
        ))}
      </div>
    </div>
  );

  const ProduceCard = ({ item, isListView }) => (
    <Card className={`overflow-hidden group ${isListView ? "flex" : ""}`}>
      <div className={`relative ${isListView ? "w-1/4" : ""}`}>
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        <button
          className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-white rounded-full 
                         text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300
                         hover:bg-gray-100"
        >
          Quick View
        </button>
      </div>

      <div className={`flex-1 ${isListView ? "flex" : ""}`}>
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
            <span className="text-lg font-bold text-green-600">
              ${item.price}/{item.unit}
            </span>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">{item.farm}</span>
              {item.verified && (
                <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                  Verified
                </span>
              )}
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <MapPin size={16} />
                {item.location}
              </div>
              <div className="flex items-center gap-1">
                <Clock size={16} />
                {item.deliveryTime}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span
                className={`text-sm px-2 py-1 rounded-full ${
                  item.stock === "In Stock"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {item.stock}
              </span>
              <div className="flex items-center">
                <Star className="text-yellow-400 fill-yellow-400" size={16} />
                <span className="ml-1 text-sm font-medium">{item.rating}</span>
                <span className="text-sm text-gray-500 ml-1">
                  ({item.reviews})
                </span>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0">
          <div className="flex gap-2 w-full">
            {/* <button
              onClick={() => setCartItems((prev) => prev + 1)}
              className="flex-1 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Add to Cart
            </button> */}
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              Request Quote
            </button>
          </div>
        </CardFooter>
      </div>
    </Card>
  );

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header and Search */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-900">Fresh Produce</h1>
        <div className="relative w-full md:w-96">
          <input
            type="text"
            placeholder="Search produce..."
            className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-8">
        <FilterButton
          label="Category"
          value={activeFilters.category}
          options={[
            { label: "All Categories", value: "all" },
            { label: "Vegetables", value: "vegetables" },
            { label: "Fruits", value: "fruits" },
            { label: "Grains", value: "grains" },
            { label: "Dairy", value: "dairy" },
          ]}
          onChange={(value) =>
            setActiveFilters((prev) => ({ ...prev, category: value }))
          }
        />

        <FilterButton
          label="Price Range"
          value={activeFilters.priceRange}
          options={[
            { label: "All Prices", value: "all" },
            { label: "Under $25", value: "under25" },
            { label: "$25 - $50", value: "25-50" },
            { label: "$50 - $100", value: "50-100" },
            { label: "Over $100", value: "over100" },
          ]}
          onChange={(value) =>
            setActiveFilters((prev) => ({ ...prev, priceRange: value }))
          }
        />

        <FilterButton
          label="Location"
          value={activeFilters.location}
          options={[
            { label: "All Locations", value: "all" },
            { label: "Within 50 miles", value: "50miles" },
            { label: "Within 100 miles", value: "100miles" },
            { label: "Within 200 miles", value: "200miles" },
          ]}
          onChange={(value) =>
            setActiveFilters((prev) => ({ ...prev, location: value }))
          }
        />

        <FilterButton
          label="Type"
          value={activeFilters.organic}
          options={[
            { label: "All Types", value: "all" },
            { label: "Organic Only", value: "organic" },
            { label: "Non-Organic", value: "non-organic" },
          ]}
          onChange={(value) =>
            setActiveFilters((prev) => ({ ...prev, organic: value }))
          }
        />

        <FilterButton
          label="Sort By"
          value={activeFilters.sortBy}
          options={[
            { label: "Recommended", value: "recommended" },
            { label: "Price: Low to High", value: "price-asc" },
            { label: "Price: High to Low", value: "price-desc" },
            { label: "Best Rating", value: "rating" },
            { label: "Most Recent", value: "recent" },
          ]}
          onChange={(value) =>
            setActiveFilters((prev) => ({ ...prev, sortBy: value }))
          }
        />

        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={() => setViewType("grid")}
            className={`p-2 rounded ${
              viewType === "grid"
                ? "bg-green-100 text-green-600"
                : "bg-gray-100"
            }`}
          >
            <Grid size={20} />
          </button>
          <button
            onClick={() => setViewType("list")}
            className={`p-2 rounded ${
              viewType === "list"
                ? "bg-green-100 text-green-600"
                : "bg-gray-100"
            }`}
          >
            <List size={20} />
          </button>
        </div>
      </div>

      {/* Products Grid/List */}
      <div
        className={`grid ${
          viewType === "grid"
            ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            : "grid-cols-1"
        } gap-6 mb-8`}
      >
        {produce.map((item) => (
          <ProduceCard
            key={item.id}
            item={item}
            isListView={viewType === "list"}
          />
        ))}
      </div>

      {/* Floating Cart */}
      {cartItems > 0 && (
        <div className="fixed bottom-6 right-6">
          <button className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 transition-colors">
            <ShoppingCart size={20} />
            <span className="font-medium">Cart ({cartItems})</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default ProduceListings;
