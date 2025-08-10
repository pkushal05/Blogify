import Comment from "../models/commentModel.js";
import { sendResponse, sendError } from "../utils/helperFunctions.js";
import Blog from "../models/blogModel.js";
import User from "../models/userModel.js";

const createComment = async (req, res) => {
  try {
    const { content } = req.body;
    const blogId = req.params.id;
    const userId = req.user._id;

    // Validate blog existence
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return sendError(res, 404, "Blog not found");
    }

    // Validate user existence
    const user = await User.findById(userId);
    if (!user) {
      return sendError(res, 404, "User not found");
    }

    // Validate comment content
    if (!content || content.trim().length < 5 || content.trim().length > 500) {
      return sendError(res, 400, "Comment must be between 5 to 500 characters");
    }

    // Create new comment
    const newComment = await Comment.create({
      content,
      author: userId,
      blog: blogId,
    });

    await newComment.populate("author", "userName profilePic");

    user.comments.push(blogId);
    blog.comments.push(newComment._id);
    await user.save();
    await blog.save();

    return sendResponse(res, 201, "Comment created successfully", {
      comment: newComment,
    });
  } catch (error) {
    return sendError(res, 500, "Internal server error");
  }
};

const getComments = async (req, res) => {
  try {
    const blogId = req.params.id;

    // Validate blog existence
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return sendError(res, 404, "Blog not found");
    }

    // Fetch comments for the blog
    const comments = await Comment.find({ blog: blogId }).populate("author", "name");

    return sendResponse(res, 200, "Comments fetched successfully", {
      comments,
    });
  } catch (error) {
    return sendError(res, 500, "Internal server error");
  }
};

export { createComment, getComments };