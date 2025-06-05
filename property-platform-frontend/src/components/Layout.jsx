// src/components/Layout.js
import Header from "./Header";
import Footer from "./Footer";
import './Layout.css';
import { Outlet } from "react-router-dom";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      <main className="site-main">{children}
        <Outlet/>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
