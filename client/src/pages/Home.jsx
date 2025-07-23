import React from "react";
import { Link } from "react-router-dom";
import Features from "../components/Features";
import RecentBlogs from "../components/RecentBlogs";
import Hero from "../components/Hero";
import CallToAction from "../components/CallToAction";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="w-full min-h-screen bg-base-300">
      {/* // Hero Section */}
      <Hero />
      <Features />
      <RecentBlogs />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Home;
