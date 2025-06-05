import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import "./Register.css"; // ✅ Add this

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== passwordConfirmation) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const res = await API.post("/users", {
        user: {
          name,
          email,
          password,
          password_confirmation: passwordConfirmation,
        },
      });

      if (res.status === 200 || res.status === 201) {
        alert("Registered successfully!");
        navigate("/login");
      } else {
        alert("Unexpected response from server.");
      }
    } catch (err) {
      console.error(err);
      alert("Registration failed.");
    }
  };

  return (
    <div className="register-form-wrapper">
      <form className="register-form" onSubmit={handleRegister}>
        <h2>Register</h2>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          required
        />

        <button type="submit">Register</button>
      </form>
    </div>
  );
}
