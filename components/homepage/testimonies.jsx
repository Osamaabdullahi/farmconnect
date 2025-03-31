"use client";
import React, { useState } from "react";

function Testimonies() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-16">
          What Our Users Say
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              quote:
                "FarmConnect has transformed how we source our produce. The quality and pricing are unmatched.",
              author: "Sarah Johnson",
              role: "Restaurant Owner",
            },
            {
              quote:
                "As a farmer, I've seen my profits increase significantly. The platform is easy to use and payments are always on time.",
              author: "John Smith",
              role: "Local Farmer",
            },
            {
              quote:
                "The delivery tracking and quality assurance give us peace of mind with every order.",
              author: "Michael Chen",
              role: "Grocery Store Manager",
            },
          ].map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl border hover:shadow-lg transition-all"
            >
              <div className="mb-6">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400">
                    ★
                  </span>
                ))}
              </div>
              <p className="text-gray-600 mb-6">{testimonial.quote}</p>
              <div>
                <p className="font-semibold text-gray-900">
                  {testimonial.author}
                </p>
                <p className="text-gray-500">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonies;
