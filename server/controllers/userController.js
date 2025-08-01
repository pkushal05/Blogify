import User from "../models/userModel.js";
import { sendResponse, sendError } from "../utils/helperFunctions.js";
import { handlePhotoUpload, handlePhotoDelete } from "../utils/cloudinary.js";
import jwt from "jsonwebtoken";

const generateTokens = async (userId) => {
  const user = await User.findById(userId);

  if (!user) throw Error("User not found!!");

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  return { accessToken, refreshToken };
};

// Register User
const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;

  if ([userName, email, password].some((field) => field?.trim() === "")) {
    return sendError(res, 400, "Please provide all required fields");
  }

  const existedUser = await User.findOne({
    $or: [{ userName }, { email }],
  });

  if (existedUser) {
    return sendError(
      res,
      409,
      "User with this email or username already exists"
    );
  }

  const newUser = await User.create({
    userName: userName.toLowerCase(),
    email: email.toLowerCase(),
    password,
  });

  const createdUser = await User.findById(newUser._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    return sendError(res, 500, "Something went wrong while creating user");
  }

  return sendResponse(res, 201, "Registered successfully!", {
    user: createdUser,
  });
};

// Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return sendError(res, 400, "Email is required");
  }

  const user = await User.findOne({
    email,
  });

  if (!user) {
    return sendError(res, 404, "User does not exist");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    return sendError(res, 401, "Invalid User Credentails");
  }

  const { accessToken, refreshToken } = await generateTokens(user._id);

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  res
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options);

  return sendResponse(res, 200, "Logged in successfully", {
    user: loggedInUser,
    accessToken,
    refreshToken,
  });
};

//Logout User
const logOutUser = async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: { refreshToken: undefined },
    },
    { new: true }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  res.cookie("accessToken", "", options).cookie("refreshToken", "", options);

  return sendResponse(res, 200, "Logged out successfully", {});
};

// Refresh Access-Token
const refreshAccessToken = async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    return sendError(res, 401, "Unauthorized request");
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken._id);

    if (!user) {
      return sendError(res, 401, "Invalid refresh token 123");
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      return sendError(res, 401, "Invalid refresh token 456");
    }

    const { newAccessToken, newRefreshToken } = await generateTokens(user._id);

    const options = {
      httpOnly: true,
      secure: true,
    };

    res
      .cookie("accessToken", newAccessToken, options)
      .cookie("refreshToken", newRefreshToken, options);

    return sendResponse(res, 200, "Access token refreshed successfully", {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  } catch (error) {
    return sendError(res, 401, "Invalid refresh token");
  }
};

// Fetch User
const getCurrentUser = async (req, res) => {
  return sendResponse(res, 200, "User fetched successfully", {
    user: req.user,
  });
};

// Fetch by ID
const getUserById = async (req, res) => {
  const { _id } = req.params;
  if (!_id) {
    return sendError(res, 404, "User id not found");
  }

  const user = await User.findById(_id).select("-password -refreshToken");

  if (!user) {
    return sendError(res, 404, "User not found");
  }

  return sendResponse(res, 200, "User found", {
    user,
  });
};

// Fetch All
const getAllUsers = async (req, res) => {
  const users = await User.find().select("-password -refreshToken");

  if (!users || users.length === 0) {
    return sendError(res, 404, "No users found");
  }

  return sendResponse(res, 200, "Users fetched", {
    users,
  });
};

// Update User
const updateUser = async (req, res) => {
  try {
    const { userName } = req.body;
    const oldUrl = req.user

    if (!userName && !oldUrl) {
      return sendError(res, 400, "Please provide all required fields");
    }

    const user = await User.findById(req.user._id);

    if (!user) {
      return sendError(res, 404, "User not found");
    }

    user.userName = userName;

    if (req.file) {
      const localFilePath = req.file.path;

      // Delete the old image from Cloudinary if it exists
      if (user.profilePic) {
        try {
          await handlePhotoDelete(user.profilePic);
        } catch (deleteError) {
          console.error("Failed to delete old image:", deleteError.message);
        }
      }

      // Upload new image
      try {
        const cloudinaryResponse = await handlePhotoUpload(localFilePath);
        user.profilePic = cloudinaryResponse.secure_url;
      } catch (uploadError) {
        console.error("Upload failed:", uploadError);
        return sendError(res, 500, "Image upload failed");
      }
    }

    await user.save({ validateBeforeSave: false });

    return sendResponse(res, 200, "Updated successfully", {
      user: {
        userName: user.userName,
        profilePic: user.profilePic,
      },
    });
  } catch (error) {
    return sendError(res, 500, "Failed to update user profile");
  }
};

// Delete User
const deleteUser = async (req, res) => {
  const oldUrl = req.user.profilePic;
  const user = await User.findByIdAndDelete(req.user?._id);

  if (!user) {
    return sendError(res, 404, "User not found");
  }

  // Delete avatar from Cloudinary if exists
  try {
    await handlePhotoDelete(oldUrl);
  } catch (error) {
    console.log(error.message);
  }

  // Respond with success message
  return sendResponse(res, 200, "User deleted successfully", {});
};

// Is logged in?
const isLoggedIn = async (req, res) => {
  const token = req.cookies.accessToken;
  
  if (token) {
    return sendResponse(res, 200, null, { isLoggedIn: true })
  } else {
    return sendResponse(res, 401, null, { isLoggedIn: false });
  }
}

export {
  generateTokens,
  registerUser,
  logOutUser,
  loginUser,
  getAllUsers,
  getCurrentUser,
  getUserById,
  deleteUser,
  updateUser,
  refreshAccessToken,
  isLoggedIn
};
