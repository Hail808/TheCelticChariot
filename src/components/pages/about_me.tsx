"use client";

import React from "react";
import { FaInstagram, FaTiktok } from "react-icons/fa";

const About: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 space-y-12">
      {/* Title */}
      <div className="text-center">
        <h1 className="text-4xl font-bold">About Me</h1>
        <hr className="mt-3 border-t-2 border-green-700 w-24 mx-auto" />
      </div>

      {/* Top text */}
      <div className="text-left text-gray-700 max-w-3xl mx-auto">
        <p>
          I just make handmade jewelry as a hobby and I try and price my products as low as possible.
          I want my jewelry to be beautiful but not break the bank at the same time. 
          The profit I make off the jewelry is going towards paying my masters program and I plan on continuing to sell as a hobby as well!
        </p>
      </div>

      {/* Owner & Co-Owner Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold">Kylee Herlihy</h2>
          <p className="text-green-700 font-medium">Owner</p>
          <p className="mt-2 text-gray-600">
            I'm a college student who enjoys making custom-made jewelry. The extra money helps
            pay for my studies, and I enjoy sharing my culture through my jewelry.
          </p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold">Nicole</h2>
          <p className="text-green-700 font-medium">Creator, Designer</p>
          <p className="mt-2 text-gray-600">
            I make handmade bags and necklaces for the shop!
          </p>
        </div>
      </div>

      {/* Contact Form + Social Media */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
          <h2 className="text-2xl font-semibold">Contact Me</h2>
          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="first-name" className="block text-sm font-medium">
                  First name
                </label>
                <input
                  type="text"
                  id="first-name"
                  placeholder="First name"
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:ring-2 focus:ring-green-500 outline-none"
                />
              </div>
              <div>
                <label htmlFor="last-name" className="block text-sm font-medium">
                  Last name
                </label>
                <input
                  type="text"
                  id="last-name"
                  placeholder="Last name"
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:ring-2 focus:ring-green-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email address
              </label>
              <input
                type="email"
                id="email"
                placeholder="Your Email"
                required
                className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium">
                Your message
              </label>
              <textarea
                id="message"
                placeholder="Your Message"
                required
                className="w-full border border-gray-300 rounded px-3 py-2 mt-1 h-28 focus:ring-2 focus:ring-green-500 outline-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-green-700 text-white px-6 py-2 rounded hover:bg-green-600 transition"
            >
              Submit
            </button>
          </form>
        </div>

        {/* Social Media */}
        <div className="flex flex-col items-center justify-center text-center space-y-4">
          <h3 className="text-xl font-semibold">Follow me on these websites:</h3>
          <div className="flex gap-6 text-3xl text-green-700">
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="hover:text-pink-600 transition" />
            </a>
            <a href="https://www.tiktok.com/" target="_blank" rel="noopener noreferrer">
              <FaTiktok className="hover:text-black transition" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
