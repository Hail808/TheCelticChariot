"use client"
import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

interface OrderDetails {
  order_id: string;
  order_date: string;
  total_price: number;
  order_status: string;
  reference: string;
  
  customer: {
    customer_id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone_num: string;
  } | null;
  
  guest: {
    guest_id: number;
    email: string;
    phone_num: string;
  } | null;
  
  shipping_address: {
    street_line1: string;
    street_line2: string | null;
    city: string;
    state: string | null;
    postal_code: string | null;
    country: string;
  } | null;
  
  billing_address: {
    street_line1: string;
    street_line2: string | null;
    city: string;
    state: string | null;
    postal_code: string | null;
    country: string;
  } | null;
  
  order_items: {
    order_item_id: number;
    quantity: number;
    price: number;
    product: {
      product_id: number;
      name: string;
      description: string;
      image_url: string | null;
    };
  }[];
  
  invoice: {
    invoice_number: string;
    invoice_date: string;
    due_date: string;
    payment_status: string;
  } | null;
  
  shipping: {
    shipping_id: number;
    tracking_number: string | null;
    shipping_status: string;
    carrier: string | null;
    estimated_delivery: string | null;
  } | null;
  
  payment: {
    payment_id: number;
    payment_method: string;
    payment_date: string;
    amount: number;
  } | null;
}

const OrderDetailsPage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const orderId = params.id as string;
  
  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<any>(null); // Added for debugging
  const [isEditing, setIsEditing] = useState(false);
  const [newStatus, setNewStatus] = useState('');
  const [updateLoading, setUpdateLoading] = useState(false);

  useEffect(() => {
    fetchOrderDetails();
  }, [orderId]);

  const fetchOrderDetails = async () => {
    try {
      setLoading(true);
      console.log('Fetching order:', orderId); // Debug log
      
      const response = await fetch(`/api/orders/${orderId}`);
      
      console.log('Response status:', response.status); // Debug log
      
      if (!response.ok) {
        // Get the error details from the response
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        console.error('API Error:', errorData); // Debug log
        setDebugInfo(errorData); // Store for display
        throw new Error(errorData.error || errorData.details || `HTTP ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Order data received:', data); // Debug log
      
      setOrder(data);
      setNewStatus(data.order_status);
      setError(null);
      setDebugInfo(null);
    } catch (err) {
      console.error('Error fetching order details:', err);
      setError(err instanceof Error ? err.message : 'Failed to load order details');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async () => {
    if (!order) return;
    
    try {
      setUpdateLoading(true);
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ order_status: newStatus }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update order status');
      }
      
      await fetchOrderDetails(); // Refresh data
      setIsEditing(false);
    } catch (err) {
      console.error('Error updating order:', err);
      alert('Failed to update order status');
    } finally {
      setUpdateLoading(false);
    }
  };

  const handlePrintInvoice = () => {
    window.print();
  };

  const handleSendEmail = () => {
    const email = order?.customer?.email || order?.guest?.email;
    if (email) {
      window.location.href = `mailto:${email}?subject=Order ${order?.reference} Update`;
    }
  };

  if (loading) {
    return (
      <div className="p-6 max-w-[1400px] mx-auto">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5B6D50] mx-auto mb-4"></div>
            <p className="text-lg text-gray-600">Loading order details...</p>
            <p className="text-sm text-gray-500 mt-2">Order ID: {orderId}</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="p-6 max-w-[1400px] mx-auto">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-2xl w-full">
            <p className="text-lg text-red-600 font-semibold mb-2">Error Loading Order</p>
            <p className="text-sm text-red-500 mb-4">{error || 'Order not found'}</p>
            
            {/* Debug Information */}
            {debugInfo && (
              <div className="bg-white border border-red-300 rounded p-4 mb-4">
                <p className="font-semibold text-sm mb-2">Debug Information:</p>
                <pre className="text-xs overflow-auto bg-gray-50 p-2 rounded">
                  {JSON.stringify(debugInfo, null, 2)}
                </pre>
              </div>
            )}
            
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                <strong>Order ID:</strong> {orderId}
              </p>
              <p className="text-sm text-gray-600">
                <strong>API Endpoint:</strong> /api/orders/{orderId}
              </p>
            </div>
            
            <div className="flex gap-2 mt-4">
              <button 
                onClick={() => router.push('/admin/orders')}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
              >
                Back to Orders
              </button>
              <button 
                onClick={fetchOrderDetails}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Retry
              </button>
              <button 
                onClick={() => window.open(`/api/orders/${orderId}`, '_blank')}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                Test API Directly
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    const statusLower = status.toLowerCase();
    let colorClass = '';
    
    if (statusLower.includes('delivered') || statusLower.includes('completed')) {
      colorClass = 'bg-green-100 text-green-800';
    } else if (statusLower.includes('pending')) {
      colorClass = 'bg-yellow-100 text-yellow-800';
    } else if (statusLower.includes('processing')) {
      colorClass = 'bg-blue-100 text-blue-800';
    } else if (statusLower.includes('shipped')) {
      colorClass = 'bg-purple-100 text-purple-800';
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatAddress = (address: any) => {
    if (!address) return 'N/A';
    const parts = [
      address.street_line1,
      address.street_line2,
      address.city,
      address.state,
      address.postal_code,
      address.country
    ].filter(Boolean);
    return parts.join(', ');
  };

  const subtotal = order.order_items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.0825; // 8.25% tax
  const shipping = 9.99; // Flat shipping

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <button 
            onClick={() => router.push('/admin/orders')}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
          >
            ← Back to Orders
          </button>

        <div></div>
          <h1 className="text-4xl font-bold">Order Details</h1>
          <p className="text-gray-600 mt-1">Order {order.reference}</p>
        </div>
        
        <div className="flex gap-3">
          <button
            onClick={handleSendEmail}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            📧 Email Customer
          </button>
          <button
            onClick={handlePrintInvoice}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
          >
            🖨️ Print Invoice
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Order Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Status Card */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-bold mb-2">Order Status</h2>
                {!isEditing ? (
                  <div className="flex items-center gap-3">
                    {getStatusBadge(order.order_status)}
                    <button
                      onClick={() => setIsEditing(true)}
                      className="text-sm text-blue-600 hover:text-blue-700"
                    >
                      Edit
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <select
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg"
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                    <button
                      onClick={handleUpdateStatus}
                      disabled={updateLoading}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400"
                    >
                      {updateLoading ? 'Saving...' : 'Save'}
                    </button>
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        setNewStatus(order.order_status);
                      }}
                      className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
              <div className="text-right text-sm text-gray-600">
                <p>Order Date: {formatDate(order.order_date)}</p>
                <p className="text-xs text-gray-500 mt-1">ID: {order.order_id.substring(0, 13)}...</p>
              </div>
            </div>
          </div>

          {/* Order Items Card */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Order Items</h2>
            
            {order.order_items.length === 0 ? (
              <p className="text-gray-500">No items in this order</p>
            ) : (
              <div className="space-y-4">
                {order.order_items.map((item) => (
                  <div key={item.order_item_id} className="flex gap-4 border-b pb-4 last:border-b-0">
                    {item.product.image_url && (
                      <img 
                        src={item.product.image_url} 
                        alt={item.product.name}
                        className="w-20 h-20 object-cover rounded-lg"
                        onError={(e) => {
                          e.currentTarget.src = '/placeholder-image.png';
                        }}
                      />
                    )}
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.product.name}</h3>
                      <p className="text-sm text-gray-600">{item.product.description}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        Quantity: {item.quantity} × ${item.price.toFixed(2)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Order Summary */}
            <div className="border-t mt-4 pt-4 space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping:</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax (8.25%):</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xl font-bold pt-2 border-t">
                <span>Total:</span>
                <span>${order.total_price.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Shipping Information */}
          {order.shipping && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">Shipping Information</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Status:</p>
                  <p className="font-semibold">{order.shipping.shipping_status}</p>
                </div>
                {order.shipping.tracking_number && (
                  <div>
                    <p className="text-sm text-gray-600">Tracking Number:</p>
                    <p className="font-semibold font-mono">{order.shipping.tracking_number}</p>
                  </div>
                )}
                {order.shipping.carrier && (
                  <div>
                    <p className="text-sm text-gray-600">Carrier:</p>
                    <p className="font-semibold">{order.shipping.carrier}</p>
                  </div>
                )}
                {order.shipping.estimated_delivery && (
                  <div>
                    <p className="text-sm text-gray-600">Estimated Delivery:</p>
                    <p className="font-semibold">{formatDate(order.shipping.estimated_delivery)}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Customer Info */}
        <div className="space-y-6">
          {/* Customer Information */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Customer Information</h2>
            {order.customer ? (
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Name:</p>
                  <p className="font-semibold">
                    {order.customer.first_name} {order.customer.last_name}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email:</p>
                  <p className="font-semibold">{order.customer.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Phone:</p>
                  <p className="font-semibold">{order.customer.phone_num}</p>
                </div>
                <button
                  onClick={() => router.push(`/admin/customers/${order.customer?.customer_id}`)}
                  className="w-full mt-4 px-4 py-2 bg-[#5B6D50] text-white rounded-lg hover:bg-[#4a5a40] transition"
                >
                  View Customer Profile
                </button>
              </div>
            ) : order.guest ? (
              <div className="space-y-3">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-3">
                  <p className="text-sm text-yellow-800">Guest Checkout</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email:</p>
                  <p className="font-semibold">{order.guest.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Phone:</p>
                  <p className="font-semibold">{order.guest.phone_num}</p>
                </div>
              </div>
            ) : (
              <p className="text-gray-500">No customer information available</p>
            )}
          </div>

          {/* Shipping Address */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Shipping Address</h2>
            <p className="text-gray-700 whitespace-pre-line">
              {formatAddress(order.shipping_address)}
            </p>
          </div>

          {/* Billing Address */}
          {order.billing_address && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">Billing Address</h2>
              <p className="text-gray-700 whitespace-pre-line">
                {formatAddress(order.billing_address)}
              </p>
            </div>
          )}

          {/* Payment Information */}
          {order.payment && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">Payment Information</h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Payment Method:</p>
                  <p className="font-semibold">{order.payment.payment_method}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Payment Date:</p>
                  <p className="font-semibold">{formatDate(order.payment.payment_date)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Amount Paid:</p>
                  <p className="font-semibold text-green-600">
                    ${order.payment?.amount != null ? order.payment.amount.toFixed(2) : '0.00'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Invoice Information */}
          {order.invoice && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">Invoice</h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Invoice Number:</p>
                  <p className="font-semibold font-mono">{order.invoice.invoice_number}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Invoice Date:</p>
                  <p className="font-semibold">{formatDate(order.invoice.invoice_date)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Payment Status:</p>
                  <p className="font-semibold capitalize">{order.invoice.payment_status}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;