import React from "react";
import { Link } from "react-router-dom";
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
  return (
    <Link to={`/${id}`}>
      <div className="card bg-base-100 shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer">
        <figure className="h-48 overflow-hidden rounded-t-xl">
          <img
            src={thumbnail}
            alt={title}
            className="object-cover w-full h-full"
          />
        </figure>
        <div className="card-body p-4">
          <div className="flex justify-center sm:justify-between items-start mb-1">
            <h3 className="card-title text-center sm:text-left text-base sm:text-lg leading-snug tracking-tight font-medium">
              {title}
            </h3>
            <span className="text-xs text-base-content/60 hidden sm:inline">
              {date}
            </span>
          </div>

          <p className="text-sm text-base-content/80 line-clamp-2 sm:line-clamp-2 mb-4">
            {content}
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-2 text-sm">
            <img
              src={authorPic}
              alt={authorName}
              className="w-6 h-6 rounded-full object-cover"
            />
            <span>{authorName}</span>
            <span className="hidden md:inline-block ml-auto badge badge-info text-sm">
              {category}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
