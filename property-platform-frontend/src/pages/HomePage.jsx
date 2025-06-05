import React, { useEffect, useState, useRef } from 'react';
import { Link, useLocation as useReactRouterLocation } from 'react-router-dom';
import API from '../api/axios';
import './Home.css';

const Home = () => {
  const [properties, setProperties] = useState([]);
  const [filters, setFilters] = useState({
    location: '',
    type: '',
    bedrooms: '',
  });

  const aboutRef = useRef(null);
  const location = useReactRouterLocation();

  const fetchProperties = () => {
    const params = new URLSearchParams();

    if (filters.location) params.append('location', filters.location);
    if (filters.type) params.append('type', filters.type);
    if (filters.bedrooms) params.append('bedrooms', filters.bedrooms);

    API.get(`/properties?${params.toString()}`)
      .then((res) => setProperties(res.data))
      .catch((err) => console.error('Failed to fetch properties:', err));
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  useEffect(() => {
    if (location.hash === 'about' && aboutRef.current) {
      aboutRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchProperties();
  };

  return (
    <div className="home-container">
      {/* ✅ Hero Banner */}
      <section className="hero-banner">
        <div className="hero-overlay">
          <h1>Find Your Dream Home</h1>
          <p>We Have Over Million Properties For You</p>
          <div className="property-buttons">
            <button className="active">Buy Property</button>
            <button>Rent Property</button>
          </div>
        </div>
      </section>

      {/* ✅ Search Filter */}
      <form className="search-bar" onSubmit={handleSearch}>
        <input
          type="text"
          name="location"
          placeholder="📍 Location"
          value={filters.location}
          onChange={handleChange}
        />
        <select name="type" value={filters.type} onChange={handleChange}>
          <option value="">Property type</option>
          <option value="Apartment">Apartment</option>
          <option value="Villa">Villa</option>
          <option value="House">House</option>
        </select>
        <select name="bedrooms" value={filters.bedrooms} onChange={handleChange}>
          <option value="">Bedroom</option>
          <option value="1">1 BHK</option>
          <option value="2">2 BHK</option>
          <option value="3">3 BHK</option>
          <option value="4">4+ BHK</option>
        </select>
        <button type="submit" className="search-button">Search</button>
      </form>

      {/* ✅ About Section */}
      <section className="about-section" ref={aboutRef} id="about">
        <h2>About Us</h2>
        <div>
        <p>
          DreamHomes is your go-to destination for buying, selling, and renting properties.
          With verified listings and a seamless user experience, we connect home seekers,
          investors, and sellers with the right opportunities.
        </p>
        <Link to="/about">
          <button className="read-more">Read More</button>
        </Link>
        </div>
      </section>

      {/* ✅ Latest Listings */}
      <section className="latest-listings">
        <h2>Latest Listings</h2>
        <div className="property-grid">
          {properties.length > 0 ? (
            properties.map((prop) => (
              <div key={prop.id} className="property-card">
                {prop.images?.[0] && (
                  <img src={prop.images[0]} alt={prop.title} />
                )}
                <h3>{prop.title}</h3>
                <p>{prop.location}</p>
                <p><strong>₹{prop.price.toLocaleString()}</strong></p>
                <Link to={`/properties/${prop.id}`}>
                  <button className="view-details">View Details</button>
                </Link>
              </div>
            ))
          ) : (
            <p>No properties found for the selected filters.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
