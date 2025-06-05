// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import PropertyForm from "./pages/PropertyForm";
import PropertyView from "./pages/PropertyView"; 
import PropertyList from "./pages/PropertyList"; 
import PropertyEdit from './pages/PropertyEdit';
import HomePage from './pages/HomePage';
//import Navbar from './pages/Navbar';
import About from './pages/About';
import EditProfile from "./pages/EditProfile";
import Layout from './components/Layout';
import ForgotPassword from "./pages/ForgotPassword";
import { AuthProvider } from "./context/AuthContext";
import ContactForm from './pages/ContactForm';


function App() {
  return (
    <div style={{ width: '100vw', margin: 0, padding: 0, boxSizing: 'border-box' }}>
  <AuthProvider> 
    <Router>
      <Layout>

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} /> {/* ✅ route added */}

        {/* ✅ Updated Authenticated Profile Routes */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/edit" element={<EditProfile />} />
        <Route path="/contact" element={<ContactForm />} />

        {/* Property Routes */}
        <Route path="/properties/new" element={<PropertyForm />} />
        <Route path="/properties/:id" element={<PropertyView />} />
        <Route path="/properties/:id/edit" element={<PropertyEdit />} />
        <Route path="/properties" element={<PropertyList />} />
      </Routes>
      </Layout>

    </Router>
  </AuthProvider>
    </div>
  );
}

export default App;
