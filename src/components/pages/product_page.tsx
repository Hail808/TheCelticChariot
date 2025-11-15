"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { trackPageView, getSessionId, getUserId } from '@/lib/analytics';
import { useSearchParams, useRouter } from "next/navigation";

interface Customer {
  first_name: string;
  last_name: string;
}

interface Review {
  review_id: number;
  review_text: string | null;
  review_date: string;
  rating: number;
  customer: Customer | null;
}

interface Category {
  category_id: number;
  name: string;
}

interface ProductImage {
  id: number;
  product_id: number;
  image_url: string;
  is_primary: boolean;
  order: number;
}

interface Product {
  product_id: number;
  product_name: string;
  description: string | null;
  price: number;
  inventory: number;
  prod_image_url: string | null;
  fk_category_id: number | null;
  category: Category | null;
  reviews: Review[];
  images?: ProductImage[];
}

const ProductDetail: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const productId = searchParams.get('id');

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>('');

  useEffect(() => {
    if (productId) {
      const sessionId = getSessionId();
      const userId = getUserId();
      
      trackPageView(userId, sessionId, parseInt(productId));
    }
  }, [productId]);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) {
        setError('No product ID provided');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        console.log('Fetching product with ID:', productId);
        const response = await fetch(`/api/product/${productId}`);
        console.log('Response status:', response.status);
            
        if (!response.ok) {
          const errorData = await response.json();
          console.log('Error data:', errorData);
          throw new Error('Failed to fetch product');
        }
        
        const data = await response.json();
        setProduct(data);
        
        // Set initial selected image
        if (data.prod_image_url) {
          setSelectedImage(data.prod_image_url);
        } else if (data.images && data.images.length > 0) {
          setSelectedImage(data.images[0].image_url);
        }
        
        setError(null);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      if (!productId) return;

      try {
        const response = await fetch(`/api/related-products/${productId}`);
        
        if (response.ok) {
          const data = await response.json();
          setRelatedProducts(data);
        }
      } catch (err) {
        console.error('Error fetching related products:', err);
      }
    };

    fetchRelatedProducts();
  }, [productId]);

  // Get all images (primary + additional)
  const getAllImages = (): string[] => {
    if (!product) return [];
    
    const images: string[] = [];
    
    // Add primary image first
    if (product.prod_image_url) {
      images.push(product.prod_image_url);
    }
    
    // Add additional images
    if (product.images && product.images.length > 0) {
      const additionalImages = product.images
        .sort((a, b) => a.order - b.order)
        .map(img => img.image_url);
      images.push(...additionalImages);
    }
    
    return images;
  };

  // adding to cart function with counter
  const addToCart = async () => {
    if (!product || product.inventory <= 0) return;
    
    try {
      const response = await fetch('/api/cart/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          productId: product.product_id, 
          quantity: 1 
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        console.log('Added to cart successfully');
        
        // trigger cart update event
        window.dispatchEvent(new Event('cartUpdated'));
      } else {
        alert('Error: ' + data.error);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add to cart. Please log in first.');
    }
  };
  
  //Calculate average rating
  const getAverageRating = () => {
    if (!product || product.reviews.length === 0) return 0;
    const sum = product.reviews.reduce((acc, review) => acc + review.rating, 0);
    return Math.round(sum / product.reviews.length);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const navigateToProduct = (id: number) => {
    router.push(`/product_page?id=${id}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg text-gray-600">Loading product...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg text-red-600">{error || 'Product not found'}</p>
      </div>
    );
  }

  const averageRating = getAverageRating();
  const allImages = getAllImages();
  const isOutOfStock = product.inventory <= 0;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-12">
      {/* Product Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Product Images with Gallery */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="w-full aspect-square relative rounded-lg overflow-hidden bg-gray-200">
            {selectedImage ? (
              <img
                src={selectedImage}
                alt={product.product_name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <span className="text-gray-500">No image available</span>
              </div>
            )}
          </div>

          {/* Thumbnail Gallery */}
          {allImages.length > 1 && (
            <div className="grid grid-cols-5 gap-2">
              {allImages.map((imageUrl, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(imageUrl)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === imageUrl 
                      ? 'border-[#5B6D50] ring-2 ring-[#5B6D50]' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <img
                    src={imageUrl}
                    alt={`${product.product_name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}

        </div>

        {/* Product Details */}
        <div className="flex flex-col justify-center space-y-4">
          <h1 className="text-2xl font-bold">{product.product_name}</h1>
          <p className="text-lg font-semibold text-[#5B6D50]">
            ${Number(product.price).toFixed(2)}
          </p>
          <div className="flex items-center text-yellow-500">
            {"★".repeat(averageRating)}{"☆".repeat(5 - averageRating)}
            <span className="ml-2 text-gray-600">
              ({product.reviews.length} reviews)
            </span>
          </div>
          {product.description && (
            <p className="text-gray-700">{product.description}</p>
          )}
          <p className={`text-sm font-medium ${isOutOfStock ? 'text-red-600' : 'text-gray-600'}`}>
            {isOutOfStock ? 'Out of Stock' : `In stock: ${product.inventory}`}
          </p>
          
          {/* Add to Cart Button */}
          <button 
            onClick={addToCart}
            disabled={isOutOfStock}
            className={`px-6 py-2 rounded transition font-medium ${
              isOutOfStock
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-[#5B6D50] text-white hover:bg-[#4a5a40]'
            }`}
          >
            {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
          </button>
        </div>
      </div>

      {/* Reviews */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Reviews</h2>
        {product.reviews.length === 0 ? (
          <p className="text-gray-600">No reviews yet. Be the first to review!</p>
        ) : (
          product.reviews.map((review) => (
            <div
              key={review.review_id}
              className="border rounded-lg p-4 shadow-sm bg-white"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">
                  {review.customer 
                    ? `${review.customer.first_name} ${review.customer.last_name}`
                    : "Anonymous"}
                </span>
                <span className="text-sm text-gray-500">
                  {formatDate(review.review_date)}
                </span>
              </div>
              <div className="text-yellow-500 mb-2">
                {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
              </div>
              <p className="text-gray-700">
                {review.review_text || "No review text"}
              </p>
            </div>
          ))
        )}
      </div>

      {/* Leave a Review */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Leave a Review</h3>
        <textarea
          placeholder="Write your review here..."
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#5B6D50]"
        ></textarea>
        <button className="bg-[#5B6D50] text-white px-6 py-2 rounded-lg shadow hover:bg-[#4a5a40] transition">
          Submit Review
        </button>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold">Related Products</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <button
                key={relatedProduct.product_id}
                onClick={() => navigateToProduct(relatedProduct.product_id)}
                className="border rounded-lg p-4 shadow-sm hover:shadow-md transition bg-white text-left"
              >
                <div className="relative w-full h-40 rounded mb-3 overflow-hidden bg-gray-200">
                  {relatedProduct.prod_image_url ? (
                    <img
                      src={relatedProduct.prod_image_url}
                      alt={relatedProduct.product_name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <span className="text-gray-500 text-sm">No image</span>
                    </div>
                  )}
                </div>
                <p className="font-medium">{relatedProduct.product_name}</p>
                <p className="text-[#5B6D50] font-semibold">
                  ${Number(relatedProduct.price).toFixed(2)}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;