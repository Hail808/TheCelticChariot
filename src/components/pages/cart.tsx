"use client";

import React from "react";

const Cart = () => {
  const cartItems = [
    { id: 1, name: "Whimsical Sun Auburn Beaded Necklace in Bronze", price: "$17.00", image: "/productimages/necklace1.png" },
  ];

  const recommendedItems = [
    { id: 2, name: "Whimsical Dragonfly Auburn Necklace in Bronze", price: "$19.99", image: "/productimages/ItemThumbnails/NecklaceThumbnail.png" },
    { id: 3, name: "Whimsical Moon Burgundy Beaded Necklace in Brass", price: "$16.50", image: "/productimages/ItemThumbnails/NecklaceThumbnail.png" },
    { id: 4, name: "Whimsical Fall Maple Leaves Mountain Beaded Necklace in", price: "$19.99", image: "/productimages/ItemThumbnails/NecklaceThumbnail.png" },
  ];

  return (
    <div className="min-h-screen p-6 space-y-8 max-w-6xl mx-auto">
      {/* Cart Header */}
      <h1 className="text-4xl font-bold mb-6 text-[#333]">Cart</h1>

      {/* items in cart */}
      <div className="space-y-4">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-24 h-24 object-cover rounded mr-4"
            />
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-[#333]">{item.name}</h2>
              <p className="text-[#666] mt-1">{item.price}</p>
              <div className="mt-3 flex gap-3">
                <button className="bg-[#5B6D50] text-white px-4 py-2 rounded hover:bg-[#4a5a40] transition-colors">
                  Item Count
                </button>
                <button className="bg-[#8b6f5f] text-white px-4 py-2 rounded hover:bg-[#7a5f4f] transition-colors">
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* checkout section */}
      <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
        <h2 className="text-2xl font-semibold text-[#333] mb-4">How You'll Pay</h2>
        <div className="space-y-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" name="payment" value="paypal" className="cursor-pointer" />
            <span className="text-[#333]">PayPal</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" name="payment" value="visa" className="cursor-pointer" />
            <span className="text-[#333]">VISA</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" name="payment" value="mastercard" className="cursor-pointer" />
            <span className="text-[#333]">MasterCard</span>
          </label>
        </div>
        <div className="border-t pt-4 mt-4 space-y-2">
          <p className="text-[#666]">Item Total: $17.00</p>
          <p className="text-[#666]">Shipping: $5.00</p>
          <p className="text-xl font-semibold text-[#333] mt-2">Total: $22.00</p>
        </div>
        <button className="bg-[#5B6D50] text-white px-8 py-3 rounded hover:bg-[#4a5a40] transition-colors w-full mt-4 font-semibold">
          Checkout
        </button>
      </div>

      {/* recommended items section */}
      <div>
        <h2 className="text-3xl font-semibold mb-6 text-[#333]">Recommended Items</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {recommendedItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-md p-4 flex flex-col hover:shadow-lg transition-shadow"
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-48 w-full object-cover rounded mb-3"
              />
              <p className="font-medium text-[#333] mb-2">{item.name}</p>
              <p className="text-[#5B6D50] font-semibold mb-3">{item.price}</p>
              <button className="bg-[#5B6D50] text-white px-4 py-2 mt-auto rounded hover:bg-[#4a5a40] transition-colors">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* same payment method section from footer*/}
      <div className="bg-[#5B6D50] text-white text-center py-6 rounded shadow-md">
        <h4 className="text-sm font-semibold mb-4">We Accept</h4>
        <div className="flex items-center justify-center space-x-3 flex-wrap">
          {/* paypal */}
          <div className="bg-white rounded-md p-2 h-8 flex items-center justify-center min-w-[50px]">
            <span className="text-[#0070ba] text-xs font-bold">PayPal</span>
          </div>
          
          {/* visa */}
          <div className="bg-white rounded-md p-2 h-8 flex items-center justify-center min-w-[50px]">
            <span className="text-[#1a1f71] text-xs font-bold">VISA</span>
          </div>
          
          {/* mastercard */}
          <div className="bg-white rounded-md p-2 h-8 flex items-center justify-center min-w-[50px]">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-red-500 rounded-full opacity-80"></div>
              <div className="w-3 h-3 bg-yellow-400 rounded-full opacity-80"></div>
            </div>
          </div>
          
          {/* discover */}
          <div className="bg-white rounded-md p-2 h-8 flex items-center justify-center min-w-[50px]">
            <span className="text-[#ff6000] text-xs font-bold">DISC</span>
          </div>
          
          {/* klarna */}
          <div className="bg-[#ffb3c7] rounded-md p-2 h-8 flex items-center justify-center min-w-[50px]">
            <span className="text-[#0a0a0a] text-xs font-bold">Klarna</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;