import React from "react";
import { Link } from "react-router-dom";

/**
 * BlogCard Component
 * - Displays a summary card for a blog post
 * - Shows thumbnail, title, excerpt of content, author info, category badge, and date
 * - Clicking the card navigates to the detailed blog post page
 *
 * Props:
 * @param {string} id - Unique blog post ID for navigation link
 * @param {string} thumbnail - URL of the blog post's thumbnail image
 * @param {string} title - Blog post title
 * @param {string} content - Blog post excerpt/content snippet
 * @param {string} authorPic - URL of author's profile picture
 * @param {string} authorName - Author's display name
 * @param {string} category - Blog post category for badge styling
 * @param {string} date - Formatted publication date
 */
const BlogCard = ({
  id,
  thumbnail,
  title,
  content,
  authorPic,
  authorName,
  category,
  date,
}) => {
  /**
   * Maps category names to badge color classes
   * @param {string} category - Category name
   * @returns {string} - Tailwind CSS classes for badge color
   */
  const getBadgeColor = (category) => {
    const colorMap = {
      Technology: "bg-blue-500 text-white",
      Lifestyle: "bg-pink-500 text-white",
      Travel: "bg-green-500 text-white",
      Food: "bg-orange-500 text-white",
    };
    return colorMap[category] || "badge-info";
  };

  return (
    // Link wraps entire card, navigating to blog detail page on click
    <Link to={`/app/blogs/${id}`}>
      <div className="card bg-base-100 shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer">
        {/* Thumbnail image */}
        <figure className="h-48 overflow-hidden rounded-t-xl">
          <img
            src={thumbnail}
            alt={title}
            className="object-cover w-full h-full"
          />
        </figure>

        {/* Card body with text content */}
        <div className="card-body p-4">
          {/* Title and date */}
          <div className="flex justify-center sm:justify-between items-center mb-1">
            <h3 className="card-title text-center line-clamp-1 sm:text-left text-sm sm:text-base leading-snug tracking-tight font-medium">
              {title}
            </h3>
            <span className="text-xs text-base-content/60 hidden sm:inline">
              {date}
            </span>
          </div>

          {/* Content excerpt with clamping */}
          <p className="text-sm text-base-content/80 line-clamp-2 sm:line-clamp-1 mb-4">
            {content}
          </p>

          {/* Author info and category badge */}
          <div className="flex flex-col sm:flex-row items-center gap-2 text-sm">
            <img
              src={authorPic}
              alt={authorName}
              className="w-6 h-6 rounded-full object-cover"
            />
            <span>{authorName}</span>

            {/* Category badge, hidden on smaller than md */}
            <span
              className={`hidden md:inline-block ml-auto badge ${getBadgeColor(
                category
              )} text-sm`}
            >
              {category}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
