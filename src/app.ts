// import compression from "compression";
// import cookieParser from "cookie-parser";
// import cors from "cors";
// import express from "express";
// import expressSession from "express-session";
// import passport from "passport";
// import { envVars } from "./app/config/env";
// import "./app/config/passport";
// import { router } from "./app/routes";

// export const app = express();

// // Middleware
// app.use(
//   expressSession({
//     secret: envVars.FRONTEND_URL,
//     resave: false,
//     saveUninitialized: false,
//   }),
// );
// app.use(
//   cors({
//     origin: "http://localhost:5173", // 👈 exact frontend URL
//     credentials: true, // 👈 REQUIRED
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   }),
// );
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cors());
// app.use(compression());
// app.use(cookieParser());

// app.use("/api/v1", router);

// // Default route for testing
// app.get("/", (_req, res) => {
//   res.send(" Employees API is running");
// });

// // 404 Handler
// app.use((req, res, next) => {
//   res.status(404).json({
//     success: false,
//     message: "Route Not Found",
//   });
// });

// export default app;
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

app.use("/api/v1", router);

// Test route
app.get("/", (_req, res) => {
  res.send("Employees API is running");
});

// 404 handler
app.use((_req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

export default app;
