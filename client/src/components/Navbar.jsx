import { useState, useEffect } from "react";
import React from "react";
import { Search, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import blogify_logo from "../assets/blogify_logo.svg";
import blogify_logo_white from "../assets/blogify_logo_white.svg";


const Navbar = () => {
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

  return (
    <header
      className={`w-full h-[14vh] bg-neutral text-neutral-content font-[Poppins] z-100 border border-b-1 border-neutral fixed top-0 p-3 transition-transform duration-300 ease-linear ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="max-w-full">
        <div className="flex justify-between items-center h-16 sm-px-2">
          <div className="sm:min-w-12">
            <Link to={"/"} className="cursor-default text">
              <img
                src={blogify_logo_white}
                className="w-full h-full"
                alt="Blogify logo"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-8">
            {["Home", "Categories", "About", "Contact"].map((item, index) => {
              return (
                <Link
                  to={item === "Home" ? "/" : `/${item.toLowerCase().trim()}`}
                  key={index}
                  className="text-[2.8vh] hover:text-base-200"
                >
                  {item}
                </Link>
              );
            })}
          </nav>

          {/* Search and Mobile Menu */}
          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <input
                type="text"
                placeholder="Search articles..."
                className="w-48 pl-10 pr-4 py-2 border rounded-lg focus:ring-4 bg-neutral placeholder:text-neutral-content caret-neutral-content focus:ring-base-content"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-neutral-content" />
            </div>

            <button className="bg-primary font-semibold text-primary-content px-4 py-2 rounded-lg hover:text-primary hover:bg-primary-content transition-colors">
              Register
            </button>

            {/* Mobile menu button */}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden relative w-full">
            <div className="flex flex-col space-y-4 absolute items-center bg-base-300 pt-4 pb-4 w-full h-auto top-1 left-0">
              {["Home", "Categories", "About", "Contact"].map((item, index) => {
                return (
                  <Link
                    to={item === "Home" ? "/" : `/${item.toLowerCase().trim()}`}
                    key={index}
                    className="text-neutral hover:text-neutral-content"
                  >
                    {item}
                  </Link>
                );
              })}
              <div className="pt-2">
                <input
                  type="text"
                  placeholder="Search articles..."
                  className="w-full pl-10 pr-4 py-2 border border-neutral rounded-lg focus:ring-4 focus:ring-neutral-content placeholder:text-neutral-content"
                />
                <Search className="absolute top-49 left-20 h-5 w-5 text-neutral" />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
