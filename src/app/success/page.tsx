"use client";

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function Success() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

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
        
        {sessionId && (
          <div className="bg-gray-50 rounded p-4 mb-6">
            <p className="text-sm text-[#666]">Order confirmation</p>
            <p className="text-xs text-[#999] font-mono mt-1 break-all">{sessionId}</p>
          </div>
        )}

        <p className="text-[#666] mb-6">
          You will receive an email confirmation shortly with your order details.
        </p>

        <Link 
          href="/"
          className="inline-block bg-[#5B6D50] text-white px-6 py-3 rounded-lg hover:bg-[#4a5a40] transition-colors font-semibold"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}