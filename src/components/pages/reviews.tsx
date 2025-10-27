'use client';
import React, { useEffect, useState } from "react";


interface Review {
  review_id: number;
  review_text: string | null;
  rating: number;
  review_date: string;
}


const ReviewsContent = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState({ comment: "", rating: 5 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  // Fetch reviews
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch("/api/reviews");
        if (!res.ok) throw new Error("Failed to fetch reviews");
        const data = await res.json();
        setReviews(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);


  // Submit review
  const handleSubmit = async () => {
    if (!newReview.comment) return;


    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newReview),
      });
      if (!res.ok) throw new Error("Failed to submit review");
      const saved = await res.json();
      setReviews([saved, ...reviews]);
      setNewReview({ comment: "", rating: 5 });
    } catch (err: any) {
      setError(err.message);
    }
  };


  return (
    <main className="bg-[#f8f5e4] min-h-screen px-6 py-8">
      <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>


      {loading && <p>Loading reviews...</p>}
      {error && <p className="text-red-600">{error}</p>}


      {/* Reviews List */}
      <ul className="space-y-4">
        {Array.isArray(reviews) && reviews.map((review) => (
          <li key={review.review_id} className="bg-white border rounded-lg shadow-sm p-4">
            <h3 className="text-lg font-semibold">{review.review_id || "Anonymous"}</h3>
            <div className="flex space-x-1 text-yellow-500">
              {Array.from({ length: review.rating }).map((_, i) => (
                <span key={i}>★</span>
              ))}
            </div>
            <p className="mt-2 text-gray-700 italic">"{review.review_text}"</p>
          </li>
        ))}
      </ul>

      {/* Leave a Review */}
      <h3 className="text-xl font-semibold mt-8 mb-2">Leave a Review:</h3>
      <textarea
        rows={4}
        placeholder="Write your review here..."
        className="w-full border rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-[#6b7855]"
        value={newReview.comment}
        onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
      />
      <label className="block mb-2">
        Rating:
        <select
          value={newReview.rating}
          onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
          className="ml-2 border rounded p-1"
        >
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>
      </label>
      <button
        onClick={handleSubmit}
        className="bg-[#6b7855] text-white px-4 py-2 rounded-lg hover:bg-[#556344]"
      >
        Submit Review
      </button>
    </main>
  );
};


export default ReviewsContent;



