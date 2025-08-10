import multer from "multer";
import path from "path";
import fs from "fs";


// Absolute path to temp folder
const tempDir = path.join(process.cwd(), "public", "temp-Images");

// Create the folder if it doesn’t exist
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

// Configure multer storage to save files to ./public/temp-Images folder
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/temp-Images"); // Set destination folder
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Keep original filename
  },
});

// Export multer upload middleware using the above storage config
export const upload = multer({ storage });
