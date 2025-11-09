import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./routes/routes";
import cookieParser from "cookie-parser";
import { connectedDB } from "./db/db";
import projectRouter from "./routes/projectRoutes";
dotenv.config();
const app = express();
connectedDB();

console.log("🚀 BACKEND STARTED - CORS Configuration:");
console.log("Origin:", process.env.FRONTEND_URL);
console.log("Timestamp:", new Date().toISOString());

app.use(
  cors({
    origin: [
      "https://sabit-portfolio-sigma.vercel.app",
      "https://sabit-portfolio-sigma.vercel.app/",
      "http://localhost:5174",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Accept",
      "X-Requested-With",
    ],
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Server is running." });
});

app.use("/users/api", userRouter);
app.use("/api/projects", projectRouter);

// Current port
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Listening to Port ${port}`);
});
