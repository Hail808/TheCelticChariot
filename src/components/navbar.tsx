'use client';
import React, { useState } from 'react';
import '../styles/navbar.css'; // import CSS file for style
import { auth } from '../../lib/auth';
import { ShoppingCart, User, Menu, X, Search } from 'lucide-react';

type Session = typeof auth.$Infer.Session
const Navbar = ({session}: {session: Session | null}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <nav className="bg-[#5B6D50] shadow-lg shadow-black/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* search on the left, logo in the middle, and account/cart on the right */}
        <div className="flex justify-between items-center min-h-[80px] sm:min-h-[100px] lg:min-h-[112px] py-4">
          
          {/* search icon */}
          <div className="flex items-center">
            <button className="p-2 sm:p-3 lg:p-4 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors duration-200 ml-2 sm:ml-3 lg:ml-4">
              <Search size={24} className="sm:w-7 sm:h-7 lg:w-9 lg:h-9" />
            </button>
          </div>

          {/* center logo and "The Celtic Chariot" */}
          <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm overflow-hidden">
              <img 
                src="/logo.png" 
                alt="The Celtic Chariot" 
                className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 object-contain"
              />
            </div>
            <h1 className="font-lalezar text-lg sm:text-2xl lg:text-4xl font-regular text-white tracking-wide">
              THE CELTIC CHARIOT
            </h1>
          </div>

          {/* account and cart icon */}
          <div className="flex items-center space-x-2 sm:space-x-4 lg:space-x-6 mr-2 sm:mr-3 lg:mr-4">
            {/* user account */}
            <a 
              href="/user_dashboard"
              className="p-2 sm:p-3 lg:p-4 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors duration-200"
            >
              <User size={24} className="sm:w-7 sm:h-7 lg:w-9 lg:h-9" />
            </a>
            
            {/* cart */}
            <a 
              href="/cart"
              className="relative p-2 sm:p-3 lg:p-4 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors duration-200"
            >
              <ShoppingCart size={24} className="sm:w-7 sm:h-7 lg:w-9 lg:h-9" />
              {/* Cart count badge, implement later once db is connected */}
              {/* <span className="absolute -top-1 -right-1 bg-white text-[#5B6D50] text-xs font-bold px-2 py-1 rounded-full min-w-[20px] text-center">0</span> */}
            </a>

            {/* mobile menu button (only works when display is shrinked down) */}
            <button 
              onClick={toggleMenu}
              className="md:hidden p-2 sm:p-3 lg:p-4 text-white hover:bg-white/10 rounded-full transition-colors duration-200"
            >
              {menuOpen ? <X size={24} className="sm:w-7 sm:h-7 lg:w-9 lg:h-9" /> : <Menu size={24} className="sm:w-7 sm:h-7 lg:w-9 lg:h-9" />}
            </button>
          </div>
        </div>

        {/* navbar botton navigation (for desktop and bigger screens) */}
        <div className="hidden md:flex justify-center items-center pb-6 border-t border-white/20 pt-6">
          <div className="flex items-center space-x-12">
            <a 
              href="/" 
              className="font-lalezar text-white/90 hover:text-white text-lg font-medium transition-colors duration-200 hover:underline underline-offset-4 decoration-2"
            >
              HOME
            </a>
            <a 
              href="/catalogue" 
              className="font-lalezar text-white/90 hover:text-white text-lg font-medium transition-colors duration-200 hover:underline underline-offset-4 decoration-2"
            >
              CATALOGUE
            </a>
            <a 
              href="/reviews" 
              className="font-lalezar text-white/90 hover:text-white text-lg font-medium transition-colors duration-200 hover:underline underline-offset-4 decoration-2"
            >
              REVIEWS
            </a>
            <a 
              href="/about_me" 
              className="font-lalezar text-white/90 hover:text-white text-lg font-medium transition-colors duration-200 hover:underline underline-offset-4 decoration-2"
            >
              ABOUT ME
            </a>
            {/* <a 
              href="/login" 
              className="font-lalezar text-white/90 hover:text-white text-lg font-medium transition-colors duration-200 hover:underline underline-offset-4 decoration-2"
            >
              SIGN IN
            </a> */}
          </div>
        </div>

        {/* mobile menu drop down */}
        {menuOpen && (
          <div className="md:hidden border-t border-white/20 pt-4 pb-4 space-y-3">
            <a 
              href="/" 
              className="block font-sans text-white/90 hover:text-white text-lg font-medium py-3 px-4 hover:bg-white/10 rounded-lg transition-colors duration-200 text-center"
              onClick={() => setMenuOpen(false)}
            >
              HOME
            </a>
            <a 
              href="/catalogue" 
              className="block font-sans text-white/90 hover:text-white text-lg font-medium py-3 px-4 hover:bg-white/10 rounded-lg transition-colors duration-200 text-center"
              onClick={() => setMenuOpen(false)}
            >
              CATALOGUE
            </a>
            <a 
              href="/reviews" 
              className="block font-sans text-white/90 hover:text-white text-lg font-medium py-3 px-4 hover:bg-white/10 rounded-lg transition-colors duration-200 text-center"
              onClick={() => setMenuOpen(false)}
            >
              REVIEWS
            </a>
            <a 
              href="/about_me" 
              className="block font-sans text-white/90 hover:text-white text-lg font-medium py-3 px-4 hover:bg-white/10 rounded-lg transition-colors duration-200 text-center"
              onClick={() => setMenuOpen(false)}
            >
              ABOUT ME
            </a>
            <div className="border-t border-white/20 pt-3 mt-3">
              <a 
                href="/user_dashboard"
                className="block font-sans text-white/90 hover:text-white text-lg font-medium py-3 px-4 hover:bg-white/10 rounded-lg transition-colors duration-200 text-center"
                onClick={() => setMenuOpen(false)}
              >
                USER DASHBOARD
              </a>
              <a 
                href="/login"
                className="block font-sans text-white/90 hover:text-white text-lg font-medium py-3 px-4 hover:bg-white/10 rounded-lg transition-colors duration-200 text-center"
                onClick={() => setMenuOpen(false)}
              >
                SIGN IN
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;