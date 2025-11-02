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

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Server is running." });
});

app.use("/users/api", userRouter);
app.use("/api/projects", projectRouter);

// Current port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening to Port ${port}`);
});
