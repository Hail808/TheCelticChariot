"use client";  // Mark as client component

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import '../../styles/home.css';

// Reusable Button Component
const NavigationButton: React.FC<{ label: string; onClick: () => void }> = ({ label, onClick }) => {
  return (
    <button onClick={onClick} className="featured-item-box">
      {label}
    </button>
  );
};

const reviews = [
  {
    text: "Yes such a great piece of jewelry",
    stars: 5,
    profileImg: "/userspics/defaultavatar.jpg",
    productImg: "/productimages/necklace1.png"
  },
  {
    text: "the necklace is beautiful and the bonus jewelry was a nice surprise!",
    stars: 4,
    profileImg: "/userspics/defaultavatar.jpg",
    productImg: "/productimages/necklace2.png"
  },
  {
    text: "Beautiful necklace! Love it and would buy from this seller again.",
    stars: 5,
    profileImg: "/userspics/defaultavatar.jpg",
    productImg: "/productimages/necklace2.png"
  },
  {
    text: "this piece is soooo beautiful!! arrived so fast and my partner loves it! thank you",
    stars: 5,
    profileImg: "/userspics/defaultavatar.jpg",
    productImg: "/productimages/necklace3.png"
  },
];

const Home: React.FC = () => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Link to /catalogue page
  const navigateToCatalogue = () => {
    router.push('/catalogue');
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  // 🚀 NEW: Always return 3 reviews: center + left + right
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
    <div className="home-container">

      {/*Featured Items Text*/}
      <div className="label-featured-items">
        Featured Items
      </div>

      {/*Featured Item Boxes*/}
      <div className="featured-cards">
        <div className="featured-cards-2">
          <NavigationButton label="Featured Item 1" onClick={navigateToCatalogue} />
        </div>
        <div className="featured-cards-2">
          <NavigationButton label="Featured Item 2" onClick={navigateToCatalogue} />
        </div>
      </div>

      {/* Categories Text Itself */}
      <div className="label-categories">
        <p>Categories</p>
      </div>

      {/* Three Categories Section */}
      <div className="categories-card">
        <div className="categories-grouping">
          <div className="categories-group-label">
            <p>Necklaces</p>
          </div>
          <button onClick={navigateToCatalogue} className="category-box">
            Necklaces
          </button>
        </div>

        <div className="categories-grouping">
          <div className="categories-group-label">
            <p>Earrings</p>
          </div>
          <button onClick={navigateToCatalogue} className="category-box">
            Earrings
          </button>
        </div>

        <div className="categories-grouping">
          <div className="categories-group-label">
            <p>DIY Beads</p>
          </div>
          <button onClick={navigateToCatalogue} className="category-box">
            DIY Beads
          </button>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="label-reviews">
        <p>Reviews</p>
      </div>

      <div className="carousel-wrapper">
        <button className="carousel-arrow left" onClick={handlePrev}>&lt;</button>
        <div className="carousel-track">
          {getVisibleReviews().map((review, i) => {
            const className =
              review.indexOffset === 0 ? 'center' : 'adjacent';

            return (
              <div key={i} className={`review-card ${className}`}>
                <img src={review.productImg} alt="Product" className="review-product-image" />
                <div className="review-details">
                  <img src={review.profileImg} alt="User" className="review-profile-icon" />
                  <div className="review-text">
                    <p>{review.text}</p>
                    <div className="review-stars">{"⭐".repeat(review.stars)}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <button className="carousel-arrow right" onClick={handleNext}>&gt;</button>
      </div>


    </div>
  );
};

export default Home;