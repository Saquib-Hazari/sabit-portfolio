// Creating the hook for add project form
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  type ProjectFormData,
  type ProjectApiFormData,
  projectSchema,
} from "@/schema/authSchema";
import { type Project, type ProjectResponse } from "@/types/projectTypes";
import { useState } from "react";
import { api } from "@/services/api";
import { toast } from "react-toastify";

interface UseProjectFormProps {
  onSubmitSuccess?: (project: Project) => void;
}

export const useProjectForm = ({
  onSubmitSuccess,
}: UseProjectFormProps = {}) => {
  const [uploading, setIsUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
  });

  // Adding cloudinary
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  // Uploading to cloudinary and error handling
  if (!cloudName || !uploadPreset)
    throw new Error("Missing cloud name and upload preset.");

  const uploadToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    try {
      const response = await api.post<{ secure_url: string }>(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" }, timeout: 30000 }
      );
      return response.data.secure_url;
    } catch (error: any) {
      console.error("Cloudinary upload failed: ", error.response?.data);
      const cloudinaryError =
        error.response?.data?.message || "Image upload failed.";
      throw new Error(cloudinaryError);
    }
  };

  // handling proper error
  const handleImageChange = async (
    file: File | undefined
  ): Promise<string | void> => {
    if (!file) {
      form.setValue("imageUrl", undefined);
      return;
    }
    if (!file.type.startsWith("image/")) {
      form.setError("imageUrl", { message: "Please select an image file" });
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      form.setError("imageUrl", { message: "Image must be less then 10MB" });
      return;
    }
    setIsUploading(true);
    form.clearErrors("imageUrl");
    try {
      const imageUrl = await uploadToCloudinary(file);
      form.setValue("imageUrl", file, { shouldValidate: true });
      return imageUrl;
    } catch (error: any) {
      form.setError("imageUrl", {
        message: error.message || "Failed to upload image",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const onSubmit = async (data: ProjectFormData) => {
    setSubmitting(true);

    try {
      if (!data.imageUrl) {
        form.setError("root", { message: "Please select an image" });
        return;
      }
      const imageUrl = await uploadToCloudinary(data.imageUrl);

      const apiData: ProjectApiFormData = {
        title: data.title,
        subtitle: data.subtitle,
        description: data.description,
        link: data.link,
        imageUrl: imageUrl,
        techStack: data.techStack,
      };
      const response = await api.post("/api/projects", apiData, {
        withCredentials: true,
      });
      onSubmitSuccess?.(response.data.project);
      toast.success("Successfully Project uploaded.");
      form.reset();
    } catch (error: any) {
      console.error("Submission Error: ", error);
      const errorMessage =
        error.response?.data?.error ||
        error.message ||
        "Failed to create Project";
      toast.error("Something went wrong please try again.");
      form.setError("root", { message: errorMessage });
    } finally {
      setSubmitting(false);
    }
  };

  return {
    form,
    uploading,
    submitting,
    handleImageChange,
    onSubmit,
  };
};
