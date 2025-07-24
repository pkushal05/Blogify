import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="w-full min-h-[calc(100vh-14vh)] flex items-center justify-center py-8"
    >
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
  );
};

export default Hero;
