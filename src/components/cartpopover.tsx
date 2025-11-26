"use client";
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

interface CartItem {
  id: number;
  quantity: number;
  priceAtAddition: string;
  product: {
    product_id: number;
    product_name: string;
    prod_image_url: string | null;
    price: number;
  };
}

interface CartPopoverProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartPopover({ isOpen, onClose }: CartPopoverProps) {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isOpen) {
      // Clear any pending close timeout
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
      fetchCart();
    }
  }, [isOpen]);

  const fetchCart = async () => {
    try {
      const response = await fetch('/api/cart');
      const data = await response.json();
      
      if (data.success && data.data) {
        setCartItems(data.data.items || []);
        
        const cartTotal = data.data.items.reduce((sum: number, item: CartItem) => 
          sum + (parseFloat(item.priceAtAddition) * item.quantity), 0
        );
        setTotal(cartTotal);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (itemId: number) => {
    try {
      const response = await fetch(`/api/cart/items/${itemId}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        fetchCart();
        window.dispatchEvent(new Event('cartUpdated'));
      }
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const goToCart = () => {
    router.push('/cart');
    onClose();
  };

  const goToCheckout = () => {
    router.push('/cart');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div 
      className="absolute right-0 top-full mt-0 w-96 bg-white rounded-lg shadow-2xl z-50 border border-gray-200"
      onMouseEnter={() => {
        // Clear close timeout when entering popover
        if (closeTimeoutRef.current) {
          clearTimeout(closeTimeoutRef.current);
        }
      }}
      onMouseLeave={() => {
        // Add small delay before closing
        closeTimeoutRef.current = setTimeout(() => {
          onClose();
        }, 150);
      }}
    >
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-[#333]">Shopping Cart</h3>
      </div>

      {/* Cart Items */}
      <div className="max-h-96 overflow-y-auto">
        {loading ? (
          <div className="px-6 py-8 text-center text-gray-500">
            Loading...
          </div>
        ) : cartItems.length === 0 ? (
          <div className="px-6 py-8 text-center">
            <p className="text-gray-500 mb-4">Your cart is empty</p>
            <button
            onClick={() => {
                router.push('/catalogue');
                onClose();
            }}
            className="text-[#5B6D50] hover:underline text-sm"
            >
            Continue Shopping
            </button>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {cartItems.map((item) => (
              <div key={item.id} className="px-6 py-4 hover:bg-gray-50 transition">
                <div className="flex gap-4">
                  {/* Product Image */}
                  <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                    {item.product.prod_image_url ? (
                      <img
                        src={item.product.prod_image_url}
                        alt={item.product.product_name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                        No image
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-[#333] truncate">
                      {item.product.product_name}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1">
                      Qty: {item.quantity}
                    </p>
                    <p className="text-sm font-semibold text-[#5B6D50] mt-1">
                      ${(parseFloat(item.priceAtAddition) * item.quantity).toFixed(2)}
                    </p>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-gray-400 hover:text-red-500 transition"
                    title="Remove item"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      {cartItems.length > 0 && (
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          {/* Subtotal */}
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium text-[#333]">Subtotal:</span>
            <span className="text-lg font-bold text-[#5B6D50]">
              ${total.toFixed(2)}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2">
            <button
              onClick={goToCheckout}
              className="w-full bg-white border-2 border-[#5B6D50] text-[#5B6D50] py-2.5 rounded-lg font-semibold hover:bg-gray-50 transition"
            >
              Checkout
            </button>
            <button
              onClick={goToCart}
              className="w-full bg-white border-2 border-[#5B6D50] text-[#5B6D50] py-2.5 rounded-lg font-semibold hover:bg-gray-50 transition"
            >
              View Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
}