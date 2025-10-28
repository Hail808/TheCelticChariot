import React from 'react';

const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-[#e8ebe6]">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <h1 className="text-4xl font-bold text-center text-gray-800">Cookie Policy</h1>
        <p className="text-gray-600 text-center mt-2">Last Updated: January 2025</p>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {/* Introduction */}
        <div className="mb-8">
          <p className="text-gray-700 leading-relaxed">
            This Cookie Policy explains how The Celtic Chariot uses cookies and similar tracking technologies when you 
            visit our website. By continuing to use our website, you consent to our use of cookies as described in this policy.
          </p>
        </div>

        {/* What Are Cookies */}
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
            1. What Are Cookies?
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Cookies are small text files that are placed on your device (computer, smartphone, or tablet) when you visit 
            a website. They are widely used to make websites work more efficiently and provide information to website owners.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Cookies help us understand how you use our website, remember your preferences, and improve your browsing experience. 
            They can also help us show you relevant content and advertisements.
          </p>
        </div>

        {/* Types of Cookies We Use */}
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
            2. Types of Cookies We Use
          </h2>
          
          <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">
            Essential Cookies
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            These cookies are necessary for the website to function properly. They enable core functionality such as:
          </p>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-2 ml-4 mb-6">
            <li>Security and authentication</li>
            <li>Shopping cart functionality</li>
            <li>Payment processing</li>
            <li>Network management</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mb-6">
            Without these cookies, services you have requested cannot be provided. These cookies cannot be disabled.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">
            Performance Cookies
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            These cookies collect information about how visitors use our website, such as:
          </p>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-2 ml-4 mb-6">
            <li>Which pages are visited most often</li>
            <li>How long visitors spend on each page</li>
            <li>Error messages received</li>
            <li>Loading times and site performance</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mb-6">
            This information helps us improve how our website works and enhance user experience.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">
            Functionality Cookies
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            These cookies allow our website to remember choices you make and provide enhanced features:
          </p>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-2 ml-4 mb-6">
            <li>Remembering your login details</li>
            <li>Storing your language preferences</li>
            <li>Remembering items in your shopping cart</li>
            <li>Customizing content based on your preferences</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">
            Targeting/Advertising Cookies
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            These cookies are used to deliver advertisements that are relevant to you and your interests. They may be used to:
          </p>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-2 ml-4 mb-4">
            <li>Deliver targeted advertising</li>
            <li>Limit the number of times you see an advertisement</li>
            <li>Measure the effectiveness of advertising campaigns</li>
            <li>Track your browsing habits across different websites</li>
          </ul>
          <p className="text-gray-700 leading-relaxed">
            These cookies may be set by third-party advertising networks with our permission.
          </p>
        </div>

        {/* Third-Party Cookies */}
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
            3. Third-Party Cookies
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            In addition to our own cookies, we may use third-party cookies from trusted partners to help us:
          </p>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-2 ml-4 mb-4">
            <li><strong>Google Analytics:</strong> To analyze website traffic and user behavior</li>
            <li><strong>Payment Processors:</strong> PayPal, Stripe, and Klarna for secure payment processing</li>
            <li><strong>Social Media:</strong> Instagram and TikTok for social sharing features</li>
            <li><strong>Advertising Networks:</strong> To display relevant advertisements</li>
          </ul>
          <p className="text-gray-700 leading-relaxed">
            These third parties have their own privacy policies and cookie policies. We recommend reviewing their 
            policies to understand how they use your information.
          </p>
        </div>

        {/* Duration of Cookies */}
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
            4. Duration of Cookies
          </h2>
          
          <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">
            Session Cookies
          </h3>
          <p className="text-gray-700 leading-relaxed mb-6">
            These are temporary cookies that remain on your device only during your browsing session. They are 
            automatically deleted when you close your browser.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">
            Persistent Cookies
          </h3>
          <p className="text-gray-700 leading-relaxed">
            These cookies remain on your device for a set period of time or until you manually delete them. They 
            help us recognize you when you return to our website and remember your preferences.
          </p>
        </div>

        {/* How to Manage Cookies */}
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
            5. How to Manage Cookies
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            You have the right to control how cookies are used on your device. Here are your options:
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">
            Browser Settings
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            Most web browsers allow you to manage cookies through their settings. You can:
          </p>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-2 ml-4 mb-6">
            <li>View what cookies are stored on your device</li>
            <li>Delete existing cookies</li>
            <li>Block cookies from specific websites</li>
            <li>Block all third-party cookies</li>
            <li>Delete all cookies when you close your browser</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">
            Browser-Specific Instructions
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            To manage cookies in popular browsers:
          </p>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-2 ml-4 mb-6">
            <li><strong>Chrome:</strong> Settings → Privacy and security → Cookies and other site data</li>
            <li><strong>Firefox:</strong> Settings → Privacy & Security → Cookies and Site Data</li>
            <li><strong>Safari:</strong> Preferences → Privacy → Manage Website Data</li>
            <li><strong>Edge:</strong> Settings → Cookies and site permissions → Cookies and site data</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">
            Impact of Blocking Cookies
          </h3>
          <p className="text-gray-700 leading-relaxed">
            Please note that blocking or deleting cookies may impact your experience on our website. Some features 
            may not work properly, and you may need to re-enter information or preferences each time you visit.
          </p>
        </div>

        {/* Do Not Track Signals */}
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
            6. Do Not Track Signals
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Some browsers have a "Do Not Track" feature that signals websites that you do not want to be tracked. 
            Currently, there is no industry standard for how to respond to Do Not Track signals. We do not currently 
            respond to Do Not Track signals, but we respect your privacy choices and provide options to manage cookies 
            as described above.
          </p>
        </div>

        {/* Cookies and Personal Data */}
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
            7. Cookies and Personal Data
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Some cookies may collect personal information, such as:
          </p>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-2 ml-4 mb-4">
            <li>IP addresses</li>
            <li>Browser type and version</li>
            <li>Pages visited and time spent on site</li>
            <li>Referring website addresses</li>
          </ul>
          <p className="text-gray-700 leading-relaxed">
            This information is used in accordance with our <a href="/privacy" className="text-[#5B6D50] hover:underline font-semibold">Privacy Policy</a>. 
            We take appropriate security measures to protect your personal data.
          </p>
        </div>

        {/* Children's Privacy */}
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
            8. Children's Privacy
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Our website is not intended for children under 13 years of age. We do not knowingly collect information 
            from children through cookies or any other means. If you believe a child has provided us with personal 
            information, please contact us immediately.
          </p>
        </div>

        {/* Updates to This Policy */}
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
            9. Updates to This Cookie Policy
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We may update this Cookie Policy from time to time to reflect changes in technology, legislation, or our 
            business practices. Any changes will be posted on this page with an updated revision date. We encourage 
            you to review this policy periodically to stay informed about how we use cookies.
          </p>
        </div>

        {/* Your Consent */}
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
            10. Your Consent
          </h2>
          <p className="text-gray-700 leading-relaxed">
            By continuing to use our website, you consent to our use of cookies as described in this Cookie Policy. 
            If you do not agree with our use of cookies, you should adjust your browser settings or discontinue use 
            of our website.
          </p>
        </div>

        {/* Contact Information */}
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
            11. Contact Us
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            If you have any questions about our use of cookies or this Cookie Policy, please contact us:
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

        {/* Additional Resources */}
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
            12. Additional Resources
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            For more information about cookies and online privacy, visit:
          </p>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-2 ml-4">
            <li><strong>AllAboutCookies.org:</strong> Comprehensive information about cookies</li>
            <li><strong>Your Online Choices:</strong> Information about behavioral advertising and online privacy</li>
            <li><strong>Network Advertising Initiative:</strong> Opt-out tools for advertising cookies</li>
          </ul>
        </div>

        {/* Related Policies */}
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
            Related Policies
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Please also review our related policies:
          </p>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-2 ml-4">
            <li><a href="/privacy" className="text-[#5B6D50] hover:underline font-semibold">Privacy Policy</a></li>
            <li><a href="/terms" className="text-[#5B6D50] hover:underline font-semibold">Terms of Service</a></li>
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

export default CookiePolicy;