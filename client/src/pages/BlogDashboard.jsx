import React, { useState } from "react";
import {
  NotebookPen,
  ThumbsUp,
  MessageCircle,
  Filter,
  FilePlus2,
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import BlogCard from "../components/BlogCard.jsx";

const BlogDashboard = () => {
  const [filterOpen, setFilterOpen] = useState(false);
  const blogs = [
    {
      thumbnail:
        "https://thumbs.dreamstime.com/b/idyllic-summer-landscape-clear-mountain-lake-alps-45054687.jpg",
      title: "The Rise of AI in Everyday Life",
      content:
        "Artificial Intelligence is no longer a concept of the future—it's embedded in how we live, shop, and communicate.",
      authorPic: "https://randomuser.me/api/portraits/men/32.jpg",
      authorName: "Michael Lee",
      category: "Technology",
      date: "July 28, 2025",
    },
    {
      thumbnail: "https://picsum.photos/id/59/200/300",
      title: "5 Morning Habits That Changed My Life",
      content:
        "Small consistent habits can have the biggest impact. Here's how my morning routine helped me become more productive.",
      authorPic: "https://randomuser.me/api/portraits/women/44.jpg",
      authorName: "Sophia Gomez",
      category: "Lifestyle",
      date: "July 25, 2025",
    },
    {
      thumbnail: "https://picsum.photos/id/27/200/300",
      title: "Minimal UI: The Future of Web Design?",
      content:
        "Less is more when it comes to design—exploring the psychology and impact of clean, focused interfaces.",
      authorPic: "https://randomuser.me/api/portraits/men/85.jpg",
      authorName: "Raj Patel",
      category: "Design",
      date: "July 20, 2025",
    },
    {
      thumbnail: "https://picsum.photos/id/400/200/300",
      title: "How Small Startups Compete with Giants",
      content:
        "Startups are disrupting traditional markets by focusing on agility, innovation, and deep customer empathy.",
      authorPic: "https://randomuser.me/api/portraits/women/19.jpg",
      authorName: "Emily Zhang",
      category: "Business",
      date: "July 10, 2025",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-base-300 font-[Poppins] text-neutral">
      <div className="pt-20 h-full max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="p-10 space-y-2 text-center lg:text-left flex flex-col"
        >
          <h2 className="text-xl md:text-2xl font-extralight">Welcome 👋</h2>
          <h1 className="text-3xl md:text-5xl">John Doe</h1>
        </motion.div>
        <hr className="max-w-[90%] mx-auto my-5 border-t border-base-content/40" />
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="p-5 w-full mx-auto grid grid-cols-1 lg:grid-cols-3 gap-5 select-none"
        >
          {[
            { icon: <NotebookPen />, name: "Total Blogs", count: 0 },
            { icon: <ThumbsUp />, name: "Total Likes", count: 0 },
            { icon: <MessageCircle />, name: "Total Comments", count: 0 },
          ].map((item, idx) => {
            return (
              <div
                key={idx}
                className="bg-gradient-to-br from-base-300 to-base-100 shadow-xl border border-base-content/10 rounded-xl hover:shadow-2xl hover:from-base-100 hover:to-base-50 transition-all duration-300 h-36 lg:h-52 flex flex-row lg:flex-col gap-10 justify-between lg:justify-center p-6"
              >
                <div className="flex flex-row lg:flex-col items-center gap-3">
                  <div className="p-3 bg-primary/15 rounded-xl backdrop-blur-sm text-primary">
                    {item.icon}
                  </div>
                  <h1 className="text-lg md:text-2xl font-semibold text-base-content bg-gradient-to-r from-base-content to-base-content/70 bg-clip-text">
                    {item.name}
                  </h1>
                </div>
                <div className="text-center flex items-center justify-center">
                  <p className="text-5xl font-black text-primary mr-5 lg:mr-0 tracking-tight">
                    {item.count}
                  </p>
                </div>
              </div>
            );
          })}
        </motion.div>
        <hr className="max-w-[90%] mx-auto my-5 border-t border-base-content/40" />
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className={"max-w-fit flex gap-3 sm:gap-10 px-5 py-4 "}
        >
          <div className="relative">
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className="btn btn-outline btn-sm inline-flex whitespace-nowrap lg:btn-lg hover:shadow-xl"
            >
              <Filter /> Filter by Category
            </button>

            {filterOpen && (
              <div className="absolute top-full mt-2 left-0 bg-base-300 border border-base-content/10 rounded-xl shadow-xl p-4 min-w-48 z-10">
                <div className="flex flex-col gap-2">
                  {["Technology", "Lifestyle", "Design", "Business"].map(
                    (category) => (
                      <button
                        key={category}
                        className="btn btn-ghost btn-sm sm:btn-md lg:btn-lg justify-start text-primary font-medium hover:bg-base-300 hover:scale-95 transition-all duration-200"
                      >
                        {category}
                      </button>
                    )
                  )}
                </div>
              </div>
            )}
          </div>
          <div>
            <Link
              to={"/create"}
              className="btn btn-neutral btn-sm inline-flex whitespace-nowrap lg:btn-lg hover:text-base-content hover:shadow-xl"
            >
              <FilePlus2 /> Create
            </Link>
          </div>
        </motion.div>
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-7xl mx-auto p-5">
            <h2 className="text-2xl font-medium mb-4 select-none">My Blogs</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.map((item, idx) => {
                return (
                  <BlogCard
                    key={idx}
                    id={idx}
                    thumbnail={item.thumbnail}
                    title={item.title}
                    content={item.content}
                    authorPic={item.authorPic}
                    authorName={item.authorName}
                    category={item.category}
                    date={item.date}
                  />
                );  
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BlogDashboard;
