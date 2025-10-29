"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import '../../styles/home.css';

export default function AdminHome() {
  const router = useRouter();
  
  // State for dashboard metrics
  const [totalViews, setTotalViews] = useState<number>(0);
  const [totalOrders, setTotalOrders] = useState<number>(0);
  const [totalRevenue, setTotalRevenue] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch dashboard data (placeholder for now)
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        // TODO: Replace with actual API calls
        // const response = await fetch('/api/admin/dashboard');
        // const data = await response.json();
        
        // Placeholder data
        setTotalViews(100);
        setTotalOrders(12);
        setTotalRevenue(300.00);
        setError(null);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleEngagement = () => {
    router.push('/admin/engagement');
  };

  const handleSales = () => {
    router.push('/admin/sales');
  };

  const handleCatalogue = () => {
    router.push('/admin/catalogue');
  };

  const handleOrders = () => {
    router.push('/admin/orders');
  };

  const handleBackToHome = () => {
    router.push('/');
  };

  return (
    <main className="p-8">
      {/* ---------- Page Header ---------- */}
      <div className="relative mb-8">
        <h1 className="text-4xl font-bold text-center">Admin Dashboard</h1>
        <button 
          onClick={handleBackToHome}
          className="absolute right-0 top-0 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
        >
          Back to Home
        </button>
      </div>

      {/* ---------- Navigation Buttons ---------- */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        <button 
          onClick={handleEngagement}
          className="bg-[#5B6D50] text-white px-6 py-4 rounded-lg hover:bg-[#4a5a40] transition font-semibold text-lg shadow-md"
        >
          Engagement
        </button>
        <button 
          onClick={handleSales}
          className="bg-[#5B6D50] text-white px-6 py-4 rounded-lg hover:bg-[#4a5a40] transition font-semibold text-lg shadow-md"
        >
          Sales
        </button>
        <button 
          onClick={handleCatalogue}
          className="bg-[#5B6D50] text-white px-6 py-4 rounded-lg hover:bg-[#4a5a40] transition font-semibold text-lg shadow-md"
        >
          Catalogue
        </button>
        <button 
          onClick={handleOrders}
          className="bg-[#5B6D50] text-white px-6 py-4 rounded-lg hover:bg-[#4a5a40] transition font-semibold text-lg shadow-md"
        >
          Orders
        </button>
      </div>

      {/* ---------- Dashboard Metrics ---------- */}
      <h2 className="text-3xl font-bold text-center mb-6">Today's Overview</h2>

      {loading ? (
        <div className="flex justify-center items-center min-h-[300px]">
          <p className="text-lg text-gray-600">Loading dashboard data...</p>
        </div>
      ) : error ? (
        <div className="flex justify-center items-center min-h-[300px]">
          <p className="text-lg text-red-600">{error}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Total Views Card */}
          <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition">
            <div className="text-center">
              <div className="text-5xl mb-4"></div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Total Views</h3>
              <p className="text-4xl font-bold text-blue-600">{totalViews}</p>
              <p className="text-sm text-gray-500 mt-2">views today</p>
            </div>
          </div>

          {/* Total Orders Card */}
          <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition">
            <div className="text-center">
              <div className="text-5xl mb-4"></div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Orders</h3>
              <p className="text-4xl font-bold text-green-600">{totalOrders}</p>
              <p className="text-sm text-gray-500 mt-2">orders today</p>
            </div>
          </div>

          {/* Total Revenue Card */}
          <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition">
            <div className="text-center">
              <div className="text-5xl mb-4"></div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Revenue</h3>
              <p className="text-4xl font-bold text-orange-600">${totalRevenue.toFixed(2)}</p>
              <p className="text-sm text-gray-500 mt-2">revenue today</p>
            </div>
          </div>
        </div>
      )}

      {/* ---------- Quick Actions ---------- */}
      <div className="mt-12 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-3">Recent Activity</h3>
            <p className="text-gray-600">View recent orders, reviews, and customer interactions</p>
            <button 
              onClick={handleEngagement}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              View Activity
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-3">Manage Products</h3>
            <p className="text-gray-600">Add, edit, or remove products from your catalogue</p>
            <button 
              onClick={handleCatalogue}
              className="mt-4 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
            >
              Manage Catalogue
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}