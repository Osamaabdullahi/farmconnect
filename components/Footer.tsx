"use client";

import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <section className="py-20 bg-green-600">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Agricultural Trade?
            </h2>
            <p className="text-white/90 text-lg mb-8">
              Join thousands of farmers and businesses already benefiting from
              FarmConnect.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href={"/sighup?role=farmer"}
                className="bg-white text-green-600 px-8 py-4 rounded-lg hover:bg-green-50 
                transition-colors font-medium"
              >
                Sign Up as a Farmer
              </Link>
              <Link
                href={"/sighup?role=business"}
                className="bg-green-700 text-white px-8 py-4 rounded-lg hover:bg-green-800 
                transition-colors font-medium"
              >
                Sign Up as a Business
              </Link>
              <Link
                href={"/sighup?role=Logistics"}
                className="bg-green-700 text-white px-8 py-4 rounded-lg hover:bg-green-800 
                transition-colors font-medium"
              >
                Sign Up as a Deliveary
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-4 pt-16 pb-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand Column */}
          <div className="col-span-2 lg:col-span-2">
            <h2 className="text-2xl font-bold text-white">FarmConnect</h2>
            <p className="mt-4 max-w-md text-sm">
              Bridging the gap between local farmers and businesses. Our B2B
              marketplace ensures fair prices and fresh produce through direct
              farm-to-business connections.
            </p>
            <div className="mt-6 flex space-x-6">
              <a href="#" className="hover:text-green-500">
                <span className="sr-only">LinkedIn</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a href="#" className="hover:text-green-500">
                <span className="sr-only">Twitter</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
            </div>
          </div>

          {/* For Businesses */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              For Businesses
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a href="#" className="text-sm hover:text-green-500">
                  Find Suppliers
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-green-500">
                  Bulk Ordering
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-green-500">
                  Restaurant Solutions
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-green-500">
                  Wholesale Pricing
                </a>
              </li>
            </ul>
          </div>

          {/* For Farmers */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              For Farmers
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a href="#" className="text-sm hover:text-green-500">
                  List Your Produce
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-green-500">
                  Pricing Tools
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-green-500">
                  Delivery Network
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-green-500">
                  Success Stories
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Company
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a href="#" className="text-sm hover:text-green-500">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-green-500">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-green-500">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-green-500">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 border-t border-gray-800 pt-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Certifications */}
            <div className="flex items-center space-x-4">
              <span className="text-xs">Certified:</span>
              <span className="rounded bg-green-900 px-2 py-1 text-xs font-medium text-green-400">
                USDA Approved
              </span>
              <span className="rounded bg-green-900 px-2 py-1 text-xs font-medium text-green-400">
                Organic Verified
              </span>
            </div>

            {/* Contact Info */}
            <div className="text-sm">
              <span className="block">Support: (555) 123-4567</span>
              <span className="block">Email: support@farmconnect.com</span>
            </div>

            {/* Copyright */}
            <div className="text-sm text-gray-400">
              © {new Date().getFullYear()} FarmConnect. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
