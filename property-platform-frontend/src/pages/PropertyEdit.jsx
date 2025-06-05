import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api/axios';

const amenitiesList = [
  'Swimming Pool',
  'Gym',
  'Smart Home',
  'Garden',
  'Fireplace',
  'Gated Community',
];

const PropertyEdit = () => {
  const { id } = useParams();
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

  const [existingImages, setExistingImages] = useState([]);
  const [existingVideos, setExistingVideos] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [previewVideos, setPreviewVideos] = useState([]);

  useEffect(() => {
    API.get(`/properties/${id}`)
      .then((res) => {
        const property = res.data;
        const amenityArray = Array.isArray(property.amenities)
          ? property.amenities
          : typeof property.amenities === 'string'
          ? property.amenities.split(',').map((a) => a.trim())
          : [];

        setFormData({
          ...property,
          images: [],
          videos: [],
          amenities: amenityArray,
        });

        setExistingImages(property.images || []);
        setExistingVideos(property.videos || []);
      })
      .catch((err) => {
        console.error('Failed to load property', err);
        alert('Failed to load property for editing.');
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;
    if (files) {
      const fileArray = Array.from(files);
      setFormData((prev) => ({ ...prev, [name]: fileArray }));
      if (name === 'images') {
        setPreviewImages(fileArray.map((file) => URL.createObjectURL(file)));
      }
      if (name === 'videos') {
        setPreviewVideos(fileArray.map((file) => URL.createObjectURL(file)));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === 'number' ? parseFloat(value) : value,
      }));
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
        value.forEach((file) => {
          if (file instanceof File) {
            data.append(key, file);
          }
        });
      } else if (key === 'amenities') {
        const amenityArray = Array.isArray(value) ? value : [value];
        data.append(key, amenityArray.join(','));
      } else {
        data.append(key, value);
      }
    });

    try {
      await API.put(`/properties/${id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
        params: { _method: 'PUT' },
      });
      alert('Property updated successfully!');
      navigate(`/properties/${id}`);
    } catch (err) {
      console.error('Submit error:', err);
      alert('Failed to update property.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '20px' }}>
      <h2>Edit Property Listing</h2>

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
        <label key={amenity} style={{ marginRight: '10px' }}>
          <input
            type="checkbox"
            value={amenity}
            checked={formData.amenities.includes(amenity)}
            onChange={handleAmenityChange}
          />
          {amenity}
        </label>
      ))}<br />

      <label>Images</label><br />
      <input type="file" name="images" multiple accept="image/*" onChange={handleChange} /><br />
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', margin: '10px 0' }}>
        {previewImages.map((src, idx) => (
          <div key={`new-img-${idx}`} style={{ textAlign: 'center' }}>
            <img src={src} alt={`preview-${idx}`} style={{ height: '100px' }} />
            <div style={{ fontSize: '12px', marginTop: '4px' }}>{formData.images[idx]?.name}</div>
          </div>
        ))}
        {existingImages.map((url, idx) => {
          const filename = url.split('/').pop().split('?')[0];
          return (
            <div key={`existing-img-${idx}`} style={{ textAlign: 'center' }}>
              <img src={url} alt={`existing-${idx}`} style={{ height: '100px' }} />
              <div style={{ fontSize: '12px', marginTop: '4px' }}>{filename}</div>
            </div>
          );
        })}
      </div>

      <label>Videos</label><br />
      <input type="file" name="videos" multiple accept="video/*" onChange={handleChange} /><br />
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', margin: '10px 0' }}>
        {previewVideos.map((src, idx) => (
          <div key={`new-vid-${idx}`} style={{ textAlign: 'center' }}>
            <video src={src} controls style={{ height: '120px' }} />
            <div style={{ fontSize: '12px', marginTop: '4px' }}>{formData.videos[idx]?.name}</div>
          </div>
        ))}
        {existingVideos.map((url, idx) => {
          const filename = url.split('/').pop().split('?')[0];
          return (
            <div key={`existing-vid-${idx}`} style={{ textAlign: 'center' }}>
              <video src={url} controls style={{ height: '120px' }} />
              <div style={{ fontSize: '12px', marginTop: '4px' }}>{filename}</div>
            </div>
          );
        })}
      </div>

      <button type="submit">Update Property</button>
    </form>
  );
};

export default PropertyEdit;
