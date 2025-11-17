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
  is_registered_user: boolean;
  user_account_id: string | null;
  total_orders: number;
  total_spent: number;
  total_reviews: number;
  created_at?: string;
  first_order_date?: string | null;
}

type SortField = 'name' | 'orders' | 'spent' | 'reviews' | 'last_login';
type SortOrder = 'asc' | 'desc';
type FilterStatus = 'all' | 'active' | 'inactive' | 'vip' | 'new';
type FilterUserType = 'all' | 'registered' | 'guest';

const AdminEngagement: React.FC = () => {
  const router = useRouter();
  
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filter and sort states
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  const [filterUserType, setFilterUserType] = useState<FilterUserType>('all');
  const [sortField, setSortField] = useState<SortField>('spent');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

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

  // Apply filters and sorting
  useEffect(() => {
    let filtered = [...customers];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(c => 
        `${c.first_name} ${c.last_name}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply user type filter
    if (filterUserType !== 'all') {
      filtered = filtered.filter(c => {
        if (filterUserType === 'registered') return c.is_registered_user;
        if (filterUserType === 'guest') return !c.is_registered_user;
        return true;
      });
    }

    // Apply status filter
    if (filterStatus !== 'all') {
      filtered = filtered.filter(c => {
        const status = getCustomerStatus(c);
        return status === filterStatus;
      });
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let compareValue = 0;

      switch (sortField) {
        case 'name':
          compareValue = `${a.first_name} ${a.last_name}`.localeCompare(`${b.first_name} ${b.last_name}`);
          break;
        case 'orders':
          compareValue = a.total_orders - b.total_orders;
          break;
        case 'spent':
          compareValue = a.total_spent - b.total_spent;
          break;
        case 'reviews':
          compareValue = a.total_reviews - b.total_reviews;
          break;
        case 'last_login':
          const dateA = a.last_login ? new Date(a.last_login).getTime() : 0;
          const dateB = b.last_login ? new Date(b.last_login).getTime() : 0;
          compareValue = dateA - dateB;
          break;
      }

      return sortOrder === 'asc' ? compareValue : -compareValue;
    });

    setFilteredCustomers(filtered);
  }, [customers, searchQuery, filterStatus, filterUserType, sortField, sortOrder]);

  const handleHome = () => {
    router.push('/admin');
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

  const getDaysSinceLastLogin = (lastLogin: string | null): number => {
    if (!lastLogin) return Infinity;
    const loginDate = new Date(lastLogin);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - loginDate.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getCustomerStatus = (customer: Customer): FilterStatus => {
    const daysSinceLogin = getDaysSinceLastLogin(customer.last_login);
    
    // VIP: spent > $500 or orders > 10
    if (customer.total_spent > 500 || customer.total_orders > 10) {
      return 'vip';
    }
    
    // New: first order in last 30 days
    if (customer.first_order_date) {
      const firstOrderDate = new Date(customer.first_order_date);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      if (firstOrderDate >= thirtyDaysAgo) {
        return 'new';
      }
    }
    
    // Active: logged in within last 30 days
    if (daysSinceLogin <= 30) {
      return 'active';
    }
    
    // Inactive: logged in more than 30 days ago or never
    return 'inactive';
  };

  const getStatusBadge = (customer: Customer) => {
    const status = getCustomerStatus(customer);
    const badges = {
      vip: 'bg-purple-100 text-purple-800 border-purple-300',
      active: 'bg-green-100 text-green-800 border-green-300',
      inactive: 'bg-gray-100 text-gray-800 border-gray-300',
      new: 'bg-blue-100 text-blue-800 border-blue-300',
    };

    const labels = {
      vip: '👑 VIP',
      active: '✓ Active',
      inactive: '○ Inactive',
      new: '★ New',
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${badges[status]}`}>
        {labels[status]}
      </span>
    );
  };

  const getUserTypeBadge = (customer: Customer) => {
    if (customer.is_registered_user) {
      return (
        <span className="px-2 py-1 rounded-full text-xs font-semibold border bg-blue-100 text-blue-800 border-blue-300">
          👤 Registered
        </span>
      );
    } else {
      return (
        <span className="px-2 py-1 rounded-full text-xs font-semibold border bg-gray-100 text-gray-800 border-gray-300">
           Guest
        </span>
      );
    }
  };

  const getAvgOrderValue = (customer: Customer): number => {
    if (customer.total_orders === 0) return 0;
    return customer.total_spent / customer.total_orders;
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return '↕';
    return sortOrder === 'asc' ? '↑' : '↓';
  };

  if (loading) {
    return (
      <div className="p-6 max-w-[1600px] mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">Admin Engagement</h1>
        <div className="flex justify-center items-center min-h-[400px]">
          <p className="text-lg text-gray-600">Loading customer data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 max-w-[1600px] mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">Admin Engagement</h1>
        <div className="flex justify-center items-center min-h-[400px]">
          <p className="text-lg text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  // Calculate stats
  const activeUsers = customers.filter(c => getCustomerStatus(c) === 'active').length;
  const vipUsers = customers.filter(c => getCustomerStatus(c) === 'vip').length;
  const newUsers = customers.filter(c => getCustomerStatus(c) === 'new').length;
  const registeredUsers = customers.filter(c => c.is_registered_user).length;
  const guestUsers = customers.filter(c => !c.is_registered_user).length;
  const totalRevenue = customers.reduce((sum, customer) => sum + customer.total_spent, 0);
  const avgCustomerValue = customers.length > 0 ? totalRevenue / customers.length : 0;
  const totalOrders = customers.reduce((sum, c) => sum + c.total_orders, 0);

  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      {/* Page Header */}
      <div className="relative mb-6">
        <h1 className="text-4xl font-bold text-center">Customer Engagement Analytics</h1>
        <button 
          onClick={handleHome}
          className="absolute right-0 top-0 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
        >
          Back to Admin Home
        </button>
      </div>

      {/* Navigation Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-2 gap-4 mb-8">
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

      {/* Enhanced Customer Stats */}
      <div className="grid grid-cols-2 md:grid-cols-7 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-1">Total Customers</h3>
          <p className="text-3xl font-bold text-gray-700">{customers.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-1">Registered</h3>
          <p className="text-3xl font-bold text-blue-600">{registeredUsers}</p>
          <p className="text-xs text-gray-500 mt-1">{((registeredUsers / customers.length) * 100).toFixed(1)}%</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-1">Guests</h3>
          <p className="text-3xl font-bold text-gray-600">{guestUsers}</p>
          <p className="text-xs text-gray-500 mt-1">{((guestUsers / customers.length) * 100).toFixed(1)}%</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-1">Active Users</h3>
          <p className="text-3xl font-bold text-green-600">{activeUsers}</p>
          <p className="text-xs text-gray-500 mt-1">Last 30 days</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-1">VIP Customers</h3>
          <p className="text-3xl font-bold text-purple-600">{vipUsers}</p>
          <p className="text-xs text-gray-500 mt-1">{((vipUsers / customers.length) * 100).toFixed(1)}%</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-1">Avg Customer Value</h3>
          <p className="text-3xl font-bold text-gray-700">${avgCustomerValue.toFixed(0)}</p>
          <p className="text-xs text-gray-500 mt-1">Lifetime</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-1">Total Revenue</h3>
          <p className="text-3xl font-bold text-gray-700">${totalRevenue.toFixed(0)}</p>
          <p className="text-xs text-gray-500 mt-1">{totalOrders} orders</p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="space-y-4">
          {/* Search Bar */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Search Customers
            </label>
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5B6D50] focus:border-transparent"
            />
          </div>

          {/* User Type Filter */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Filter by User Type
            </label>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setFilterUserType('all')}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  filterUserType === 'all'
                    ? 'bg-[#5B6D50] text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                All ({customers.length})
              </button>
              <button
                onClick={() => setFilterUserType('registered')}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  filterUserType === 'registered'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                👤 Registered ({registeredUsers})
              </button>
              <button
                onClick={() => setFilterUserType('guest')}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  filterUserType === 'guest'
                    ? 'bg-gray-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                👥 Guests ({guestUsers})
              </button>
            </div>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Filter by Activity Status
            </label>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setFilterStatus('all')}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  filterStatus === 'all'
                    ? 'bg-[#5B6D50] text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterStatus('active')}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  filterStatus === 'active'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Active ({activeUsers})
              </button>
              <button
                onClick={() => setFilterStatus('vip')}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  filterStatus === 'vip'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                VIP ({vipUsers})
              </button>
              <button
                onClick={() => setFilterStatus('new')}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  filterStatus === 'new'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                New ({newUsers})
              </button>
              <button
                onClick={() => setFilterStatus('inactive')}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  filterStatus === 'inactive'
                    ? 'bg-gray-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Inactive
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#5B6D50] text-white">
              <tr>
                <th className="px-4 py-4 text-left font-semibold">ID</th>
                <th 
                  className="px-4 py-4 text-left font-semibold cursor-pointer hover:bg-[#4a5a40]"
                  onClick={() => handleSort('name')}
                >
                  Name {getSortIcon('name')}
                </th>
                <th className="px-4 py-4 text-left font-semibold">Type</th>
                <th className="px-4 py-4 text-left font-semibold">Status</th>
                <th className="px-4 py-4 text-left font-semibold">Contact</th>
                <th 
                  className="px-4 py-4 text-left font-semibold cursor-pointer hover:bg-[#4a5a40]"
                  onClick={() => handleSort('orders')}
                >
                  Orders {getSortIcon('orders')}
                </th>
                <th 
                  className="px-4 py-4 text-left font-semibold cursor-pointer hover:bg-[#4a5a40]"
                  onClick={() => handleSort('spent')}
                >
                  Total Spent {getSortIcon('spent')}
                </th>
                <th className="px-4 py-4 text-left font-semibold">Avg Order</th>
                <th 
                  className="px-4 py-4 text-left font-semibold cursor-pointer hover:bg-[#4a5a40]"
                  onClick={() => handleSort('reviews')}
                >
                  Reviews {getSortIcon('reviews')}
                </th>
                <th 
                  className="px-4 py-4 text-left font-semibold cursor-pointer hover:bg-[#4a5a40]"
                  onClick={() => handleSort('last_login')}
                >
                  Last Login {getSortIcon('last_login')}
                </th>
                <th className="px-4 py-4 text-left font-semibold">Days Since</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredCustomers.length > 0 ? (
                filteredCustomers.map((customer, index) => {
                  const daysSinceLogin = getDaysSinceLastLogin(customer.last_login);
                  const avgOrderValue = getAvgOrderValue(customer);
                  
                  return (
                    <tr 
                      key={customer.customer_id}
                      className={`hover:bg-gray-100 transition ${
                        index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                      }`}
                    >
                      <td className="px-4 py-4 text-gray-800 font-medium">
                        #{customer.customer_id}
                      </td>
                      <td className="px-4 py-4 text-gray-800 font-semibold">
                        {customer.first_name} {customer.last_name}
                      </td>
                      <td className="px-4 py-4">
                        {getUserTypeBadge(customer)}
                      </td>
                      <td className="px-4 py-4">
                        {getStatusBadge(customer)}
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-sm">
                          <div className="text-gray-800">{customer.email}</div>
                          <div className="text-gray-500">{customer.phone_num}</div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-gray-800 font-semibold text-center">
                        {customer.total_orders}
                      </td>
                      <td className="px-4 py-4 text-gray-700 font-medium">
                        ${customer.total_spent.toFixed(2)}
                      </td>
                      <td className="px-4 py-4 text-gray-700 font-medium">
                        ${avgOrderValue.toFixed(2)}
                      </td>
                      <td className="px-4 py-4 text-gray-800 text-center">
                        {customer.total_reviews}
                      </td>
                      <td className="px-4 py-4 text-gray-600 text-sm">
                        {formatDate(customer.last_login)}
                      </td>
                      <td className="px-4 py-4 text-gray-600 text-sm">
                        {daysSinceLogin === Infinity ? (
                          <span className="text-red-500">Never</span>
                        ) : daysSinceLogin === 0 ? (
                          <span className="text-green-600 font-semibold">Today</span>
                        ) : (
                          <span className={daysSinceLogin > 30 ? 'text-red-500' : 'text-gray-600'}>
                            {daysSinceLogin}d ago
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={11} className="px-6 py-8 text-center text-gray-500">
                    No customers found matching your filters
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Table Footer */}
      <div className="mt-4 text-center text-gray-600">
        Showing {filteredCustomers.length} of {customers.length} customers
      </div>
    </div>
  );
};

export default AdminEngagement;