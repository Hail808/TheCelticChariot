"use client";

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Success() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [orderReference, setOrderReference] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderReference = async () => {
      if (!sessionId) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/order-reference?session_id=${sessionId}`);
        const data = await response.json();
        
        if (data.reference) {
          setOrderReference(data.reference);
        }
      } catch (error) {
        console.error('Failed to fetch order reference:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderReference();
  }, [sessionId]);

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-[#333] mb-2">Payment Successful!</h1>
          <p className="text-[#666]">Thank you for your purchase.</p>
        </div>
        
        {loading ? (
          <div className="bg-gray-50 rounded p-4 mb-6">
            <p className="text-sm text-[#666]">Loading order details...</p>
          </div>
        ) : orderReference ? (
          <div className="bg-gray-50 rounded p-4 mb-6">
            <p className="text-sm text-[#666] mb-2">Order Number</p>
            <p className="text-2xl font-bold text-[#5B6D50] font-mono">{orderReference}</p>
            <Link 
              href={`/user_dashboard/order/${orderReference}`}
              className="text-sm text-[#5B6D50] hover:underline mt-2 inline-block"
            >
              View Order Details →
            </Link>
          </div>
        ) : null}

        <p className="text-[#666] mb-6">
          You will receive an email confirmation shortly with your order details.
        </p>

        <div className="flex gap-3 justify-center">
          <Link 
            href="/"
            className="inline-block bg-[#5B6D50] text-white px-6 py-3 rounded-lg hover:bg-[#4a5a40] transition-colors font-semibold"
          >
            Continue Shopping
          </Link>
          
          {orderReference && (
            <Link 
              href="/user_dashboard"
              className="inline-block bg-white border-2 border-[#5B6D50] text-[#5B6D50] px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
            >
              My Orders
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}