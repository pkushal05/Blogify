import { useState, useEffect } from "react";
import React from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import blogify_logo_white from "../assets/blogify_logo_white.svg";

/**
 * GuestNavbar Component
 * - Responsive navigation bar for guest (unauthenticated) users
 * - Displays logo, navigation links, and login button
 * - Hides/shows navbar on scroll up/down for better UX
 * - Includes a mobile menu toggle with animated icons
 */
const GuestNavbar = () => {
  // State to track if mobile menu is open
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // State to control navbar visibility on scroll
  const [isVisible, setIsVisible] = useState(true);
  // Track last scroll position to determine scroll direction
  const [lastScrollY, setLastScrollY] = useState(0);

  // Nav-links
  const navLinks = [
    { tag: "Home", link: "/" },
    { tag: "About", link: "about" },
    { tag: "Contact", link: "mailto:patelkushal2363@gmail.com" },
  ];

  //className="text-[2.8vh] hover:text-base-200"

  useEffect(() => {
    // Scroll handler to show/hide navbar based on scroll direction and position
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show navbar when at the top of the page
      if (currentScrollY === 0) {
        setIsVisible(true);
      }
      // Show navbar when scrolling up
      else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }
      // Hide navbar when scrolling down past 100px and close mobile menu if open
      else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
        setIsMenuOpen(false);
      }

      // Update last scroll position
      setLastScrollY(currentScrollY);
    };

    // Attach scroll event listener with passive option for performance
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <header
      className={`w-full h-[14vh] backdrop-blur-xs bg-primary/90 text-neutral-content z-50 font-[Poppins] border border-b-1 border-neutral fixed top-0 p-3 transition-transform duration-300 ease-linear ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="max-w-full">
        <div className="flex justify-between items-center h-16 sm-px-2">
          {/* Logo linking to home page */}
          <div className="sm:min-w-10">
            <Link to={"/"} className="cursor-default text">
              <img
                src={blogify_logo_white}
                className="w-full h-full"
                alt="Blogify logo"
              />
            </Link>
          </div>
          {/* Desktop Navigation links */}
          <nav className="hidden lg:flex space-x-10 -ml-35">
            {navLinks.map((item, idx) => {
              return (
                <Link
                  key={idx}
                  className="text-[2.8vh] hover:text-base-200"
                  to={item.link}
                >
                  {item.tag}
                </Link>
              );
            })}
          </nav>

          {/* Login button and mobile menu toggle */}
          <div className="flex items-center space-x-4">
            <Link to={"/login"}>
              <button className="bg-primary-content text-xs md:text-base font-semibold text-primary px-4 py-2 rounded-lg hover:text-primary-content hover:bg-primary transition-colors ">
                Log In
              </button>
            </Link>

            {/* Mobile menu button: toggles hamburger and close icons */}
            <button
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu: visible only when isMenuOpen is true */}
        {isMenuOpen && (
          <div className="lg:hidden relative w-full z-50 ">
            <div className="flex flex-col space-y-4 bg-neutral text-neutral-content absolute items-center pt-4 pb-4 w-full h-auto top-1 left-0">
              {navLinks.map((item, idx) => {
                return (
                  <Link
                    key={idx}
                    className="hover:text-base-200"
                    to={item.link}
                  >
                    {item.tag}
                  </Link>
                );
              })}
              <p className="mt-6 text-neutral-content text-sm">
                &copy; {`${new Date().getFullYear()} Blogify`}
              </p>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default GuestNavbar;
