import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { configDotenv } from "dotenv";

configDotenv();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload on Cloudinary
const handlePhotoUpload = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      folder: "temp"
    });

    fs.unlink(localFilePath, (error) => {});
    return response;
  } catch (error) {
    console.error("Cloudinary upload error:", error); 
    fs.unlink(localFilePath, (error) => {});
    return null;
  }
};

const extractPublicId = (url) => {
  const parts = url.split("/upload/")[1]; 
  return parts.replace(/^v\d+\//, "").replace(/\.[^.]+$/, "");
};

const handlePhotoDelete = async (oldUrl) => {
  try {
    if (!oldUrl) return null;
    const publicId = extractPublicId(oldUrl);

    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error("Cloudinary delete error:", error.message);
    return null;
  }
};

export { handlePhotoUpload, handlePhotoDelete };