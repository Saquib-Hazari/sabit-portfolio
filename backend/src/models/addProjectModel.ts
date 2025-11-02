// Creating the add project model using tsx
import mongoose from "mongoose";

interface Project {
  title: string;
  subtitle: string;
  description: string | number;
  techStack: string[];
  link?: string;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
  author: string | any;
}
export const projectSchema = new mongoose.Schema<Project>({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  subtitle: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  techStack: [
    {
      type: String,
    },
  ],
  link: {
    type: String,
  },
  imageUrl: {
    types: String,
  },
  author: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

export const Projects = mongoose.model("Projects", projectSchema);
