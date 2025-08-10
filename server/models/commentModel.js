import mongoose from "mongoose";

// Schema for Comment collection
const commentSchema = mongoose.Schema(
  {
    // Comment text with validation for presence, length, and trimming whitespace
    content: {
      type: String,
      required: [true, "Comment content is required"],
      trim: true,
      minlength: [5, "Comment must be at least 5 characters"],
      maxlength: [500, "Comment cannot exceed 500 characters"],
    },
    // Reference to User who authored the comment (required)
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // Reference to the Blog this comment belongs to (required)
    blog: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
      required: true,
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt timestamps
);

// Pre-save middleware: only proceed if content is modified
commentSchema.pre("save", function (next) {
  if (!this.isModified("content")) {
    return next();
  }
  next();
});

// Create and export Comment model
const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
