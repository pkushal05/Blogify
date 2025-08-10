import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Schema for User collection
const userSchema = mongoose.Schema(
  {
    // Unique username, lowercase, trimmed, indexed for faster queries
    userName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    // Unique email, lowercase, trimmed
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    // Password, required and trimmed
    password: {
      type: String,
      required: [true, "Password is required"],
      trim: true,
    },
    // Profile picture URL with default image
    profilePic: {
      type: String,
      default:
        "https://militaryhealthinstitute.org/wp-content/uploads/sites/37/2021/08/blank-profile-picture-png.png",
    },
    // Array of references to Blog documents authored by user
    blogs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog",
        default: [],
      },
    ],
    // Array of references to liked Blog documents
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog",
        default: [],
      },
    ],
    // Array of references to Comment documents made by user
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
        default: [],
      },
    ],
    // Refresh token string for JWT refresh mechanism
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true } // adds createdAt and updatedAt timestamps
);

// Pre-save hook to hash password if it was modified
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Instance method to compare given password with hashed password
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Instance method to generate JWT access token
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      userName: this.userName,
      email: this.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_EXPIRY,
    }
  );
};

// Instance method to generate JWT refresh token
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_EXPIRY,
    }
  );
};

const User = mongoose.model("User", userSchema);

export default User;
