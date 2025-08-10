import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  get,
  makeComment,
  like,
  deleteThunk,
} from "../features/thunks/blogThunks.js";
import { clearBlogMessages } from "../features/slices/blogSlice.js";
import { useSelector, useDispatch } from "react-redux";
// Icons
import { MdEditDocument, MdDelete } from "react-icons/md";
import {
  Heart,
  MessageCircle,
  Calendar,
  Tag,
  Share2,
} from "lucide-react";

/**
 * ViewBlog Component - Display individual blog post with interactions
 * Features:
 * - Blog post display with rich formatting
 * - Like functionality with visual feedback
 * - Comment system with real-time updates
 * - Author controls (edit/delete for own posts)
 * - Social sharing capabilities
 * - Responsive design with mobile optimization
 */
const ViewBlog = () => {
  // React Router hooks for navigation and URL parameters
  const { id } = useParams(); // Get blog ID from URL
  const navigate = useNavigate(); // For programmatic navigation
  const dispatch = useDispatch(); // Redux action dispatcher

  // Redux state selectors
  const { currentBlog, loading, showSuccessMessage, message } = useSelector(
    (state) => state.blog
  );
  const { user } = useSelector((state) => state.user);

  // Local component state
  const [author, setAuthor] = useState(false); // Is current user the blog author?
  const [isLiked, setIsLiked] = useState(false); // Has current user liked this blog?
  const [showComments, setShowComments] = useState(false); // Toggle comments section visibility
  const [newComment, setNewComment] = useState(""); // New comment input value

  /**
   * Effect: Fetch blog post data when component mounts or ID changes
   * Ensures we always have the latest blog data for the current route
   */
  useEffect(() => {
    if (id) {
      dispatch(get(id));
    }
  }, [id, dispatch]);

  /**
   * Effect: Auto-clear success messages after 3 seconds
   * Provides clean UX by removing notifications automatically
   */
  useEffect(() => {
    if (showSuccessMessage) {
      const timer = setTimeout(() => {
        dispatch(clearBlogMessages());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showSuccessMessage, dispatch]);

  /**
   * Effect: Update like status when blog or user data changes
   * Checks if current user has liked this blog post
   */
  useEffect(() => {
    if (currentBlog && user) {
      // Check if current user's ID is in the blog's likes array
      setIsLiked(user.likes.includes(currentBlog._id));
    }
  }, [currentBlog, user]);

  /**
   * Effect: Determine if current user is the blog author
   * Controls visibility of edit/delete buttons
   */
  useEffect(() => {
    // Check if both user and currentBlog exist before accessing their properties
    if (
      user &&
      currentBlog &&
      currentBlog.author &&
      user._id === currentBlog.author._id
    ) {
      setAuthor(true);
    } else {
      setAuthor(false); // Reset to false if conditions aren't met
    }
  }, [currentBlog, user]);

  /**
   * Handles blog post deletion with confirmation
   * Only available to the blog author
   */
  const handleDelete = async (id) => {
    // User confirmation before deletion (destructive action)
    const confirmed = window.confirm("Are you sure?");
    if (!confirmed) return;

    try {
      // Delete blog and navigate back to main app on success
      await dispatch(deleteThunk(id)).unwrap();
      navigate("/app");
    } catch (error) {
      console.error("Failed to delete blog:", error);
    }
  };

  /**
   * Handles blog like functionality
   * Prevents multiple likes from same user (client-side check)
   */
  const handleLike = () => {
    if (isLiked) return; // Prevent multiple likes
    dispatch(like(id));
    setIsLiked(true); // Optimistic UI update
  };

  /**
   * Handles social sharing with fallback
   * Uses native Web Share API if available, otherwise copies to clipboard
   */
  const handleShare = () => {
    if (navigator.share) {
      // Use native sharing if available (mobile devices)
      navigator.share({
        title: currentBlog.title,
        url: window.location.href,
      });
    } else {
      // Fallback: copy link to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  /**
   * Handles new comment submission
   * Validates input and dispatches comment creation action
   */
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return; // Don't submit empty comments

    // Submit comment with blog ID and content
    dispatch(makeComment({ id: currentBlog._id, content: newComment }));
    setNewComment(""); // Clear input after submission
  };

  /**
   * Formats date string into readable format
   * Used for blog publication date
   */
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  /**
   * Formats date as "time ago" for comments
   * Provides relative time display for better context
   */
  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const commentDate = new Date(dateString);
    const diffInHours = Math.floor((now - commentDate) / (1000 * 60 * 60));

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  // Loading state - show spinner while fetching blog data
  if (loading || !currentBlog) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <div className="loading loading-spinner loading-lg">Fetching blog</div>
      </div>
    );
  }

  return (
    //* Main container with full height and top padding for navbar
    <div className="w-full min-h-screen bg-base-300 font-[Poppins] pt-20">
      {/* Success message toast - positioned absolutely in top-right */}
      {showSuccessMessage && (
        <div className="absolute z-30 border right-5 top-30 p-5 rounded-3xl text-neutral select-none bg-neutral-content">
          ✅ {message}
        </div>
      )}

      <div className="relative">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Hero section with featured image and category badge */}
          <div className="relative mb-8">
            <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-xl">
              <img
                src={currentBlog.thumbnail}
                alt={currentBlog.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Category badge overlay on hero image */}
            <div className="absolute top-4 left-4">
              <div className="badge badge-primary badge-lg gap-1 shadow-lg">
                <Tag size={14} />
                {currentBlog.category}
              </div>
            </div>
          </div>

          {/* Main content card */}
          <div className="bg-base-100 rounded-2xl shadow-xl p-8">
            {/* Blog title */}
            <h1 className="text-xl sm:text-2xl lg:text-4xl font-bold text-base-content mb-6 leading-tight">
              {currentBlog.title}
            </h1>

            {/* Author information and action buttons */}
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-base-300">
              {/* Author info section */}
              <div className="flex items-center gap-4">
                {/* Author avatar */}
                <div className="avatar">
                  <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-full">
                    <img
                      src={currentBlog.author.profilePic}
                      alt={currentBlog.author.userName}
                    />
                  </div>
                </div>

                {/* Author name and publication date */}
                <div>
                  <p className="font-semibold text-base-content text-sm sm:text-base">
                    {currentBlog.author.userName}
                  </p>
                  <div className="flex items-center gap-1 text-xs sm:text-sm text-base-content/70">
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      {formatDate(currentBlog.createdAt)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action buttons section */}
              <div className="flex items-center gap-1">
                {/* Share button - available to all users */}
                <button onClick={handleShare} className="btn btn-ghost btn-sm">
                  <Share2 size={16} />
                </button>

                {/* Author-only controls - edit and delete buttons */}
                {author && (
                  <div className="flex gap-2">
                    {/* Edit button - navigates to edit page */}
                    <Link to={`/app/blogs/edit/${currentBlog._id}`}>
                      <button className={`btn btn-ghost btn-sm`}>
                        <MdEditDocument size={20} />
                      </button>
                    </Link>

                    {/* Delete button - triggers confirmation dialog */}
                    <button
                      onClick={() => handleDelete(currentBlog._id)}
                      className={`btn btn-ghost btn-sm`}
                    >
                      <MdDelete size={20} />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Blog content with paragraph formatting */}
            <div className="mb-8">
              {/* Split content on blank lines and render as separate paragraphs */}
              {currentBlog.content
                .split(/\n{1,}/) // Split on one or more blank lines
                .map((para, i) => (
                  <p
                    key={i}
                    className="text-base-content leading-relaxed text-lg mb-4 wrap-break-word"
                  >
                    {para}
                  </p>
                ))}
            </div>

            {/* Engagement section - likes and comments interaction */}
            <div className="flex items-center justify-between pt-6 border-t border-base-300">
              <div className="flex items-center gap-6">
                {/* Like button with dynamic styling and count */}
                <button
                  onClick={handleLike}
                  className={`btn btn-ghost gap-2 ${
                    isLiked ? "text-red-500" : ""
                  }`}
                >
                  <Heart
                    size={20}
                    fill={isLiked ? "currentColor" : "none"} // Fill heart if liked
                    className="transition-colors"
                  />
                  <span className="font-medium">
                    {currentBlog.likes.length}
                  </span>
                  <span className="hidden sm:inline">Likes</span>
                </button>

                {/* Comments toggle button with count */}
                <button
                  onClick={() => setShowComments(!showComments)}
                  className="btn btn-ghost gap-2"
                >
                  <MessageCircle size={20} />
                  <span className="font-medium">
                    {currentBlog.comments.length}
                  </span>
                  <span className="hidden sm:inline">Comments</span>
                </button>
              </div>
            </div>

            {/* Comments section - conditionally rendered */}
            {showComments && (
              <div className="mt-8 pt-6 border-t border-base-300">
                <h3 className="text-xl font-semibold mb-4">
                  Comments ({currentBlog.comments.length})
                </h3>

                {/* New comment form */}
                <form onSubmit={handleCommentSubmit} className="mb-6">
                  <div className="flex gap-3">
                    {/* Current user's avatar */}
                    <div className="avatar">
                      <div className="w-10 h-10 rounded-full">
                        <img
                          src={
                            user?.profilePic ||
                            "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face"
                          }
                          alt="Your avatar"
                        />
                      </div>
                    </div>

                    {/* Comment input and submit */}
                    <div className="flex-1">
                      <textarea
                        name="content"
                        className="textarea textarea-bordered w-full"
                        placeholder="Write a comment..."
                        rows="3"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                      ></textarea>
                      <div className="mt-2">
                        <button
                          type="submit"
                          className="btn btn-primary btn-sm"
                          disabled={!newComment.trim()} // Disable if empty
                        >
                          Post Comment
                        </button>
                      </div>
                    </div>
                  </div>
                </form>

                {/* Comments list or empty state */}
                {currentBlog.comments.length > 0 ? (
                  <div className="space-y-4">
                    {/* Render each comment with author info and timestamp */}
                    {currentBlog.comments.map((comment) => (
                      <div
                        key={comment._id}
                        className="flex gap-3 p-4 bg-base-200 rounded-lg"
                      >
                        {/* Comment author avatar */}
                        <div className="avatar">
                          <div className="w-8 h-8 rounded-full">
                            <img
                              src={comment.author.profilePic}
                              alt={comment.author.userName}
                            />
                          </div>
                        </div>

                        {/* Comment content and metadata */}
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-sm">
                              {comment.author.userName}
                            </span>
                            <span className="text-xs text-base-content/60">
                              {formatTimeAgo(comment.createdAt)}
                            </span>
                          </div>
                          <p className="text-sm text-base-content/80">
                            {comment.content}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  // Empty state when no comments exist
                  <div className="text-center py-8 text-base-content/60">
                    <MessageCircle
                      size={48}
                      className="mx-auto mb-4 opacity-50"
                    />
                    <p>No comments yet. Be the first to comment!</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewBlog;
