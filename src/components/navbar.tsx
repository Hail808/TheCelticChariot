'use client';
import React, { useState } from 'react';
import '../styles/navbar.css'; // import CSS file for style
import { auth } from '../../lib/auth';

type Session = typeof auth.$Infer.Session
const Navbar = ({session}: {session: Session | null}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <img src="/logo.png" alt="The Celtic Chariot" />
        The Celtic Chariot
      </div>

      <div className={`hamburger ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </div>

      <div className={`nav-links ${menuOpen ? 'show' : ''}`}>
        <a href="/">Home</a>
        {session && <a href="/user_dashboard">User Dashboard</a>}
        <a href="/catalogue">Catalogue</a>
        <a href="/reviews">Reviews</a>
        <a href="/about_me">About Me</a>
        {!session && <a href="/login">Sign in</a>}
        <a className="cart" href="/cart">
          <img src="/cart.png" alt="cart" width={30} height={30} />
          Cart
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
