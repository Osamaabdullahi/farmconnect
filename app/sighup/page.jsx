"use client";
import React, { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Suspense } from "react";

const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const search = useSearchParams();
  const role = search.get("role");
  const router = useRouter();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    onboarding: false,
    role: role,
    status: "pending",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [confirmPassword, setconfirmPassword] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      // Success - Redirect user to onboarding
      setSuccess("Account created successfully! Redirecting...");
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        onboarding: false,
        role: formData.role,
        status: "pending",
      });
      router.push("/sighin");
      // router.push(
      //   formData.role == "farmer"
      //     ? `/onboarding/Famers?first_name=${formData.first_name}&last_name=${formData.last_name}&id=${data.message.id}`
      //     : ` /onboarding/Bussiness&id=${data.id}`
      // );
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Suspense>
      <div className="min-h-screen w-full bg-gray-50">
        <div className="h-screen grid md:grid-cols-2">
          {/* Left Panel */}
          <div className="bg-green-600 p-8 text-white relative overflow-hidden">
            <div className="max-w-md mx-auto space-y-8 relative z-10">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold">
                  FarmConnect – How It Works for {role}
                </h1>

                {/* Illustration placeholder */}
                <div className="w-full h-48 bg-white/10 rounded-lg overflow-hidden">
                  {role === "farmer" && (
                    <img
                      src="https://i.pinimg.com/474x/1a/96/79/1a967961a671b7d0b59be7498ba944cc.jpg"
                      alt="
                  farmer illustration"
                      className="w-full h-full object-cover"
                    />
                  )}
                  {role === "business" && (
                    <img
                      src="https://i.pinimg.com/474x/dc/ed/7c/dced7c801e8a47794c740eaefb39f281.jpg"
                      alt="Farmer illustration"
                      className="w-full h-full object-cover"
                    />
                  )}
                  {role === "Logistics" && (
                    <img
                      src="https://i.pinimg.com/474x/a8/c7/16/a8c7166f58eb51756f7f572c68f0e31e.jpg"
                      alt="Farmer illustration"
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>

                <div className="space-y-4">
                  {role === "farmer" && (
                    <p className="text-lg">
                      Connect directly with businesses and sell your produce
                      efficiently
                    </p>
                  )}

                  {role === "business" && (
                    <p className="text-lg">
                      Find Quality Produce and source fresh farm products from
                      verified farmers.
                    </p>
                  )}

                  {role === "Logistics" && (
                    <p className="text-lg">
                      Patner with us Join as a delivery provider for fresh
                      produce.
                    </p>
                  )}

                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center mt-1">
                        <span className="text-sm">1</span>
                      </div>

                      {role === "farmer" && (
                        <p className="text-sm">
                          <strong>Direct Connections:</strong> Connect with
                          businesses without middlemen
                        </p>
                      )}

                      {role === "business" && (
                        <p className="text-sm">
                          <strong>Order & Delivery:</strong> Get farm produce
                          delivered to your business.
                        </p>
                      )}

                      {role === "Logistics" && (
                        <p className="text-sm">
                          <strong>Track & Optimize:</strong> Enhance logistics
                          efficiency with real-time tracking
                        </p>
                      )}
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center mt-1">
                        <span className="text-sm">2</span>
                      </div>
                      {role === "farmer" && (
                        <p className="text-sm">
                          <strong>Better Profits:</strong> Get fair prices for
                          your produce
                        </p>
                      )}

                      {role === "business" && (
                        <p className="text-sm">
                          <strong>Flexible Payment Options:</strong> Seamless
                          payment solutions tailored for businesses
                        </p>
                      )}
                      {role === "Logistics" && (
                        <p className="text-sm">
                          <strong>Fast & Secure Payments:</strong>Receive quick
                          and secure payments for completed deliveries.
                        </p>
                      )}
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center mt-1">
                        <span className="text-sm">3</span>
                      </div>
                      <p className="text-sm">
                        <strong>Simple Process:</strong> Easy-to-use platform
                        designed for {role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute bottom-0 right-0 opacity-10">
              <svg
                width="320"
                height="320"
                viewBox="0 0 100 100"
                className="text-white"
              >
                <path d="M50 5 L95 90 L5 90 Z" fill="currentColor" />
              </svg>
            </div>
          </div>

          {/* Right Panel */}
          <div className="bg-white flex items-center justify-center p-8">
            <div className="max-w-md w-full space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold">Create Your Account</h2>

                {role === "farmer" && (
                  <p className="text-sm text-gray-500">
                    {" "}
                    Join FarmConnect and start selling directly to businesses
                  </p>
                )}

                {role === "business" && (
                  <p className="text-sm text-gray-500">
                    {" "}
                    Join FarmConnect and source fresh, high-quality produce
                    directly from local farmers{" "}
                  </p>
                )}
                {role === "Logistics" && (
                  <p className="text-sm text-gray-500">
                    Partner with FarmConnect to power seamless farm-to-business
                    deliveries and grow your network.
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <img
                    src="https://i.pinimg.com/474x/59/7f/11/597f11b631d7d94492f1adb95110cc44.jpg"
                    alt="Google"
                    className="w-5 h-5 mr-2"
                  />
                  <span className="text-sm">Continue with Google</span>
                </button>
                <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <img
                    src="https://i.pinimg.com/474x/60/6b/c0/606bc0717982547e555a514b479365a0.jpg"
                    alt="Apple"
                    className="w-5 h-5 mr-2"
                  />
                  <span className="text-sm">Continue with Apple</span>
                </button>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">or</span>
                </div>
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <input
                      name="first_name"
                      type="text"
                      placeholder="First name"
                      value={formData.first_name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <input
                      name="last_name"
                      type="text"
                      placeholder="Last name"
                      value={formData.last_name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                    />
                  </div>
                </div>
                <div>
                  <input
                    name="email"
                    type="email"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  <input
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setconfirmPassword(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                  />
                </div>
                <div className="flex items-center">
                  <input
                    name="termsAccepted"
                    type="checkbox"
                    onChange={() => {}}
                    checked={true}
                    className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                  <label className="ml-2 text-sm text-gray-600">
                    I agree to the Terms & Conditions
                  </label>
                </div>
                {loading ? (
                  <Button
                    disabled
                    className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  >
                    <Loader2 className="animate-spin" />
                    Please wait
                  </Button>
                ) : (
                  <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  >
                    Sign Up
                  </button>
                )}
              </form>

              <p className="text-center text-sm text-gray-500">
                Already have an account?{" "}
                <Link
                  href="sighin"
                  className="text-green-600 hover:text-green-700 font-medium"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default SignUpForm;
