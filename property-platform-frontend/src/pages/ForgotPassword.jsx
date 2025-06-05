import { useState } from "react";
import API from "../api/axios";
import "./ForgotPassword.css"; // ✅ Scoped CSS

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/users/password", {
        user: { email },
      });

      if (res.status === 200) {
        setMessage("Reset password instructions have been sent to your email.");
      } else {
        setMessage("Something went wrong.");
      }
    } catch (err) {
      console.error(err);
      setMessage("Failed to send reset instructions.");
    }
  };

  return (
    <div className="forgot-password-wrapper">
      <form className="forgot-password-form" onSubmit={handleSubmit}>
        <h2>Forgot Password</h2>

        <input
          type="email"
          placeholder="Enter your registered email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button type="submit">Send Reset Instructions</button>

        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
}
