import React from 'react'
import "./Navbar.css";

function Navbar() {

  return (
    <html>
      <nav class="navbar">
          <div className="logo">
              <img src="logo.png"  alt='The Celtic Chariot' href='/'/>
              The Celtic Chariot
          </div>
     <div className="nav-links">
        <a href="/">Account</a>
        <a href="/">Sign in</a>
        <a className="cart" href="/">Cart</a>
      </div>
      </nav>
    </html>
  )
}

export default Navbar
