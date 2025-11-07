// Creating the project controller
import { Request, Response } from "express";
import { Projects } from "../models/addProjectModel";

export const projectSubmitHandler = async (req: Request, res: Response) => {
  const { title, subtitle, description, techStack, link, imageUrl } = req.body;

  if (!title || !description)
    return res.status(401).json({
      success: false,
      message: "Title and Description is required.",
    });

  try {
    const projects = await Projects.create({
      title,
      subtitle,
      description,
      techStack: techStack || [],
      link,
      imageUrl,
      author: req.user.id,
      authorName: req.user.name,
    });

    await projects.save();

    return res
      .status(200)
      .json({ success: true, message: "Project created Successfully!" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error.", error });
  }
};

export const getAllProject = async (req: Request, res: Response) => {
  try {
    const projects = await Projects.find()
      .populate("author", "name email")
      .sort({ createdAt: -1 });
    res.json({ success: true, projects });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error." });
  }
};

export const getProjectById = async (req: Request, res: Response) => {
  try {
    const projects = await Projects.findById(req.params.id).populate(
      "author",
      "name email"
    );
    if (!projects)
      return res.status(400).json({ message: "Project not found." });
    res.json({ success: true, projects });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error", error });
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  try {
    const projects = await Projects.findById(req.params.id);

    if (!projects)
      return res.status(400).json({ message: "Project not found." });

    // if (projects.author?.toString() !== req.user.id.toString()) {
    //   return res
    //     .status(400)
    //     .json({ message: "Not authorized to delete this project." });
    // }
    await Projects.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Project Deleted Successful." });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error.", error });
  }
};
