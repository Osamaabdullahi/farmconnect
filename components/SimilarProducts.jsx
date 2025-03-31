"use client";

import React, { useState, useEffect, useRef } from "react";
import { Star, ArrowRight, ArrowLeft, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import Link from "next/link";

const SimilarProducts = ({ category }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/produce`
        );
        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await res.json();

        // Filter products by category if provided
        const filteredProducts = category
          ? data.filter((product) => product.category === category)
          : data;

        setProducts(filteredProducts);
      } catch (err) {
        setError(err.message);
        toast.error("Error loading products!", {
          position: "top-right",
          style: { background: "#D32F2F", color: "white" },
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  const scrollContainer = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (loading)
    return <div className="mt-16 p-4">Loading similar products...</div>;
  if (error)
    return <div className="mt-16 p-4 text-red-500">Error: {error}</div>;
  if (!products || products.length === 0)
    return <div className="mt-16 p-4">No similar products available</div>;

  const sectionTitle = category ? `More ${category}` : "Similar Products";

  return (
    <div className="mt-16">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{sectionTitle}</h2>
          <p className="text-gray-600 mt-1">
            Products you might be interested in
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full"
            onClick={() => scrollContainer("left")}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full"
            onClick={() => scrollContainer("right")}
          >
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-4 snap-x scrollbar-none"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {products.map((product) => (
            <Card
              key={product.id}
              className="flex-none w-72 group h-[400px] flex flex-col"
            >
              <div className="relative h-40 flex-none">
                {product.images && product.images.length > 0 ? (
                  <img
                    src={product.images[0].url}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <p className="text-gray-500">No image</p>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center bg-black/40">
                  <Link href={`/details?id=${product.id}`}>
                    {" "}
                    <Button variant="secondary" className="mx-2 ">
                      Quick View
                    </Button>
                  </Link>
                </div>
              </div>

              <CardContent className="p-4 flex flex-col flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate">
                      {product.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <span className="text-sm font-medium truncate">
                        {product.farmer?.farm_name || "Unknown Farm"}
                      </span>
                      {product.farmer?.verification_id && (
                        <Badge
                          variant="secondary"
                          className="bg-green-100 text-green-800 flex-none"
                        >
                          <Check size={12} className="mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>
                  </div>
                  <span className="text-lg font-bold text-green-600 flex-none ml-2">
                    ${product.price_per_unit}/{product.unit_type}
                  </span>
                </div>

                <div className="flex-1 flex flex-col">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="ml-1 text-sm font-medium">4.0</span>
                      </div>
                      <span className="text-sm text-gray-500">(New)</span>
                      <Badge
                        variant={
                          product.available_stock > 0 ? "success" : "warning"
                        }
                        className="ml-auto text-xs"
                      >
                        {product.available_stock > 0
                          ? "In Stock"
                          : "Out of Stock"}
                      </Badge>
                    </div>

                    <p className="text-sm text-gray-600 line-clamp-2">
                      "{product.description}"
                    </p>
                  </div>

                  <div className="flex justify-end pt-4 mt-auto">
                    <Button
                      variant="outline"
                      onClick={() =>
                        (window.location.href = `/produce?id=${product.id}`)
                      }
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SimilarProducts;
