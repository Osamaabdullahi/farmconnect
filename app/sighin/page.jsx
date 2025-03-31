"use client";
import React, { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import useFarmConnectStore from "../../store";
import { toast } from "sonner";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const search = useSearchParams();
  const role = search.get("role") || "farmer"; // Default to farmer if no role is provided
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: role,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [rememberMe, setRememberMe] = useState(false);
  const { login } = useFarmConnectStore();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(data.error || "Invalid email or password");
      }

      const data = await response.json();

      // Save token to localStorage if remember me is checked
      if (rememberMe && data.token) {
        localStorage.setItem("authToken", data.token);
      } else if (data.token) {
        sessionStorage.setItem("authToken", data.token);
      }
      login(data.user, data.token);
      toast("Login successfully", {
        position: "top-right",
        style: { background: "#4CAF50", color: "white" },
      });

      if (data.user.onboarding) {
        router.push(`/browse`);
        return;
      }

      router.push(
        data.user.role == "farmer"
          ? `/onboarding/Famers?first_name=${data.user.first_name}&last_name=${data.user.last_name}&id=${data.user.id}`
          : ` /onboarding/Bussiness?id=${data.user.id}`
      );
    } catch (err) {
      setError(err.message);
      toast.error(`Error: ${error.message}`, {
        position: "top-right",
        style: { background: "#D32F2F", color: "white" },
      });
    } finally {
      // setLoading(false);
      setFormData({
        email: "",
        password: "",
        role: role,
      });
    }
  };

  const handleForgotPassword = () => {
    router.push("/forgot-password");
  };

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <div className="h-screen grid md:grid-cols-2">
        {/* Left Panel */}
        <div className="bg-green-600 p-8 text-white relative overflow-hidden">
          <div className="max-w-md mx-auto space-y-8 relative z-10">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold">
                Welcome Back to FarmConnect
              </h1>

              {/* Illustration placeholder */}
              <div className="w-full h-48 bg-white/10 rounded-lg overflow-hidden">
                {role === "farmer" && (
                  <img
                    src="https://i.pinimg.com/474x/1a/96/79/1a967961a671b7d0b59be7498ba944cc.jpg"
                    alt="Farmer illustration"
                    className="w-full h-full object-cover"
                  />
                )}
                {role === "Business" && (
                  <img
                    src="https://i.pinimg.com/474x/dc/ed/7c/dced7c801e8a47794c740eaefb39f281.jpg"
                    alt="Business illustration"
                    className="w-full h-full object-cover"
                  />
                )}
                {role === "Logistics" && (
                  <img
                    src="https://i.pinimg.com/474x/a8/c7/16/a8c7166f58eb51756f7f572c68f0e31e.jpg"
                    alt="Logistics illustration"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              <div className="space-y-4">
                {role === "farmer" && (
                  <p className="text-lg">
                    Log in to manage your produce listings and connect with
                    businesses
                  </p>
                )}

                {role === "Business" && (
                  <p className="text-lg">
                    Log in to browse and purchase fresh produce directly from
                    farmers
                  </p>
                )}

                {role === "Logistics" && (
                  <p className="text-lg">
                    Log in to manage your delivery schedule and track shipments
                  </p>
                )}

                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center mt-1">
                      <span className="text-sm">1</span>
                    </div>
                    <p className="text-sm">
                      <strong>Access Your Dashboard:</strong> View your
                      personalized dashboard
                    </p>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center mt-1">
                      <span className="text-sm">2</span>
                    </div>
                    <p className="text-sm">
                      <strong>Track Your Activities:</strong> Monitor your
                      transactions and activities
                    </p>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center mt-1">
                      <span className="text-sm">3</span>
                    </div>
                    <p className="text-sm">
                      <strong>Connect Seamlessly:</strong> Use our platform to
                      communicate with partners
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
              <h2 className="text-2xl font-semibold">Login to Your Account</h2>
              <p className="text-sm text-gray-500">
                Welcome back! Please enter your credentials to access your
                account
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <img
                  src="https://i.pinimg.com/474x/59/7f/11/597f11b631d7d94492f1adb95110cc44.jpg"
                  alt="Google"
                  className="w-5 h-5 mr-2"
                />
                <span className="text-sm">Login with Google</span>
              </button>
              <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <img
                  src="https://i.pinimg.com/474x/60/6b/c0/606bc0717982547e555a514b479365a0.jpg"
                  alt="Apple"
                  className="w-5 h-5 mr-2"
                />
                <span className="text-sm">Login with Apple</span>
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

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                <p className="text-sm">{error}</p>
              </div>
            )}

            <form className="space-y-4" onSubmit={handleSubmit}>
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

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                    className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 text-sm text-gray-600"
                  >
                    Remember me
                  </label>
                </div>
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-sm text-green-600 hover:text-green-700"
                >
                  Forgot password?
                </button>
              </div>

              {loading ? (
                <Button
                  disabled
                  className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Logging in...
                </Button>
              ) : (
                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                  Log In
                </button>
              )}
            </form>

            <p className="text-center text-sm text-gray-500">
              Don't have an account yet?{" "}
              <a
                href={`sighup?role=${role}`}
                className="text-green-600 hover:text-green-700 font-medium"
              >
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
