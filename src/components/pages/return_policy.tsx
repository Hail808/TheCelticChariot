import React from 'react';

const ReturnsPage = () => {
  return (
    <div className="min-h-screen bg-[#e8ebe6]">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <h1 className="text-4xl font-bold text-center text-gray-800">Return Policy</h1>
        <p className="text-gray-600 text-center mt-2">Last Updated: January 2025</p>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {/* Introduction */}
        <div className="mb-8">
          <p className="text-gray-700 leading-relaxed">
            At The Celtic Chariot, we take pride in the quality of our handmade products. If you are not completely satisfied with your purchase, we are here to help.
          </p>
        </div>

        {/* Returns and Exchanges */}
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">1. Returns and Exchanges</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We accept returns and exchanges within <strong>30 days</strong> from the date your order is delivered.
          </p>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-2 ml-4">
            <li>Items must be returned in their original condition</li>
            <li>Items must be unused and undamaged</li>
            <li>Original packaging is required when applicable</li>
          </ul>
        </div>

        {/* Return Shipping Responsibility */}
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">2. Return Shipping Costs</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            The buyer is responsible for <strong>all return shipping costs</strong>.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Additionally, buyers are responsible for any loss in value if the item is not returned in its original condition.
          </p>
        </div>

        {/* How to Start a Return */}
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">3. How to Start a Return</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            To initiate a return or exchange:
          </p>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-2 ml-4">
            <li>Contact our support team at <strong>support@thecelticchariot.com</strong></li>
            <li>Include your order number and reason for return</li>
            <li>We will provide instructions for shipping the item back</li>
          </ul>
        </div>

        {/* Exclusions */}
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">4. Exclusions</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            The following items may not be eligible for return unless damaged or defective:
          </p>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-2 ml-4">
            <li>Custom or personalized items</li>
            <li>Digital products</li>
            <li>Final sale or clearance items</li>
          </ul>
        </div>

        {/* Back to Home Link */}
        <div className="text-center py-8">
          <a
            href="/"
            className="inline-block bg-[#5B6D50] text-white px-8 py-3 rounded-lg hover:bg-[#4a5a40] transition font-semibold shadow-md"
          >
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default ReturnsPage;
