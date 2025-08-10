import multer from "multer";

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
