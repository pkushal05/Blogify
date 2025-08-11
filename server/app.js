import express from "express";
import { configDotenv } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./db/database.js";
import path from "path";
import { fileURLToPath } from "url";

// Load environment variables from .env file
configDotenv();

const app = express();

// Get __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Enable CORS with credentials for the specified origin
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

// Parse JSON request bodies
app.use(express.json());

// Parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

// Parse cookies from incoming requests
app.use(cookieParser());

// Connect to the database
connectDB();

// Routes imports
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";

// Define route handlers for different API endpoints
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/blogs", blogRoutes);
app.use("/api/v1/comments", commentRoutes);

// Serve static files from React build in production
if (process.env.NODE_ENV === "production") {
  // Serve static files (CSS, JS, images) from client/dist
  app.use(express.static(path.join(__dirname, "../client/dist")));

  // Handle React routing - catch all handler
  // This MUST be after all API routes
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
  });
}

// Start the server on the specified port
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running at port ${process.env.PORT}`);
});
