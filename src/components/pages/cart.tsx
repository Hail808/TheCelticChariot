"use client";

import React, { useState, useEffect } from "react";

const Cart = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [cart, setCart] = useState(null);
  const [cartLoading, setCartLoading] = useState(true);
  const [recommendedItems, setRecommendedItems] = useState([]);
  const [recommendedLoading, setRecommendedLoading] = useState(true);

  useEffect(() => {
    fetchCart();
    fetchRecommendedItems();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await fetch('/api/cart');
      const data = await response.json();
      if (data.success) {
        setCart(data.data);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setCartLoading(false);
    }
  };

  const fetchRecommendedItems = async () => {
    try {
      const response = await fetch('/api/items?limit=6');
      const data = await response.json();
      // Get random 3 items from the response
      const shuffled = data.sort(() => 0.5 - Math.random());
      setRecommendedItems(shuffled.slice(0, 3));
    } catch (error) {
      console.error('Error fetching recommended items:', error);
    } finally {
      setRecommendedLoading(false);
    }
  };

  const removeItem = async (itemId) => {
    try {
      const response = await fetch(`/api/cart/items/${itemId}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (data.success) {
        fetchCart();
        
        // triggers cart update event
        window.dispatchEvent(new Event('cartUpdated'));
      }
    } catch (error) {
      console.error('Error removing item:', error);
      alert('Failed to remove item');
    }
  };

  const updateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    
    try {
      const response = await fetch(`/api/cart/items/${itemId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity: newQuantity }),
      });
      const data = await response.json();
      if (data.success) {
        fetchCart();
        
        // trigger cart update event
        window.dispatchEvent(new Event('cartUpdated'));
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
      alert('Failed to update quantity');
    }
  };

  const addToCart = async (productId) => {
    try {
      const response = await fetch('/api/cart/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          productId: productId, 
          quantity: 1 
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        console.log('Added to cart');
        fetchCart();
        
        //trigger cart update event
        window.dispatchEvent(new Event('cartUpdated'));
      } else {
        alert('Error: ' + data.error);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add to cart');
    }
  };

  const handleCheckout = async () => {
    if (!cart || cart.items.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    setIsLoading(true);
    
    try {
      const stripeItems = cart.items.map(item => ({
        id: item.product.product_id,
        name: item.product.product_name,
        price: parseFloat(item.priceAtAddition),
        quantity: parseInt(item.quantity, 10)
      }));

      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items: stripeItems }),
      });

      const { url } = await response.json();
      
      window.location.href = url;
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong. Please try again.');
      setIsLoading(false);
    }
  };

  if (cartLoading) {
    return (
      <div className="min-h-screen p-6 flex items-center justify-center">
        <p className="text-xl">Loading cart...</p>
      </div>
    );
  }

  // empty cart: show recommended items and payment options
  if (!cart || cart.items.length === 0) {
    return (
      <div className="min-h-screen p-6 space-y-8 max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-[#333]">Cart</h1>
        
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-xl text-[#666] mb-4">You currently have nothing in your shopping cart.</p>
          <a href="/catalogue" className="text-[#5B6D50] hover:underline font-semibold">
            Continue Shopping
          </a>
        </div>

        {/* recommended items section */}
        <div>
          <h2 className="text-3xl font-semibold mb-6 text-[#333]">Recommended Items</h2>
          {recommendedLoading ? (
            <p className="text-center text-gray-500">Loading recommendations...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {recommendedItems.map((item) => (
                <div
                  key={item.product_id}
                  className="bg-white rounded-lg shadow-md p-4 flex flex-col hover:shadow-lg transition-shadow"
                >
                  <img
                    src={item.prod_image_url || "/productimages/placeholder.png"}
                    alt={item.product_name}
                    className="h-48 w-full object-cover rounded mb-3"
                  />
                  <p className="font-medium text-[#333] mb-2 line-clamp-2">{item.product_name}</p>
                  <p className="text-[#5B6D50] font-semibold mb-3">${parseFloat(item.price).toFixed(2)}</p>
                  <button 
                    onClick={() => addToCart(item.product_id)}
                    disabled={item.inventory < 1}
                    className={`px-4 py-2 mt-auto rounded transition-colors ${
                      item.inventory < 1 
                        ? 'bg-gray-400 text-gray-700 cursor-not-allowed' 
                        : 'bg-[#5B6D50] text-white hover:bg-[#4a5a40]'
                    }`}
                  >
                    {item.inventory < 1 ? 'Out of Stock' : 'Add to Cart'}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* payment options */}
        <div className="bg-[#5B6D50] text-white text-center py-6 rounded shadow-md">
          <h4 className="text-sm font-semibold mb-4">We Accept</h4>
          <div className="flex items-center justify-center space-x-3 flex-wrap">
            <div className="bg-white rounded-md p-2 h-8 flex items-center justify-center min-w-[50px]">
              <span className="text-[#0070ba] text-xs font-bold">PayPal</span>
            </div>
            <div className="bg-white rounded-md p-2 h-8 flex items-center justify-center min-w-[50px]">
              <span className="text-[#1a1f71] text-xs font-bold">VISA</span>
            </div>
            <div className="bg-white rounded-md p-2 h-8 flex items-center justify-center min-w-[50px]">
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-red-500 rounded-full opacity-80"></div>
                <div className="w-3 h-3 bg-yellow-400 rounded-full opacity-80"></div>
              </div>
            </div>
            <div className="bg-white rounded-md p-2 h-8 flex items-center justify-center min-w-[50px]">
              <span className="text-[#ff6000] text-xs font-bold">DISC</span>
            </div>
            <div className="bg-[#ffb3c7] rounded-md p-2 h-8 flex items-center justify-center min-w-[50px]">
              <span className="text-[#0a0a0a] text-xs font-bold">Klarna</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // when cart has items
  const total = cart.items.reduce((sum, item) => 
    sum + (parseFloat(item.priceAtAddition) * item.quantity), 0
  );

  return (
    <div className="min-h-screen p-6 space-y-8 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-[#333]">Cart</h1>

      {/* cart items */}
      <div className="space-y-4">
        {cart.items.map((item) => (
          <div
            key={item.id}
            className="flex items-center bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
          >
            <img
              src={item.product.prod_image_url || "/productimages/placeholder.png"}
              alt={item.product.product_name}
              className="w-24 h-24 object-cover rounded mr-4"
            />
            <div className="flex-1">
              <a className="text-lg font-semibold text-[#333] hover:text-[#5B6D50] transition-colors" href={`/product_page?id=${item.product.product_id}`}>
                {item.product.product_name}
              </a>
              <p className="text-[#666] mt-1">${parseFloat(item.priceAtAddition).toFixed(2)}</p>
              <div className="mt-3 flex gap-3">
                <div className="bg-[#5B6D50] text-white px-4 py-2 rounded hover:bg-[#4a5a40] transition-colors flex items-center gap-2">
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="hover:opacity-80 font-bold"
                  >
                    -
                  </button>
                  <span className="px-2">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    disabled={item.quantity >= item.product.inventory}
                    className={`font-bold hover:opacity-80 ${
                      item.quantity >= item.product.inventory ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    +
                  </button>
                </div>
                <button 
                  onClick={() => removeItem(item.id)}
                  className="bg-[#8b6f5f] text-white px-4 py-2 rounded hover:bg-[#7a5f4f] transition-colors"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* checkout section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xl font-semibold text-[#333]">Total:</span>
          <span className="text-2xl font-bold text-[#5B6D50]">${total.toFixed(2)}</span>
        </div>
        <button
          onClick={handleCheckout}
          disabled={isLoading}
          className="w-full bg-[#5B6D50] text-white px-6 py-3 rounded-lg hover:bg-[#4a5a40] transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Processing...' : 'Proceed to Checkout'}
        </button>
      </div>

      {/* recommended items section */}
      <div>
        <h2 className="text-3xl font-semibold mb-6 text-[#333]">Recommended Items</h2>
        {recommendedLoading ? (
          <p className="text-center text-gray-500">Loading recommendations...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {recommendedItems.map((item) => (
              <div
                key={item.product_id}
                className="bg-white rounded-lg shadow-md p-4 flex flex-col hover:shadow-lg transition-shadow"
              >
                <img
                  src={item.prod_image_url || "/productimages/placeholder.png"}
                  alt={item.product_name}
                  className="h-48 w-full object-cover rounded mb-3"
                />
                <p className="font-medium text-[#333] mb-2 line-clamp-2">{item.product_name}</p>
                <p className="text-[#5B6D50] font-semibold mb-3">${parseFloat(item.price).toFixed(2)}</p>
                <button 
                  onClick={() => addToCart(item.product_id)}
                  disabled={item.inventory < 1}
                  className={`px-4 py-2 mt-auto rounded transition-colors ${
                    item.inventory < 1 
                      ? 'bg-gray-400 text-gray-700 cursor-not-allowed' 
                      : 'bg-[#5B6D50] text-white hover:bg-[#4a5a40]'
                  }`}
                >
                  {item.inventory < 1 ? 'Out of Stock' : 'Add to Cart'}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default Cart;