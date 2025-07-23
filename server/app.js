import express from "express";
import { configDotenv } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./db/database.js";

configDotenv()

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

connectDB();

// Routes imports
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);


app.listen(process.env.PORT, () => {
  console.log(`Server is running at port ${process.env.PORT}`);
});
