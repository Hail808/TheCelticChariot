"use client";  // Mark as client component

import React from "react";
import { FaInstagram, FaTiktok } from "react-icons/fa";
import '../../styles/about_me.css';

const About: React.FC = () => {
  return (
    <div className="about-container">
      <h1 className="about-title">About Me</h1>
      <hr className="title-line" />

      {/* Centered top text */}
      <div className="top-text">
        <p>I just make handmade jewelry as a hobby and I try and price my products as low as possible.
          I want my jewelry to be beautiful but not break the bank at the same time. 
          The profit I make off the jewelry is going towards paying my masters program and I plan on continuing to sell as a hobby as well!</p>
      </div>

      {/* Owner & Co-Owner Section */}
      <div className="about-cards">
        <div className="profile-card">
          <div className="profile-text">
            <h2 className="profile-name">Kylee Herlihy</h2>
            <p className="role">Owner</p>
            <p className="description">
              I'm a college student who enjoys making custom-made jewelry. The extra money helps
              pay for my studies, and I enjoy sharing my culture through my jewelry.
            </p>
          </div>
        </div>

        <div className="profile-card">
          <div className="profile-text">
            <h2 className="profile-name">Nicole</h2>
            <p className="role">Creator, Designer</p>
            <p className="description">
              I make handmade bags and necklaces for the shop!
            </p>
          </div>
        </div>
      </div>

      {/* Contact Form and Social Media Links */}
      <div className="contact-section">
        {/* Contact Me Form */}
        <div className="contact-form">
          <h2>Contact Me</h2>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="name-inputs">
              <div>
                <label htmlFor="first-name">First name</label>
                <input type="text" id="first-name" placeholder="First name" required />
              </div>
              <div>
                <label htmlFor="last-name">Last name</label>
                <input type="text" id="last-name" placeholder="Last name" required />
              </div>
            </div>

            <label htmlFor="email">Email address</label>
            <input type="email" id="email" placeholder="Your Email" required />

            <label htmlFor="message">Your message</label>
            <textarea id="message" placeholder="Your Message" required></textarea>

            <button type="submit">Submit</button>
          </form>
        </div>

        {/* Social Media Section */}
        <div className="social-media">
          <h3>Follow me on these websites:</h3>
          <div className="social-icons">
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="social-icon" />
            </a>
            <a href="https://www.tiktok.com/" target="_blank" rel="noopener noreferrer">
              <FaTiktok className="social-icon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
