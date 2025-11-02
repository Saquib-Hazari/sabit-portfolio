// Creating the project routes
import express from "express";
import {
  projectSubmitHandler,
  getAllProject,
  getProjectById,
  deleteProject,
} from "../controller/projectController";
import { Authentication } from "../middleware/tokenVerificaton";

const router = express.Router();

router.post("/", Authentication, projectSubmitHandler);
router.get("/", getAllProject);
router.get("/:id", getProjectById);
router.delete("/:id", Authentication, deleteProject);

export default router;
