import { useState, useEffect, use } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/thunks/authThunks";
import { motion } from "framer-motion";

// Icons
import { Search, ChevronRight, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import blogify_logo from "../assets/blogify_logo.svg";

const Navbar = () => {
  const dispatch = useDispatch();
  const { message, loading } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.user);  
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show navbar when at the top of the page
      if (currentScrollY === 0) {
        setIsVisible(true);
      }
      // Show navbar when scrolling up, hide when scrolling down
      else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
        setIsMenuOpen(false); // Close mobile menu when hiding navbar
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const handleLogOut = async () => {
    try {
      await dispatch(logout());
      
      navigate("/");
    } catch (error) {
      console.log(message);
    }
  };

  return (
    <nav
      className={`w-full h-[12vh] text-neutral backdrop-blur-md z-50 font-[Poppins] border border-b-1 border-neutral fixed top-0 p-3 transition-transform duration-300 ease-linear ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="flex max-w-7xl mx-auto justify-between items-center h-16 px-2 sm:px-4">
        <div className="w-36 sm:w-48 md:w-64 lg:w-72">
          <img
            src={blogify_logo}
            alt="Blogify Logo"
            className="w-full h-full bg-transparent"
          />
        </div>
        <div className="flex items-center gap-3 md:gap-5">
          <div className="relative">
            <Search
              size={20}
              className="absolute left-2 top-2 z-10 pointer-events-none"
            />
            <input
              type="text"
              name="search"
              className="border-1 rounded-lg h-9 pr-3 md:h-10 w-20 md:w-48 pl-10 focus:ring-1"
              placeholder="Search..."
            />
          </div>
          <div
            className="relative flex items-center gap-2 group p-2 cursor-pointer rounded-lg transition-all duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="w-8 h-8 md:w-9 md:h-9 rounded-full border-1 overflow-hidden hover:scale-95 transition-all duration-300">
              <img
                src={user.profilePic}
                alt="User's profile pic"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="hidden md:block text-base hover:text-base-100 hover:scale-95 transition-all duration-300">
              {user.userName}
            </span>
          </div>
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
                { label: "Logout", action: handleLogOut },
              ].map((item, index) => {
                if (item.action) {
                  // For logout - use div with onClick
                  return (
                    <div
                      key={index}
                      onClick={item.action}
                      className="p-3 mb-3 hover:scale-95 rounded-lg transition-colors flex justify-between cursor-pointer text-red-500 hover:bg-red-100"
                    >
                      {item.label}
                      <LogOut className="inline ml-1" />
                    </div>
                  );
                } else {
                  // For other items - use Link
                  return (
                    <Link
                      to={item.to}
                      key={index}
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
