"use client";  // Mark as client component

import React from 'react';
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

const Home: React.FC = () => {
  
  const router = useRouter();

  // Link to /catalogue page
  const navigateToCatalogue = () => {
      router.push('/catalogue');
  };

  return (
    // Home Container
    <div className="home-container">

      {/*Featured Items Text*/}
      <div className="label-featured-items">
        Featured Items
      </div>

      {/*Featured Item Boxes*/}
      <div className="featured-cards">
        <div className="featured-cards-2">
          <NavigationButton label="Featured Item 1" onClick={navigateToCatalogue}/>
        </div>
        <div className="featured-cards-2">
          <NavigationButton label="Featured Item 2" onClick={navigateToCatalogue}/>
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

    </div>
  );
};

export default Home;