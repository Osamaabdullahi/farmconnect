// // "use client";

// // import React, { useState } from "react";
// // import { ShoppingBasket } from "lucide-react";
// // // Empty placeholder components for other sections
// // const BrowseProducts = () => (
// //   <div className="h-full flex items-center justify-center">
// //     <div className="text-center">
// //       <ShoppingBasket size={48} className="mx-auto text-gray-400" />
// //       <h2 className="mt-4 text-xl font-semibold text-gray-700">
// //         Browse & Order Produce
// //       </h2>
// //       <p className="mt-2 text-gray-500 max-w-md">
// //         Browse fresh produce from local and national suppliers. Filter by
// //         category, price, or availability.
// //       </p>
// //     </div>
// //   </div>
// // );

// // export default BrowseProducts;

"use client";

import React, { useState, useEffect } from "react";
import {
  ShoppingBasket,
  Plus,
  Search,
  Filter,
  RefreshCw,
  Edit,
  Trash,
  Calendar,
  Truck,
  Package,
  DollarSign,
  Tag,
  Clock,
  ChevronDown,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
// import { DatePicker } from "@/components/ui/date-picker";
import axios from "axios";
import useFarmConnectStore from "@/store";
import { toast } from "sonner";

// Categories for filter and new produce form
const categories = [
  "Vegetables",
  "Fruits",
  "Dairy & Eggs",
  "Meat & Poultry",
  "Grains & Legumes",
  "Herbs & Spices",
  "Other",
];

// Unit types for dropdown
const unitTypes = [
  "kg",
  "lb",
  "bunch",
  "crate",
  "box",
  "dozen",
  "jar",
  "package",
  "piece",
];

// Delivery options
const deliveryOptions = ["Local Pickup", "Farm Delivery", "Shipping"];

const BrowseProducts = ({ setActiveSection }) => {
  const [produceItems, setProduceItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [viewMode, setViewMode] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState([0, 20]);
  const [showInStock, setShowInStock] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [newItem, setNewItem] = useState({
    title: "",
    description: "",
    category: "",
    images: [],
    price_per_unit: 0,
    unit_type: "kg",
    minimum_order: 1,
    available_stock: 0,
    harvest_date: new Date().toISOString().split("T")[0],
    delivery_options: "Local Pickup",
    estimated_delivery: "1-3 days",
  });
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isNewDialogOpen, setIsNewDialogOpen] = useState(false);
  const { user } = useFarmConnectStore();

  // Fetch produce items
  const fetchProduceItems = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/produce/user/${user.farmer?.id}`
      );
      setProduceItems(response.data);
      setFilteredItems(response.data);
    } catch (error) {
      console.error("Error fetching produce items:", error);
      // Optionally set an error state to show to the user
    } finally {
      setIsLoading(false);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchProduceItems();
  }, []);

  // Filter handler
  useEffect(() => {
    let results = produceItems;

    // Search term filter
    if (searchTerm) {
      results = results.filter(
        (item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory) {
      results = results.filter((item) => item.category === selectedCategory);
    }

    // Price range filter
    results = results.filter(
      (item) =>
        item.price_per_unit >= priceRange[0] &&
        item.price_per_unit <= priceRange[1]
    );

    // Stock filter
    if (showInStock) {
      results = results.filter((item) => item.available_stock > 0);
    }

    setFilteredItems(results);
  }, [searchTerm, selectedCategory, priceRange, showInStock, produceItems]);

  // Edit produce handler
  const handleEditProduce = (item) => {
    setEditItem({ ...item });
    setIsEditDialogOpen(true);
  };

  // Save edited produce
  const saveEditedProduce = async () => {
    setIsLoading(true);
    try {
      // Create a new object without the `farmer` field
      const updatedData = {
        id: editItem.id,
        title: editItem.title,
        description: editItem.description,
        category: editItem.category,
        price_per_unit: editItem.price_per_unit,
        unit_type: editItem.unit_type,
        minimum_order: editItem.minimum_order,
        available_stock: editItem.available_stock,
        harvest_date: editItem.harvest_date,
        delivery_options: editItem.delivery_options,
        estimated_delivery: editItem.estimated_delivery,
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/produce/${editItem.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );

      // Log full response for debugging

      // Parse response
      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          `Error ${response.status}: ${
            data.error || "Failed to update produce"
          }`
        );
      }

      // Show success message
      toast.success("Updated successfully", {
        position: "top-right",
        style: { background: "#4CAF50", color: "white" },
      });

      // Update local state
      const updatedItems = produceItems.map((item) =>
        item.id === editItem.id ? data : item
      );
      setProduceItems(updatedItems);
      setIsEditDialogOpen(false);
    } catch (error) {
      console.error("Error updating produce:", error.message);
      toast.error(`Error: ${error.message}`, {
        position: "top-right",
        style: { background: "#D32F2F", color: "white" },
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Add new produce
  const handleAddNewProduce = async () => {
    setIsLoading(true);
    try {
      // Assuming you'll get the farmer ID from authentication context
      const newProduceItem = {
        ...newItem,
        farmer_id: "current-farmer-id", // Replace with actual farmer ID
      };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/produce`,
        newProduceItem
      );

      // Add the newly created item to the local state
      setProduceItems([response.data, ...produceItems]);

      // Reset new item form
      setNewItem({
        title: "",
        description: "",
        category: "",
        images: [],
        price_per_unit: 0,
        unit_type: "kg",
        minimum_order: 1,
        available_stock: 0,
        harvest_date: new Date().toISOString().split("T")[0],
        delivery_options: "Local Pickup",
        estimated_delivery: "1-3 days",
      });

      setIsNewDialogOpen(false);
    } catch (error) {
      console.error("Error adding new produce:", error);
      // Optionally show error to user
    } finally {
      setIsLoading(false);
    }
  };

  // Delete produce
  const handleDeleteProduce = async (itemId) => {
    setIsLoading(true);
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/produce/${itemId}`
      );

      // Remove the item from local state
      const updatedItems = produceItems.filter((item) => item.id !== itemId);
      setProduceItems(updatedItems);
    } catch (error) {
      console.error("Error deleting produce:", error);
      // Optionally show error to user
    } finally {
      setIsLoading(false);
    }
  };

  // Handle delivery options in edit form
  const toggleDeliveryOption = (option, formType) => {
    // This might need adjustment based on how delivery_options is stored
    if (formType === "edit") {
      const currentOptions = editItem.delivery_options.split(",");
      const updatedOptions = currentOptions.includes(option)
        ? currentOptions.filter((item) => item !== option).join(",")
        : [...currentOptions, option].join(",");

      setEditItem({
        ...editItem,
        delivery_options: updatedOptions,
      });
    } else {
      const currentOptions = newItem.delivery_options.split(",");
      const updatedOptions = currentOptions.includes(option)
        ? currentOptions.filter((item) => item !== option).join(",")
        : [...currentOptions, option].join(",");

      setNewItem({
        ...newItem,
        delivery_options: updatedOptions,
      });
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="space-y-6">
      {/* Header with title and add button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Produce Management
          </h1>
          <p className="text-gray-500">
            Browse, update, and add new produce items
          </p>
        </div>
        <Button
          // onClick={() => setIsNewDialogOpen(true)}
          onClick={() => setActiveSection("add")}
          className="bg-green-600 hover:bg-green-700"
        >
          <Plus className="mr-2 h-4 w-4" /> Add New Produce
        </Button>
      </div>

      {/* Search and filter section */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="col-span-1 md:col-span-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search produce..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div>
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="stock-filter"
                checked={showInStock}
                onCheckedChange={setShowInStock}
              />
              <Label htmlFor="stock-filter">In Stock Only</Label>
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" /> More Filters
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Filter Options</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>
                      Price Range (${priceRange[0]} - ${priceRange[1]})
                    </Label>
                    <Slider
                      defaultValue={priceRange}
                      max={50}
                      step={1}
                      onValueChange={(value) => setPriceRange(value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Categories</Label>
                    <Select
                      value={selectedCategory}
                      onValueChange={setSelectedCategory}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="All Categories" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedCategory("");
                      setPriceRange([0, 20]);
                      setShowInStock(true);
                    }}
                  >
                    Reset Filters
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
          <div className="text-sm text-gray-500">
            Showing <span className="font-medium">{filteredItems.length}</span>{" "}
            of <span className="font-medium">{produceItems.length}</span> items
          </div>

          <div className="flex space-x-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className={
                viewMode === "grid" ? "bg-green-600 hover:bg-green-700" : ""
              }
            >
              Grid View
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("list")}
              className={
                viewMode === "list" ? "bg-green-600 hover:bg-green-700" : ""
              }
            >
              List View
            </Button>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setFilteredItems([...produceItems])}
          >
            <RefreshCw className="mr-2 h-4 w-4" /> Reset
          </Button>
        </div>
      </div>

      {/* Products Grid/List View */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <Card
              key={item.id}
              className="overflow-hidden border border-gray-200 hover:border-green-200 hover:shadow-md transition-all"
            >
              <div className="relative h-48 bg-gray-100">
                <img
                  src={item.images[0].url}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2">
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                    {item.category}
                  </Badge>
                </div>
              </div>

              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  <div className="text-lg font-bold text-green-700">
                    ${item.price_per_unit}
                    <span className="text-sm text-gray-500">
                      /{item.unit_type}
                    </span>
                  </div>
                </div>
                <CardDescription className="line-clamp-2">
                  {item.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="pb-2">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500 flex items-center">
                      <Package className="h-4 w-4 mr-1" /> Min. Order
                    </span>
                    <span>
                      {item.minimum_order} {item.unit_type}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-500 flex items-center">
                      <Tag className="h-4 w-4 mr-1" /> Available
                    </span>
                    <span
                      className={
                        item.stock_available > 10
                          ? "text-green-600"
                          : "text-amber-600"
                      }
                    >
                      {item.stock_available} {item.unit_type}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-500 flex items-center">
                      <Calendar className="h-4 w-4 mr-1" /> Harvested
                    </span>
                    <span>{formatDate(item.harvest_date)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-500 flex items-center">
                      <Truck className="h-4 w-4 mr-1" /> Delivery
                    </span>
                    <span>{item.estimated_delivery}</span>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="pt-2 border-t border-gray-100">
                <div className="w-full flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    <span className="font-medium text-gray-700">
                      {item.farmer?.farm_name}
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditProduce(item)}
                  >
                    <Edit className="h-4 w-4 mr-1" /> Edit
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg border border-gray-200 hover:border-green-200 hover:shadow-md transition-all p-4"
            >
              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-40 h-40 bg-gray-100 rounded-md overflow-hidden">
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">{item.title}</h3>
                      <Badge className="mt-1 bg-green-100 text-green-800 hover:bg-green-200">
                        {item.category}
                      </Badge>
                    </div>
                    <div className="text-lg font-bold text-green-700">
                      ${item.price_per_unit}
                      <span className="text-sm text-gray-500">
                        /{item.unit_type}
                      </span>
                    </div>
                  </div>

                  <p className="mt-2 text-gray-600 line-clamp-2">
                    {item.description}
                  </p>

                  <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500 flex items-center">
                        <Package className="h-4 w-4 mr-1" /> Min. Order
                      </span>
                      <span className="font-medium">
                        {item.minimum_order} {item.unit_type}
                      </span>
                    </div>

                    <div>
                      <span className="text-gray-500 flex items-center">
                        <Tag className="h-4 w-4 mr-1" /> Available
                      </span>
                      <span
                        className={`font-medium ${
                          item.stock_available > 10
                            ? "text-green-600"
                            : "text-amber-600"
                        }`}
                      >
                        {item.stock_available} {item.unit_type}
                      </span>
                    </div>

                    <div>
                      <span className="text-gray-500 flex items-center">
                        <Calendar className="h-4 w-4 mr-1" /> Harvested
                      </span>
                      <span className="font-medium">
                        {formatDate(item.harvest_date)}
                      </span>
                    </div>

                    <div>
                      <span className="text-gray-500 flex items-center">
                        <Truck className="h-4 w-4 mr-1" /> Delivery
                      </span>
                      <span className="font-medium">
                        {item.estimated_delivery}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-row md:flex-col justify-between items-end space-y-2">
                  <div className="text-sm text-right">
                    <div className="font-medium text-gray-700">
                      {item.farmer_details.name}
                    </div>
                    <div className="text-gray-500">
                      {item.farmer_details.location}
                    </div>
                  </div>

                  <Button onClick={() => handleEditProduce(item)}>
                    <Edit className="h-4 w-4 mr-1" /> Edit
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredItems.length === 0 && (
        <div className="py-12 text-center">
          <ShoppingBasket className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-lg font-medium text-gray-900">
            No produce found
          </h3>
          <p className="mt-2 text-gray-500">
            Try adjusting your search or filter criteria
          </p>
          <Button
            className="mt-4"
            variant="outline"
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("");
              setPriceRange([0, 20]);
            }}
          >
            Reset Filters
          </Button>
        </div>
      )}

      {/* Edit Produce Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Produce</DialogTitle>
          </DialogHeader>

          {editItem && (
            <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-title">Title</Label>
                  <Input
                    id="edit-title"
                    value={editItem.title}
                    onChange={(e) =>
                      setEditItem({ ...editItem, title: e.target.value })
                    }
                  />
                </div>

                {/* <div className="space-y-2">
                  <Label htmlFor="edit-category">Category</Label>
                  <Select
                    value={editItem.category}
                    onValueChange={(value) =>
                      setEditItem({ ...editItem, category: value })
                    }
                  >
                    <SelectTrigger id="edit-category">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div> */}
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  rows={3}
                  value={editItem.description}
                  onChange={(e) =>
                    setEditItem({ ...editItem, description: e.target.value })
                  }
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-price">Price per Unit</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                    <Input
                      id="edit-price"
                      type="number"
                      step="0.01"
                      min="0"
                      className="pl-8"
                      value={editItem.price_per_unit}
                      onChange={(e) =>
                        setEditItem({
                          ...editItem,
                          price_per_unit: parseFloat(e.target.value),
                        })
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-unit-type">Unit Type</Label>
                  <Select
                    value={editItem.unit_type}
                    onValueChange={(value) =>
                      setEditItem({ ...editItem, unit_type: value })
                    }
                  >
                    <SelectTrigger id="edit-unit-type">
                      <SelectValue placeholder="Select Unit Type" />
                    </SelectTrigger>
                    <SelectContent>
                      {unitTypes.map((unit) => (
                        <SelectItem key={unit} value={unit}>
                          {unit}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-min-order">Minimum Order</Label>
                  <Input
                    id="edit-min-order"
                    type="number"
                    min="1"
                    value={editItem.minimum_order}
                    onChange={(e) =>
                      setEditItem({
                        ...editItem,
                        minimum_order: parseInt(e.target.value),
                      })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-stock">Stock Available</Label>
                  <Input
                    id="edit-stock"
                    type="number"
                    min="0"
                    value={editItem.stock_available}
                    onChange={(e) =>
                      setEditItem({
                        ...editItem,
                        stock_available: parseInt(e.target.value),
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-harvest-date">Harvest Date</Label>
                  <Input
                    id="edit-harvest-date"
                    type="date"
                    value={editItem.harvest_date}
                    onChange={(e) =>
                      setEditItem({ ...editItem, harvest_date: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Delivery Options</Label>
                <div className="flex flex-wrap gap-2">
                  {deliveryOptions.map((option) => (
                    <Badge
                      key={option}
                      variant={
                        editItem.delivery_options.includes(option)
                          ? "default"
                          : "outline"
                      }
                      className={
                        editItem.delivery_options.includes(option)
                          ? "bg-green-100 text-green-800 hover:bg-green-200 cursor-pointer"
                          : "hover:bg-gray-100 cursor-pointer"
                      }
                      onClick={() => toggleDeliveryOption(option, "edit")}
                    >
                      {option}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-delivery-estimate">
                  Estimated Delivery
                </Label>
                <Input
                  id="edit-delivery-estimate"
                  value={editItem.estimated_delivery}
                  onChange={(e) =>
                    setEditItem({
                      ...editItem,
                      estimated_delivery: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={saveEditedProduce}
              disabled={isLoading}
              className="bg-green-600 hover:bg-green-700"
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add New Produce Dialog */}
      <Dialog open={isNewDialogOpen} onOpenChange={setIsNewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Produce</DialogTitle>
          </DialogHeader>

          <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="new-title">Title</Label>
                <Input
                  id="new-title"
                  value={newItem.title}
                  onChange={(e) =>
                    setNewItem({ ...newItem, title: e.target.value })
                  }
                  placeholder="e.g. Organic Carrots"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="new-category">Category</Label>
                <Select
                  value={newItem.category}
                  onValueChange={(value) =>
                    setNewItem({ ...newItem, category: value })
                  }
                >
                  <SelectTrigger id="new-category">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="new-description">Description</Label>
              <Textarea
                id="new-description"
                rows={3}
                value={newItem.description}
                onChange={(e) =>
                  setNewItem({ ...newItem, description: e.target.value })
                }
                placeholder="Describe your produce, including growing methods, taste, etc."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="new-price">Price per Unit</Label>
                <div className="relative">
                  <DollarSign className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                  <Input
                    id="new-price"
                    type="number"
                    step="0.01"
                    min="0"
                    className="pl-8"
                    value={newItem.price_per_unit}
                    onChange={(e) =>
                      setNewItem({
                        ...newItem,
                        price_per_unit: parseFloat(e.target.value),
                      })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="new-unit-type">Unit Type</Label>
                <Select
                  value={newItem.unit_type}
                  onValueChange={(value) =>
                    setNewItem({ ...newItem, unit_type: value })
                  }
                >
                  <SelectTrigger id="new-unit-type">
                    <SelectValue placeholder="Select Unit Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {unitTypes.map((unit) => (
                      <SelectItem key={unit} value={unit}>
                        {unit}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="new-min-order">Minimum Order</Label>
                <Input
                  id="new-min-order"
                  type="number"
                  min="1"
                  value={newItem.minimum_order}
                  onChange={(e) =>
                    setNewItem({
                      ...newItem,
                      minimum_order: parseInt(e.target.value),
                    })
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="new-stock">Stock Available</Label>
                <Input
                  id="new-stock"
                  type="number"
                  min="0"
                  value={newItem.stock_available}
                  onChange={(e) =>
                    setNewItem({
                      ...newItem,
                      stock_available: parseInt(e.target.value),
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="new-harvest-date">Harvest Date</Label>
                <Input
                  id="new-harvest-date"
                  type="date"
                  value={newItem.harvest_date}
                  onChange={(e) =>
                    setNewItem({ ...newItem, harvest_date: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Delivery Options</Label>
              <div className="flex flex-wrap gap-2">
                {deliveryOptions.map((option) => (
                  <Badge
                    key={option}
                    variant={
                      newItem.delivery_options.includes(option)
                        ? "default"
                        : "outline"
                    }
                    className={
                      newItem.delivery_options.includes(option)
                        ? "bg-green-100 text-green-800 hover:bg-green-200 cursor-pointer"
                        : "hover:bg-gray-100 cursor-pointer"
                    }
                    onClick={() => toggleDeliveryOption(option, "new")}
                  >
                    {option}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="new-delivery-estimate">Estimated Delivery</Label>
              <Input
                id="new-delivery-estimate"
                value={newItem.estimated_delivery}
                onChange={(e) =>
                  setNewItem({ ...newItem, estimated_delivery: e.target.value })
                }
                placeholder="e.g. 1-3 days, Same day"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleAddNewProduce}
              disabled={isLoading}
              className="bg-green-600 hover:bg-green-700"
            >
              {isLoading ? "Adding..." : "Add Produce"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BrowseProducts;
