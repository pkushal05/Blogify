import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: [100, "Title cannot exceed 100 characters"],
      minlength: [5, "Title must be atleast 5 characters long"],
      trim: true,
    },
    content: {
      type: String,
      required: true,
      minlength: [50, "Blog's content must be atleast 50 characters long"],
      maxlength: [20000, "Blog's content cannot exceed 20000 characters"],
      trim: true,
    },
    thumbnail: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      enum: ["Technology", "Design", "Lifestyle", "Business"],
      default: "Technology",
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
        default: [],
      },
    ],
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
  },
  { timestamps: true }
);

blogSchema.pre("save", function (next) {
  if (!this.isModified("title") && !this.isModified("content")) {
    return next();
  }
  next();
});

blogSchema.post("save", async function () {
  const User = mongoose.model("User");  
  await User.findByIdAndUpdate(
    this.author,
    { $addToSet: { blogs: this._id } },
    { new: true }
  );
});

blogSchema.post("findOneAndDelete", async function (doc) {
  const User = mongoose.model("User");
  await User.findByIdAndUpdate(
    doc.author,
    { $pull: { blogs: doc._id } },
    { new: true }
  );
});

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
