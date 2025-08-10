import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getBlogs } from "../features/thunks/blogThunks.js";
import BlogCard from "../components/BlogCard.jsx";

import {
  Search,
  TrendingUp,
  Clock,
  Heart,
  Eye,
  BookOpen,
  Sparkles,
  Filter,
} from "lucide-react";
import { useEffect } from "react";

/**
 * Explore Component - Public blog discovery page
 * Features: Search functionality, category filtering, sorting tabs, trending topics
 * Handles both direct navigation and search query parameters
 */
const Explore = () => {
  // Filter and search state
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  // Tab for sorting blogs (trending, recent, popular)
  const [activeTab, setActiveTab] = useState("trending");
  // Pagination - number of blogs to display
  const [displayCount, setDisplayCount] = useState(6);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const location = useLocation();
  // Extract search query from URL parameters (from search functionality)
  const params = new URLSearchParams(location.search);
  const getSearchQuery = params.get("q") || "";

  const dispatch = useDispatch();
  const { allBlogs, message } = useSelector((state) => state.blog);
  const { user } = useSelector((state) => state.user);

  /**
   * Fetch blogs on component mount and when search query changes
   * Supports both regular exploration and search results
   */
  useEffect(() => {
    const fetchBlogs = async () => {
      await dispatch(getBlogs(getSearchQuery));
    };

    fetchBlogs();
  }, [dispatch, getSearchQuery]);

  // Available categories for filtering
  const categories = ["All", "Technology", "Design", "Lifestyle", "Business"];

  // Pagination control - slice blogs based on displayCount
  const blogsToDisplay = allBlogs.slice(0, displayCount);

  /**
   * Calculates trending topics based on blog category distribution
   * @returns {Array} - Array of categories sorted by frequency
   */
  const getTrendingTopics = () => {
    const categoryCount = {};
    blogsToDisplay.forEach((blog) => {
      categoryCount[blog.category] = (categoryCount[blog.category] || 0) + 1;
    });
    return Object.entries(categoryCount)
      .map(([category, count]) => ({ name: category, count }))
      .sort((a, b) => b.count - a.count);
  };

  const trendingTopics = getTrendingTopics();

  /**
   * Filters blogs based on selected category and search query
   * Searches in both title and content fields
   */
  const filteredBlogs = blogsToDisplay.filter((blog) => {
    const matchesCategory =
      selectedCategory === "All" || blog.category === selectedCategory;
    const matchesSearch =
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  /**
   * Sorts filtered blogs based on active tab selection
   * - trending: sorted by likes count (descending)
   * - recent: sorted by creation date (newest first)
   * - popular: sorted by views count (descending)
   */
  const sortedBlogs = [...filteredBlogs].sort((a, b) => {
    switch (activeTab) {
      case "trending":
        return b.likes - a.likes;
      case "recent":
        return new Date(b.createdAt) - new Date(a.createdAt);
      case "popular":
        return b.views - a.views;
      default:
        return 0;
    }
  });

  /**
   * Handles pagination - loads more blogs with simulated loading delay
   */
  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setDisplayCount((prev) => prev + 6);
      setIsLoadingMore(false);
    }, 500);
  };

  return (
    <>
      {/* Conditional rendering: Search results view vs. Full explore page */}
      {getSearchQuery ? (
        // Search Results View - Simplified layout for search results
        <div className="w-full min-h-screen bg-base-300 font-[Poppins]">
          <div className="max-w-7xl pt-20 mx-auto">
            <div className="p-15">
              <h1 className="text-neutral text-xl">
                Showing results for: "
                <span className="font-semibold">{getSearchQuery}</span>"
              </h1>
              <div className="container w-full mt-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {allBlogs.length > 0 ? (
                    allBlogs.map((item) => {
                      return (
                        <BlogCard
                          key={item._id}
                          id={item._id}
                          thumbnail={item.thumbnail}
                          title={item.title}
                          content={item.content}
                          authorPic={item.author.profilePic}
                          authorName={item.author.userName}
                          category={item.category}
                          date={new Date(item.createdAt).toLocaleDateString()}
                        />
                      );
                    })
                  ) : (
                    <div className="text-lg text-neutral-600 select-none">
                      {console.log(message)}
                      {message}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Full Explore Page - Complete discovery interface
        <div className="min-h-screen bg-base-300 font-[Poppins]">
          {/* Hero Section with search functionality */}
          <div className="hero pt-25 pb-12">
            <div className="hero-content text-center max-w-4xl">
              <div>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Sparkles className="text-primary" size={32} />
                  <h1 className="text-4xl font-bold">Explore & Discover</h1>
                </div>
                <p className="text-lg text-base-content/70 mb-6">
                  Dive into a world of knowledge, creativity, and inspiration.
                  Find your next favorite read.
                </p>

                {/* Search Bar for real-time filtering */}
                <div className="form-control max-w-md mx-auto">
                  <div className="input-group">
                    <input
                      type="text"
                      placeholder="Search articles, topics, authors..."
                      className="input input-bordered input-primary flex-1"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button className="btn btn-primary">
                      <Search size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Main Content Area - 3/4 width on large screens */}
              <div className="lg:col-span-3">
                {/* Sorting Tabs - trending, recent, popular */}
                <div className="tabs tabs-boxed bg-base-200 rounded-2xl mb-6 p-1">
                  <button
                    className={`tab gap-2 ${
                      activeTab === "trending" ? "tab-active" : ""
                    }`}
                    onClick={() => setActiveTab("trending")}
                  >
                    <TrendingUp size={16} />
                    Trending
                  </button>
                  <button
                    className={`tab gap-2 ${
                      activeTab === "recent" ? "tab-active" : ""
                    }`}
                    onClick={() => setActiveTab("recent")}
                  >
                    <Clock size={16} />
                    Recent
                  </button>
                  <button
                    className={`tab gap-2 ${
                      activeTab === "popular" ? "tab-active" : ""
                    }`}
                    onClick={() => setActiveTab("popular")}
                  >
                    <Eye size={16} />
                    Popular
                  </button>
                </div>

                {/* Category Filter Buttons */}
                <div className="flex flex-wrap gap-2 mb-6">
                  <div className="flex items-center gap-2 mr-4">
                    <Filter size={16} className="text-base-content/60" />
                    <span className="text-sm font-medium">Filter:</span>
                  </div>
                  {categories.map((category) => (
                    <button
                      key={category}
                      className={`btn btn-sm ${
                        selectedCategory === category
                          ? "btn-primary"
                          : "btn-ghost"
                      }`}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>

                {/* Results Summary */}
                <div className="flex items-center justify-between mb-4">
                  <p className="text-base-content/60">
                    {sortedBlogs.length} articles found
                  </p>
                  <div className="text-sm text-base-content/60 capitalize">
                    Sorted by: {activeTab}
                  </div>
                </div>

                {/* Blog Grid - Responsive layout */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sortedBlogs.map((item) => (
                    <BlogCard
                      key={item._id}
                      id={item._id}
                      thumbnail={item.thumbnail}
                      title={item.title}
                      content={item.content}
                      authorPic={item.author.profilePic}
                      authorName={item.author.userName}
                      category={item.category}
                      date={new Date(item.createdAt).toLocaleDateString()}
                    />
                  ))}
                </div>

                {/* Load More Button with pagination */}
                <div className="text-center mt-8">
                  <button
                    disabled={isLoadingMore}
                    onClick={handleLoadMore}
                    className="btn btn-primary btn-outline"
                  >
                    {isLoadingMore ? "Loading.." : "Load More Articles"}
                  </button>
                </div>
              </div>

              {/* Sidebar - 1/4 width on large screens */}
              <div className="space-y-6">
                {/* Trending Topics Widget */}
                <div className="card bg-base-100 shadow-md">
                  <div className="card-body">
                    <h3 className="card-title text-lg flex items-center gap-2">
                      <TrendingUp size={20} className="text-primary" />
                      Trending Topics
                    </h3>
                    <div className="space-y-3">
                      {trendingTopics.map((topic, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between hover:bg-base-200 p-2 rounded cursor-pointer transition-colors"
                        >
                          <span className="text-sm font-medium">
                            #{topic.name}
                          </span>
                          <span className="badge badge-primary badge-sm">
                            {topic.count}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* User's Recent Activity Widget */}
                <div className="card bg-base-100 shadow-md">
                  <div className="card-body">
                    <h3 className="card-title text-lg flex items-center gap-2">
                      <BookOpen size={20} className="text-secondary" />
                      Recent Activity
                    </h3>
                    <div className="space-y-4">
                      {user.blogs.length > 0 ? (
                        user.blogs.slice(0, 3).map((blog, idx) => (
                          <div
                            key={idx}
                            className="flex items-start gap-3 hover:bg-base-200 p-2 rounded cursor-pointer transition-colors"
                          >
                            <div className="avatar">
                              <div className="w-10 rounded-full">
                                <img
                                  src={user.profilePic}
                                  alt={user.userName}
                                />
                              </div>
                            </div>
                            <div className="flex-1">
                              <div className="font-medium text-sm line-clamp-2">
                                {blog.title}
                              </div>
                              <div className="text-xs text-base-content/60 mt-1">
                                by {user.userName} •{" "}
                                {new Date(blog.createdAt).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="pl-2 select-none">
                          <p>No activity</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* User Statistics Widget - aggregated data display */}
                <div className="card bg-gradient-to-br from-primary/10 to-secondary/10">
                  <div className="card-body text-center">
                    <h3 className="card-title text-lg justify-center mb-4">
                      Your Library
                    </h3>
                    <div className="stats stats-vertical shadow-none bg-transparent">
                      <div className="stat p-4">
                        <div className="stat-value text-primary text-2xl">
                          {user.blogs.length}
                        </div>
                        <div className="stat-title text-xs">Total Articles</div>
                      </div>
                      <div className="stat p-4">
                        <div className="stat-value text-secondary text-2xl">
                          {categories.length - 1}
                        </div>
                        <div className="stat-title text-xs">Categories</div>
                      </div>
                      <div className="stat p-4">
                        <div className="stat-value text-accent text-2xl">
                          {/* Calculate total likes across all blogs */}
                          {allBlogs.reduce(
                            (sum, blog) => sum + (blog.likes.length || 0),
                            0
                          )}
                        </div>
                        <div className="stat-title text-xs">Total Likes</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Explore;
