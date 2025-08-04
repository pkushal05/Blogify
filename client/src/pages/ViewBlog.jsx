import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { get, makeComment } from "../features/thunks/blogThunks.js";
import { useSelector, useDispatch } from "react-redux";
// Icons
import { MdEditDocument, MdDelete } from "react-icons/md";
import {
  Heart,
  MessageCircle,
  ArrowLeft,
  Calendar,
  Tag,
  Share2,
} from "lucide-react";

const ViewBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { currentBlog, loading } = useSelector((state) => state.blog);
  const { user } = useSelector((state) => state.user);

  const [author, setAuthor] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");

  // Fetch blog post on component mount
  useEffect(() => {
    if (id) {
      dispatch(get(id));
    }
  }, [id, dispatch]); // Fixed dependencies

  // Update like status when currentBlog changes
  useEffect(() => {
    if (currentBlog && user) {
      // Check if current user has liked this blog
      setIsLiked(currentBlog.likes.includes(user._id));
    }
  }, [currentBlog, user]);

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

  const handleLike = () => {
    setIsLiked(!isLiked);
    // dispatch(likeBlog(currentBlog._id));
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: currentBlog.title,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    dispatch(makeComment({id: currentBlog._id, content: newComment }));
    setNewComment("");
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const commentDate = new Date(dateString);
    const diffInHours = Math.floor((now - commentDate) / (1000 * 60 * 60));

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  // Show loading spinner while loading or no blog data
  if (loading || !currentBlog) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <div className="loading loading-spinner loading-lg">Fetching blog</div>
      </div>
    );
  }


  return (
    <div className="w-full min-h-screen bg-base-300 font-[Poppins] pt-20">
      <div className="relative">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Hero Image */}
          <div className="relative mb-8">
            <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-xl">
              <img
                src={currentBlog.thumbnail}
                alt={currentBlog.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Category badge overlay */}
            <div className="absolute top-4 left-4">
              <div className="badge badge-primary badge-lg gap-1 shadow-lg">
                <Tag size={14} />
                {currentBlog.category}
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="bg-base-100 rounded-2xl shadow-xl p-8">
            {/* Title */}
            <h1 className="text-xl sm:text-2xl lg:text-4xl font-bold text-base-content mb-6 leading-tight">
              {currentBlog.title}
            </h1>

            {/* Author and meta info */}
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-base-300">
              <div className="flex items-center gap-4">
                <div className="avatar">
                  <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-full">
                    <img
                      src={currentBlog.author.profilePic}
                      alt={currentBlog.author.userName}
                    />
                  </div>
                </div>
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

              {/* Action buttons */}
              <div className="flex items-center gap-1">
                <button onClick={handleShare} className="btn btn-ghost btn-sm">
                  <Share2 size={16} />
                </button>
                {author && (
                  <div className="flex gap-2">
                    <Link to={`/app/blogs/edit/${currentBlog._id}`}>
                      <button className={`btn btn-ghost btn-sm`}>
                        <MdEditDocument size={20} />
                      </button>
                    </Link>

                    <button className={`btn btn-ghost btn-sm`}>
                      <MdDelete size={20} />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="mb-8">
              <p className="text-base-content leading-relaxed text-lg wrap-break-word">
                {currentBlog.content}
              </p>
            </div>

            {/* Engagement section */}
            <div className="flex items-center justify-between pt-6 border-t border-base-300">
              <div className="flex items-center gap-6">
                <button
                  onClick={handleLike}
                  className={`btn btn-ghost gap-2 ${
                    isLiked ? "text-red-500" : ""
                  }`}
                >
                  <Heart
                    size={20}
                    fill={isLiked ? "currentColor" : "none"}
                    className="transition-colors"
                  />
                  <span className="font-medium">
                    {currentBlog.likes.length}
                  </span>
                  <span className="hidden sm:inline">Likes</span>
                </button>

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

            {/* Comments Section */}
            {showComments && (
              <div className="mt-8 pt-6 border-t border-base-300">
                <h3 className="text-xl font-semibold mb-4">
                  Comments ({currentBlog.comments.length})
                </h3>

                {/* Comment form */}
                <form onSubmit={handleCommentSubmit} className="mb-6">
                  <div className="flex gap-3">
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
                          disabled={!newComment.trim()}
                        >
                          Post Comment
                        </button>
                      </div>
                    </div>
                  </div>
                </form>

                {/* Comments list */}
                {currentBlog.comments.length > 0 ? (
                
                  <div className="space-y-4">
                    {currentBlog.comments.map((comment) => (
                      <div
                        key={comment._id}
                        className="flex gap-3 p-4 bg-base-200 rounded-lg"
                      >
                        <div className="avatar">
                          <div className="w-8 h-8 rounded-full">
                            <img
                              src={comment.author.profilePic}
                              alt={comment.author.userName}
                            />
                          </div>
                        </div>
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
