import React from 'react';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-[#e8ebe6]">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <h1 className="text-4xl font-bold text-center text-gray-800">Terms of Service</h1>
        <p className="text-gray-600 text-center mt-2">Last Updated: January 2025</p>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {/* Introduction */}
        <div className="mb-8">
          <p className="text-gray-700 leading-relaxed">
            Welcome to The Celtic Chariot. These Terms of Service govern your use of our website and the purchase of our products. 
            By accessing our website or making a purchase, you agree to be bound by these terms. Please read them carefully.
          </p>
        </div>

        {/* General Terms */}
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
            1. General Terms
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. 
            If you do not agree to abide by the above, please do not use this service.
          </p>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-2 ml-4">
            <li>You must be at least 18 years old to use this website and make purchases</li>
            <li>You are responsible for maintaining the confidentiality of your account information</li>
            <li>You agree to provide accurate and complete information when making purchases</li>
            <li>We reserve the right to refuse service to anyone for any reason at any time</li>
          </ul>
        </div>

        {/* Products and Services */}
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
            2. Products and Services
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            All products and services are subject to availability. We reserve the right to:
          </p>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-2 ml-4 mb-4">
            <li>Limit quantities of any products or services</li>
            <li>Discontinue any product at any time</li>
            <li>Modify product descriptions, prices, and availability without notice</li>
            <li>Refuse orders that appear fraudulent or suspicious</li>
          </ul>
          <p className="text-gray-700 leading-relaxed">
            We strive to display our products as accurately as possible. However, we cannot guarantee that your device's 
            display of colors will be accurate. All products are handmade and may have slight variations.
          </p>
        </div>

        {/* Pricing and Payment */}
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
            3. Pricing and Payment
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            All prices are listed in USD and are subject to change without notice. We accept the following payment methods:
          </p>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-2 ml-4 mb-4">
            <li>PayPal</li>
            <li>Visa, Mastercard, Discover credit and debit cards</li>
            <li>Klarna (Buy Now, Pay Later)</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mb-4">
            Payment is due at the time of purchase. By providing payment information, you represent and warrant that:
          </p>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-2 ml-4">
            <li>You have the legal right to use the payment method</li>
            <li>The information you provide is accurate and complete</li>
            <li>Charges incurred will be honored by your payment provider</li>
          </ul>
        </div>

        {/* Shipping and Delivery */}
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
            4. Shipping and Delivery
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We ship to addresses within the United States and internationally. Shipping times and costs vary by location 
            and shipping method selected. Please see our <a href="/shipping" className="text-[#5B6D50] hover:underline font-semibold">Shipping Policy</a> for detailed information.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            We are not responsible for:
          </p>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-2 ml-4">
            <li>Delays caused by shipping carriers or customs</li>
            <li>Lost or stolen packages after delivery confirmation</li>
            <li>Incorrect addresses provided by customers</li>
            <li>International customs fees or import duties</li>
          </ul>
        </div>

        {/* Returns and Refunds */}
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
            5. Returns and Refunds
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We want you to love your purchase. If you're not satisfied, please review our return policy:
          </p>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-2 ml-4 mb-4">
            <li>Returns must be initiated within 30 days of delivery</li>
            <li>Items must be unused, in original condition, and in original packaging</li>
            <li>Custom or personalized items cannot be returned unless defective</li>
            <li>Sale items may not be eligible for return</li>
          </ul>
          <p className="text-gray-700 leading-relaxed">
            For complete details, please see our <a href="/returns" className="text-[#5B6D50] hover:underline font-semibold">Return Policy</a>. 
            Refunds will be processed to the original payment method within 5-10 business days after we receive the returned item.
          </p>
        </div>

        {/* Intellectual Property */}
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
            6. Intellectual Property Rights
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            All content on this website, including but not limited to text, graphics, logos, images, product designs, 
            and software, is the property of The Celtic Chariot and is protected by copyright, trademark, and other 
            intellectual property laws.
          </p>
          <p className="text-gray-700 leading-relaxed">
            You may not reproduce, distribute, modify, or create derivative works from any content without our express 
            written permission.
          </p>
        </div>

        {/* User Conduct */}
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
            7. User Conduct
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            You agree not to use our website for any unlawful purpose or in any way that could damage, disable, 
            or impair our services. Prohibited activities include:
          </p>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-2 ml-4">
            <li>Attempting to gain unauthorized access to our systems</li>
            <li>Using automated systems or bots to access the website</li>
            <li>Transmitting viruses, malware, or harmful code</li>
            <li>Harassing or threatening other users or our staff</li>
            <li>Posting false, misleading, or fraudulent information</li>
            <li>Violating any applicable laws or regulations</li>
          </ul>
        </div>

        {/* Reviews and User Content */}
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
            8. Reviews and User Content
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            When you submit reviews, comments, or other content to our website:
          </p>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-2 ml-4 mb-4">
            <li>You grant us a non-exclusive, royalty-free license to use, reproduce, and display your content</li>
            <li>You represent that your content is original and does not violate any third-party rights</li>
            <li>We reserve the right to remove any content that violates these terms or is inappropriate</li>
            <li>You are responsible for the content you post</li>
          </ul>
          <p className="text-gray-700 leading-relaxed">
            Reviews should be honest and based on your personal experience. Fake reviews or reviews posted on behalf 
            of others are prohibited.
          </p>
        </div>

        {/* Limitation of Liability */}
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
            9. Limitation of Liability
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            To the fullest extent permitted by law:
          </p>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-2 ml-4 mb-4">
            <li>The Celtic Chariot shall not be liable for any indirect, incidental, special, or consequential damages</li>
            <li>Our total liability shall not exceed the amount you paid for the product giving rise to the claim</li>
            <li>We do not warrant that our website will be uninterrupted, error-free, or secure</li>
            <li>We are not responsible for any third-party websites or services linked from our site</li>
          </ul>
          <p className="text-gray-700 leading-relaxed">
            Some jurisdictions do not allow limitations on certain warranties or liabilities, so some of these 
            limitations may not apply to you.
          </p>
        </div>

        {/* Indemnification */}
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
            10. Indemnification
          </h2>
          <p className="text-gray-700 leading-relaxed">
            You agree to indemnify and hold harmless The Celtic Chariot, its owners, employees, and affiliates from 
            any claims, damages, losses, or expenses (including attorney's fees) arising from your use of our website, 
            violation of these terms, or infringement of any third-party rights.
          </p>
        </div>

        {/* Dispute Resolution */}
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
            11. Dispute Resolution
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            In the event of any dispute arising from these terms or your use of our website:
          </p>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-2 ml-4 mb-4">
            <li>We encourage you to contact us first to resolve the issue informally</li>
            <li>Any disputes shall be governed by the laws of [Your State/Country]</li>
            <li>You agree to submit to the exclusive jurisdiction of courts in [Your Location]</li>
          </ul>
          <p className="text-gray-700 leading-relaxed">
            These terms constitute the entire agreement between you and The Celtic Chariot regarding your use of 
            our website and supersede any prior agreements.
          </p>
        </div>

        {/* Modifications to Terms */}
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
            12. Modifications to Terms
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We reserve the right to modify these Terms of Service at any time. Changes will be posted on this page 
            with an updated revision date. Your continued use of the website after changes are posted constitutes 
            acceptance of the modified terms. We encourage you to review these terms periodically.
          </p>
        </div>

        {/* Termination */}
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
            13. Termination
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We may terminate or suspend your access to our website immediately, without prior notice, if you breach 
            these Terms of Service. Upon termination, your right to use the website will immediately cease, and any 
            outstanding orders may be canceled.
          </p>
        </div>

        {/* Severability */}
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
            14. Severability
          </h2>
          <p className="text-gray-700 leading-relaxed">
            If any provision of these Terms of Service is found to be unenforceable or invalid, that provision will 
            be limited or eliminated to the minimum extent necessary so that the remaining terms will remain in full 
            force and effect.
          </p>
        </div>

        {/* Contact Information */}
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
            15. Contact Us
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            If you have any questions about these Terms of Service, please contact us:
          </p>
          <div className="bg-white/30 p-6 rounded-lg border border-gray-300">
            <p className="text-gray-700 leading-relaxed">
              <strong className="font-semibold">The Celtic Chariot</strong><br />
              Email: support@thecelticchariot.com<br />
              Phone: [Your Phone Number]<br />
              Address: [Your Business Address]
            </p>
          </div>
        </div>

        {/* Agreement */}
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
            16. Your Agreement
          </h2>
          <p className="text-gray-700 leading-relaxed">
            By using our website, you acknowledge that you have read, understood, and agree to be bound by these 
            Terms of Service and our <a href="/privacy" className="text-[#5B6D50] hover:underline font-semibold">Privacy Policy</a>.
          </p>
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

export default TermsOfService;