import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { configDotenv } from "dotenv";

// Load environment variables from .env file
configDotenv();

// Configure Cloudinary with credentials from environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload a photo file to Cloudinary
const handlePhotoUpload = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    // Upload file to Cloudinary with automatic resource type and save under "temp" folder
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      folder: "temp",
    });

    // Delete the local file after upload to clean up
    fs.unlink(localFilePath, (error) => {});

    return response;
  } catch (error) {
    // Log upload error and delete local file anyway
    console.error("Cloudinary upload error:", error);
    fs.unlink(localFilePath, (error) => {});
    return null;
  }
};

// Extract Cloudinary public ID from an image URL
const extractPublicId = (url) => {
  // Get substring after "/upload/"
  const parts = url.split("/upload/")[1];

  // Remove versioning prefix (e.g. v123/) and file extension
  return parts.replace(/^v\d+\//, "").replace(/\.[^.]+$/, "");
};

// Delete an uploaded photo from Cloudinary using its URL
const handlePhotoDelete = async (oldUrl) => {
  try {
    if (!oldUrl) return null;

    // Extract public ID from URL
    const publicId = extractPublicId(oldUrl);

    // Destroy the image by public ID on Cloudinary
    const result = await cloudinary.uploader.destroy(publicId);

    return result;
  } catch (error) {
    // Log deletion errors
    console.error("Cloudinary delete error:", error.message);
    return null;
  }
};

export { handlePhotoUpload, handlePhotoDelete };
