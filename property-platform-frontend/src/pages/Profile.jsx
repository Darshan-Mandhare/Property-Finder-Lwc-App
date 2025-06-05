import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";
import './Profile.css';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    API.get(`/profile`)
      .then((res) => {
        setUser(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading profile:", err);
        setLoading(false);
        if (err.response?.status === 401 || err.response?.status === 403) {
          // Not authenticated
          navigate('/login'); // redirect to login
        }
      });
  }, [navigate]);

  if (loading) return <p className="profile-loading">Loading...</p>;
  if (!user) return null;

  return (
    <div className="profile-container">
      <h2 className="profile-title">User Profile</h2>
      <div className="profile-info">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone || "N/A"}</p>
        <p><strong>Bio:</strong> {user.bio || "No bio provided"}</p>
      </div>
      <Link to="/profile/edit">
        <button className="edit-profile-button">Edit Profile</button>
      </Link>
    </div>
  );
}
