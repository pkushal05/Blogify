import express from "express";
import { configDotenv } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./db/database.js";

// Load environment variables from .env file
configDotenv();

const app = express();

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

// Start the server on the specified port
app.listen(process.env.PORT, () => {
  console.log(`Server is running at port ${process.env.PORT}`);
});
