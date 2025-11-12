"use client";

import React, { useState } from "react";

const About: React.FC = () => {

    const [form, setForm] = useState({
        first_name: "",
        last_name: "",
        email_address: "",
        commission_message: "",
    });

    const [loading, setLoading] = useState(false);
    const [feedback, setFeedback] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setFeedback("");

    const res = await fetch("/api/commissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      setFeedback("✅ Commission request saved successfully!");
      setForm({ first_name: "", last_name: "", email_address: "", commission_message: "" });
    } else {
      setFeedback(`❌ Error: ${data.error}`);
    }
    };


    return (
    <div className="max-w-5xl mx-auto px-6 py-12 space-y-12">
      {/* Title */}
      <div className="text-center">
        <h1 className="text-4xl font-bold">COMMISSIONS</h1>
        <hr className="mt-3 border-t-2 border-green-700 w-24 mx-auto" />
      </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-white shadow-md rounded-lg p-6">

                <h2 className="text-xl font-semibold"> 
                    Got a specific request? I also do commissions!
                </h2>
                <p className="mt-2 text-gray-600">
                    Provide a brief description of your request via the form to get started!
                </p>
                
                <h2 className="text-xl font-semibold"> 
                    Alternatively, here's my's email:   
                </h2>
                <p> 
                    kyleeherlihy@gmail.com 
                </p>

            </div>
            {/* Commission Form */}
            <div className="bg-white shadow-md rounded-lg p-6 space-y-4">          
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="first-name" className="block text-sm font-medium">
                    First Name
                    </label>
                    <input
                        type="text"
                        name="first_name"
                        value={form.first_name}
                        onChange={handleChange}
                        placeholder="First Name"
                        required
                        className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:ring-2 focus:ring-green-500 outline-none"
                    />
                </div>
                <div>
                    <label htmlFor="last-name" className="block text-sm font-medium">
                    Last Name
                    </label>
                    <input
                        type="text"
                        name="last_name"
                        value={form.last_name}
                        onChange={handleChange}
                        placeholder="Last Name"
                        required
                        className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:ring-2 focus:ring-green-500 outline-none"
                    />
                </div>
                </div>

                <div>
                <label htmlFor="email" className="block text-sm font-medium">
                    Email Address
                </label>
                <input
                    type="email"
                    name="email_address"
                    value={form.email_address}
                    onChange={handleChange}
                    placeholder="Your Email"
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2 mt-1 focus:ring-2 focus:ring-green-500 outline-none"
                />
                </div>

                <div>
                <label htmlFor="message" className="block text-sm font-medium">
                    Your Message
                </label>
                <textarea
                    name="commission_message"
                    value={form.commission_message}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2 mt-1 h-28 focus:ring-2 focus:ring-green-500 outline-none"
                ></textarea>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-green-700 text-white px-6 py-2 rounded hover:bg-green-600 transition"
                    >
                    {loading ? "Submitting..." : "Submit Request"}
                </button>
            </form>
                  
            {feedback && <p className="text-center mt-4">{feedback}</p>}

            </div>
        </div>

      </div>
   
    );
};

export default About;
