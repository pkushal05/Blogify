import Blog from "../models/blogModel.js";
import User from "../models/userModel.js";
import { sendResponse, sendError } from "../utils/helperFunctions.js";
import { handlePhotoUpload, handlePhotoDelete } from "../utils/cloudinary.js";

const createBlog = async (req, res) => {
  try {
    console.log("first")
    const { title, content, category } = req.body;
    const author = req.user._id;

    // Validate input
    if (!title || !content) {
      return sendError(res, 400, "Title and content are required.");
    }
    console.log("second")

    if (title.length < 5 || title.length > 100) {
      return sendError(res, 400, "Title must be between 5 to 100 characters.");
    }
    if (content.length < 50 || content.length > 20000) {
      return sendError(res, 400, "Content must be between 50 to 20000 characters.");
    }  

    console.log(category)
    if (!["Technology", "Design", "Lifestyle", "Business"].includes(category)) {
      return sendError(res, 400, "Invalid category.");
    }   

    console.log("third")
    // Handle thumbnail upload if provided
    let thumbnail = "";
    if (req.file) {
      const uploadResult = await handlePhotoUpload(req.file.path);
      thumbnail = uploadResult.secure_url;
    }
    console.log("fourth")
    // If no thumbnail is provided, set default
    if (!thumbnail) {
      thumbnail = "default_thumbnail_url";
    }
    console.log("fifth")
    // Create new blog
    const newBlog = await Blog.create({
      title,
      content,
      thumbnail,
      category,
      author,
    });
    console.log("sixth")
    return sendResponse(res, 201, "Blog created successfully", { blog: newBlog });
  } catch (error) {
    console.error(error);
    return sendError(res, 500, "Internal server error");
  }
}

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate("author", "userName profilePic");
    if (!blogs || blogs.length === 0) {
      return sendError(res, 404, "No blogs found");
    }
    return sendResponse(res, 200, "Blogs fetched successfully", { blogs });
  } catch (error) {
    console.error(error);
    return sendError(res, 500, "Internal server error");
  }
};

const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate("author", "userName profilePic");
    if (!blog) {
      return sendError(res, 404, "Blog not found");
    }

    return sendResponse(res, 200, "Blog fetched successfully", { blog });
  } catch (error) {
    console.error(error);
    return sendError(res, 500, "Internal server error");
  }
};

const updateBlog = async (req, res) => {
  try {
    const { title, content, category } = req.body;
    // const oldUrl = req.user.thumbnail;

    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return sendError(res, 404, "Blog not found");
    }
    if (blog.author.toString() !== req.user._id.toString()) {
      return sendError(res, 403, "You are not authorized to update this blog");
    }
    blog.title = title || blog.title;
    blog.content = content || blog.content;
    blog.category = category || blog.category;

    if (req.file) {
      const localFilePath = req.file.path;

      // Delete the old image from Cloudinary if it exists
      if (blog.thumbnail) {
        try {
          await handlePhotoDelete(blog.thumbnail);
        } catch (deleteError) {
          console.error("Failed to delete old image:", deleteError.message);
        }
      }

      // Upload new image
      try {
        const cloudinaryResponse = await handlePhotoUpload(localFilePath);
        blog.thumbnail = cloudinaryResponse.secure_url;
      } catch (uploadError) {
        console.error("Upload failed:", uploadError);
        return sendError(res, 500, "Image upload failed");
      }
    }

    await blog.save();
    return sendResponse(res, 200, "Blog updated successfully", { blog });
  } catch (error) {
    console.error(error);
    return sendError(res, 500, "Internal server error");
  }
};

const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findOneAndDelete({ _id: req.params.id });
    if (!blog) {
      return sendError(res, 404, "Blog not found");
    }
    if (blog.author.toString() !== req.user._id.toString()) {
      return sendError(res, 403, "You are not authorized to delete this blog");
    }
    // Delete the thumbnail from Cloudinary if it exists
    if (blog.thumbnail) {
      await handlePhotoDelete(blog.thumbnail);
    }
    return sendResponse(res, 200, "Blog deleted successfully");
  } catch (error) {
    console.error(error);
    return sendError(res, 500, "Internal server error");
  }
};

const getComments = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id).populate({
            path: 'comments',
            select: 'content author createdAt',
            populate: {
                path: 'author',
                select: 'userName profilePic'
            }
        });
        if (!blog) {
            return sendError(res, 404, "Blog not found");
        }   
        return sendResponse(res, 200, "Comments fetched successfully", { comments: blog.comments });
    } catch (error) {
        console.error(error);
        return sendError(res, 500, "Internal server error");
    }
}

const getAuthorDetails = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate("author", "userName profilePic");
    if (!blog) {
      return sendError(res, 404, "Blog not found");
    }
    return sendResponse(res, 200, "Author details fetched successfully", { author: blog.author });
  } catch (error) {
    console.error(error);
    return sendError(res, 500, "Internal server error");
  }
};

const getTotalLikes = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)

    if (!blog) {
      return sendError(res, 404, "Blog not found");
    }
    let totalLikes = blog.likes.length;
    return sendResponse(res, 200, "Likes fetched successfully", { likes: totalLikes });
  } catch (error) {
    console.error(error);
    return sendError(res, 500, "Internal server error");
  }
};

const addLike = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return sendError(res, 404, "Blog not found");
    }
    if (blog.likes.includes(req.user._id)) {
      return sendError(res, 400, "You have already liked this blog");
    }
    blog.likes.push(req.user._id);
    user.likes.push(blog._id);
  
    await blog.save();
    await user.save();
    
    return sendResponse(res, 200, "Blog liked successfully", { likes: blog.likes.length });
  } catch (error) {
    console.error(error);
    return sendError(res, 500, "Internal server error");
  }
};

export { createBlog, getAllBlogs, getBlogById, updateBlog, deleteBlog, getComments, getAuthorDetails, getTotalLikes, addLike };