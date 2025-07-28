import GuestNavbar from "../../components/GuestNavbar.jsx";
import { Outlet, useLocation } from "react-router-dom";

const GuestLayout = () => {
  const { pathname } = useLocation();

  const noNavPaths = ["/login", "/signup"];
  return (
    <>
      {!noNavPaths.includes(pathname) && <GuestNavbar />}
      <Outlet />
    </>
  );
};

export default GuestLayout;
