"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Define interface for sales data
interface MonthlySales {
  month: string;
  year: number;
  totalViews: number;
  totalOrders: number;
  revenue: number;
}

interface SalesMetrics {
  todayViews: number;
  todaySales: number;
  todayRevenue: number;
  pendingOrders: number;
  monthlySales: MonthlySales[];
}

const AdminSales: React.FC = () => {
  const router = useRouter();
  
  const [salesData, setSalesData] = useState<SalesMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch sales data from database
  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        setLoading(true);
        // TODO: Create API endpoint for sales metrics
        // const response = await fetch('/api/sales');
        // const data = await response.json();
        // setSalesData(data);
        
        // Placeholder data for now
        const placeholderData: SalesMetrics = {
          todayViews: 47,
          todaySales: 8,
          todayRevenue: 156.50,
          pendingOrders: 3,
          monthlySales: [
            {
              month: "January",
              year: 2025,
              totalViews: 1250,
              totalOrders: 45,
              revenue: 892.50
            },
            {
              month: "December",
              year: 2024,
              totalViews: 1580,
              totalOrders: 62,
              revenue: 1245.00
            },
            {
              month: "November",
              year: 2024,
              totalViews: 1420,
              totalOrders: 58,
              revenue: 1087.25
            },
            {
              month: "October",
              year: 2024,
              totalViews: 1350,
              totalOrders: 52,
              revenue: 998.00
            },
          ]
        };
        
        setSalesData(placeholderData);
        setError(null);
      } catch (err) {
        console.error('Error fetching sales data:', err);
        setError('Failed to load sales data');
      } finally {
        setLoading(false);
      }
    };

    fetchSalesData();
  }, []);

  const handleHome = () => {
    router.push('/admin');
  };

  const handleEngagement = () => {
    router.push('/admin/engagement');
  };

  const handleCatalogue = () => {
    router.push('/admin/catalogue');
  };

  const handleOrders = () => {
    router.push('/admin/orders');
  };

  if (loading) {
    return (
      <div className="p-6 max-w-[1400px] mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">Admin Sales</h1>
        <div className="flex justify-center items-center min-h-[400px]">
          <p className="text-lg text-gray-600">Loading sales data...</p>
        </div>
      </div>
    );
  }

  if (error || !salesData) {
    return (
      <div className="p-6 max-w-[1400px] mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">Admin Sales</h1>
        <div className="flex justify-center items-center min-h-[400px]">
          <p className="text-lg text-red-600">{error || 'No data available'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      {/* Page Header */}
      <div className="relative mb-6">
        <h1 className="text-4xl font-bold text-center">Admin Sales</h1>
      </div>

      {/* Navigation Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <button 
          onClick={handleHome}
          className="px-6 py-3 bg-[#5B6D50] text-white rounded-lg hover:bg-[#4a5a40] transition font-semibold"
        >
          Home
        </button>
        <button 
          onClick={handleEngagement}
          className="px-6 py-3 bg-[#5B6D50] text-white rounded-lg hover:bg-[#4a5a40] transition font-semibold"
        >
          Engagement
        </button>
        <button 
          onClick={handleCatalogue}
          className="px-6 py-3 bg-[#5B6D50] text-white rounded-lg hover:bg-[#4a5a40] transition font-semibold"
        >
          Catalogue
        </button>
        <button 
          onClick={handleOrders}
          className="px-6 py-3 bg-[#5B6D50] text-white rounded-lg hover:bg-[#4a5a40] transition font-semibold"
        >
          Orders
        </button>
      </div>

      {/* Today's Metrics */}
      <h2 className="text-2xl font-bold mb-4">Today's Performance</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-center">
            <div className="text-4xl mb-2"></div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Views Today</h3>
            <p className="text-4xl font-bold text-blue-600">{salesData.todayViews}</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-center">
            <div className="text-4xl mb-2"></div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Sales Today</h3>
            <p className="text-4xl font-bold text-green-600">{salesData.todaySales}</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-center">
            <div className="text-4xl mb-2"></div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Revenue Today</h3>
            <p className="text-4xl font-bold text-orange-600">${salesData.todayRevenue.toFixed(2)}</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-center">
            <div className="text-4xl mb-2"></div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Pending Orders</h3>
            <p className="text-4xl font-bold text-red-600">{salesData.pendingOrders}</p>
          </div>
        </div>
      </div>

      {/* Monthly Sales Table */}
      <h2 className="text-2xl font-bold mb-4">Monthly Sales History</h2>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#5B6D50] text-white">
              <tr>
                <th className="px-6 py-4 text-left font-semibold">Month</th>
                <th className="px-6 py-4 text-left font-semibold">Year</th>
                <th className="px-6 py-4 text-left font-semibold">Total Views</th>
                <th className="px-6 py-4 text-left font-semibold">Total Orders</th>
                <th className="px-6 py-4 text-left font-semibold">Revenue</th>
                <th className="px-6 py-4 text-left font-semibold">Avg Order Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {salesData.monthlySales.length > 0 ? (
                salesData.monthlySales.map((item, index) => {
                  const avgOrderValue = item.totalOrders > 0 ? item.revenue / item.totalOrders : 0;
                  return (
                    <tr 
                      key={`${item.month}-${item.year}`}
                      className={`hover:bg-gray-50 transition ${
                        index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                      }`}
                    >
                      <td className="px-6 py-4 text-gray-800 font-medium">
                        {item.month}
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {item.year}
                      </td>
                      <td className="px-6 py-4 text-blue-600 font-semibold">
                        {item.totalViews.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-gray-800 font-semibold">
                        {item.totalOrders}
                      </td>
                      <td className="px-6 py-4 text-green-600 font-bold">
                        ${item.revenue.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        ${avgOrderValue.toFixed(2)}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    No sales data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Monthly Views</h3>
          <p className="text-3xl font-bold text-blue-600">
            {salesData.monthlySales.reduce((sum, m) => sum + m.totalViews, 0).toLocaleString()}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Monthly Orders</h3>
          <p className="text-3xl font-bold text-green-600">
            {salesData.monthlySales.reduce((sum, m) => sum + m.totalOrders, 0)}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Monthly Revenue</h3>
          <p className="text-3xl font-bold text-orange-600">
            ${salesData.monthlySales.reduce((sum, m) => sum + m.revenue, 0).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminSales;