import React from "react";
import { Facebook, Github, Instagram } from "lucide-react";
import { Link } from "react-router-dom";
import blogify_logo_white from "../assets/blogify_logo_white.svg";

const Footer = () => {
  const socialIcons = [
    { icon: <Github />, link: "https://github.com/pkushal05" },
    { icon: <Instagram />, link: "https://instagram.com" },
    { icon: <Facebook />, link: "https://facebook.com" },
  ];

  return (
    <footer className="bg-neutral text-neutral-content py-10 px-6 mt-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Column 1: Logo & Description */}
        <div>
          <img src={blogify_logo_white} alt="Logo" className="w-72 h-28" />
          <p className="text-sm">
            Share your thoughts, tell your stories, and connect with the world.
          </p>
        </div>

        {/* Column 2: Navigation */}
        <div>
          <h3 className="font-semibold text-lg mb-2">Quick Links</h3>
          <ul className="space-y-1 text-sm">
            <li>
              <Link to="/home" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:underline">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:underline">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Social Media */}
        <div>
          <h3 className="font-semibold text-lg mb-2">Follow Us</h3>
          <div className="flex gap-4">
            {socialIcons.map((item, index) => (
              <Link
                to={item.link}
                key={index}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-base-200"
              >
                {item.icon}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="text-center mt-8 text-sm border-t border-base-300 pt-4">
        © {new Date().getFullYear()} Blogify. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
