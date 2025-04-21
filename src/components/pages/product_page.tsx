import React from 'react';
import '../../styles/product_page.css';

const ProductDetail: React.FC = () => {
  const reviews = [
    {
      id: 1,
      name: 'Kristielc830',
      date: 'Feb 20, 2025',
      text: "Beautiful necklace... Can't wait to wear it... loved the packaging!",
      rating: 5,
    },
    {
      id: 2,
      name: 'Lexi Marie',
      date: 'Feb 19, 2025',
      text: 'Really pretty! I love it so much!',
      rating: 5,
    },
    {
      id: 3,
      name: 'K8bradbury10101',
      date: 'Feb 6, 2025',
      text:
        'I love the design of this necklace and its neutral color palette makes it work nicely with the majority of my closet.',
      rating: 5,
    },
  ];

  return (
    <div className="product-container">
      {/* Product Display */}
      <div className="product-section">
        <div className="image-placeholder">Image Placeholder</div>
        <div className="product-details">
          <h1>Product Placeholder</h1>
          <p className="price">$17.00</p>
          <div className="rating">
            {'★'.repeat(5)} <span>(38 reviews)</span>
          </div>
          <p className="description">
            Materials: Crystal, Gemstone. Chain style: Beaded. Closure: Lobster claw. Necklace length: 18 inches.
          </p>
          <button className="add-to-cart-button">Add to Cart</button>
        </div>
      </div>

      {/* Reviews */}
      <div className="section">
        <h2>Reviews</h2>
        {reviews.map((review) => (
          <div key={review.id} className="review-card">
            <div className="review-header">
              <span className="review-name">{review.name}</span>
              <span className="review-date">{review.date}</span>
            </div>
            <div className="review-rating">{'★'.repeat(review.rating)}</div>
            <p>{review.text}</p>
          </div>
        ))}
      </div>

      {/* Leave a Review */}
      <div className="section">
        <h3>Leave a Review</h3>
        <textarea placeholder="Write your review here..." className="textarea"></textarea>
        <button className="submit-button">Submit Review</button>
      </div>

      Related Products
      <div className="section">
        <h3>Related Products</h3>
        <div className="related-grid">
          {[1, 2, 3].map((item) => (
            <div key={item} className="related-card">
              <div className="related-image"></div>
              <p>Product Title Placeholder</p>
              <p className="price">$13.00</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;