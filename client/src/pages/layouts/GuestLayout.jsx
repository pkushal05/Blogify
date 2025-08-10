import GuestNavbar from "../../components/GuestNavbar.jsx";
import { Outlet, useLocation } from "react-router-dom";

/**
 * GuestLayout Component
 * - Layout wrapper for unauthenticated (guest) pages
 * - Conditionally renders GuestNavbar on all pages except login and signup
 * - Uses react-router's Outlet to render nested routes
 */
const GuestLayout = () => {
  // Get current path to decide when to show navbar
  const { pathname } = useLocation();

  // Paths where navbar should be hidden
  const noNavPaths = ["/login", "/signup"];

  return (
    <>
      {/* Render GuestNavbar only if current path is NOT in noNavPaths */}
      {!noNavPaths.includes(pathname) && <GuestNavbar />}
      {/* Render nested route content here */}
      <Outlet />
    </>
  );
};

export default GuestLayout;
