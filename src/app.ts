import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import expressSession from "express-session";
import passport from "passport";
import { envVars } from "./app/config/env";
import "./app/config/passport";
import { router } from "./app/routes";

export const app = express();

// ✅ CORS — ONLY ONCE
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:5173",
      "https://employee-management-frontend-e72vk3i8z-mahabub2030s-projects.vercel.app",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
// Middleware
app.use(
  expressSession({
    secret: envVars.FRONTEND_URL,
    resave: false,
    saveUninitialized: false,
  }),
);

app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(cookieParser());

// Root route
app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Employee Management API is running",
  });
});

// API Routes
app.use("/api/v1", router);
// 🛑 Prevent /favicon.ico from triggering DB connection or 500 errors
app.get("/favicon.ico", (_req, res) => {
  res.status(204).end();
});
// 404 handler (Must be placed LAST)
app.use((_req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

export default app;
