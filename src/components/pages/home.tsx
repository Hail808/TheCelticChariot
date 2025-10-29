"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "../../styles/home.css";

// Define the Item type to match your database structure
interface Item {
  product_id: number;
  product_name: string;
  description: string | null;
  price: number;
  inventory: number;
  prod_image_url: string | null;
  fk_category_id: number | null;
}

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
  indexOffset?: number;
}

const categories = [
  { name: "Necklaces", image: "/categoryimages/necklace.png" },
  { name: "Earrings", image: "/categoryimages/earrings.png" },
  { name: "Beads", image: "/categoryimages/beads.png" },
  { name: "Keychain", image: "/categoryimages/keychain.png" },
  { name: "Beaded Belt", image: "/categoryimages/belt.png" },
];

export default function Home() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [featuredItems, setFeaturedItems] = useState<Item[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reviewsError, setReviewsError] = useState<string | null>(null);

  // Fetch featured items from API/database
  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/items');
        
        if (!response.ok) {
          throw new Error('Failed to fetch items');
        }
        
        const data = await response.json();
        const featured = data.slice(0, 2);
        setFeaturedItems(featured);
        setError(null);
      } catch (err) {
        console.error('Error fetching items:', err);
        setError('Failed to load featured items');
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  // Fetch reviews from API/database
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setReviewsLoading(true);
        const response = await fetch('/api/reviews');
        
        if (!response.ok) {
          throw new Error('Failed to fetch reviews');
        }
        
        const data = await response.json();
        setReviews(data);
        setReviewsError(null);
      } catch (err) {
        console.error('Error fetching reviews:', err);
        setReviewsError('Failed to load reviews');
      } finally {
        setReviewsLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const navigateToCatalogue = () => {
    router.push("/catalogue");
  };

  const navigateToProduct = (itemId: number) => {
    router.push(`/product_page?id=${itemId}`);
  };

  const handlePrev = () => {
    if (reviews.length > 0) {
      setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
    }
  };

  const handleNext = () => {
    if (reviews.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }
  };

  // Always return 3 reviews: center + left + right
  const getVisibleReviews = () => {
    if (reviews.length === 0) return [];
    
    const total = reviews.length;
    const visible = [];
    for (let offset = -1; offset <= 1; offset++) {
      const index = (currentIndex + offset + total) % total;
      visible.push({ ...reviews[index], indexOffset: offset });
    }
    return visible;
  };

  return (
    <main className="p-8">

      {/* ---------- Featured Section ---------- */}
      <h1 className="font-another text-3xl font-bold text-center mb-6">Featured Items</h1>
      
      {loading ? (
        <div className="flex justify-center items-center min-h-[300px]">
          <p className="text-lg text-gray-600">Loading featured items...</p>
        </div>
      ) : error ? (
        <div className="flex justify-center items-center min-h-[300px]">
          <p className="text-lg text-red-600">{error}</p>
        </div>
      ) : (
        <div className="featured-section">
          {featuredItems.map((item) => (
            <div key={item.product_id} className="flex flex-col items-center gap-2">
              <button 
                onClick={() => navigateToProduct(item.product_id)} 
                className="card featured-card"
              >
                {item.prod_image_url ? (
                  <img src={item.prod_image_url} alt={item.product_name} />
                ) : (
                  <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                    <span>No Image</span>
                  </div>
                )}
              </button>
              <p className="text-lg font-semibold text-center">{item.product_name}</p>
            </div>
          ))}
        </div>
      )}

      {/* ---------- Categories Section ---------- */}
      <h1 className="text-3xl font-bold text-center mt-12 mb-6">Categories</h1>
      <div className="categories-section grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 justify-items-center">
      {[
        { name: "Necklaces", className: "category-necklaces" },
        { name: "Earrings", className: "category-earrings" },
        { name: "Beads", className: "category-beads" },
        { name: "Keychain", className: "category-keychain" },
        { name: "Beaded Belt", className: "category-belt" },
      ].map((cat) => (
        <div key={cat.name} className="flex flex-col items-center">
          <button onClick={navigateToCatalogue} className={`card category-card ${cat.className}`}>
            {/* Image goes here via background-image in CSS or <Image /> */}
          </button>
          <span className="mt-2 text-lg font-medium">{cat.name}</span>
        </div>
      ))}
    </div>

      {/* ---------- Reviews Section ---------- */}
      <h1 className="font-another text-3xl font-bold text-center mb-6 pt-4">Reviews</h1>
      
      {reviewsLoading ? (
        <div className="flex justify-center items-center min-h-[300px]">
          <p className="text-lg text-gray-600">Loading reviews...</p>
        </div>
      ) : reviewsError ? (
        <div className="flex justify-center items-center min-h-[300px]">
          <p className="text-lg text-red-600">{reviewsError}</p>
        </div>
      ) : reviews.length === 0 ? (
        <div className="flex justify-center items-center min-h-[300px]">
          <p className="text-lg text-gray-600">No reviews yet</p>
        </div>
      ) : (
        <div className="carousel-wrapper">
          <button onClick={handlePrev} className="carousel-arrow">
            &lt;
          </button>

          <div className="carousel-track">
            {getVisibleReviews().map((review, i) => {
              const isCenter = review.indexOffset === 0;
              const isAdjacent = Math.abs(review.indexOffset!) === 1;

              return (
                <div
                  key={`${review.review_id}-${review.indexOffset}`}  // Changed: combine ID with offset
                  className={`review-card ${
                    isCenter ? "center" : isAdjacent ? "adjacent" : "hidden"
                  }`}
                >
                  <img
                    src={review.product?.prod_image_url || "/productimages/placeholder.png"}
                    alt={review.product?.product_name || "Product"}
                    className="review-product-image"
                  />
                  <div className="review-details">
                    <img
                      src="/userspics/defaultavatar.jpg"
                      alt="User"
                      className="review-profile-icon"
                    />
                    <div className="review-text">
                      <p className="font-semibold">
                        {review.customer 
                          ? `${review.customer.first_name} ${review.customer.last_name}`
                          : "Anonymous"}
                      </p>
                      <p>{review.review_text || "No review text"}</p>
                      <div className="review-stars">
                        {"⭐".repeat(review.rating)}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <button onClick={handleNext} className="carousel-arrow">
            &gt;
          </button>
        </div>
      )}
    </main>
  );
}