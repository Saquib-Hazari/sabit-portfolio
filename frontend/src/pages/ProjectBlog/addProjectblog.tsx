import type { Project } from "@/types/projectTypes";
import axios from "axios";
import { useEffect, useState } from "react";

const addProjectblog = () => {
  const [project, setProject] = useState<Project[]>([]);
  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProject();
  }, []);

  const fetchProject = async () => {
    const response = await axios.get<Project[]>("/:id");
    setProject(response.data);
  };

  return <div>addProjectblog</div>;
};

export default addProjectblog;
