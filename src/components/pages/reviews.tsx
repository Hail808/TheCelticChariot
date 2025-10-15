"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "../../styles/home.css"; // Use the same styles

// Define the Review type to match your database structure
interface Review {
  review_id: number;
  review_text: string | null;
  review_date: string;
  rating: number;
  fk_customer_id: number | null;
  fk_product_id: number | null;
  customer: {
    first_name: string;
    last_name: string;
  } | null;
  product: {
    product_name: string;
    prod_image_url: string | null;
  } | null;
}

export default function Reviews() {
  const router = useRouter();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch reviews from API/database
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/reviews');
        
        if (!response.ok) {
          throw new Error('Failed to fetch reviews');
        }
        
        const data = await response.json();
        setReviews(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching reviews:', err);
        setError('Failed to load reviews');
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const navigateToProduct = (productId: number | null) => {
    if (productId) {
      router.push(`/product_page?id=${productId}`);
    }
  };

  const navigateToCatalogue = () => {
    router.push("/catalogue");
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <main className="p-8">
      {/* ---------- Page Header ---------- */}
      <h1 className="text-4xl font-bold text-center mb-8">Customer Reviews</h1>

      {/* ---------- Reviews Section ---------- */}
      {loading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <p className="text-lg text-gray-600">Loading reviews...</p>
        </div>
      ) : error ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <p className="text-lg text-red-600">{error}</p>
        </div>
      ) : reviews.length === 0 ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <p className="text-lg text-gray-600">No reviews yet. Be the first to leave a review!</p>
        </div>
      ) : (
        <div className="max-w-5xl mx-auto space-y-6">
          {reviews.map((review) => (
            <div
              key={review.review_id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              {/* Product Info */}
              {review.product && (
                <div 
                  className="flex items-center gap-4 mb-4 cursor-pointer hover:opacity-80"
                  onClick={() => navigateToProduct(review.fk_product_id)}
                >
                  {review.product.prod_image_url ? (
                    <img
                      src={review.product.prod_image_url}
                      alt={review.product.product_name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                  ) : (
                    <div className="w-20 h-20 bg-gray-300 flex items-center justify-center rounded-lg">
                      <span className="text-xs">No Image</span>
                    </div>
                  )}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 hover:underline">
                      {review.product.product_name}
                    </h3>
                    <p className="text-sm text-gray-500">Click to view product</p>
                  </div>
                </div>
              )}

              <hr className="mb-4" />

              {/* Customer Info and Rating */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <img
                    src="/userspics/defaultavatar.jpg"
                    alt="User"
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <p className="font-semibold text-gray-800">
                      {review.customer 
                        ? `${review.customer.first_name} ${review.customer.last_name}`
                        : "Anonymous"}
                    </p>
                    <p className="text-sm text-gray-500">
                      {formatDate(review.review_date)}
                    </p>
                  </div>
                </div>
                
                {/* Star Rating */}
                <div className="text-yellow-500 text-xl">
                  {"⭐".repeat(review.rating)}
                </div>
              </div>

              {/* Review Text */}
              <p className="text-gray-700 leading-relaxed">
                {review.review_text || "No review text provided"}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* ---------- Leave a Review Section ---------- */}
      <div className="max-w-5xl mx-auto mt-12 bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold mb-4">Leave a Review</h2>
        <p className="text-gray-600 mb-6">
          Visit a product page to leave a review for that specific item.
        </p>
        <button 
          onClick={navigateToCatalogue}
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition font-semibold"
        >
          Browse Products
        </button>
      </div>

      {/* ---------- Footer Message ---------- */}
      <div className="text-center mt-12 p-6 bg-gray-100 rounded-lg">
        <p className="text-gray-700 text-lg">Thank you for your feedback!</p>
      </div>
    </main>
  );
}
