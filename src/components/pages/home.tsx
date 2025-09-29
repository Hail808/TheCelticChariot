"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import "../../styles/home.css";

const reviews = [
  {
    text: "Yes such a great piece of jewelry",
    stars: 5,
    profileImg: "/userspics/defaultavatar.jpg",
    productImg: "/productimages/necklace1.png",
  },
  {
    text: "The necklace is beautiful and the bonus jewelry was a nice surprise!",
    stars: 4,
    profileImg: "/userspics/defaultavatar.jpg",
    productImg: "/productimages/necklace2.png",
  },
  {
    text: "Beautiful necklace! Love it and would buy from this seller again.",
    stars: 5,
    profileImg: "/userspics/defaultavatar.jpg",
    productImg: "/productimages/necklace2.png",
  },
  {
    text: "This piece is soooo beautiful!! Arrived so fast and my partner loves it! Thank you.",
    stars: 5,
    profileImg: "/userspics/defaultavatar.jpg",
    productImg: "/productimages/necklace3.png",
  },
];

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

  const navigateToCatalogue = () => {
    router.push("/catalogue");
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const getVisibleReviews = () => {
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
      <div className="featured-section">
        <button onClick={navigateToCatalogue} className="card featured-card">
          <img src="/productimages/necklace1.png" alt="Featured Item 1" />
          <span>Featured Item 1</span>
        </button>

        <button onClick={navigateToCatalogue} className="card featured-card">
          <img src="/productimages/necklace2.png" alt="Featured Item 2" />
          <span>Featured Item 2</span>
        </button>
      </div>

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
      <div className="carousel-wrapper">
        <button onClick={handlePrev} className="carousel-arrow">
          &lt;
        </button>

        <div className="carousel-track">
          {getVisibleReviews().map((review, i) => {
            const isCenter = review.indexOffset === 0;
            const isAdjacent = Math.abs(review.indexOffset) === 1;

            return (
              <div
                key={i}
                className={`review-card ${
                  isCenter ? "center" : isAdjacent ? "adjacent" : "hidden"
                }`}
              >
                <img
                  src={review.productImg}
                  alt="Product"
                  className="review-product-image"
                />
                <div className="review-details">
                  <img
                    src={review.profileImg}
                    alt="User"
                    className="review-profile-icon"
                  />
                  <div className="review-text">
                    <p>{review.text}</p>
                    <div className="review-stars">
                      {"⭐".repeat(review.stars)}
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
    </main>
  );
}
