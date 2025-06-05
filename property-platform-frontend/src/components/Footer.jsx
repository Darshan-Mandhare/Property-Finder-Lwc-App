// src/components/Footer.js
import './Layout.css';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} DreamHomes. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
