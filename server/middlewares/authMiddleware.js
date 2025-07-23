import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import { sendError, sendResponse } from "../utils/helperFunctions.js";

export const verifyJWT = async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.headers["authorization"]?.replace("Bearer ", "");

    if (!token) {
        return sendError(res, 401, "Unauthorized request");
    };

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken?._id).select("-password -refreshToken");

    if (!user) {
        return sendError(res, 401, "Invalid or expired token");
    }

    req.user = user;
    next();
  } catch (error) {
    return sendError(res, 401, "Invalid or expired token");
  }
};
