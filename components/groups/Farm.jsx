"use client";

import React, { useState } from "react";
import {
  Bell,
  BarChart3,
  Search,
  Plus,
  ShoppingCart,
  User,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronDown,
  Filter,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  ArrowRightCircle,
  Star,
  DollarSign,
  Package,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";

const FarmerDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isAddProduceOpen, setIsAddProduceOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Sample data
  const metrics = [
    {
      title: "Total Sales",
      value: "$4,382.50",
      change: "+12%",
      icon: <DollarSign className="h-8 w-8 text-green-500" />,
    },
    {
      title: "Pending Orders",
      value: "23",
      change: "+5",
      icon: <ShoppingCart className="h-8 w-8 text-blue-500" />,
    },
    {
      title: "Low Stock Items",
      value: "7",
      change: "-2",
      icon: <AlertTriangle className="h-8 w-8 text-amber-500" />,
    },
    {
      title: "Avg. Customer Rating",
      value: "4.7",
      change: "+0.2",
      icon: <Star className="h-8 w-8 text-yellow-500" />,
    },
  ];

  const products = [
    {
      id: 1,
      name: "Organic Tomatoes",
      price: "$4.99/lb",
      stock: 45,
      category: "Vegetables",
      sales: 128,
      status: "In Stock",
    },
    {
      id: 2,
      name: "Free-Range Eggs",
      price: "$5.50/dozen",
      stock: 32,
      category: "Dairy",
      sales: 87,
      status: "In Stock",
    },
    {
      id: 3,
      name: "Honey (Local)",
      price: "$12.99/jar",
      stock: 18,
      category: "Sweeteners",
      sales: 42,
      status: "Low Stock",
    },
    {
      id: 4,
      name: "Grass-Fed Beef",
      price: "$14.99/lb",
      stock: 25,
      category: "Meat",
      sales: 31,
      status: "In Stock",
    },
    {
      id: 5,
      name: "Fresh Spinach",
      price: "$3.99/bunch",
      stock: 7,
      category: "Vegetables",
      sales: 64,
      status: "Low Stock",
    },
  ];

  const orders = [
    {
      id: "#ORD-7829",
      customer: "Green Market Co-op",
      items: 5,
      total: "$235.45",
      date: "Mar 2, 2025",
      status: "Pending",
    },
    {
      id: "#ORD-7830",
      customer: "Farm-to-Table Restaurant",
      items: 8,
      total: "$342.80",
      date: "Mar 2, 2025",
      status: "Processing",
    },
    {
      id: "#ORD-7825",
      customer: "Local Grocer",
      items: 3,
      total: "$124.50",
      date: "Mar 1, 2025",
      status: "Delivered",
    },
    {
      id: "#ORD-7823",
      customer: "Weekend Farmers Market",
      items: 12,
      total: "$578.90",
      date: "Mar 1, 2025",
      status: "Delivered",
    },
  ];

  const reviews = [
    {
      customer: "Green Market Co-op",
      rating: 5,
      comment: "Incredibly fresh produce, always on time!",
      date: "Feb 28, 2025",
    },
    {
      customer: "Farm-to-Table Restaurant",
      rating: 4,
      comment: "Great quality, would recommend better packaging.",
      date: "Feb 26, 2025",
    },
    {
      customer: "Local Grocer",
      rating: 5,
      comment: "Our customers love your organic options!",
      date: "Feb 23, 2025",
    },
  ];

  const salesData = [
    { month: "Sep", sales: 2100 },
    { month: "Oct", sales: 1800 },
    { month: "Nov", sales: 2400 },
    { month: "Dec", sales: 3200 },
    { month: "Jan", sales: 2700 },
    { month: "Feb", sales: 4100 },
  ];

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div
      className={`flex h-screen ${
        isDarkMode ? "dark bg-gray-900 text-white" : "bg-gray-100"
      }`}
    >
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 fixed h-full z-10`}
      >
        <div className="p-4 flex justify-between items-center border-b dark:border-gray-700">
          {sidebarOpen && (
            <h1 className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
              FarmDash
            </h1>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        <div className="py-4">
          <div className="mb-8">
            {sidebarOpen ? (
              <div className="px-4 flex items-center">
                <div className="h-10 w-10 rounded-full bg-emerald-100 dark:bg-emerald-800 flex items-center justify-center text-emerald-600 dark:text-emerald-300">
                  JD
                </div>
                <div className="ml-3">
                  <p className="font-medium">John Doe</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Sunshine Farm
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex justify-center">
                <div className="h-10 w-10 rounded-full bg-emerald-100 dark:bg-emerald-800 flex items-center justify-center text-emerald-600 dark:text-emerald-300">
                  JD
                </div>
              </div>
            )}
          </div>
          <nav>
            <ul>
              <NavItem
                icon={<BarChart3 size={20} />}
                text="Dashboard"
                active={true}
                expanded={sidebarOpen}
              />
              <NavItem
                icon={<Package size={20} />}
                text="My Produce"
                expanded={sidebarOpen}
              />
              <NavItem
                icon={<ShoppingCart size={20} />}
                text="Orders"
                expanded={sidebarOpen}
              />
              <NavItem
                icon={<TrendingUp size={20} />}
                text="Earnings"
                expanded={sidebarOpen}
              />
              <NavItem
                icon={<Star size={20} />}
                text="Reviews"
                expanded={sidebarOpen}
              />
              <NavItem
                icon={<Settings size={20} />}
                text="Settings"
                expanded={sidebarOpen}
              />
            </ul>
          </nav>
          <div className="absolute bottom-4 w-full">
            <div
              className={`flex ${
                sidebarOpen ? "px-4 justify-between" : "justify-center"
              } items-center`}
            >
              {sidebarOpen && <span>Theme</span>}
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                {isDarkMode ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  </svg>
                )}
              </button>
            </div>
            <div className="mt-2">
              <NavItem
                icon={<LogOut size={20} />}
                text="Logout"
                expanded={sidebarOpen}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 transition-all duration-300 ${
          sidebarOpen ? "ml-64" : "ml-20"
        }`}
      >
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm">
          <div className="flex justify-between items-center p-4">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-semibold">Dashboard</h2>
              <span className="px-2 py-1 bg-emerald-100 text-emerald-800 text-xs rounded-full dark:bg-emerald-900 dark:text-emerald-200">
                Farmer
              </span>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <button className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 relative">
                  <Bell size={20} />
                  <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                    3
                  </span>
                </button>
              </div>
              <div className="relative">
                <div className="flex items-center border rounded-md px-3 py-1 bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                  <Search size={16} className="text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="ml-2 outline-none bg-transparent w-40"
                  />
                </div>
              </div>
              <button
                onClick={() => setIsAddProduceOpen(true)}
                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-md transition-colors"
              >
                <Plus size={16} />
                <span>Add Produce</span>
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-6">
          {/* Metrics */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {metrics.map((metric, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 flex items-start justify-between"
              >
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                    {metric.title}
                  </p>
                  <p className="text-2xl font-bold mt-1">{metric.value}</p>
                  <p className="text-xs text-green-500 mt-1 flex items-center">
                    {metric.change}
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded-lg">
                  {metric.icon}
                </div>
              </div>
            ))}
          </section>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2 space-y-6">
              {/* Chart */}
              <section className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold">Sales Trends</h3>
                  <button className="flex items-center text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                    <span>Last 6 Months</span>
                    <ChevronDown size={16} className="ml-1" />
                  </button>
                </div>
                <div className="h-64 w-full">
                  <div className="h-full w-full flex items-end space-x-2">
                    {salesData.map((data, index) => (
                      <div
                        key={index}
                        className="h-full flex flex-col items-center justify-end flex-1"
                      >
                        <div
                          className="w-full bg-emerald-500 rounded-t-sm hover:bg-emerald-600 transition-all cursor-pointer"
                          style={{ height: `${(data.sales / 4500) * 100}%` }}
                        ></div>
                        <span className="text-xs mt-2 text-gray-500 dark:text-gray-400">
                          {data.month}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Product Table */}
              <section className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <div className="flex items-center justify-between p-6 border-b dark:border-gray-700">
                  <h3 className="text-lg font-semibold">Manage Produce</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setIsFilterOpen(!isFilterOpen)}
                      className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                    >
                      <Filter size={18} />
                    </button>
                    <div className="relative">
                      <div className="flex items-center border rounded-md px-3 py-1 bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                        <Search size={16} className="text-gray-400" />
                        <input
                          type="text"
                          placeholder="Search products..."
                          className="ml-2 outline-none bg-transparent w-40"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-full">
                    <thead className="bg-gray-50 dark:bg-gray-700 text-left">
                      <tr>
                        <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Product
                        </th>
                        <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Price
                        </th>
                        <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Stock
                        </th>
                        <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Category
                        </th>
                        <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {products.map((product) => (
                        <tr
                          key={product.id}
                          className="hover:bg-gray-50 dark:hover:bg-gray-750"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-medium">{product.name}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {product.price}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {product.stock}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded-full text-xs">
                              {product.category}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 py-1 rounded-full text-xs ${
                                product.status === "In Stock"
                                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                  : "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200"
                              }`}
                            >
                              {product.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex space-x-2">
                              <button className="p-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                                <Edit size={16} />
                              </button>
                              <button className="p-1 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300">
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="p-4 border-t dark:border-gray-700 flex items-center justify-between">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Showing 5 of 24 products
                  </p>
                  <div className="flex space-x-1">
                    <button className="px-3 py-1 border rounded-md text-sm dark:border-gray-700">
                      1
                    </button>
                    <button className="px-3 py-1 border rounded-md text-sm bg-gray-100 dark:bg-gray-700 dark:border-gray-700">
                      2
                    </button>
                    <button className="px-3 py-1 border rounded-md text-sm dark:border-gray-700">
                      3
                    </button>
                    <button className="px-3 py-1 border rounded-md text-sm dark:border-gray-700">
                      Next
                    </button>
                  </div>
                </div>
              </section>
            </div>

            <div className="space-y-6">
              {/* Orders */}
              <section className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <div className="p-6 border-b dark:border-gray-700">
                  <h3 className="text-lg font-semibold">Incoming Orders</h3>
                </div>
                <div className="p-6 space-y-4">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="border rounded-lg p-4 dark:border-gray-700"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{order.customer}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {order.id} · {order.date}
                          </p>
                          <div className="mt-2 flex items-center gap-1">
                            <Package size={14} className="text-gray-400" />
                            <span className="text-sm">{order.items} items</span>
                            <span className="mx-2 text-gray-300 dark:text-gray-600">
                              |
                            </span>
                            <DollarSign size={14} className="text-gray-400" />
                            <span className="text-sm">{order.total}</span>
                          </div>
                        </div>
                        <div>
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              order.status === "Pending"
                                ? "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200"
                                : order.status === "Processing"
                                ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                                : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            }`}
                          >
                            {order.status}
                          </span>
                        </div>
                      </div>
                      <div className="mt-4 flex gap-2 justify-end">
                        {order.status === "Pending" && (
                          <>
                            <button className="px-3 py-1 bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-md text-sm dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">
                              Reject
                            </button>
                            <button className="px-3 py-1 bg-emerald-600 text-white hover:bg-emerald-700 rounded-md text-sm">
                              Accept
                            </button>
                          </>
                        )}
                        {order.status === "Processing" && (
                          <button className="px-3 py-1 bg-emerald-600 text-white hover:bg-emerald-700 rounded-md text-sm flex items-center gap-1">
                            <ArrowRightCircle size={14} />
                            <span>Mark as Shipped</span>
                          </button>
                        )}
                        {order.status === "Delivered" && (
                          <button className="px-3 py-1 border border-gray-200 text-gray-600 hover:bg-gray-100 rounded-md text-sm dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700">
                            View Details
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t dark:border-gray-700 text-center">
                  <button className="text-emerald-600 hover:text-emerald-700 text-sm font-medium dark:text-emerald-400 dark:hover:text-emerald-300">
                    View All Orders
                  </button>
                </div>
              </section>

              {/* Earnings */}
              <section className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-6">
                  Earnings & Payouts
                </h3>
                <div className="space-y-4">
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      Available for payout
                    </p>
                    <p className="text-2xl font-bold mt-1">$1,245.80</p>
                    <button className="mt-4 w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-md transition-colors">
                      Request Payout
                    </button>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-3 border-b dark:border-gray-700">
                      <div>
                        <p className="font-medium">This Month</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Mar 1 - Mar 31, 2025
                        </p>
                      </div>
                      <p className="text-lg font-bold">$842.50</p>
                    </div>
                    <div className="flex justify-between items-center p-3 border-b dark:border-gray-700">
                      <div>
                        <p className="font-medium">Last Month</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Feb 1 - Feb 29, 2025
                        </p>
                      </div>
                      <p className="text-lg font-bold">$1,632.75</p>
                    </div>
                    <div className="flex justify-between items-center p-3">
                      <div>
                        <p className="font-medium">Next Payout Date</p>
                      </div>
                      <p className="text-sm font-medium">Mar 15, 2025</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Reviews */}
              <section className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <div className="p-6 border-b dark:border-gray-700 flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Customer Reviews</h3>
                  <div className="flex items-center gap-1">
                    <Star
                      size={16}
                      className="text-yellow-400 fill-yellow-400"
                    />
                    <span className="font-medium">4.7</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      (32 reviews)
                    </span>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  {reviews.map((review, index) => (
                    <div
                      key={index}
                      className="border-b last:border-b-0 pb-4 last:pb-0 dark:border-gray-700"
                    >
                      <div className="flex justify-between">
                        <p className="font-medium">{review.customer}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {review.date}
                        </p>
                      </div>
                      <div className="flex gap-1 mt-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className={
                              i < review.rating
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-gray-300 dark:text-gray-600"
                            }
                          />
                        ))}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {review.comment}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t dark:border-gray-700 text-center">
                  <button className="text-emerald-600 hover:text-emerald-700 text-sm font-medium dark:text-emerald-400 dark:hover:text-emerald-300">
                    View All Reviews
                  </button>
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>

      {/* Add Product Modal */}
      {isAddProduceOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md">
            <div className="p-6 border-b dark:border-gray-700 flex justify-between items-center">
              <h3 className="text-lg font-semibold">Add New Produce</h3>
              <button
                onClick={() => setIsAddProduceOpen(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6">
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Product Name
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="e.g. Organic Tomatoes"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Price
                    </label>
                    <div className="relative">
                      <span className="absolute left-2 top-2">$</span>
                      <input
                        type="text"
                        className="w-full p-2 pl-6 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Unit
                    </label>
                    <select className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                      <option>lb</option>
                      <option>kg</option>
                      <option>bunch</option>
                      <option>each</option>
                      <option>dozen</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Category
                  </label>
                  <select className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    <option>Vegetables</option>
                    <option>Fruits</option>
                    <option>Dairy</option>
                    <option>Meat</option>
                    <option>Poultry</option>
                    <option>Grains</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Quantity in Stock
                  </label>
                  <input
                    type="number"
                    className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Description
                  </label>
                  <textarea
                    className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    rows="3"
                    placeholder="Describe your product..."
                  ></textarea>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="organic" className="mr-2" />
                  <label htmlFor="organic" className="text-sm">
                    Certified Organic
                  </label>
                </div>
              </form>
            </div>
            <div className="p-4 border-t dark:border-gray-700 flex justify-end space-x-2">
              <button
                onClick={() => setIsAddProduceOpen(false)}
                className="px-4 py-2 border rounded-md dark:border-gray-600 dark:text-gray-300"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700">
                Add Product
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Filter Popup */}
      {isFilterOpen && (
        <div
          className="fixed inset-0 flex justify-end z-30"
          onClick={() => setIsFilterOpen(false)}
        >
          <div
            className="bg-white dark:bg-gray-800 h-full w-80 shadow-lg p-6 overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-semibold text-lg">Filter Products</h3>
              <button onClick={() => setIsFilterOpen(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="space-y-6">
              <div>
                <h4 className="font-medium mb-2">Categories</h4>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="cat-vegetables"
                      className="mr-2"
                    />
                    <label htmlFor="cat-vegetables">Vegetables</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="cat-fruits" className="mr-2" />
                    <label htmlFor="cat-fruits">Fruits</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="cat-dairy" className="mr-2" />
                    <label htmlFor="cat-dairy">Dairy</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="cat-meat" className="mr-2" />
                    <label htmlFor="cat-meat">Meat</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="cat-other" className="mr-2" />
                    <label htmlFor="cat-other">Other</label>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Status</h4>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="status-in-stock"
                      className="mr-2"
                    />
                    <label htmlFor="status-in-stock">In Stock</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="status-low-stock"
                      className="mr-2"
                    />
                    <label htmlFor="status-low-stock">Low Stock</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="status-out-of-stock"
                      className="mr-2"
                    />
                    <label htmlFor="status-out-of-stock">Out of Stock</label>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Price Range</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-500 dark:text-gray-400">
                      Min ($)
                    </label>
                    <input
                      type="number"
                      className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-500 dark:text-gray-400">
                      Max ($)
                    </label>
                    <input
                      type="number"
                      className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-2">
              <button className="w-full bg-emerald-600 text-white p-2 rounded-md hover:bg-emerald-700">
                Apply Filters
              </button>
              <button className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700">
                Reset Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Navigation Item Component
const NavItem = ({ icon, text, active, expanded }) => (
  <li
    className={`mb-1 ${
      active
        ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-900 dark:bg-opacity-30 dark:text-emerald-400"
        : "text-gray-600 dark:text-gray-300"
    }`}
  >
    <a
      href="#"
      className={`flex items-center py-3 ${
        expanded ? "px-4" : "justify-center px-2"
      } rounded-md hover:bg-gray-100 dark:hover:bg-gray-700`}
    >
      {icon}
      {expanded && <span className="ml-3">{text}</span>}
    </a>
  </li>
);

export default FarmerDashboard;
