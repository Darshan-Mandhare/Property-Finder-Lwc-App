// src/pages/EditProfile.js
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import './EditProfile.css'; // ✅ Import the CSS

export default function EditProfile() {
  const [user, setUser] = useState({ name: "", email: "", phone: "", bio: "" });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    API.get(`/profile`)
      .then((res) => {
        setUser(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch user:", err);
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    API.put(`/profile`, { user })
      .then((res) => {
        alert("Profile updated successfully");
        navigate(`/profile`);
      })
      .catch((err) => {
        console.error("Update failed:", err);
        alert("Failed to update profile");
      });
  };

  if (loading) return <p className="edit-profile-loading">Loading...</p>;

  return (
    <div className="edit-profile-container">
      <h2 className="edit-profile-title">Edit Profile</h2>
      <form className="edit-profile-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" name="name" value={user.name || ""} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" name="email" value={user.email || ""} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Phone:</label>
          <input type="text" name="phone" value={user.phone || ""} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Bio:</label>
          <textarea name="bio" value={user.bio || ""} onChange={handleChange}></textarea>
        </div>
        <button type="submit" className="save-button">Save</button>
      </form>
    </div>
  );
}
