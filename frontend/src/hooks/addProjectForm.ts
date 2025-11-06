// Creating the hook for add project form
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  type ProjectFormData,
  type ProjectApiFormData,
  projectSchema,
} from "@/schema/authSchema";
import { type Project } from "@/types/projectTypes";
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
      // Use fetch for Cloudinary to avoid credential issues
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`Upload failed with status: ${response.status}`);
      }

      const data = await response.json();
      return data.secure_url;
    } catch (error: any) {
      console.error("Cloudinary upload failed: ", error);
      const cloudinaryError = error.message || "Image upload failed.";
      throw new Error(cloudinaryError);
    }
  };

  // Handle image selection and preview
  const handleImageChange = async (file: File | undefined): Promise<void> => {
    if (!file) {
      form.setValue("imageUrl", undefined);
      return;
    }

    // Validation
    if (!file.type.startsWith("image/")) {
      form.setError("imageUrl", { message: "Please select an image file" });
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      form.setError("imageUrl", { message: "Image must be less than 10MB" });
      return;
    }

    setIsUploading(true);
    form.clearErrors("imageUrl");

    try {
      // Just set the file for preview - don't upload yet
      form.setValue("imageUrl", file, { shouldValidate: true });
    } catch (error: any) {
      form.setError("imageUrl", {
        message: error.message || "Failed to process image",
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

      // Upload to Cloudinary only when form is submitted
      const imageUrl = await uploadToCloudinary(data.imageUrl);

      const apiData: ProjectApiFormData = {
        title: data.title,
        subtitle: data.subtitle,
        description: data.description,
        link: data.link,
        imageUrl: imageUrl, // Use the Cloudinary URL
        techStack: data.techStack,
      };

      // Remove duplicate withCredentials: true since it's already in api instance
      const response = await api.post("/api/projects", apiData);

      onSubmitSuccess?.(response.data.project);
      toast.success("Project uploaded successfully!");
      form.reset();
    } catch (error: any) {
      console.error("Submission Error: ", error);
      const errorMessage =
        error.response?.data?.error ||
        error.message ||
        "Failed to create project";
      toast.error("Something went wrong. Please try again.");
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
