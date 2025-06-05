// src/pages/About.js
import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <div className="content">
        <h1>🏠 About Us</h1>
        <p>
          <strong>Welcome to DreamHomes – Your Trusted Partner in Real Estate.</strong>
        </p>
        <p>
          At <strong>DreamHomes</strong>, we believe that finding the right property should be simple, transparent, and empowering.
          Whether you're looking to <strong>buy</strong>, <strong>sell</strong>, or <strong>rent</strong>, our platform connects people
          with properties that match their dreams and needs.
        </p>

        <h2>🌟 What We Offer</h2>
        <ul>
          <li>Verified Listings: Real, accurate, and regularly updated.</li>
          <li>Seamless Search Experience with advanced filters.</li>
          <li>Multimedia Previews: Photos and videos for immersive browsing.</li>
          <li>Instant Access: Browse anytime on desktop or mobile.</li>
          <li>Easy Property Posting: List your property in just a few clicks.</li>
        </ul>

        <h2>💼 Our Mission</h2>
        <p>
          To build a smarter, safer, and more connected property marketplace.
          We aim to bridge the gap between property seekers and owners through cutting-edge
          technology, a clean interface, and data you can trust.
        </p>

        <h2>🤝 Why Choose Us?</h2>
        <ul>
          <li>Transparent and secure listings</li>
          <li>User-friendly interface</li>
          <li>Quick communication between buyers, sellers, and renters</li>
          <li>Continuous support from our expert team</li>
        </ul>

        <blockquote>
          📍 Your dream home is just a click away.
        </blockquote>
      </div>
    </div>
  );
};

export default About;
