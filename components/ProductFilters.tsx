"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  ChevronDown,
  X,
  Filter,
  MapPin,
  Clock,
  Star,
} from "lucide-react";

const FilterPopover = ({ title, children, isOpen, onToggle, onClose }) => (
  <div className="relative">
    <Button
      variant={isOpen ? "secondary" : "outline"}
      onClick={onToggle}
      className="h-10"
    >
      {title}
      <ChevronDown className="ml-2 h-4 w-4" />
    </Button>

    {isOpen && (
      <>
        <div className="fixed inset-0 z-40" onClick={onClose} />
        <div className="absolute z-50 mt-2 p-4 bg-white rounded-lg shadow-lg min-w-[320px] border">
          {children}
        </div>
      </>
    )}
  </div>
);

const HorizontalFilters = () => {
  const [activePopover, setActivePopover] = useState(null);
  const [activeFilters, setActiveFilters] = useState({
    search: "",
    categories: [],
    priceRange: [0, 100],
    availability: [],
    location: "",
    organic: false,
    freshness: "",
    rating: "",
    delivery: "",
    sort: "recommended",
  });

  const categories = [
    "Vegetables",
    "Fruits",
    "Grains",
    "Dairy",
    "Herbs",
    "Mushrooms",
  ];

  const locations = [
    "Within 50 miles",
    "Within 100 miles",
    "Within 200 miles",
    "Nationwide",
  ];

  const deliveryOptions = ["Same Day", "Next Day", "2-3 Days", "3-5 Days"];

  const handleFilterChange = (type, value) => {
    setActiveFilters((prev) => {
      const newFilters = { ...prev };

      if (type === "categories") {
        if (newFilters[type].includes(value)) {
          newFilters[type] = newFilters[type].filter((item) => item !== value);
        } else {
          newFilters[type] = [...newFilters[type], value];
        }
      } else {
        newFilters[type] = value;
      }

      return newFilters;
    });
  };

  const clearFilters = () => {
    setActiveFilters({
      search: "",
      categories: [],
      priceRange: [0, 100],
      availability: [],
      location: "",
      organic: false,
      freshness: "",
      rating: "",
      delivery: "",
      sort: "recommended",
    });
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (activeFilters.categories.length)
      count += activeFilters.categories.length;
    if (activeFilters.location) count++;
    if (activeFilters.organic) count++;
    if (activeFilters.delivery) count++;
    if (activeFilters.priceRange[0] > 0 || activeFilters.priceRange[1] < 100)
      count++;
    return count;
  };

  return (
    <div className="w-full bg-white border-b sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4">
        {/* Main Filter Bar */}
        <div className="py-4 flex items-center gap-3">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search produce..."
              value={activeFilters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
              className="w-full pl-9 pr-4 h-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Category Filter */}
          <FilterPopover
            title="Categories"
            isOpen={activePopover === "categories"}
            onToggle={() =>
              setActivePopover(
                activePopover === "categories" ? null : "categories"
              )
            }
            onClose={() => setActivePopover(null)}
          >
            <div className="grid grid-cols-2 gap-2 min-w-[280px]">
              {categories.map((category) => (
                <label
                  key={category}
                  className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded"
                >
                  <input
                    type="checkbox"
                    checked={activeFilters.categories.includes(category)}
                    onChange={() => handleFilterChange("categories", category)}
                    className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                  <span>{category}</span>
                </label>
              ))}
            </div>
          </FilterPopover>

          {/* Location Filter */}
          <FilterPopover
            title={
              <div className="flex items-center">
                <MapPin className="mr-2 h-4 w-4" />
                Location
              </div>
            }
            isOpen={activePopover === "location"}
            onToggle={() =>
              setActivePopover(activePopover === "location" ? null : "location")
            }
            onClose={() => setActivePopover(null)}
          >
            <div className="space-y-2">
              {locations.map((location) => (
                <label
                  key={location}
                  className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded"
                >
                  <input
                    type="radio"
                    name="location"
                    value={location}
                    checked={activeFilters.location === location}
                    onChange={(e) =>
                      handleFilterChange("location", e.target.value)
                    }
                    className="text-green-600 focus:ring-green-500"
                  />
                  <span>{location}</span>
                </label>
              ))}
            </div>
          </FilterPopover>

          {/* Delivery Filter */}
          <FilterPopover
            title={
              <div className="flex items-center">
                <Clock className="mr-2 h-4 w-4" />
                Delivery
              </div>
            }
            isOpen={activePopover === "delivery"}
            onToggle={() =>
              setActivePopover(activePopover === "delivery" ? null : "delivery")
            }
            onClose={() => setActivePopover(null)}
          >
            <div className="space-y-2">
              {deliveryOptions.map((option) => (
                <label
                  key={option}
                  className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded"
                >
                  <input
                    type="radio"
                    name="delivery"
                    value={option}
                    checked={activeFilters.delivery === option}
                    onChange={(e) =>
                      handleFilterChange("delivery", e.target.value)
                    }
                    className="text-green-600 focus:ring-green-500"
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </FilterPopover>

          {/* Price Range Filter */}
          <FilterPopover
            title="Price"
            isOpen={activePopover === "price"}
            onToggle={() =>
              setActivePopover(activePopover === "price" ? null : "price")
            }
            onClose={() => setActivePopover(null)}
          >
            <div className="w-64 px-2">
              <Slider
                defaultValue={[0, 100]}
                max={100}
                step={1}
                value={activeFilters.priceRange}
                onValueChange={(value) =>
                  handleFilterChange("priceRange", value)
                }
                className="my-6"
              />
              <div className="flex justify-between text-sm text-gray-600">
                <span>${activeFilters.priceRange[0]}</span>
                <span>${activeFilters.priceRange[1]}</span>
              </div>
            </div>
          </FilterPopover>

          {/* More Filters Button */}
          <FilterPopover
            title={
              <div className="flex items-center">
                <Filter className="mr-2 h-4 w-4" />
                More Filters
                {getActiveFiltersCount() > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {getActiveFiltersCount()}
                  </Badge>
                )}
              </div>
            }
            isOpen={activePopover === "more"}
            onToggle={() =>
              setActivePopover(activePopover === "more" ? null : "more")
            }
            onClose={() => setActivePopover(null)}
          >
            <div className="space-y-4 min-w-[280px]">
              <div className="space-y-2">
                <h3 className="font-medium">Rating</h3>
                <div className="flex items-center gap-4">
                  {[4, 3, 2].map((rating) => (
                    <label key={rating} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="rating"
                        value={rating}
                        checked={activeFilters.rating === rating}
                        onChange={(e) =>
                          handleFilterChange("rating", Number(e.target.value))
                        }
                        className="text-green-600 focus:ring-green-500"
                      />
                      <span className="flex items-center">
                        {rating}+{" "}
                        <Star className="h-4 w-4 ml-1 fill-yellow-400 text-yellow-400" />
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Organic Only</h3>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={activeFilters.organic}
                    onCheckedChange={(checked) =>
                      handleFilterChange("organic", checked)
                    }
                  />
                  <span>Show only organic produce</span>
                </div>
              </div>
            </div>
          </FilterPopover>
        </div>

        {/* Active Filters */}
        {getActiveFiltersCount() > 0 && (
          <div className="pb-4 flex items-center gap-2 flex-wrap">
            {activeFilters.categories.map((category) => (
              <Badge key={category} variant="secondary" className="px-3 py-1">
                {category}
                <button
                  onClick={() => handleFilterChange("categories", category)}
                  className="ml-2"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
            {activeFilters.location && (
              <Badge variant="secondary" className="px-3 py-1">
                {activeFilters.location}
                <button
                  onClick={() => handleFilterChange("location", "")}
                  className="ml-2"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {activeFilters.delivery && (
              <Badge variant="secondary" className="px-3 py-1">
                {activeFilters.delivery}
                <button
                  onClick={() => handleFilterChange("delivery", "")}
                  className="ml-2"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {(activeFilters.priceRange[0] > 0 ||
              activeFilters.priceRange[1] < 100) && (
              <Badge variant="secondary" className="px-3 py-1">
                ${activeFilters.priceRange[0]} - ${activeFilters.priceRange[1]}
                <button
                  onClick={() => handleFilterChange("priceRange", [0, 100])}
                  className="ml-2"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {activeFilters.organic && (
              <Badge variant="secondary" className="px-3 py-1">
                Organic Only
                <button
                  onClick={() => handleFilterChange("organic", false)}
                  className="ml-2"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={clearFilters}
              className="text-sm"
            >
              Clear All
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HorizontalFilters;
