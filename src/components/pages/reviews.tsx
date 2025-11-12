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
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5;

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/reviews?page=${page}&limit=${limit}`);
        const data = await response.json();

        setReviews(data.reviews || []);
        setTotalPages(data.totalPages || 1);
        setError(null);
      } catch (err) {
        console.error("Error fetching reviews:", err);
        setError("Failed to load reviews");
      } finally {
        setLoading(false);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };

    fetchReviews();
  }, [page]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

const handleProductClick = (productId: number | null) => {
  if (productId) {
    router.push(`/product_page?id=${productId}`);
  }
};

  return (
    <main className="p-8">
      <h1 className="text-4xl font-bold text-center mb-8">Customer Reviews</h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-600">{error}</p>
      ) : (
        <>
          <div className="max-w-5xl mx-auto space-y-6">
            {reviews.map((review) => (
              <div
                key={review.review_id}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition"
              >
                <div className="flex justify-between items-center mb-2">
                  <p className="font-semibold">
                    {review.customer
                      ? `${review.customer.first_name} ${review.customer.last_name}`
                      : "Anonymous"}
                  </p>
                  <span className="text-sm text-gray-500">
                    {formatDate(review.review_date)}
                  </span>
                </div>

                <div className="text-yellow-500 mb-2">
                  {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
                </div>

                <p className="mb-3">{review.review_text}</p>

                {review.product && (
                  <div
                    onClick={() =>
                      handleProductClick(review.fk_product_id ?? null)
                    }
                    className="flex items-center gap-3 cursor-pointer hover:bg-gray-100 p-3 rounded-lg transition"
                  >
                    {review.product.prod_image_url && (
                      <img
                        src={review.product.prod_image_url}
                        alt={review.product.product_name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                    )}
                    <div>
                      <p className="font-medium text-green-700">
                        {review.product.product_name}
                      </p>
                      <p className="text-sm text-gray-500">Click to view product</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center items-center gap-2 mt-8">
            {/* Left Arrow */}
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              className={`px-3 py-1 rounded ${
                page === 1 ? "text-gray-400 cursor-not-allowed" : "hover:bg-gray-200"
              }`}
            >
              «
            </button>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .slice(Math.max(0, page - 3), page + 2)
              .map((num) => (
                <button
                  key={num}
                  onClick={() => setPage(num)}
                  className={`px-3 py-1 rounded ${
                    num === page
                      ? "bg-green-600 text-white"
                      : "hover:bg-gray-200 text-gray-800"
                  }`}
                >
                  {num}
                </button>
              ))}

            {/* Right Arrow */}
            <button
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page === totalPages}
              className={`px-3 py-1 rounded ${
                page === totalPages
                  ? "text-gray-400 cursor-not-allowed"
                  : "hover:bg-gray-200"
              }`}
            >
              »
            </button>
          </div>
        </>
      )}
    </main>
  );
}
