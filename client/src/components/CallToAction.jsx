import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CallToAction = () => {
  return (
    <section className="w-[90%] mx-auto p-10 bg-primary text-primary-content rounded-xl flex flex-col md:flex-row justify-between items-center gap-6">
      <div>
        <h2 className="text-3xl md:text-4xl font-[FairPlay] mb-4">
          Ready to start writing?
        </h2>
        <p className="text-base md:text-lg max-w-xl">
          Join Blogify today and share your ideas with the world. It is free,
          fast, and easy to use!
        </p>
      </div>
      <Link to="/signup">
        <button className="mt-4 md:mt-0 bg-primary-content text-primary px-6 py-3 rounded-lg text-lg font-semibold flex items-center gap-2 hover:bg-white hover:text-primary hover:scale-90 transition-all">
          Get Started <ArrowRight size={20} />
        </button>
      </Link>
    </section>
  );
};

export default CallToAction;
