"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Define interface matching the API response
interface Customer {
  customer_id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_num: string;
  last_login: string | null;
  total_orders: number;
  total_spent: number;
  total_reviews: number;
}

const AdminEngagement: React.FC = () => {
  const router = useRouter();
  
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch customer data from database
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/customers');
        
        if (!response.ok) {
          throw new Error('Failed to fetch customers');
        }
        
        const data = await response.json();
        setCustomers(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching customers:', err);
        setError('Failed to load customer data');
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  const handleHome = () => {
    router.push('/admin');
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

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Never";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  if (loading) {
    return (
      <div className="p-6 max-w-[1400px] mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">Admin Engagement</h1>
        <div className="flex justify-center items-center min-h-[400px]">
          <p className="text-lg text-gray-600">Loading customer data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 max-w-[1400px] mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">Admin Engagement</h1>
        <div className="flex justify-center items-center min-h-[400px]">
          <p className="text-lg text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  // Calculate active users (logged in within last 30 days)
  const activeUsers = customers.filter(c => {
    if (!c.last_login) return false;
    const loginDate = new Date(c.last_login);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return loginDate >= thirtyDaysAgo;
  }).length;

  // Calculate total revenue from all customers
  const totalRevenue = customers.reduce((sum, customer) => sum + customer.total_spent, 0);

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      {/* Page Header */}
      <div className="relative mb-6">
        <h1 className="text-4xl font-bold text-center">Admin Engagement</h1>
      </div>

      {/* Navigation Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <button 
          onClick={handleHome}
          className="px-6 py-3 bg-[#5B6D50] text-white rounded-lg hover:hover:bg-[#4a5a40] transition font-semibold"
        >
          Home
        </button>
        <button 
          onClick={handleSales}
          className="px-6 py-3 bg-[#5B6D50] text-white rounded-lg hover:hover:bg-[#4a5a40] transition font-semibold"
        >
          Sales
        </button>
        <button 
          onClick={handleCatalogue}
          className="px-6 py-3 bg-[#5B6D50] text-white rounded-lg hover:hover:bg-[#4a5a40] transition font-semibold"
        >
          Catalogue
        </button>
        <button 
          onClick={handleOrders}
          className="px-6 py-3 bg-[#5B6D50] text-white rounded-lg hover:hover:bg-[#4a5a40] transition font-semibold"
        >
          Orders
        </button>
      </div>

      {/* Customer Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Customers</h3>
          <p className="text-4xl font-bold text-blue-600">{customers.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Active Users</h3>
          <p className="text-4xl font-bold text-green-600">{activeUsers}</p>
          <p className="text-sm text-gray-500 mt-1">Last 30 days</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Orders</h3>
          <p className="text-4xl font-bold text-purple-600">
            {customers.reduce((sum, c) => sum + c.total_orders, 0)}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Revenue</h3>
          <p className="text-4xl font-bold text-orange-600">${totalRevenue.toFixed(2)}</p>
        </div>
      </div>

      {/* Customer Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#5B6D50] text-white">
              <tr>
                <th className="px-6 py-4 text-left font-semibold">Customer ID</th>
                <th className="px-6 py-4 text-left font-semibold">Name</th>
                <th className="px-6 py-4 text-left font-semibold">Email</th>
                <th className="px-6 py-4 text-left font-semibold">Phone</th>
                <th className="px-6 py-4 text-left font-semibold">Orders</th>
                <th className="px-6 py-4 text-left font-semibold">Total Spent</th>
                <th className="px-6 py-4 text-left font-semibold">Reviews</th>
                <th className="px-6 py-4 text-left font-semibold">Last Login</th>
                <th className="px-6 py-4 text-left font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {customers.length > 0 ? (
                customers.map((customer, index) => (
                  <tr 
                    key={customer.customer_id}
                    className={`hover:bg-gray-50 transition ${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                    }`}
                  >
                    <td className="px-6 py-4 text-gray-800 font-medium">
                      #{customer.customer_id}
                    </td>
                    <td className="px-6 py-4 text-gray-800">
                      {customer.first_name} {customer.last_name}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {customer.email}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {customer.phone_num}
                    </td>
                    <td className="px-6 py-4 text-gray-800 font-semibold">
                      {customer.total_orders}
                    </td>
                    <td className="px-6 py-4 text-green-600 font-semibold">
                      ${customer.total_spent.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-gray-800">
                      {customer.total_reviews}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {formatDate(customer.last_login)}
                    </td>
                    <td className="px-6 py-4">
                      <button 
                        onClick={() => alert(`View details for ${customer.first_name} ${customer.last_name}\n\nOrders: ${customer.total_orders}\nTotal Spent: $${customer.total_spent.toFixed(2)}\nReviews: ${customer.total_reviews}`)}
                        className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="px-6 py-8 text-center text-gray-500">
                    No customer data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Table Footer */}
      <div className="mt-4 text-center text-gray-600">
        Showing {customers.length} customers
      </div>
    </div>
  );
};

export default AdminEngagement;