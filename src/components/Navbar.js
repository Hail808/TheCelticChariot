import React from 'react'
import "./navbar.css";

function navbar() {

  return (
    <html>
      <nav class="navbar">
          <div className="logo">
              <img src="logo.png"  alt='The Celtic Chariot' href='/'/>
              The Celtic Chariot
          </div>
     <div className="nav-links">
        <a href="/">Sign in</a>
        <a className="cart" href="/"><img src="cart.png" width={30} height={30}/>Cart</a>
      </div>
      </nav>
    </html>
  )
}

export default navbar
