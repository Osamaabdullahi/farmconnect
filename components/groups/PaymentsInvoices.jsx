"use client";

import React, { useState } from "react";
import {
  DollarSign,
  Download,
  RefreshCcw,
  Calendar,
  CreditCard,
  Filter,
  ChevronDown,
  CheckCircle,
  XCircle,
  ClockCircle,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const PaymentsInvoices = () => {
  const [activeTab, setActiveTab] = useState("transactions");
  const [filterPeriod, setFilterPeriod] = useState("all");
  const [filterPaymentMethod, setFilterPaymentMethod] = useState("all");
  const [refundReason, setRefundReason] = useState("");
  const [refundDialogOpen, setRefundDialogOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  // Sample transaction data
  const [transactions, setTransactions] = useState([
    {
      id: "INV-001",
      date: "2025-02-25",
      amount: 1250.0,
      description: "Fertilizer Purchase",
      paymentMethod: "Bank Transfer",
      status: "completed",
    },
    {
      id: "INV-002",
      date: "2025-02-20",
      amount: 750.5,
      description: "Seed Delivery",
      paymentMethod: "Mobile Money",
      status: "completed",
    },
    {
      id: "INV-003",
      date: "2025-02-15",
      amount: 2300.0,
      description: "Equipment Rental",
      paymentMethod: "Cash on Delivery",
      status: "completed",
    },
    {
      id: "INV-004",
      date: "2025-02-10",
      amount: 560.75,
      description: "Pest Control Services",
      paymentMethod: "Bank Transfer",
      status: "completed",
    },
    {
      id: "INV-005",
      date: "2025-02-05",
      amount: 325.25,
      description: "Irrigation Supplies",
      paymentMethod: "Mobile Money",
      status: "refunded",
    },
  ]);

  // Sample payment methods
  const paymentMethods = [
    { id: 1, name: "Bank Transfer", primary: true },
    { id: 2, name: "Mobile Money", primary: false },
    { id: 3, name: "Cash on Delivery", primary: false },
  ];

  // Calculate total spending
  const totalSpending = transactions
    .filter((t) => t.status === "completed")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  // Filter transactions
  const filteredTransactions = transactions.filter((transaction) => {
    // Filter by period
    if (
      filterPeriod === "recent" &&
      new Date(transaction.date) <
        new Date(Date.now() - 14 * 24 * 60 * 60 * 1000)
    ) {
      return false;
    }

    // Filter by payment method
    if (
      filterPaymentMethod !== "all" &&
      transaction.paymentMethod !== filterPaymentMethod
    ) {
      return false;
    }

    return true;
  });

  // Handle download invoice
  const handleDownloadInvoice = (transaction) => {
    // In a real application, this would generate and download a PDF
    console.log(`Downloading invoice for ${transaction.id}`);
    alert(`Invoice ${transaction.id} download started`);
  };

  // Handle request refund
  const handleRequestRefund = (transaction) => {
    setSelectedTransaction(transaction);
    setRefundDialogOpen(true);
  };

  // Submit refund request
  const submitRefundRequest = () => {
    if (selectedTransaction) {
      // In a real application, this would send the refund request to the backend
      console.log(
        `Requesting refund for ${selectedTransaction.id}: ${refundReason}`
      );

      // Update the transaction status
      setTransactions(
        transactions.map((t) =>
          t.id === selectedTransaction.id
            ? { ...t, status: "refund_pending" }
            : t
        )
      );

      // Close the dialog and reset form
      setRefundDialogOpen(false);
      setRefundReason("");
      setSelectedTransaction(null);
    }
  };

  // Format date to a more readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Render status badge
  const renderStatusBadge = (status) => {
    switch (status) {
      case "completed":
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle size={12} className="mr-1" /> Completed
          </Badge>
        );
      case "refunded":
        return (
          <Badge className="bg-blue-100 text-blue-800">
            <RefreshCcw size={12} className="mr-1" /> Refunded
          </Badge>
        );
      case "refund_pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">
            <ClockCircle size={12} className="mr-1" /> Refund Pending
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Payments & Invoices</h1>
        <p className="text-gray-500">
          Manage your transactions, download invoices, and request refunds
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Total Spending Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Total Spending
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <DollarSign className="mr-2 text-green-500" />
              <span className="text-3xl font-bold">
                ${totalSpending.toFixed(2)}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Pending Refunds Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Pending Refunds
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <RefreshCcw className="mr-2 text-yellow-500" />
              <span className="text-3xl font-bold">
                $
                {transactions
                  .filter((t) => t.status === "refund_pending")
                  .reduce((sum, t) => sum + t.amount, 0)
                  .toFixed(2)}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Payment Methods Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Payment Methods
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <CreditCard className="mr-2 text-blue-500" />
              <span className="text-3xl font-bold">
                {paymentMethods.length}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs
        defaultValue="transactions"
        value={activeTab}
        onValueChange={setActiveTab}
      >
        <TabsList className="mb-4">
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="paymentMethods">Payment Methods</TabsTrigger>
        </TabsList>

        <TabsContent value="transactions">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <CardTitle>Transaction History</CardTitle>
                <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mt-2 md:mt-0">
                  <Select value={filterPeriod} onValueChange={setFilterPeriod}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Filter by period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Time</SelectItem>
                      <SelectItem value="recent">Last 14 Days</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select
                    value={filterPaymentMethod}
                    onValueChange={setFilterPaymentMethod}
                  >
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Methods</SelectItem>
                      {paymentMethods.map((method) => (
                        <SelectItem key={method.id} value={method.name}>
                          {method.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {filteredTransactions.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Invoice ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Payment Method</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTransactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell className="font-medium">
                          {transaction.id}
                        </TableCell>
                        <TableCell>{formatDate(transaction.date)}</TableCell>
                        <TableCell>{transaction.description}</TableCell>
                        <TableCell>${transaction.amount.toFixed(2)}</TableCell>
                        <TableCell>{transaction.paymentMethod}</TableCell>
                        <TableCell>
                          {renderStatusBadge(transaction.status)}
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex items-center"
                              onClick={() => handleDownloadInvoice(transaction)}
                            >
                              <Download size={14} className="mr-1" /> Invoice
                            </Button>

                            {transaction.status === "completed" && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="flex items-center text-red-500 border-red-200 hover:bg-red-50"
                                onClick={() => handleRequestRefund(transaction)}
                              >
                                <RefreshCcw size={14} className="mr-1" /> Refund
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">
                    No transactions found matching your filters.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="paymentMethods">
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>
                Manage your payment options for transactions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center">
                      <CreditCard className="mr-3 text-blue-500" />
                      <div>
                        <p className="font-medium">{method.name}</p>
                        {method.primary && (
                          <Badge className="mt-1">Primary</Badge>
                        )}
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Manage
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Add Payment Method</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Refund Request Dialog */}
      <Dialog open={refundDialogOpen} onOpenChange={setRefundDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Request Refund</DialogTitle>
            <DialogDescription>
              Please provide a reason for your refund request. Our team will
              review your request within 1-2 business days.
            </DialogDescription>
          </DialogHeader>

          {selectedTransaction && (
            <div className="py-2">
              <div className="flex justify-between mb-2">
                <span className="font-medium">Invoice:</span>
                <span>{selectedTransaction.id}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="font-medium">Amount:</span>
                <span>${selectedTransaction.amount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-4">
                <span className="font-medium">Date:</span>
                <span>{formatDate(selectedTransaction.date)}</span>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reason">Reason for refund</Label>
                <Textarea
                  id="reason"
                  placeholder="Please explain why you're requesting a refund..."
                  value={refundReason}
                  onChange={(e) => setRefundReason(e.target.value)}
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setRefundDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={submitRefundRequest}
              disabled={!refundReason.trim()}
            >
              Submit Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PaymentsInvoices;
