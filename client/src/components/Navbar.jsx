import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/thunks/authThunks";
import { motion } from "framer-motion";

// Icons
import { Search, ChevronRight, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import blogify_logo from "../assets/blogify_logo.svg";

/**
 * Navbar Component
 * - Displays the main navigation bar for authenticated users
 * - Shows logo, search input, user menu with profile, dashboard, explore, and logout options
 * - Navbar hides/shows on scroll for better UX
 * - Includes animated dropdown menu for user options
 */
const Navbar = () => {
  const dispatch = useDispatch();

  // Redux state for auth and user info
  const { message, loading } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.user);

  const navigate = useNavigate();

  // Local state for menu open/close, navbar visibility, scroll position, and search query
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [q, setQ] = useState("");

  useEffect(() => {
    // Handle scroll events to toggle navbar visibility based on scroll direction
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY === 0) {
        setIsVisible(true); // Show navbar at top of page
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true); // Show navbar when scrolling up
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false); // Hide navbar when scrolling down past 100px
        setIsMenuOpen(false); // Close menu if open while hiding navbar
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  /**
   * Logs out the user by dispatching the logout thunk
   * Then redirects to home page
   */
  const handleLogOut = async () => {
    try {
      await dispatch(logout());
      window.location.href = "/";
      navigate("/");
    } catch (error) {
      console.log(message);
    }
  };

  /**
   * Handles search form submission
   * Navigates to explore page with query param
   */
  const handleSearch = (e) => {
    e.preventDefault();
    const trimmed = q.trim();
    const params = new URLSearchParams();
    if (trimmed) params.set("q", trimmed);
    navigate(`/app/explore?${params.toString()}`);
    setQ("");
  };

  return (
    <nav
      className={`w-full h-[12vh] text-neutral backdrop-blur-md z-50 font-[Poppins] border border-b-1 border-neutral fixed top-0 p-3 transition-transform duration-300 ease-linear ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="flex max-w-7xl mx-auto justify-between items-center h-16 px-2 sm:px-4">
        {/* Logo */}
        <div className="w-36 sm:w-48 md:w-64 lg:w-72">
          <img
            src={blogify_logo}
            alt="Blogify Logo"
            className="w-full h-full bg-transparent"
          />
        </div>

        {/* Search input and user menu */}
        <div className="flex items-center gap-3 md:gap-5">
          {/* Search box */}
          <div className="relative">
            <form onSubmit={handleSearch}>
              <Search
                size={20}
                className="absolute left-2 top-2 z-10 pointer-events-none"
              />
              <input
                type="text"
                name="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                className="border-1 rounded-lg h-9 pr-3 md:h-10 w-20 md:w-48 pl-10 focus:ring-1"
                placeholder="Search..."
              />
            </form>
          </div>

          {/* User avatar and name with dropdown toggle */}
          <div
            className="relative flex items-center gap-2 group p-2 cursor-pointer rounded-lg transition-all duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="User menu toggle"
          >
            <div className="w-8 h-8 md:w-9 md:h-9 rounded-full border-1 overflow-hidden hover:scale-95 transition-all duration-300">
              <img
                src={
                  user?.profilePic ||
                  "https://militaryhealthinstitute.org/wp-content/uploads/sites/37/2021/08/blank-profile-picture-png.png"
                }
                alt="User's profile pic"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="hidden md:block text-base hover:text-base-100 hover:scale-95 transition-all duration-300">
              {user.userName}
            </span>
          </div>

          {/* Dropdown menu with animation */}
          <motion.div
            animate={{ opacity: isMenuOpen ? 1 : 0, y: isMenuOpen ? 0 : -20 }}
            transition={{ duration: 0.3, ease: "easeIn" }}
            className={`${
              isMenuOpen ? "block" : "hidden"
            } absolute top-16 right-20 md:right-21 lg:right-32 lg:top-16 mt-2 bg-base-300 rounded-lg shadow-lg w-48`}
          >
            <div className="flex flex-col text-sm md:text-lg border-1 p-5 w-64 rounded-lg bg-base-300">
              {[
                { label: "Dashboard", to: "/app" },
                { label: "Profile", to: `profile/${user._id}` },
                { label: "Explore", to: "explore" },
                { label: "Logout", action: handleLogOut },
              ].map((item, index) => {
                if (item.action) {
                  return (
                    <div
                      key={index}
                      onClick={() => {
                        item.action();
                        setIsMenuOpen(false);
                      }}
                      className="p-3 mb-3 hover:scale-95 rounded-lg transition-colors flex justify-between cursor-pointer text-red-500 hover:bg-red-100"
                    >
                      {item.label}
                      <LogOut className="inline ml-1" />
                    </div>
                  );
                } else {
                  return (
                    <Link
                      to={item.to}
                      key={index}
                      onClick={() => setIsMenuOpen(false)}
                      className="p-3 mb-3 hover:scale-95 rounded-lg transition-colors flex justify-between text-primary hover:bg-base-100"
                    >
                      {item.label}
                      <ChevronRight className="inline ml-1" />
                    </Link>
                  );
                }
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
