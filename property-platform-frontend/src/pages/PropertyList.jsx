import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../api/axios';
import './PropertyList.css';

const ITEMS_PER_PAGE = 6;

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    API.get('/properties')
      .then(res => setProperties(res.data))
      .catch(err => console.error('Error fetching properties:', err));
  }, []);

  const totalPages = Math.ceil(properties.length / ITEMS_PER_PAGE);
  const currentItems = properties.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="property-list-container">
      <div className="property-list-header">
        <h2>All Properties</h2>
      </div>

      {properties.length === 0 ? (
        <p>No properties found.</p>
      ) : (
        <>
          <div className="property-grid">
            {currentItems.map(property => (
              <div className="property-card" key={property.id}>
                {property.images?.[0] && (
                  <img src={property.images[0]} alt={property.title} />
                )}
                <h3>{property.title}</h3>
                <p><strong>Price:</strong> ₹{property.price}</p>
                <p><strong>Location:</strong> {property.location}</p>
                <Link to={`/properties/${property.id}`} className="view-link">View Details</Link>
              </div>
            ))}
          </div>

          <div className="pagination">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={currentPage === i + 1 ? 'active' : ''}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default PropertyList;
