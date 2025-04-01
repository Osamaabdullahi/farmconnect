"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  MapPin,
  MessageCircle,
  Share2,
  Heart,
  ChevronLeft,
  ChevronRight,
  Router,
} from "lucide-react";
import SimilarProducts from "@/components/SimilarProducts";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import useFarmConnectStore from "@/store";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";
import { Suspense } from "react";

const ProduceDetailPage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(0); // Will be updated with minimum order
  const search = useSearchParams();
  const produce_id = search.get("id");
  const { user } = useFarmConnectStore();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { addToCart } = useFarmConnectStore();
  const router = useRouter();

  const fetchProduce = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/produce/${produce_id}`
      );
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await res.json();
      setProduct(data);
      // Initialize quantity with minimum ordert
      setQuantity(data.minimum_order);
    } catch (err) {
      setError(err.message);
      toast.error("Error loading produce data!", {
        position: "top-right",
        style: { background: "#D32F2F", color: "white" },
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!produce_id) return; // Prevent fetching if ID is missing
    fetchProduce();
  }, [produce_id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!product) return <p>No product data available</p>;

  const HandleCart = (produce) => {
    if (!user) {
      router.push("sighin");
      return;
    }
    if (user.role == "farmer") {
      toast.error(`farmer cant buy produce`, {
        position: "top-right",
        style: { background: "#D32F2F", color: "white" },
      });
      return;
    }
    addToCart(produce);

    toast.success(`${produce.name} added tocart`, {
      position: "top-right",
      style: { background: "#4CAF50", color: "white" },
    });
  };

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Navbar />
        <div className="max-w-7xl mx-auto p-4  pt-24">
          {/* Main Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ">
            {/* Left Column - Images */}
            <div className="space-y-4">
              <div className="relative rounded-lg overflow-hidden bg-gray-100">
                {product.images && product.images.length > 0 ? (
                  <img
                    src={product.images[currentImageIndex].url}
                    alt={product.title}
                    className="w-full h-96 object-cover"
                  />
                ) : (
                  <div className="w-full h-96 bg-gray-200 flex items-center justify-center">
                    <p>No image available</p>
                  </div>
                )}
                {product.images && product.images.length > 1 && (
                  <>
                    <button
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg"
                      onClick={() =>
                        setCurrentImageIndex((prev) =>
                          prev > 0 ? prev - 1 : product.images.length - 1
                        )
                      }
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg"
                      onClick={() =>
                        setCurrentImageIndex(
                          (prev) => (prev + 1) % product.images.length
                        )
                      }
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>
                  </>
                )}
              </div>
              {product.images && product.images.length > 1 && (
                <div className="flex gap-2">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`w-20 h-20 rounded-lg overflow-hidden ${
                        idx === currentImageIndex ? "ring-2 ring-green-500" : ""
                      }`}
                    >
                      <img
                        src={img.url}
                        alt={`${product.title} ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Product Description</h2>

                <p className="text-gray-700">{product.description}</p>
              </div>
            </div>

            {/* Right Column - Product Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold">{product.title}</h1>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="secondary">{product.category}</Badge>
                  <Badge
                    variant="success"
                    className="bg-green-100 text-green-800"
                  >
                    Verified Farm
                  </Badge>
                </div>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold">
                  ${product.price_per_unit}
                </span>
                <span className="text-gray-600">per {product.unit_type}</span>
              </div>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <MapPin className="h-5 w-5 text-gray-400" />
                    <div>
                      <h3 className="font-medium">
                        {product.farmer.farm_name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {product.farmer.farm_location}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <span className="ml-1 font-medium">4.0</span>
                    </div>
                    <span className="text-sm text-gray-600">
                      No reviews yet
                    </span>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <label className="font-medium">
                    Quantity ({product.unit_type})
                  </label>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      onClick={() =>
                        setQuantity((prev) =>
                          Math.max(product.minimum_order, prev - 1)
                        )
                      }
                    >
                      -
                    </Button>
                    <span className="w-12 text-center">{quantity}</span>
                    <Button
                      variant="outline"
                      onClick={() => setQuantity((prev) => prev + 1)}
                    >
                      +
                    </Button>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  Minimum order: {product.minimum_order} {product.unit_type}
                </p>
                <p className="text-sm text-gray-600">
                  Available stock: {product.available_stock} {product.unit_type}
                </p>
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={() =>
                    HandleCart({
                      id: product.id,
                      name: product.title,
                      quantity: quantity,
                      price: product.price_per_unit,
                      seller: product.farmer.farm_name,
                      unit: product.unit_type,
                      image: product.images[0].url,
                    })
                  }
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  Add to Cart
                </Button>
                <Button variant="outline" className="px-4">
                  <Heart className="h-5 w-5" />
                </Button>
                <Button variant="outline" className="px-4">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Product Details</h2>
                {/* <p className="text-gray-700">{product.description}</p> */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium">Harvest Date</h3>
                    <p className="text-gray-600">
                      {new Date(product.harvest_date).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium">Delivery</h3>
                    <p className="text-gray-600">{product.delivery_options}</p>
                    <p className="text-gray-600">
                      {product.estimated_delivery}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Button
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2"
                >
                  <MessageCircle className="h-5 w-5" />
                  Chat with Seller
                </Button>
              </div>
            </div>
          </div>

          <SimilarProducts category={product.category} />
          <SimilarProducts category={"grains"} />
          <SimilarProducts category={"fruits"} />
        </div>
      </Suspense>
    </>
  );
};

export default ProduceDetailPage;
