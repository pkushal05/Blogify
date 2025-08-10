import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { clearUserMessages } from "../features/slices/userSlice.js";
// Icons
import {
  NotebookPen,
  ThumbsUp,
  MessageCircle,
  Filter,
  FilePlus2,
  X,
} from "lucide-react";

//Component
import BlogCard from "../components/BlogCard.jsx";

/**
 * BlogDashboard Component - User's personal blog management dashboard
 * Features: Blog filtering by category, statistics display, blog creation link
 */
const BlogDashboard = () => {
  const dispatch = useDispatch();
  const { message, showSuccessMessage, user } = useSelector(
    (state) => state.user
  );

  // State for managing filter dropdown visibility
  const [filterOpen, setFilterOpen] = useState(false);
  // Local state for blogs to enable filtering without affecting Redux store
  const [blogs, setBlogs] = useState([]);
  // Currently selected category for filtering
  const [selectedCategory, setSelectedCategory] = useState(null);
  // Filtered results based on selected category
  const [filteredBlogs, setFilteredBlogs] = useState([]);

  // Available blog categories for filtering
  const categories = ["Technology", "Lifestyle", "Business", "Design"];

  // Sync local blogs state with user data from Redux store
  useEffect(() => {
    if (user?.blogs) {
      setBlogs(user.blogs);
    }
  }, [user]);

  // Filter blogs when category selection changes
  useEffect(() => {
    if (selectedCategory) {
      const filtered = blogs.filter(
        (blog) => blog.category === selectedCategory
      );
      setFilteredBlogs(filtered);
    }
  }, [selectedCategory, blogs]);

  // Auto-hide success messages after 3 seconds
  useEffect(() => {
    if (showSuccessMessage) {
      const timer = setTimeout(() => {
        dispatch(clearUserMessages());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showSuccessMessage, dispatch]);

  /**
   * Handles category filter selection
   * @param {string} category - Selected category to filter by
   */
  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    setFilterOpen(false);
  };

  /**
   * Clears active category filter and shows all blogs
   */
  const clearFilter = () => {
    setSelectedCategory(null);
    setFilteredBlogs([]);
  };

  // Determine which blogs to display based on filter state
  const blogsToShow = selectedCategory ? filteredBlogs : blogs;

  return (
    <div className="w-full min-h-screen bg-base-300 font-[Poppins] text-neutral">
      <div className="pt-20 h-full max-w-7xl mx-auto relative">
        {/* Success message notification */}
        {showSuccessMessage && (
          <div className="absolute z-30 border right-5 top-30 p-5 rounded-3xl text-neutral select-none bg-neutral-content">
            ✅ {message}
          </div>
        )}

        {/* Welcome section with user name */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="p-10 space-y-2 text-center lg:text-left flex flex-col"
        >
          <h2 className="text-xl md:text-2xl font-extralight">Welcome 👋</h2>
          <h1 className="text-3xl md:text-5xl">{user.userName}</h1>
        </motion.div>

        <hr className="max-w-[90%] mx-auto my-5 border-t border-base-content/40" />

        {/* Statistics cards - blogs, likes, comments count */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="p-5 w-full mx-auto grid grid-cols-1 lg:grid-cols-3 gap-5 select-none"
        >
          {[
            {
              icon: <NotebookPen />,
              name: "Total Blogs",
              count: `${user.blogs.length}`,
            },
            {
              icon: <ThumbsUp />,
              name: "Total Likes",
              count: `${user.likes.length}`,
            },
            {
              icon: <MessageCircle />,
              name: "Total Comments",
              count: `${user.comments.length}`,
            },
          ].map((item, idx) => {
            return (
              <div
                key={idx}
                className="bg-gradient-to-br from-base-300 to-base-100 shadow-xl border border-base-content/10 rounded-xl hover:shadow-2xl hover:from-base-100 hover:to-base-50 transition-all duration-300 h-36 lg:h-52 flex flex-row lg:flex-col gap-10 justify-between lg:justify-center p-6"
              >
                <div className="flex flex-row lg:flex-col items-center gap-3">
                  <div className="p-2 sm:p-3 bg-primary/15 rounded-xl backdrop-blur-sm text-primary">
                    {item.icon}
                  </div>
                  <h1 className="text-xs sm:text-2xl font-semibold text-base-content bg-gradient-to-r from-base-content to-base-content/70 bg-clip-text">
                    {item.name}
                  </h1>
                </div>
                <div className="text-center flex items-center justify-center">
                  <p className="text-2xl sm:text-5xl font-black text-primary mr-5 lg:mr-0 tracking-tight">
                    {item.count}
                  </p>
                </div>
              </div>
            );
          })}
        </motion.div>

        <hr className="max-w-[90%] mx-auto my-5 border-t border-base-content/40" />

        {/* Filter and Create buttons */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className={"max-w-fit flex gap-3 sm:gap-10 px-5 py-4 "}
        >
          {/* Category filter dropdown */}
          <div className="relative">
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className="btn btn-outline btn-sm inline-flex whitespace-nowrap lg:btn-lg hover:shadow-xl"
            >
              <Filter /> Filter
            </button>

            {/* Filter dropdown menu */}
            {filterOpen && (
              <div className="absolute top-full mt-2 left-0 bg-base-300 border border-base-content/10 rounded-xl shadow-xl p-4 min-w-48 z-10">
                <div className="flex flex-col gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => handleCategoryFilter(category)}
                      className="btn btn-ghost btn-sm sm:btn-md lg:btn-lg justify-start text-primary font-medium hover:bg-base-300 hover:scale-95 transition-all duration-200"
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Create new blog button */}
          <div>
            <Link
              to={"create"}
              className="btn btn-neutral btn-sm inline-flex whitespace-nowrap lg:btn-lg hover:text-base-content hover:shadow-xl"
            >
              <FilePlus2 /> Create
            </Link>
          </div>
        </motion.div>

        {/* Blogs display section */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-7xl mx-auto p-5">
            {/* Section header with conditional clear filter button */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base md:text-2xl font-medium select-none">
                {selectedCategory ? `Blogs in ${selectedCategory}` : "My Blogs"}
              </h2>
              {selectedCategory && (
                <button
                  onClick={clearFilter}
                  className="btn btn-sm btn-ghost text-base-content/70 hover:text-base-content"
                >
                  <X size={16} />
                  Clear Filter
                </button>
              )}
            </div>

            {/* Conditional rendering: empty state or blog grid */}
            {blogsToShow.length === 0 ? (
              <div className="text-neutral/50 text-lg my-10 select-none">
                {selectedCategory
                  ? `No blogs found in ${selectedCategory} category. 📝`
                  : "You haven't posted yet. 🥹"}
              </div>
            ) : (
              // Blog grid layout with responsive columns
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogsToShow.map((item, idx) => {
                  return (
                    <BlogCard
                      key={idx}
                      id={item._id}
                      thumbnail={item.thumbnail}
                      title={item.title}
                      content={item.content}
                      authorPic={user.profilePic}
                      authorName={user.userName}
                      category={item.category}
                      date={new Date(item.createdAt).toLocaleDateString()}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BlogDashboard;
