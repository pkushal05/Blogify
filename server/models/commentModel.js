import mongoose from "mongoose";

const commentSchema = mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, "Comment content is required"],
      trim: true,
      minlength: [5, "Comment must be at least 5 characters"],
      maxlength: [500, "Comment cannot exceed 500 characters"],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    blog: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
      required: true,
    },
  },
  { timestamps: true }
);

commentSchema.pre("save", function (next) {
  if (!this.isModified("content")) {
    return next();
  }
  next();
});

commentSchema.pre("remove", async function (next) {
    await mongoose.model("Blog").updateOne(
      { _id: this.blog },
      { $pull: { comments: this._id } }
    );
    await mongoose.model("User").updateOne(
        { _id: this.author },
        { $pull: { comments: this._id } }
    );
    next();
});

commentSchema.methods.validateContent = function () {
    return this.content && this.content.length.trim() >= 5 && this.content.length.trim() <= 500;
}

commentSchema.methods.getAuthorDetails = async function () {
  return this.populate("author", "userName profilePic");
};

commentSchema.methods.getBlogDetails = async function () {
  return this.populate("blog", "title content");
};

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
