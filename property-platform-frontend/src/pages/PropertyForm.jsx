import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';

const amenitiesList = [
  'Swimming Pool',
  'Gym',
  'Smart Home',
  'Garden',
  'Fireplace',
  'Gated Community',
];

const PropertyForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    property_type: 'residential',
    status: 'for sale',
    bedrooms: 0,
    bathrooms: 0,
    square_footage: 0,
    price: 0,
    location: '',
    latitude: '',
    longitude: '',
    amenities: [],
    images: [],
    videos: [],
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prev) => ({ ...prev, [name]: files }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAmenityChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      amenities: checked
        ? [...prev.amenities, value]
        : prev.amenities.filter((a) => a !== value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'images' || key === 'videos') {
        for (let i = 0; i < value.length; i++) {
          data.append(`${key}[${i}]`, value[i]); // ✅ Correct format
        }
      } else if (key === 'amenities') {
        data.append('amenities', JSON.stringify(value)); // ✅ JSON array string
      } else {
        data.append(key, value);
      }
    });

    try {
      const response = await API.post('/properties', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Property created successfully!');
      const propertyId = response.data.id;
      navigate(`/properties/${propertyId}`);
    } catch (error) {
      console.error(error);
      alert('Failed to create property.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Property Listing</h2>

      <label>Title</label><br />
      <input type="text" name="title" value={formData.title} onChange={handleChange} required /><br />

      <label>Description</label><br />
      <textarea name="description" value={formData.description} onChange={handleChange} /><br />

      <label>Property Type</label><br />
      <select name="property_type" value={formData.property_type} onChange={handleChange}>
        <option value="residential">Residential</option>
        <option value="commercial">Commercial</option>
        <option value="land">Land</option>
      </select><br />

      <label>Status</label><br />
      <select name="status" value={formData.status} onChange={handleChange}>
        <option value="for sale">For Sale</option>
        <option value="for rent">For Rent</option>
        <option value="coming soon">Coming Soon</option>
      </select><br />

      <label>Bedrooms</label><br />
      <input type="number" name="bedrooms" value={formData.bedrooms} onChange={handleChange} /><br />

      <label>Bathrooms</label><br />
      <input type="number" name="bathrooms" value={formData.bathrooms} onChange={handleChange} /><br />

      <label>Square Footage</label><br />
      <input type="number" name="square_footage" value={formData.square_footage} onChange={handleChange} /><br />

      <label>Price</label><br />
      <input type="number" name="price" value={formData.price} onChange={handleChange} required /><br />

      <label>Location</label><br />
      <input type="text" name="location" value={formData.location} onChange={handleChange} required /><br />

      <label>Latitude</label><br />
      <input type="text" name="latitude" value={formData.latitude} onChange={handleChange} /><br />

      <label>Longitude</label><br />
      <input type="text" name="longitude" value={formData.longitude} onChange={handleChange} /><br />

      <label>Amenities</label><br />
      {amenitiesList.map((amenity) => (
        <label key={amenity}>
          <input
            type="checkbox"
            name="amenities"
            value={amenity}
            checked={formData.amenities.includes(amenity)}
            onChange={handleAmenityChange}
          />
          {amenity}
        </label>
      ))}<br />

      <label>Images</label><br />
      <input type="file" name="images" multiple accept="image/*" onChange={handleChange} /><br />

      <label>Videos</label><br />
      <input type="file" name="videos" multiple accept="video/*" onChange={handleChange} /><br />

      <button type="submit">Create Property</button>
    </form>
  );
};

export default PropertyForm;
