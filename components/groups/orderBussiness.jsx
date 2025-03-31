"use client";

import React, { useState, useEffect } from "react";
import {
  ClipboardList,
  Search,
  Filter,
  ArrowUpDown,
  CircleX,
  CheckCircle2,
  Loader2,
  RefreshCw,
  Truck,
  Package,
  AlertTriangle,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import useFarmConnectStore from "@/store";
import Link from "next/link";

// API base URL
const API_BASE_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`;

const OrderBussiness = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderDetailsOpen, setOrderDetailsOpen] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const { user } = useFarmConnectStore();

  // Status options
  const statusOptions = [
    { value: "pending", label: "Pending", color: "bg-yellow-500" },
    { value: "processing", label: "Processing", color: "bg-blue-500" },
    { value: "shipped", label: "Shipped", color: "bg-purple-500" },
    { value: "delivered", label: "Delivered", color: "bg-green-500" },
    { value: "canceled", label: "Canceled", color: "bg-red-500" },
  ];

  // Function to fetch all orders
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/orders/users/${user.id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }
      const data = await response.json();
      setOrders(data);
      setFilteredOrders(data);
      setError(null);
    } catch (error) {
      setError(error.message);

      toast.error(`Error: ${error.message}`, {
        position: "top-right",
        style: { background: "#D32F2F", color: "white" },
      });
    } finally {
      setLoading(false);
    }
  };

  // Function to update order status
  const updateOrderStatus = async (orderId, newStatus) => {
    setUpdatingStatus(true);
    try {
      const response = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error("Failed to update order status");
      }

      // Update orders in state
      const updatedOrders = orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      );
      setOrders(updatedOrders);

      // Also update filtered orders
      const updatedFilteredOrders = filteredOrders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      );
      setFilteredOrders(updatedFilteredOrders);

      // Update selected order if open
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder({ ...selectedOrder, status: newStatus });
      }

      toast(`Order status updated to ${newStatus}`, {
        position: "top-right",
        style: { background: "#4CAF50", color: "white" },
      });
    } catch (error) {
      toast.error(`Error: ${error.message}`, {
        position: "top-right",
        style: { background: "#D32F2F", color: "white" },
      });
    } finally {
      setUpdatingStatus(false);
    }
  };

  // Function to cancel/delete an order
  const cancelOrder = async (orderId) => {
    if (
      !confirm(
        "Are you sure you want to cancel this order? This action cannot be undone."
      )
    ) {
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to cancel order");
      }

      // Remove order from state
      setOrders(orders.filter((order) => order.id !== orderId));
      setFilteredOrders(filteredOrders.filter((order) => order.id !== orderId));

      // Close dialog if the deleted order was selected
      if (selectedOrder && selectedOrder.id === orderId) {
        setOrderDetailsOpen(false);
      }

      toast("Order has been canceled successfully", {
        position: "top-right",
        style: { background: "#4CAF50", color: "white" },
      });
    } catch (error) {
      toast.error(`Error: ${error.message}`, {
        position: "top-right",
        style: { background: "#D32F2F", color: "white" },
      });
    }
  };

  // Apply filters and search
  useEffect(() => {
    let result = [...orders];

    // Apply status filter
    if (statusFilter !== "all") {
      result = result.filter((order) => order.status === statusFilter);
    }

    // Apply search term (search by order ID)
    if (searchTerm) {
      result = result.filter((order) =>
        order.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply sorting
    result.sort((a, b) => {
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });

    setFilteredOrders(result);
  }, [orders, statusFilter, searchTerm, sortOrder]);

  // Fetch orders on component mount
  useEffect(() => {
    fetchOrders();
  }, []);

  // Get status badge
  const getStatusBadge = (status) => {
    const statusInfo = statusOptions.find((opt) => opt.value === status) || {
      value: status,
      label: status.charAt(0).toUpperCase() + status.slice(1),
      color: "bg-gray-500",
    };

    return (
      <Badge className={`${statusInfo.color} text-white`}>
        {statusInfo.label}
      </Badge>
    );
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  };

  // Get status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <Loader2 className="h-4 w-4 mr-1" />;
      case "processing":
        return <RefreshCw className="h-4 w-4 mr-1" />;
      case "shipped":
        return <Truck className="h-4 w-4 mr-1" />;
      case "delivered":
        return <CheckCircle2 className="h-4 w-4 mr-1" />;
      case "canceled":
        return <CircleX className="h-4 w-4 mr-1" />;
      default:
        return <Package className="h-4 w-4 mr-1" />;
    }
  };

  // Calculate order timeline progress
  const getOrderProgress = (status) => {
    switch (status) {
      case "pending":
        return 20;
      case "processing":
        return 40;
      case "shipped":
        return 70;
      case "delivered":
        return 100;
      case "canceled":
        return 0;
      default:
        return 0;
    }
  };

  // Loading skeleton
  if (loading && orders.length === 0) {
    return (
      <div className="container mx-auto p-4 space-y-4 ">
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-full" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <Skeleton key={i} className="h-16 w-full" />
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Error state
  if (error && !loading && orders.length === 0) {
    return (
      <div className="container mx-auto p-4">
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Failed to load your orders. {error}
            <Button variant="outline" className="mt-2" onClick={fetchOrders}>
              Try Again
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  // Empty state
  if (!loading && orders.length === 0) {
    return (
      <div className="h-full flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-xl text-center">No Orders Yet</CardTitle>
            <CardDescription className="text-center">
              You haven't placed any orders yet.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <ClipboardList size={48} className="mx-auto text-gray-400 my-4" />
            <p className="text-gray-500">
              Start shopping to see your orders here.
            </p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Link href="/browse">
              <Button>Browse Products</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">
                Order History & Tracking
              </CardTitle>
              <CardDescription>View and manage your orders</CardDescription>
            </div>
            <Button variant="outline" onClick={fetchOrders} disabled={loading}>
              {loading ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4 mr-2" />
              )}
              Refresh
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
            <div className="flex gap-2">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Search by order ID"
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <div className="flex items-center">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter by status" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Orders</SelectItem>
                  {statusOptions.map((status) => (
                    <SelectItem key={status.value} value={status.value}>
                      {status.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Select value={sortOrder} onValueChange={setSortOrder}>
              <SelectTrigger className="w-full sm:w-44">
                <div className="flex items-center">
                  <ArrowUpDown className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Sort by date" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Order list */}
          <Tabs defaultValue="all">
            <TabsList className="mb-4 w-full grid grid-cols-5">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="processing">Processing</TabsTrigger>
              <TabsTrigger value="shipped">Shipped</TabsTrigger>
              <TabsTrigger value="delivered">Delivered</TabsTrigger>
            </TabsList>

            {Object.entries({
              all: filteredOrders,
              pending: filteredOrders.filter(
                (order) => order.status === "pending"
              ),
              processing: filteredOrders.filter(
                (order) => order.status === "processing"
              ),
              shipped: filteredOrders.filter(
                (order) => order.status === "shipped"
              ),
              delivered: filteredOrders.filter(
                (order) => order.status === "delivered"
              ),
            }).map(([status, orders]) => (
              <TabsContent key={status} value={status} className="mt-0">
                {orders.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    No {status !== "all" ? status : ""} orders found
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Order ID</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {orders.map((order) => (
                          <TableRow key={order.id}>
                            <TableCell className="font-medium">
                              {order.id.substring(0, 8)}...
                            </TableCell>
                            <TableCell>
                              {formatDate(order.created_at)}
                            </TableCell>
                            <TableCell>
                              ${order.total_amount.toFixed(2)}
                            </TableCell>
                            <TableCell>
                              {getStatusBadge(order.status)}
                            </TableCell>
                            <TableCell className="text-right">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setSelectedOrder(order);
                                  setOrderDetailsOpen(true);
                                }}
                              >
                                Details
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      {/* Order details dialog */}
      <Dialog open={orderDetailsOpen} onOpenChange={setOrderDetailsOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          {selectedOrder && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl flex justify-between items-center">
                  <span>Order Details</span>
                  {getStatusBadge(selectedOrder.status)}
                </DialogTitle>
                <DialogDescription className="flex justify-between">
                  <span>Order #{selectedOrder.id.substring(0, 8)}...</span>
                  <span>{formatDate(selectedOrder.created_at)}</span>
                </DialogDescription>
              </DialogHeader>

              {/* Order items */}
              <div className="border rounded-md">
                <div className="p-4 border-b bg-gray-50">
                  <h3 className="font-medium">Order Items</h3>
                </div>
                <div className="p-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead className="text-right">Price</TableHead>
                        <TableHead className="text-right">Qty</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedOrder.items.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>
                            {item.produce?.name ||
                              `Product ID: ${item.produce_id}`}
                          </TableCell>
                          <TableCell className="text-right">
                            ${item.price.toFixed(2)}
                          </TableCell>
                          <TableCell className="text-right">
                            {item.quantity}
                          </TableCell>
                          <TableCell className="text-right">
                            ${item.total_cost.toFixed(2)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <div className="p-4 border-t bg-gray-50">
                  <div className="flex justify-between font-medium">
                    <span>Total:</span>
                    <span>${selectedOrder.total_amount.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setOrderDetailsOpen(false)}
                >
                  Close
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OrderBussiness;
