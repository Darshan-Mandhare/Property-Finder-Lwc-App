import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // ✅ import context
import API from "../api/axios";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth(); // ✅ get login() from context

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/users/sign_in", {
        user: { email, password },
      });

      const token = res.headers.authorization?.split(" ")[1];
      
      const userId = res.data?.id || res.data?.user?.id;
      
      if (token && userId) {
        localStorage.setItem("token", token);
        localStorage.setItem("user_id", userId);
        login({ id: userId }); // ✅ update global state
        alert("Logged in successfully!");
        navigate("/");
      } else {
        alert("Token or User ID not found in response.");
      }
    } catch (err) {
      console.error(err);
      alert("Login failed.");
    }
  };

  return (
    <div className="login-form-wrapper">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>
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
        <button type="submit">Login</button>
        <p>
          Don’t have an account? <Link to="/register">Register here</Link>
        </p>
        <p>
          Forgot password? <Link to="/forgot-password">Click here</Link>
        </p>
      </form>
    </div>
  );
}
