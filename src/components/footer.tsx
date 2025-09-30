import React from 'react';
import { Instagram } from 'lucide-react';
import { FaTiktok } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#5B6D50] text-white">
      {/* main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* footer links grid/formatting */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 mb-8">
          {/* about section */}
          <div className="space-y-3">
            <h3 className="font-lalezar text-lg font-semibold text-white">About</h3>
            <ul className="space-y-2 font-lalezar">
              <li><a href="/about_me" className="text-white/80 hover:text-white transition-colors duration-200">About Us</a></li>
              <li><a href="/about_me" className="text-white/80 hover:text-white transition-colors duration-200">Contact</a></li>
            </ul>
          </div>

          {/* shop Section */}
          <div className="space-y-3">
            <h3 className="font-lalezar text-lg font-semibold text-white">Shop</h3>
            <ul className="space-y-2 font-lalezar">
              <li><a href="/catalogue" className="text-white/80 hover:text-white transition-colors duration-200">All Products</a></li>
              <li><a href="/earrings" className="text-white/80 hover:text-white transition-colors duration-200">Earrings</a></li>
              <li><a href="/beads" className="text-white/80 hover:text-white transition-colors duration-200">DIY Beads</a></li>
            </ul>
          </div>

          {/* customer care section */}
          <div className="space-y-3">
            <h3 className="font-lalezar text-lg font-semibold text-white">Customer Care</h3>
            <ul className="space-y-2 font-lalezar">
              <li><a href="/shipping" className="text-white/80 hover:text-white transition-colors duration-200">Shipping Info</a></li>
              <li><a href="/returns" className="text-white/80 hover:text-white transition-colors duration-200">Returns</a></li>
              <li><a href="/faq" className="text-white/80 hover:text-white transition-colors duration-200">FAQ</a></li>
            </ul>
          </div>

          {/* legal section */}
          <div className="space-y-3">
            <h3 className="font-lalezar text-lg font-semibold text-white">Legal</h3>
            <ul className="space-y-2 font-lalezar">
              <li><a href="/privacy" className="text-white/80 hover:text-white transition-colors duration-200">Privacy Policy</a></li>
              <li><a href="/terms" className="text-white/80 hover:text-white transition-colors duration-200">Terms of Service</a></li>
              <li><a href="/cookies" className="text-white/80 hover:text-white transition-colors duration-200">Cookie Policy</a></li>
            </ul>
          </div>
        </div>

        {/* divider line */}
        <div className="border-t border-white/20 pt-6">
          {/* bottom section */}
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
            {/* logo and copyright */}
            <div className="flex flex-col items-center lg:items-start space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm overflow-hidden">
                  <img 
                    src="/logo.png" 
                    alt="The Celtic Chariot" 
                    className="w-6 h-6 object-contain"
                  />
                </div>
                <span className="font-lalezar text-xl text-white">THE CELTIC CHARIOT</span>
              </div>
              <p className="font-lalezar text-white/70 text-sm">© 2025 The Celtic Chariot. All rights reserved.</p>
            </div>

            {/* social media icons */}
            <div className="flex flex-col items-center space-y-3">
              <h4 className="font-lalezar text-sm font-semibold text-white">Follow Us</h4>
              <div className="flex items-center space-x-4">
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors duration-200"
                  aria-label="Follow us on Instagram"
                >
                  <Instagram size={24} />
                </a>
                <a 
                  href="https://tiktok.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors duration-200"
                  aria-label="Follow us on TikTok"
                >
                  <FaTiktok size={24} />
                </a>
              </div>
            </div>

            {/* payment method icons */}
            <div className="flex flex-col items-center lg:items-end space-y-3">
              <h4 className="font-lalezar text-sm font-semibold text-white">We Accept</h4>
              <div className="flex items-center space-x-3 flex-wrap justify-center lg:justify-end">
                {/* paypal */}
                <div className="bg-white rounded-md p-2 h-8 flex items-center justify-center min-w-[50px]">
                  <span className="text-[#0070ba] text-xs font-bold">PayPal</span>
                </div>
                
                {/* visa */}
                <div className="bg-white rounded-md p-2 h-8 flex items-center justify-center min-w-[50px]">
                  <span className="text-[#1a1f71] text-xs font-bold">VISA</span>
                </div>
                
                {/* mastercard */}
                <div className="bg-white rounded-md p-2 h-8 flex items-center justify-center min-w-[50px]">
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-red-500 rounded-full opacity-80"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full opacity-80"></div>
                  </div>
                </div>
                
                {/* discover */}
                <div className="bg-white rounded-md p-2 h-8 flex items-center justify-center min-w-[50px]">
                  <span className="text-[#ff6000] text-xs font-bold">DISC</span>
                </div>
                
                {/* klarna */}
                <div className="bg-[#ffb3c7] rounded-md p-2 h-8 flex items-center justify-center min-w-[50px]">
                  <span className="text-[#0a0a0a] text-xs font-bold">Klarna</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;