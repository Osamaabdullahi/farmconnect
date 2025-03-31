"use client";

import React, { useState } from "react";
import {
  MessageCircle,
  Phone,
  HelpCircle,
  Send,
  Image,
  AlertCircle,
  Search,
  ChevronDown,
  Mail,
  FileText,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const CommunicationDashboard = () => {
  const [activeChat, setActiveChat] = useState(null);
  const [newMessage, setNewMessage] = useState("");

  const conversations = [
    {
      id: 1,
      buyer: "Fresh Foods Market",
      orderId: "ORD-123",
      unread: 2,
      lastMessage: "Are the tomatoes still available?",
      timestamp: "10:30 AM",
      messages: [
        {
          id: 1,
          sender: "buyer",
          content:
            "'Hello, I'm interested in your tomatoes', time: '10:25 AM' ",
        },
        {
          id: 2,
          sender: "farmer",
          content:
            "Yes, we have fresh tomatoes available. How many kg do you need?",
          time: "10:28 AM",
        },
        {
          id: 3,
          sender: "buyer",
          content: "Are the tomatoes still available?",
          time: "10:30 AM",
        },
      ],
    },
    {
      id: 2,
      buyer: "Green Grocers Ltd",
      orderId: "ORD-124",
      unread: 0,
      lastMessage: "Thank you for the delivery confirmation",
      timestamp: "09:15 AM",
      messages: [],
    },
  ];

  const supportTickets = [
    {
      id: "TKT-001",
      subject: "Payment Delay Issue",
      status: "open",
      priority: "high",
      created: "2025-02-17",
      lastUpdate: "2025-02-18",
    },
    {
      id: "TKT-002",
      subject: "Delivery Partner Question",
      status: "resolved",
      priority: "medium",
      created: "2025-02-16",
      lastUpdate: "2025-02-17",
    },
  ];

  const faqs = [
    {
      question: "How do I track my delivery partner?",
      answer:
        "You can track your delivery partner through the Delivery Management section. Click on any ongoing delivery to see real-time location updates.",
    },
    {
      question: "When will I receive payment for my orders?",
      answer:
        "Payments are processed within 24-48 hours after order delivery confirmation. You can track payment status in the Earnings section.",
    },
  ];

  const ChatInterface = () => (
    <div className="h-[600px] flex flex-col">
      {/* Chat List */}
      <div className="border-r w-80 h-full overflow-y-auto">
        <div className="p-4">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <Input placeholder="Search conversations" className="pl-9" />
          </div>

          {conversations.map((chat) => (
            <div
              key={chat.id}
              onClick={() => setActiveChat(chat)}
              className={`p-3 cursor-pointer rounded-lg mb-2 ${
                activeChat?.id === chat.id ? "bg-green-50" : "hover:bg-gray-50"
              }`}
            >
              <div className="flex justify-between items-start mb-1">
                <div className="font-medium">{chat.buyer}</div>
                <div className="text-xs text-gray-500">{chat.timestamp}</div>
              </div>
              <div className="text-sm text-gray-600 mb-1">
                Order: {chat.orderId}
              </div>
              <div className="text-sm text-gray-500 truncate">
                {chat.lastMessage}
              </div>
              {chat.unread > 0 && (
                <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full float-right">
                  {chat.unread}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Chat Messages */}
      {activeChat ? (
        <div className="flex-1 flex flex-col">
          <div className="border-b p-4">
            <div className="font-medium">{activeChat.buyer}</div>
            <div className="text-sm text-gray-500">
              Order: {activeChat.orderId}
            </div>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {activeChat.messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "farmer" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${
                    message.sender === "farmer"
                      ? "bg-green-500 text-white"
                      : "bg-blue-100 text-gray-800"
                  }`}
                >
                  <div className="text-sm">{message.content}</div>
                  <div className="text-xs mt-1 opacity-70">{message.time}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1"
              />
              <Button size="icon" variant="ghost">
                <Image className="h-5 w-5 text-gray-500" />
              </Button>
              <Button className="bg-green-600 hover:bg-green-700">
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-gray-500">
          Select a conversation to start messaging
        </div>
      )}
    </div>
  );

  const SupportInterface = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2 text-blue-600 mb-2">
              <MessageCircle className="h-5 w-5" />
              <h3 className="font-medium">Live Chat</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Get instant help from our support team
            </p>
            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              Start Chat
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2 text-green-600 mb-2">
              <Phone className="h-5 w-5" />
              <h3 className="font-medium">Phone Support</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Call us at +254 712 345 678
            </p>
            <Button className="w-full bg-green-600 hover:bg-green-700">
              Call Now
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2 text-purple-600 mb-2">
              <Mail className="h-5 w-5" />
              <h3 className="font-medium">Email Support</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              We'll respond within 24 hours
            </p>
            <Button className="w-full bg-purple-600 hover:bg-purple-700">
              Send Email
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium text-lg">Your Support Tickets</h3>
        {supportTickets.map((ticket) => (
          <Card key={ticket.id}>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="font-medium">{ticket.subject}</span>
                    <span className="text-sm text-gray-500">{ticket.id}</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    Created: {ticket.created} • Last Update: {ticket.lastUpdate}
                  </div>
                </div>
                <div
                  className={`px-3 py-1 rounded-full text-sm ${
                    ticket.status === "open"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {ticket.status}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="space-y-4">
        <h3 className="font-medium text-lg">Frequently Asked Questions</h3>
        {faqs.map((faq, index) => (
          <Card key={index}>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <div className="font-medium">{faq.question}</div>
                <div className="text-sm text-gray-600">{faq.answer}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Communication & Support</h1>
        <p className="text-gray-600">
          Manage your conversations and get help when needed
        </p>
      </div>

      <Tabs defaultValue="messages">
        <TabsList className="mb-6">
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="support">Support & Help</TabsTrigger>
        </TabsList>

        <TabsContent value="messages">
          <ChatInterface />
        </TabsContent>

        <TabsContent value="support">
          <SupportInterface />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CommunicationDashboard;
