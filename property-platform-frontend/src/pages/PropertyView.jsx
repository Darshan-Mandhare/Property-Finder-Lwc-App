import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import API from '../api/axios';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Required CSS


const PropertyView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [contactMessage, setContactMessage] = useState('');

  useEffect(() => {
    
    API.get(`/properties/${id}`)
    
      .then(response => setProperty(response.data))

      .catch(error => console.error('Error fetching property:', error));
  }, [id]);
  
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      try {
        await API.delete(`/properties/${id}`);
        alert('Property deleted');
        navigate('/properties');
      } catch (error) {
        console.error('Delete failed:', error);
        alert('Failed to delete property');
      }
    }
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    alert(`Message sent to agent: ${contactMessage}`);
    setContactMessage('');
  };

  if (!property) return <p>Loading property...</p>;
console.log(property);
  return (
    <div style={{ padding: '20px' }}>
      <Link to="/properties">← Back to Listings</Link>
      <h2>{property.title}</h2>

      <p><strong>Description:</strong> {property.description}</p>
      <p><strong>Type:</strong> {property.property_type}</p>
      <p><strong>Status:</strong> {property.status}</p>
      <p><strong>Bedrooms:</strong> {property.bedrooms}</p>
      <p><strong>Bathrooms:</strong> {property.bathrooms}</p>
      <p><strong>Square Footage:</strong> {property.square_footage} sq ft</p>
      <p><strong>Price:</strong> ₹{property.price}</p>
      <p><strong>Location:</strong> {property.location}</p>
      <p><strong>Amenities:</strong> {Array.isArray(property.amenities)
        ? property.amenities.join(', ')
        : property.amenities?.split(',').map(a => a.trim()).join(', ')
      } </p>

       {/* Image Carousel */}
        {Array.isArray(property.images) && property.images.length > 0 && (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <Carousel showThumbs={true} infiniteLoop autoPlay>
            {property.images.map((url, i) => (
                <div key={i}>
                <img src={url} alt={`property-${i}`} />
                </div>
            ))}
            </Carousel>
        </div>
        )}

      {Array.isArray(property.videos) && property.videos.map((url, i) => (
        <video key={i} width="320" height="240" controls style={{ margin: '10px' }}>
          <source src={url} type="video/mp4" />
        </video>
      ))}

      {/* Map Preview (if coordinates available) */}
      {property.latitude && property.longitude && (
        <div style={{ margin: '20px 0' }}>
          <h3>Map Preview</h3>
          <iframe
            title="property-location-map"
            width="100%"
            height="300"
            frameBorder="0"
            style={{ border: 0 }}
            src={`https://www.google.com/maps?q=${property.latitude},${property.longitude}&hl=es;z=14&output=embed`}
            allowFullScreen
          ></iframe>
        </div>
      )}

      {/* Edit & Delete Buttons */}
      <div style={{ marginTop: '20px' }}>
        <Link to={`/properties/${id}/edit`}>
          <button style={{ marginRight: '10px' }}>Edit</button>
        </Link>
        <button onClick={handleDelete} style={{ backgroundColor: 'red', color: 'white' }}>
          Delete
        </button>
      </div>

      {/* Contact Agent Form */}
      <div style={{ marginTop: '40px' }}>
        <h3>Contact Agent</h3>
        <form onSubmit={handleContactSubmit}>
          <textarea
            placeholder="Write your message here..."
            value={contactMessage}
            onChange={(e) => setContactMessage(e.target.value)}
            rows={5}
            cols={50}
            required
          /><br />
          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default PropertyView;
