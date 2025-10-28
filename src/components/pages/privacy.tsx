import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-[#e8ebe6]">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <h1 className="text-4xl font-bold text-center text-gray-800">Privacy Policy</h1>
        <p className="text-gray-600 text-center mt-2">Last Updated: January 2025</p>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {/* Introduction */}
        <div className="mb-8">
          <p className="text-gray-700 leading-relaxed">
            Welcome to The Celtic Chariot. We respect your privacy and are committed to protecting your personal data. 
            This privacy policy explains how we collect, use, and safeguard your information when you visit our website 
            or make a purchase from our store.
          </p>
        </div>

        {/* Information We Collect */}
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
            1. Information We Collect
          </h2>
          
          <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">
            Personal Information
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            When you make a purchase or create an account, we collect:
          </p>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-2 ml-4 mb-6">
            <li>Name and contact information (email address, phone number)</li>
            <li>Billing and shipping addresses</li>
            <li>Payment information (processed securely through our payment providers)</li>
            <li>Order history and preferences</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">
            Automatically Collected Information
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            When you visit our website, we automatically collect:
          </p>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-2 ml-4">
            <li>Browser type and version</li>
            <li>IP address and location data</li>
            <li>Pages visited and time spent on site</li>
            <li>Device information</li>
            <li>Cookies and similar tracking technologies</li>
          </ul>
        </div>

        {/* How We Use Your Information */}
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
            2. How We Use Your Information
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We use the information we collect to:
          </p>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-2 ml-4">
            <li>Process and fulfill your orders</li>
            <li>Communicate with you about your orders and account</li>
            <li>Send promotional emails and marketing communications (with your consent)</li>
            <li>Improve our website and customer experience</li>
            <li>Prevent fraud and enhance security</li>
            <li>Comply with legal obligations</li>
            <li>Analyze website usage and trends</li>
          </ul>
        </div>

        {/* Information Sharing */}
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
            3. Information Sharing and Disclosure
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We do not sell your personal information. We may share your information with:
          </p>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-2 ml-4">
            <li><strong>Service Providers:</strong> Payment processors (PayPal, Stripe), shipping carriers, and email service providers</li>
            <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
            <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets</li>
          </ul>
        </div>

        {/* Cookies */}
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
            4. Cookies and Tracking Technologies
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We use cookies and similar technologies to enhance your browsing experience, analyze site traffic, 
            and personalize content. You can control cookie preferences through your browser settings. 
            For more details, please see our <a href="/cookies" className="text-[#5B6D50] hover:underline font-semibold">Cookie Policy</a>.
          </p>
        </div>

        {/* Data Security */}
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
            5. Data Security
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We implement industry-standard security measures to protect your personal information from unauthorized 
            access, disclosure, alteration, or destruction. However, no method of transmission over the internet 
            is 100% secure, and we cannot guarantee absolute security.
          </p>
        </div>

        {/* Your Rights */}
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
            6. Your Privacy Rights
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Depending on your location, you may have the following rights:
          </p>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-2 ml-4 mb-4">
            <li>Access and receive a copy of your personal data</li>
            <li>Request correction of inaccurate information</li>
            <li>Request deletion of your personal data</li>
            <li>Object to or restrict processing of your data</li>
            <li>Withdraw consent for marketing communications</li>
            <li>Data portability</li>
          </ul>
          <p className="text-gray-700 leading-relaxed">
            To exercise these rights, please contact us at the information provided below.
          </p>
        </div>

        {/* Third-Party Links */}
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
            7. Third-Party Links
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Our website may contain links to third-party websites. We are not responsible for the privacy practices 
            of these external sites. We encourage you to review their privacy policies before providing any personal information.
          </p>
        </div>

        {/* Children's Privacy */}
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
            8. Children's Privacy
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Our website is not intended for children under the age of 13. We do not knowingly collect personal 
            information from children. If you believe we have inadvertently collected such information, 
            please contact us immediately.
          </p>
        </div>

        {/* International Transfers */}
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
            9. International Data Transfers
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Your information may be transferred to and processed in countries other than your country of residence. 
            We ensure appropriate safeguards are in place to protect your data in accordance with this privacy policy.
          </p>
        </div>

        {/* Changes to Policy */}
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
            10. Changes to This Privacy Policy
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We may update this privacy policy from time to time. Any changes will be posted on this page with 
            an updated revision date. We encourage you to review this policy periodically.
          </p>
        </div>

        {/* Contact Information */}
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
            11. Contact Us
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            If you have any questions about this privacy policy or wish to exercise your privacy rights, please contact us:
          </p>
          <div className="bg-white/30 p-6 rounded-lg border border-gray-300">
            <p className="text-gray-700 leading-relaxed">
              <strong className="font-semibold">The Celtic Chariot</strong><br />
              Email: privacy@thecelticchariot.com<br />
              Phone: [Your Phone Number]<br />
              Address: [Your Business Address]
            </p>
          </div>
        </div>

        {/* Marketing Communications Opt-Out */}
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
            12. Marketing Communications
          </h2>
          <p className="text-gray-700 leading-relaxed">
            You may opt out of receiving promotional emails by clicking the "unsubscribe" link at the bottom 
            of our emails or by contacting us directly. Please note that you will still receive transactional 
            emails related to your orders.
          </p>
        </div>

        {/* Consent */}
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
            13. Consent
          </h2>
          <p className="text-gray-700 leading-relaxed">
            By using our website and providing your information, you consent to the collection and use of 
            your data as described in this privacy policy.
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

export default PrivacyPolicy;