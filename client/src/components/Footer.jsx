import React from "react";
import { Link } from "react-router-dom";
import { FaLinkedin } from "react-icons/fa";
import { Instagram, Github, Mail } from "lucide-react";

/**
 * Footer Component
 * - Displays site branding, navigation links, and social media icons
 * - Responsive layout adjusts between stacked and row on larger screens
 * - Social links open in new tabs safely with noopener noreferrer
 */
const Footer = () => {
  // Social media icons with URLs
  const socialIcons = [
    { icon: <Github />, link: "https://github.com/pkushal05" },
    { icon: <Instagram />, link: "https://www.instagram.com/_.kushal1052/" },
    {
      icon: <FaLinkedin className="text-2xl" />,
      link: "https://www.linkedin.com/in/kushalpatel07/",
    },
    { icon: <Mail />, link: "mailto:patelkushal2363@gmail.com" },
  ];

  // Footer navigation links
  const links = [
    { name: "About", link: "/about" },
    { name: "Contact", link: "/contact" },
    { name: "Privacy Policy", link: "#" },
    { name: "Terms of Service", link: "#" },
  ];

  return (
    <footer className="w-full bg-base-300 text-base-content/80 py-8">
      <div className="mx-auto max-w-7xl px-5 flex flex-col md:flex-row justify-between items-center">
        {/* Branding: Site name and tagline */}
        <div className="mb-4 md:mb-0">
          <h2 className="text-2xl font-bold text-center">Blogify</h2>
          <p className="text-sm">Write. Share. Inspire.</p>
        </div>

        {/* Navigation links */}
        <div className="flex flex-col text-center sm:flex-row gap-6 text-sm">
          {links.map((item, idx) => (
            <Link to={item.link} key={idx} className="hover:text-base-200">
              {item.name}
            </Link>
          ))}
        </div>

        {/* Social media icons with external links */}
        <div className="flex gap-4 mt-4 md:mt-0">
          {socialIcons.map((item, idx) => (
            <Link
              to={item.link}
              key={idx}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-base-200"
            >
              {item.icon}
            </Link>
          ))}
        </div>
      </div>

      {/* Copyright notice */}
      <div className="mt-8 border-t border-base-content/20 pt-4 text-center text-xs">
        © {new Date().getFullYear()} Blogify. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
