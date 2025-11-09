// Creating user signup form
import { useAuth } from "@/context/authContext";
import { registerSchema, type RegisterFormData } from "@/schema/authSchema";
import { api } from "@/services/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const userSignupForm = () => {
  const [loading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const methods = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });
  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);

    try {
      const response = await api.post("/users/api/register", data);
      login(response.data.user);

      toast.success("Account created Successfully!");
      navigate("/login");
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Signup failed, Please try again";

      toast.error(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    methods,
    onSubmit,
    loading,
  };
};
