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
    <div className="bg-[#f8f5e4] min-h-screen p-6 space-y-8">
      {/* Cart Header */}
      <h1 className="text-3xl font-bold mb-4">Cart</h1>

      {/* Cart Items */}
      <div className="space-y-4">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center bg-white rounded-lg shadow p-4"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-24 h-24 object-cover rounded mr-4"
            />
            <div className="flex-1">
              <h2 className="text-lg font-semibold">{item.name}</h2>
              <p className="text-gray-700">{item.price}</p>
              <div className="mt-2 flex gap-2">
                <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                  Item Count
                </button>
                <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Payment Section */}
      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        <h2 className="text-xl font-semibold">How You'll Pay</h2>
        <div className="space-y-2">
          <label className="flex items-center gap-2">
            <input type="radio" name="payment" value="paypal" />
            PayPal
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="payment" value="visa" />
            VISA
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="payment" value="mastercard" />
            MasterCard
          </label>
        </div>
        <p className="text-gray-700">Item Total: $17.00</p>
        <p className="text-gray-700">Shipping: $5.00</p>
        <p className="text-lg font-semibold">Total: $22.00</p>
        <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
          Checkout
        </button>
      </div>

      {/* Recommended Items */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Recommended Items</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {recommendedItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow p-4 flex flex-col"
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-40 w-full object-cover rounded mb-3"
              />
              <p className="font-medium">{item.name}</p>
              <p className="text-green-700 font-semibold">{item.price}</p>
              <button className="bg-green-600 text-white px-4 py-2 mt-2 rounded hover:bg-green-700">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Payment Methods */}
      <div className="bg-green-600 text-white text-center py-4 rounded hover:bg-green-700">
        <p className="mb-2">Accepted Payment Methods</p>
        <img
          src="/userspics/VisaMastercard.png"
          alt="Payment Methods"
          className="mx-auto w-28"
        />
      </div>
    </div>
  );
};

export default Cart;
