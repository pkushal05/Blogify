import mongoose from "mongoose";

// Schema for Blog collection
const blogSchema = new mongoose.Schema(
  {
    // Blog title with validation for length and trimming whitespace
    title: {
      type: String,
      required: true,
      maxlength: [100, "Title cannot exceed 100 characters"],
      minlength: [5, "Title must be atleast 5 characters long"],
      trim: true,
    },
    // Blog content with min/max length and trimming whitespace
    content: {
      type: String,
      required: true,
      minlength: [50, "Blog's content must be atleast 50 characters long"],
      maxlength: [20000, "Blog's content cannot exceed 20000 characters"],
      trim: true,
    },
    // Optional thumbnail image URL for the blog
    thumbnail: {
      type: String,
      default: "",
    },
    // Category limited to specific options with a default value
    category: {
      type: String,
      enum: ["Technology", "Design", "Lifestyle", "Business"],
      default: "Technology",
    },
    // Reference to the User who authored the blog (required)
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // Array of Comment IDs referencing comments on this blog
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
        default: [],
      },
    ],
    // Array of User IDs referencing users who liked this blog
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],
    // Blog status: draft or published, default is draft
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
  },
  { timestamps: true } // Automatically add createdAt and updatedAt timestamps
);

// Pre-save middleware: only continue if title or content is modified
blogSchema.pre("save", function (next) {
  if (!this.isModified("title") && !this.isModified("content")) {
    return next();
  }
  next();
});

// Post-save middleware: add this blog's ID to the author's blogs array
blogSchema.post("save", async function () {
  const User = mongoose.model("User");
  await User.findByIdAndUpdate(
    this.author,
    { $addToSet: { blogs: this._id } },
    { new: true }
  );
});

// Post-delete middleware: remove this blog's ID from the author's blogs array
blogSchema.post("findOneAndDelete", async function (doc) {
  const User = mongoose.model("User");
  await User.findByIdAndUpdate(
    doc.author,
    { $pull: { blogs: doc._id } },
    { new: true }
  );
});

// Create and export Blog model
const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
