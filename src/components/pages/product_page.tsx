import React from "react";
import Image from "next/image";


const ProductDetail: React.FC = () => {
  const reviews = [
    {
      id: 1,
      name: "Kristielc830",
      date: "Feb 20, 2025",
      text: "Beautiful necklace... Can't wait to wear it... loved the packaging!",
      rating: 5,
    },
    {
      id: 2,
      name: "Lexi Marie",
      date: "Feb 19, 2025",
      text: "Really pretty! I love it so much!",
      rating: 5,
    },
    {
      id: 3,
      name: "K8bradbury10101",
      date: "Feb 6, 2025",
      text:
        "I love the design of this necklace and its neutral color palette makes it work nicely with the majority of my closet.",
      rating: 5,
    },
  ];

  const relatedProducts = [
  {
    id: 1,
    title: "Beaded Earrings",
    price: "$13.00",
    image: "/productimages/ItemThumbnails/EarringsThumbnail.png",
  },
  {
    id: 2,
    title: "Celtic Keychain",
    price: "$18.00",
    image: "/productimages/ItemThumbnails/KeychainThumbnail.png",
  },
  {
    id: 3,
    title: "Beaded Belt",
    price: "$22.00",
    image: "/productimages/ItemThumbnails/BeadedBeltThumbnail.png",
  },
];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-12">
      {/* Product Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Product Image */}
        <div className="w-full aspect-square relative rounded-lg overflow-hidden">
          <Image
            src="/productimages/ItemThumbnails/NecklaceThumbnail.png"
            alt="Product Image"
            fill
            className="object-cover"
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-col justify-center space-y-4">
          <h1 className="text-2xl font-bold">Celtic Sun Necklace</h1>
          <p className="text-lg font-semibold text-green-700">$17.00</p>
          <div className="flex items-center text-yellow-500">
            {"★".repeat(5)}
            <span className="ml-2 text-gray-600">(38 reviews)</span>
          </div>
          <p className="text-gray-700">
            Materials: Crystal, Gemstone. Chain style: Beaded. Closure: Lobster claw.
            Necklace length: 18 inches.
          </p>
          <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition">
            Add to Cart
          </button>
          </div>
        </div>

      {/* Reviews */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Reviews</h2>
        {reviews.map((review) => (
          <div
            key={review.id}
            className="border rounded-lg p-4 shadow-sm bg-white"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">{review.name}</span>
              <span className="text-sm text-gray-500">{review.date}</span>
            </div>
            <div className="text-yellow-500 mb-2">
              {"★".repeat(review.rating)}
            </div>
            <p className="text-gray-700">{review.text}</p>
          </div>
        ))}
      </div>

      {/* Leave a Review */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Leave a Review</h3>
        <textarea
          placeholder="Write your review here..."
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
        ></textarea>
        <button className="bg-green-600 text-white px-6 py-2 rounded-lg shadow hover:bg-green-700 transition">
          Submit Review
        </button>
      </div>

      {/* Related Products */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold">Related Products</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {relatedProducts.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg p-4 shadow-sm hover:shadow-md transition bg-white"
          >
            <div className="relative w-full h-40 rounded mb-3 overflow-hidden">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-cover"
              />
            </div>
            <p className="font-medium">{product.title}</p>
            <p className="text-green-700 font-semibold">{product.price}</p>
          </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
