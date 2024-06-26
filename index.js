import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import { errorHandler, routeNotFound } from "./middleware/errorMiddleware.js";
import routes from "./routes/index.js";
import dbConnection from "./utils/connectDB.js";

dotenv.config();

dbConnection();

const port = process.env.PORT || 5000;

const app = express();

// Middleware for parsing cookies
app.use(cookieParser());

// Middleware for CORS
app.use(
  cors({
    origin: ["stellar-task-manager.netlify.app","http://localhost:3000", "http://localhost:3001", "https://stellar-task-manager.netlify.app"],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware for logging HTTP requests
app.use(morgan("dev"));

// Add logging middleware to debug cookies
app.use((req, res, next) => {
  console.log('Request Cookies:', req.cookies);
  next();
});

// Routes
app.use("/api", routes);

// Middleware for handling 404 errors
app.use(routeNotFound);

// Middleware for handling errors
app.use(errorHandler);

// Start the server
app.listen(port, () => console.log(`Server listening on ${port}`));
