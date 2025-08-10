import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar.jsx";
import Footer from "../../components/Footer.jsx";

/**
 * Layout Component
 * - Main layout wrapper for authenticated pages
 * - Renders Navbar at the top, Footer at the bottom
 * - Uses react-router's Outlet to render nested child routes between Navbar and Footer
 */
const Layout = () => {
  return (
    <>
      {/* Site navigation bar */}
      <Navbar />

      {/* Nested route content */}
      <Outlet />

      {/* Site footer */}
      <Footer />
    </>
  );
};

export default Layout;
