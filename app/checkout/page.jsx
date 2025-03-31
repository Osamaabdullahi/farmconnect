"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/Navbar";

import {
  Truck,
  Store,
  CreditCard,
  Trash2,
  Plus,
  Minus,
  Star,
  MessageCircle,
  Lock,
  Phone,
  Building,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useFarmConnectStore from "@/store";
import { toast } from "sonner";
import { redirect } from "next/navigation";

const CheckoutFlow = () => {
  const [step, setStep] = useState(1);
  const [deliveryMethod, setDeliveryMethod] = useState("delivery");
  const { cart, removeFromCart, user, isAuthenticated, clearCart } =
    useFarmConnectStore();
  const [Loading, setLoading] = useState(false);
  const [Ratings, setRatings] = useState(0);
  const [deliveryRating, setDeliveryRating] = useState(0);

  const calculateTotal = () => {
    const subtotal = cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    const tax = subtotal * 0.16; // 16% VAT
    const deliveryFee = deliveryMethod === "delivery" ? 10.0 : 0;
    return {
      subtotal,
      tax,
      deliveryFee,
      total: subtotal + tax + deliveryFee,
    };
  };

  const updateQuantity = (id, change) => {
    setCart(
      cart.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const checkout = async (userId, cartItems, paymentMethod) => {
    setLoading(true);
    try {
      const payload = {
        user_id: userId,
        items: cartItems.map((item) => ({
          produce_id: item.id, // Ensure this matches your backend model
          quantity: item.quantity,
        })),
        payment_method: paymentMethod, // Example: "M-Pesa", "Credit Card"
        farmer_id: user.id,
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/checkout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error("Checkout failed");
      }

      const data = await response.json();

      // const data = await response.json();
      toast("Order placed successfully", {
        position: "top-right",
        style: { background: "#4CAF50", color: "white" },
      });
      clearCart();
      setStep(Math.min(6, step + 1));
    } catch (error) {
      toast.error(`Error: ${error.message}`, {
        position: "top-right",
        style: { background: "#D32F2F", color: "white" },
      });
    } finally {
      setLoading(false);
    }
  };

  console.log(cart);
  const CartPage = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        {cart.map((item) => (
          <Card key={item.id} className="p-4">
            <div className="flex items-center">
              <div className="w-20 h-20 mr-4 rounded-md overflow-hidden flex-shrink-0">
                <img
                  src={item.image || "/api/placeholder/80/80"}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex justify-between items-center flex-1">
                <div className="space-y-1">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-gray-500">Seller: {item.seller}</p>
                  <p className="text-sm">
                    Price: ${item.price} per {item.unit}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateQuantity(item.id, -1)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateQuantity(item.id, 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${calculateTotal().subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>VAT (16%)</span>
              <span>${calculateTotal().tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span>${calculateTotal().deliveryFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold pt-2 border-t">
              <span>Total</span>
              <span>${calculateTotal().total.toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const OrderConfirmation = () => (
    <Card>
      <CardContent className="pt-6 space-y-6">
        <div className="space-y-4">
          <h3 className="font-medium">Order Summary</h3>
          {cart.map((item) => (
            <div key={item.id} className="flex items-center mb-3">
              <div className="w-12 h-12 mr-3 rounded overflow-hidden flex-shrink-0">
                <img
                  src={item.image || "/api/placeholder/48/48"}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex justify-between w-full">
                <span>
                  {item.quantity}x {item.name}
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            </div>
          ))}
          <div className="pt-4 border-t">
            <div className="flex justify-between font-medium">
              <span>Total Amount</span>
              <span>${calculateTotal().total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const DeliveryOptions = () => (
    <Card>
      <CardContent className="pt-6 space-y-6">
        <RadioGroup defaultValue="delivery" onValueChange={setDeliveryMethod}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="delivery" id="delivery" />
            <Label htmlFor="delivery" className="flex items-center space-x-2">
              <Truck className="h-4 w-4" />
              <span>Delivery</span>
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="pickup" id="pickup" />
            <Label htmlFor="pickup" className="flex items-center space-x-2">
              <Store className="h-4 w-4" />
              <span>Pickup</span>
            </Label>
          </div>
        </RadioGroup>

        {deliveryMethod === "delivery" ? (
          <div className="space-y-4">
            <Input placeholder="Street Address" />
            <Input placeholder="City" />
            <Input placeholder="Phone Number" />
            <div className="text-sm text-gray-500">
              Estimated delivery time: 24-48 hours
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <select className="w-full p-2 border rounded">
              <option>Select Pickup Location</option>
              <option>Green Acres Farm - Warehouse 1</option>
              <option>Valley View Gardens - Main Store</option>
            </select>
            <select className="w-full p-2 border rounded">
              <option>Select Pickup Time</option>
              <option>Tomorrow - Morning (8AM - 12PM)</option>
              <option>Tomorrow - Afternoon (12PM - 4PM)</option>
            </select>
          </div>
        )}
      </CardContent>
    </Card>
  );

  const PaymentSection = () => {
    const [selectedPayment, setSelectedPayment] = useState("card");
    const [isProcessing, setIsProcessing] = useState(false);
    const [cardType, setCardType] = useState("");
    const [paymentError, setPaymentError] = useState("");

    const detectCardType = (number) => {
      const firstDigit = number.charAt(0);
      if (firstDigit === "4") return "Visa";
      if (firstDigit === "5") return "Mastercard";
      return "";
    };

    const handleCardNumberChange = (e) => {
      const number = e.target.value;
      setCardType(detectCardType(number));
    };

    const simulatePayment = () => {
      setIsProcessing(true);
      setPaymentError("");

      // Simulate payment processing
      setTimeout(() => {
        setIsProcessing(false);
        // Randomly show success or error for demonstration
        if (Math.random() > 0.8) {
          setPaymentError("Payment failed. Please try again.");
        }
      }, 2000);
    };

    return (
      <div className="space-y-6">
        <Tabs defaultValue="card" onValueChange={setSelectedPayment}>
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="card" className="flex items-center space-x-2">
              <CreditCard className="h-4 w-4" />
              <span>Card</span>
            </TabsTrigger>
            <TabsTrigger value="mpesa" className="flex items-center space-x-2">
              <Phone className="h-4 w-4" />
              <span>M-Pesa</span>
            </TabsTrigger>
            <TabsTrigger value="bank" className="flex items-center space-x-2">
              <Building className="h-4 w-4" />
              <span>Bank</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="card">
            <Card>
              <CardContent className="space-y-4 pt-6">
                <div className="flex items-center justify-between">
                  <Label>Card Payment</Label>
                  {cardType && (
                    <span className="text-sm text-gray-500">{cardType}</span>
                  )}
                </div>

                <div className="space-y-4">
                  <Input
                    placeholder="Card Number"
                    onChange={handleCardNumberChange}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="MM/YY" />
                    <Input placeholder="CVV" type="password" maxLength="4" />
                  </div>
                  <Input placeholder="Cardholder Name" />

                  <Label className="flex items-center space-x-2">
                    <input type="checkbox" />
                    <span>Save card for future payments</span>
                  </Label>

                  <div className="flex items-center text-sm text-gray-500">
                    <Lock className="h-4 w-4 mr-2" />
                    <span>Secure Payment with SSL Encryption</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="mpesa">
            <Card>
              <CardContent className="space-y-4 pt-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label>M-Pesa Payment</Label>
                    <span className="text-sm text-gray-500">
                      Amount: KES 2,500
                    </span>
                  </div>

                  <Input placeholder="Enter Phone Number" type="tel" />

                  <div className="space-y-2">
                    <Button
                      className="w-full"
                      onClick={simulatePayment}
                      disabled={isProcessing}
                    >
                      {isProcessing
                        ? "Processing..."
                        : "Request M-Pesa STK Push"}
                    </Button>

                    <div className="text-center text-sm text-gray-500">or</div>

                    <div className="p-4 bg-gray-50 rounded-lg space-y-2">
                      <p className="font-medium">Manual Payment Details:</p>
                      <p>Paybill Number: 123456</p>
                      <p>
                        Account Number: FC-
                        {Math.random().toString(36).substr(2, 8)}
                      </p>
                      <Input
                        placeholder="Enter M-Pesa Transaction ID"
                        className="mt-2"
                      />
                      <Button variant="outline" className="w-full">
                        Verify Payment
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bank">
            <Card>
              <CardContent className="space-y-4 pt-6">
                <div className="space-y-4">
                  <Label>Select Your Bank</Label>
                  <select className="w-full p-2 border rounded">
                    <option>Select Bank</option>
                    <option>Equity Bank</option>
                    <option>KCB Bank</option>
                    <option>Co-operative Bank</option>
                  </select>

                  <div className="p-4 bg-gray-50 rounded-lg space-y-2">
                    <p className="font-medium">Bank Transfer Details:</p>
                    <p>Account Name: FarmConnect Ltd</p>
                    <p>Account Number: 1234567890</p>
                    <p>Bank: Equity Bank</p>
                    <p>Branch: Main Branch</p>
                    <p>SWIFT Code: EQBLKENA</p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm text-gray-500">
                      Upload Payment Receipt:
                    </p>
                    <Input type="file" accept="image/*,.pdf" />
                  </div>

                  <Button className="w-full">Submit for Verification</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {paymentError && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{paymentError}</AlertDescription>
          </Alert>
        )}

        {isProcessing && (
          <Alert>
            <AlertDescription className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900"></div>
              <span>Processing your payment...</span>
            </AlertDescription>
          </Alert>
        )}

        <div className="flex items-center justify-center text-sm text-gray-500">
          <Lock className="h-4 w-4 mr-2" />
          <span>Your payment information is secure</span>
        </div>
      </div>
    );
  };

  const OrderTracking = () => (
    <Card>
      <CardContent className="pt-6 space-y-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-medium">Order Status</h3>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
              Confirmed
            </span>
          </div>

          <div className="flex space-x-4">
            <Button variant="outline" className="flex-1">
              <MessageCircle className="h-4 w-4 mr-2" />
              Contact Support
            </Button>
            <Button variant="outline" className="flex-1">
              Track Order
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const OrderCompletion = () => (
    <Card>
      <CardContent className="pt-6 space-y-6">
        <div className="space-y-4">
          <h3 className="font-medium">Rate Your Experience</h3>

          <div className="space-y-4">
            <div>
              <Label>Rate the Product Quality</Label>
              <div className="flex space-x-2 mt-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <Button
                    key={rating}
                    onClick={() => setRatings(rating)}
                    variant="outline"
                    size="icon"
                  >
                    <Star
                      className={`h-4 w-4 ${
                        rating <= Ratings ? "text-yellow-500" : "text-gray-400"
                      }`}
                    />
                  </Button>
                ))}
              </div>
            </div>

            {deliveryMethod === "delivery" && (
              <div>
                <Label>Rate the Delivery Service</Label>
                <div className="flex space-x-2 mt-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <Button
                      onClick={() => setDeliveryRating(rating)}
                      key={rating}
                      variant="outline"
                      size="icon"
                    >
                      <Star
                        className={`h-4 w-4 ${
                          rating <= deliveryRating
                            ? "text-yellow-500"
                            : "text-gray-400"
                        }`}
                      />
                    </Button>
                  ))}
                </div>
              </div>
            )}

            <div>
              <Label>Leave a Review</Label>
              <textarea
                className="w-full mt-2 p-2 border rounded"
                rows={4}
                placeholder="Share your experience..."
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderStep = () => {
    switch (step) {
      case 1:
        return <CartPage />;
      case 2:
        return <DeliveryOptions />;
      case 3:
        return <PaymentSection />;
      case 4:
        return <OrderConfirmation />;
      case 5:
        return <OrderTracking />;
      case 6:
        return <OrderCompletion />;
      default:
        return <CartPage />;
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-2xl mx-auto p-4 pt-24">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Checkout</h2>
            <div className="text-sm text-gray-500">Step {step} of 6</div>
          </div>

          {renderStep()}

          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => setStep(Math.max(1, step - 1))}
              disabled={step === 1 || step === 5}
            >
              Previous
            </Button>

            {Loading ? (
              <Button disabled>
                <Loader2 className="animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button
                // onClick={() => setStep(Math.min(6, step + 1))}
                onClick={() => {
                  if (step === 6) {
                    clearCart();
                    redirect("/browse");
                  }
                  if (isAuthenticated) {
                    if (step === 4) {
                      checkout(user.id, cart, "M-Pesa");
                    } else {
                      setStep(Math.min(6, step + 1));
                    }
                  } else {
                    redirect("/sighin");
                  }
                }}
                // disabled={step === 6}
              >
                {/* {step === 4 ? "Place Order" : "Next"} */}
                {step === 6
                  ? "Submit Rating"
                  : step === 4
                  ? "Place Order"
                  : "Next"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutFlow;
