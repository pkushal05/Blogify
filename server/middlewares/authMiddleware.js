import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import { sendError, sendResponse } from "../utils/helperFunctions.js";

// Middleware to verify JWT from cookies or authorization header
export const verifyJWT = async (req, res, next) => {
  try {
    // Extract token from cookie or Authorization header
    const token =
      req.cookies?.accessToken ||
      req.headers["authorization"]?.replace("Bearer ", "");

    // If no token, respond with 401 Unauthorized
    if (!token) {
      return sendError(res, 401, "Unauthorized request");
    }

    // Verify token using secret key
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // Find user by decoded token user ID, exclude sensitive fields
    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    // If user not found, respond with 401 Unauthorized
    if (!user) {
      return sendError(res, 401, "Invalid or expired token");
    }

    // Attach user object to request and proceed
    req.user = user;
    next();
  } catch (error) {
    // Catch verification errors and respond with 401 Unauthorized
    return sendError(res, 401, "Invalid or expired token");
  }
};
