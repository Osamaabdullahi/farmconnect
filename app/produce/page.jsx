"use client";

import React, { useState } from "react";
import {
  Star,
  MapPin,
  Clock,
  Filter,
  Grid,
  List,
  Search,
  ChevronDown,
  Check,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
} from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

const ProduceListings = () => {
  const [viewType, setViewType] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 12;
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
    // Additional items for demo
    ...Array.from({ length: 22 }, (_, i) => ({
      id: i + 3,
      title: `Product ${i + 3}`,
      description: "Fresh local produce",
      image:
        "https://i.pinimg.com/474x/a3/4f/7a/a34f7a196a6a61f60a0ea832154ea687.jpg",
      price: (Math.random() * 50 + 10).toFixed(2),
      unit: "kg",
      farm: `Farm ${i + 3}`,
      verified: Math.random() > 0.5,
      location: "California",
      rating: (Math.random() * 1 + 4).toFixed(1),
      reviews: Math.floor(Math.random() * 200 + 50),
      deliveryTime: "2-3 days",
      stock: Math.random() > 0.3 ? "In Stock" : "Limited Stock",
      organic: Math.random() > 0.5,
      category: ["vegetables", "fruits", "grains"][
        Math.floor(Math.random() * 3)
      ],
    })),
  ];

  const totalPages = Math.ceil(produce.length / itemsPerPage);
  const currentItems = produce.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setLoading(true);
    setCurrentPage(page);
    setTimeout(() => setLoading(false), 500);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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

      <div className={`flex-1 ${isListView ? "flex flex-col" : ""}`}>
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

        {/* <CardFooter className="p-4 pt-0 mt-auto">
          <button className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            Request Quote
          </button>
        </CardFooter> */}
      </div>
    </Card>
  );

  const PaginationButton = ({ page, active, disabled, children, onClick }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        min-w-[2.5rem] h-10 flex items-center justify-center px-3
        text-sm font-medium transition-colors
        ${
          active
            ? "bg-green-50 text-green-600 border-b-2 border-green-600"
            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
        }
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
      `}
    >
      {children}
    </button>
  );

  const renderPaginationButtons = () => {
    const buttons = [];

    // Previous button
    buttons.push(
      <PaginationButton
        key="prev"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft size={18} />
      </PaginationButton>
    );

    // First page
    buttons.push(
      <PaginationButton
        key={1}
        page={1}
        active={currentPage === 1}
        onClick={() => handlePageChange(1)}
      >
        1
      </PaginationButton>
    );

    // Left ellipsis
    if (currentPage > 3) {
      buttons.push(
        <span key="left-ellipsis" className="px-2 text-gray-400">
          <MoreHorizontal size={18} />
        </span>
      );
    }

    // Current page and surrounding pages
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      if (i === 1 || i === totalPages) continue;
      buttons.push(
        <PaginationButton
          key={i}
          page={i}
          active={currentPage === i}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </PaginationButton>
      );
    }

    // Right ellipsis
    if (currentPage < totalPages - 2) {
      buttons.push(
        <span key="right-ellipsis" className="px-2 text-gray-400">
          <MoreHorizontal size={18} />
        </span>
      );
    }

    // Last page
    if (totalPages > 1) {
      buttons.push(
        <PaginationButton
          key={totalPages}
          page={totalPages}
          active={currentPage === totalPages}
          onClick={() => handlePageChange(totalPages)}
        >
          {totalPages}
        </PaginationButton>
      );
    }

    // Next button
    buttons.push(
      <PaginationButton
        key="next"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRight size={18} />
      </PaginationButton>
    );

    return buttons;
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-white/80 flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent"></div>
        </div>
      )}

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

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-gray-600">
          Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
          {Math.min(currentPage * itemsPerPage, produce.length)} of{" "}
          {produce.length} products
        </p>
      </div>

      {/* Grid/List View */}
      <div
        className={`grid ${
          viewType === "grid"
            ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            : "grid-cols-1"
        } gap-6 mb-8`}
      >
        {currentItems.map((item) => (
          <ProduceCard
            key={item.id}
            item={item}
            isListView={viewType === "list"}
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center">
        <div className="flex items-center border rounded-lg overflow-hidden">
          {renderPaginationButtons()}
        </div>
      </div>
    </div>
  );
};

export default ProduceListings;
