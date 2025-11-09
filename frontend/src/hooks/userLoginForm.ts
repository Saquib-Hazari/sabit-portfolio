// Creating user login form handler
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { loginSchema, type LoginFormData } from "@/schema/authSchema";
import { useState } from "react";
import { api } from "@/services/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/authContext";

export const useLoginForm = () => {
  const [loading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const methods = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  // handler
  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);

    try {
      const response = await api.post("/users/api/login", data);

      const { user, token } = response.data;

      localStorage.setItem("token", token);

      const userData = {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      };

      login(userData, token);
      toast.success("Login Successful!");
      navigate("/");
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Login failed, Please try again.";

      toast.error(errorMessage);
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
