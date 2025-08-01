import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { clearMessage } from "../features/slices/authSlice.js"
//Icons
import { PenTool, Image, Zap, MessageCircle, SquarePen } from "lucide-react";
import { FaLinkedin } from "react-icons/fa";  
import { Github, Instagram, Mail } from "lucide-react";
import { ArrowRight } from "lucide-react";
// Assests
import blogify_logo_white from "../assets/blogify_logo_white.svg";
import blogify_logo from "../assets/blogify_logo.svg";



const Home = () => {

  const { message, showSuccessMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const socialIcons = [
    { icon: <Github />, link: "https://github.com/pkushal05" },
    { icon: <Instagram />, link: "https://www.instagram.com/_.kushal1052/" },
    {
      icon: <FaLinkedin className="text-2xl" />,
      link: "https://www.linkedin.com/in/kushalpatel07/",
    },
    { icon: <Mail />, link: "mailto:patelkushal2363@gmail.com" },
  ];

  useEffect(() => {
    if (showSuccessMessage) {
      const timer = setTimeout(() => {
        dispatch(clearMessage());
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [ showSuccessMessage, dispatch ])

  
  return (
    <div id="home" className="w-full min-h-screen bg-base-300">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full min-h-[calc(100vh-14vh)] flex items-center justify-center py-8 relative"
      >
        {showSuccessMessage && (
          <div className="absolute z-30 border right-5 top-30 p-5 rounded-3xl text-neutral select-none bg-neutral-content">
            ✅ {message}
          </div>
        )}
        <div className="container mx-auto px-6 mt-30 lg:px-20 flex flex-col-reverse lg:flex-row items-center">
          {/* Text Content */}
          <div className="w-full lg:w-1/2 text-center lg:text-left space-y-3">
            <h3 className="text-xl sm:text-3xl md:text-4xl font-bold text-neutral font-[Playfair]">
              Welcome to
            </h3>
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-[Playfair]">
              Blogify
            </h1>
            <p className="text-lg sm:text-xl text-base-content max-w-xl mx-auto lg:mx-0">
              Discover the latest insights, tutorials, and trends in web
              development—all in one place.
            </p>
            <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4  sm:space-y-2 justify-center lg:justify-start">
              <Link
                to="/signup"
                className="btn btn-primary lg:btn-lg btn-base hover:text-primary hover:bg-primary-content hover:scale-95"
              >
                Get Started
              </Link>
              <Link
                to="/about"
                className="btn btn-outline lg:btn-lg btn-base hover:bg-neutral hover:text-neutral-content"
              >
                About
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-[90%] max-w-screen-xl min-h-screen mx-auto font-[Poppins]"
      >
        <div className="flex flex-col justify-center items-center">
          <div className="text-center mb-3">
            <h1 className="text-3xl md:text-5xl text-neutral font-[FairPlay]">
              Everything you need to Blog
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mt-10">
            <div className="bg-base-200 text-base-content p-10 rounded-2xl flex flex-col items-center gap-4 md:col-span-full">
              <PenTool className="text-neutral-content" />
              <h2 className="text-xl md:text-2xl">Easy Authentication</h2>
              <p className="text-center ">
                Quick signup and secure login to start your blogging journey
              </p>
            </div>

            <div className="bg-neutral text-neutral-content p-10 rounded-2xl flex flex-col items-center gap-4">
              <Image className="text-neutral-content" />
              <h2 className="text-xl md:text-2xl">Custom Thumbnails</h2>
              <p className="text-center ">
                Upload eye-catching cover images to make your posts stand out
              </p>
            </div>

            <div className="bg-base-200 p-10 rounded-2xl flex flex-col items-center gap-4">
              <Zap className="text-neutral-content" />
              <h2 className="text-xl md:text-2xl">Lightning Fast</h2>
              <p className="text-center ">
                Optimized performance so you can focus on what matters - writing
              </p>
            </div>

            <div className="bg-neutral text-neutral-content p-10 rounded-2xl flex flex-col items-center gap-4 col-span-full md:col-span-1">
              <MessageCircle className="text-neutral-content" />
              <h2 className="text-xl md:text-2xl">Engage readers</h2>
              <p className="text-center ">
                Build community with comments and likes on every blog post
              </p>
            </div>

            <div className="bg-base-200 text-base-content p-10 rounded-2xl flex flex-col items-center gap-4 col-span-full">
              <SquarePen className="text-neutral-content" />
              <h2 className="text-xl md:text-2xl">Rich Blog Editor</h2>
              <p className="text-center ">
                Write and format beautiful blog posts with our intuitive editor
              </p>
            </div>
          </div>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="w-[90%] min-h-auto mx-auto my-22">
          <h2 className="text-3xl md:text-5xl font-[FairPlay] text-center mb-10 text-neutral">
            Recent Blogs
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((_, index) => (
              <div
                key={index}
                className="card bg-base-100 shadow-md hover:shadow-xl transition rounded-lg overflow-hidden"
              >
                <div className="h-40 bg-neutral"></div>{" "}
                {/* Replace with image */}
                <div className="card-body">
                  <h3 className="card-title text-xl text-neutral-content">
                    Blog Title Here
                  </h3>
                  <p className="text-neutral-content text-sm">
                    by John Doe • Jul 23, 2025
                  </p>
                  <p className="mt-2 text-neutral-content text-sm line-clamp-2">
                    A short description of the blog goes here. Just enough to
                    hook the reader's interest...
                  </p>
                  <div className="mt-4">
                    <button className="btn btn-sm bg-primary text-primary-content hover:bg-primary-content hover:text-primary">
                      Read More
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <section className="w-[90%] mx-auto p-10 bg-primary text-primary-content rounded-xl flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-[FairPlay] mb-4">
              Ready to start writing?
            </h2>
            <p className="text-base md:text-lg max-w-xl">
              Join Blogify today and share your ideas with the world. It is
              free, fast, and easy to use!
            </p>
          </div>
          <Link to="/signup">
            <button className="mt-4 md:mt-0 bg-primary-content text-primary px-6 py-3 rounded-lg text-lg font-semibold flex items-center gap-2 hover:bg-white hover:text-primary hover:scale-90 transition-all">
              Get Started <ArrowRight size={20} />
            </button>
          </Link>
        </section>
      </motion.div>
      <footer className="bg-primary/90 text-neutral-content py-10 px-6 mt-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1: Logo & Description */}
          <div>
            <img src={blogify_logo_white} alt="Logo" className="w-72 h-28" />
            <p className="text-sm">
              Share your thoughts, tell your stories, and connect with the
              world.
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div className="text-center">
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
          <div className="text-center">
            <h3 className="font-semibold text-lg mb-2">Follow Us</h3>
            <div className="flex gap-4 justify-center">
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
    </div>
  );
};

export default Home;
