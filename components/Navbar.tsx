"use client";
import React, { useState } from "react";
import {
  Menu,
  X,
  ShoppingCart,
  Bell,
  Truck,
  ChevronDown,
  LogOut,
  User,
} from "lucide-react";
import useFarmConnectStore from "@/store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated: isLoggedIn, logout } = useFarmConnectStore();
  const pathname = usePathname();
  const { cart } = useFarmConnectStore();

  return (
    <nav className="fixed w-full bg-white shadow-sm z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Truck className="w-8 h-8 text-green-600" />
              <span className="text-xl font-bold text-green-600">
                FarmConnect
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              // className="text-gray-600 hover:text-green-600 transition-colors"
              className={` hover:text-green-600 transition-colors  rounded-sm ${
                pathname === "/" ? "text-green-600 " : "text-gray-600"
              }`}
            >
              Home
            </Link>
            <Link
              href="/browse"
              // className="text-gray-600 hover:text-green-600 transition-colors"
              className={` hover:text-green-600 transition-colors  rounded-sm ${
                pathname === "/browse" ? "text-green-600   " : "text-gray-600"
              }`}
            >
              Browse Produce
            </Link>
            <Link
              href="/howitworks"
              className={` hover:text-green-600 transition-colors  rounded-sm ${
                pathname === "/howitworks" ? "text-green-600 " : "text-gray-600"
              }`}
            >
              How It Works
            </Link>

            <Link
              href="/about"
              className={` hover:text-green-600 transition-colors  rounded-sm ${
                pathname === "/about" ? "text-green-600 " : "text-gray-600"
              }`}
            >
              About Us
            </Link>
            <a
              href="#"
              className="text-gray-600 hover:text-green-600 transition-colors"
            >
              Contact
            </a>
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="flex items-center gap-3 bg-white py-1 px-2 rounded-full">
                <Link
                  href="/checkout"
                  className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-full transition-colors relative"
                >
                  <ShoppingCart className="w-6 h-6" />
                  <Badge className="absolute -top-1 -right-1 bg-red-500 hover:bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center p-0">
                    {cart.length}
                  </Badge>
                </Link>
                <button className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-full transition-colors relative">
                  <Bell className="w-6 h-6" />
                  <Badge className="absolute -top-1 -right-1 bg-green-500 hover:bg-green-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center p-0">
                    0
                  </Badge>
                </button>

                <DropdownMenu>
                  <DropdownMenuTrigger className="focus:outline-none">
                    <div className="flex items-center space-x-2 p-1 hover:bg-green-50 rounded-full transition-colors">
                      <Avatar className="h-8 w-8 border border-green-100">
                        <AvatarImage
                          src="https://github.com/shadcn.png"
                          alt="User"
                        />
                        <AvatarFallback className="bg-green-100 text-green-800">
                          JD
                        </AvatarFallback>
                      </Avatar>
                      <ChevronDown className="h-4 w-4 text-gray-600" />
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer">
                      <Link className="flex" href={"/profile"}>
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={logout}
                      className="cursor-pointer text-red-600"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <>
                <Link
                  href="/sighin"
                  className="text-gray-600 hover:text-green-600 transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/sighup?role=farmer"
                  className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition-colors"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-green-600"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a
                href="#"
                className="block px-3 py-2 text-gray-600 hover:text-green-600"
              >
                Home
              </a>
              <a
                href="#how-it-works"
                className="block px-3 py-2 text-gray-600 hover:text-green-600"
              >
                How It Works
              </a>
              <a
                href="#"
                className="block px-3 py-2 text-gray-600 hover:text-green-600"
              >
                Browse Produce
              </a>
              <a
                href="#"
                className="block px-3 py-2 text-gray-600 hover:text-green-600"
              >
                For Farmers
              </a>
              <a
                href="#"
                className="block px-3 py-2 text-gray-600 hover:text-green-600"
              >
                About Us
              </a>
              <a
                href="#"
                className="block px-3 py-2 text-gray-600 hover:text-green-600"
              >
                Contact
              </a>
            </div>
            <div className="px-5 pt-4 pb-6 border-t border-gray-200">
              {isLoggedIn ? (
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8 border border-green-100">
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="User"
                      />
                      <AvatarFallback className="bg-green-100 text-green-800">
                        JD
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-gray-800 font-medium">John Doe</span>
                  </div>
                  <div className="space-y-2 pl-2">
                    <a
                      href="#"
                      className="block text-gray-600 hover:text-green-600 py-1"
                    >
                      Profile
                    </a>
                    <a
                      href="#"
                      className="block text-gray-600 hover:text-green-600 py-1"
                    >
                      My Orders
                    </a>
                    <a
                      href="#"
                      className="block text-gray-600 hover:text-green-600 py-1"
                    >
                      Settings
                    </a>
                    <a
                      href="#"
                      className="block text-red-600 hover:text-red-700 py-1"
                    >
                      Log out
                    </a>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col space-y-4">
                  <Link
                    href="/sighin"
                    className="text-gray-600 hover:text-green-600"
                  >
                    Login
                  </Link>
                  <Link
                    href="sighup?role=farmer"
                    className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
