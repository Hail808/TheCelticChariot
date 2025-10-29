"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Define interfaces for order data
interface Order {
  order_id: number;
  order_date: string;
  total_price: number;
  order_status: string;
  customer: {
    first_name: string;
    last_name: string;
  } | null;
  guest: {
    email: string;
  } | null;
  address: {
    street_line1: string;
    city: string;
    state: string | null;
  } | null;
  order_item: {
    quantity: number;
  }[];
}

const AdminOrders: React.FC = () => {
  const router = useRouter();
  
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filter states
  const [minCost, setMinCost] = useState<number | ''>('');
  const [maxCost, setMaxCost] = useState<number | ''>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);

  // Fetch orders from database
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/orders');
        
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        
        const data = await response.json();
        setOrders(data);
        setFilteredOrders(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError('Failed to load orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleHome = () => {
    router.push('/admin');
  };

  const handleEngagement = () => {
    router.push('/admin/engagement');
  };

  const handleSales = () => {
    router.push('/admin/sales');
  };

  const handleCatalogue = () => {
    router.push('/admin/catalogue');
  };

  const handleSort = (key: keyof Order | 'customerName' | 'itemCount') => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }

    const sorted = [...filteredOrders].sort((a, b) => {
      let aValue: any;
      let bValue: any;

      if (key === 'customerName') {
        aValue = a.customer ? `${a.customer.first_name} ${a.customer.last_name}` : 'Guest';
        bValue = b.customer ? `${b.customer.first_name} ${b.customer.last_name}` : 'Guest';
      } else if (key === 'itemCount') {
        aValue = a.order_item.reduce((sum, item) => sum + item.quantity, 0);
        bValue = b.order_item.reduce((sum, item) => sum + item.quantity, 0);
      } else {
        aValue = a[key];
        bValue = b[key];
      }

      if (aValue < bValue) return direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return direction === 'asc' ? 1 : -1;
      return 0;
    });

    setFilteredOrders(sorted);
    setSortConfig({ key, direction });
  };

  const handleFilter = () => {
    const filtered = orders.filter((order) => {
      const withinMinCost = minCost === '' || Number(order.total_price) >= minCost;
      const withinMaxCost = maxCost === '' || Number(order.total_price) <= maxCost;
      const matchesStatus = statusFilter === 'all' || order.order_status.toLowerCase() === statusFilter.toLowerCase();
      
      return withinMinCost && withinMaxCost && matchesStatus;
    });
    
    setFilteredOrders(filtered);
  };

  const handleClearFilters = () => {
    setMinCost('');
    setMaxCost('');
    setStatusFilter('all');
    setFilteredOrders(orders);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getTotalItems = (order: Order) => {
    return order.order_item.reduce((sum, item) => sum + item.quantity, 0);
  };

  const getCustomerName = (order: Order) => {
    if (order.customer) {
      return `${order.customer.first_name} ${order.customer.last_name}`;
    }
    return order.guest ? `Guest (${order.guest.email})` : 'Unknown';
  };

  const getAddress = (order: Order) => {
    if (order.address) {
      return `${order.address.street_line1}, ${order.address.city}${order.address.state ? `, ${order.address.state}` : ''}`;
    }
    return 'No address';
  };

  const getStatusBadge = (status: string) => {
    const statusLower = status.toLowerCase();
    let colorClass = '';
    
    if (statusLower.includes('delivered') || statusLower.includes('completed')) {
      colorClass = 'bg-green-100 text-green-800';
    } else if (statusLower.includes('pending') || statusLower.includes('processing')) {
      colorClass = 'bg-yellow-100 text-yellow-800';
    } else if (statusLower.includes('shipped')) {
      colorClass = 'bg-blue-100 text-blue-800';
    } else if (statusLower.includes('cancelled')) {
      colorClass = 'bg-red-100 text-red-800';
    } else {
      colorClass = 'bg-gray-100 text-gray-800';
    }
    
    return (
      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${colorClass}`}>
        {status}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="p-6 max-w-[1600px] mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">Admin Orders</h1>
        <div className="flex justify-center items-center min-h-[400px]">
          <p className="text-lg text-gray-600">Loading orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 max-w-[1600px] mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">Admin Orders</h1>
        <div className="flex justify-center items-center min-h-[400px]">
          <p className="text-lg text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  // Calculate stats
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.order_status.toLowerCase().includes('pending')).length;
  const totalRevenue = orders.reduce((sum, order) => sum + Number(order.total_price), 0);

  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      {/* Page Header */}
      <div className="relative mb-6">
        <h1 className="text-4xl font-bold text-center">Admin Orders</h1>
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
          onClick={handleSales}
          className="px-6 py-3 bg-[#5B6D50] text-white rounded-lg hover:bg-[#4a5a40] transition font-semibold"
        >
          Sales
        </button>
        <button 
          onClick={handleCatalogue}
          className="px-6 py-3 bg-[#5B6D50] text-white rounded-lg hover:bg-[#4a5a40] transition font-semibold"
        >
          Catalogue
        </button>
      </div>

      {/* Order Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Orders</h3>
          <p className="text-4xl font-bold text-blue-600">{totalOrders}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Pending Orders</h3>
          <p className="text-4xl font-bold text-orange-600">{pendingOrders}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Revenue</h3>
          <p className="text-4xl font-bold text-green-600">${totalRevenue.toFixed(2)}</p>
        </div>
      </div>

      {/* Filter Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-xl font-bold mb-4">Filter Orders</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Min Cost:</label>
            <input
              type="number"
              value={minCost}
              onChange={(e) => setMinCost(e.target.value === '' ? '' : parseFloat(e.target.value))}
              placeholder="e.g., 100"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Max Cost:</label>
            <input
              type="number"
              value={maxCost}
              onChange={(e) => setMaxCost(e.target.value === '' ? '' : parseFloat(e.target.value))}
              placeholder="e.g., 500"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Order Status:</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <div className="flex items-end gap-2">
            <button 
              onClick={handleFilter}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              Apply Filter
            </button>
            <button 
              onClick={handleClearFilters}
              className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition font-semibold"
            >
              Clear
            </button>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#5B6D50] text-white">
              <tr>
                <th 
                  onClick={() => handleSort('order_id')}
                  className="px-6 py-4 text-left font-semibold cursor-pointer hover:bg-[#4a5a40]"
                >
                  Order ID {sortConfig?.key === 'order_id' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
                </th>
                <th 
                  onClick={() => handleSort('order_date')}
                  className="px-6 py-4 text-left font-semibold cursor-pointer hover:bg-[#4a5a40]"
                >
                  Date {sortConfig?.key === 'order_date' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
                </th>
                <th 
                  onClick={() => handleSort('customerName')}
                  className="px-6 py-4 text-left font-semibold cursor-pointer hover:bg-[#4a5a40]"
                >
                  Customer {sortConfig?.key === 'customerName' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
                </th>
                <th className="px-6 py-4 text-left font-semibold">
                  Address
                </th>
                <th 
                  onClick={() => handleSort('total_price')}
                  className="px-6 py-4 text-left font-semibold cursor-pointer hover:bg-[#4a5a40]"
                >
                  Total {sortConfig?.key === 'total_price' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
                </th>
                <th 
                  onClick={() => handleSort('itemCount')}
                  className="px-6 py-4 text-left font-semibold cursor-pointer hover:bg-[#4a5a40]"
                >
                  Items {sortConfig?.key === 'itemCount' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
                </th>
                <th 
                  onClick={() => handleSort('order_status')}
                  className="px-6 py-4 text-left font-semibold cursor-pointer hover:bg-[#4a5a40]"
                >
                  Status {sortConfig?.key === 'order_status' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
                </th>
                <th className="px-6 py-4 text-left font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order, index) => (
                  <tr 
                    key={order.order_id}
                    className={`hover:bg-gray-50 transition ${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                    }`}
                  >
                    <td className="px-6 py-4 text-gray-800 font-medium">
                      #{order.order_id}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {formatDate(order.order_date)}
                    </td>
                    <td className="px-6 py-4 text-gray-800">
                      {getCustomerName(order)}
                    </td>
                    <td className="px-6 py-4 text-gray-600 text-sm">
                      {getAddress(order)}
                    </td>
                    <td className="px-6 py-4 text-green-600 font-bold">
                      ${Number(order.total_price).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-gray-800">
                      {getTotalItems(order)}
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(order.order_status)}
                    </td>
                    <td className="px-6 py-4">
                      <button 
                        onClick={() => alert(`View order details for Order #${order.order_id}`)}
                        className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="px-6 py-8 text-center text-gray-500">
                    No orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Table Footer */}
      <div className="mt-4 text-center text-gray-600">
        Showing {filteredOrders.length} of {orders.length} orders
      </div>
    </div>
  );
};

export default AdminOrders;