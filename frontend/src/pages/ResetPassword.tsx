import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { api } from "@/services/api";
import { GradientBox, GradientHeading } from "@/Chakra/ui/CustomComponents";
import {
  Container,
  VStack,
  Text,
  Input,
  Button,
  Card,
  Field,
  Fieldset,
  Spinner,
  Flex,
} from "@chakra-ui/react";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
    otp: "",
  });
  const [loading, setLoading] = useState(false);

  const email = location.state?.email || "";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleResetPassword = async () => {
    const { password, confirmPassword, otp } = formData;

    if (!password || !confirmPassword || !otp) {
      toast.error("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);

      console.log("Sending reset password request", {
        email,
        resetOtp: otp,
        newPassword: password,
      });

      await api.post("/users/api/reset-password", {
        email,
        resetOtp: otp,
        newPassword: password,
      });

      toast.success("Password reset successfully! 🎉");
      navigate("/login");
    } catch (error: any) {
      console.error("Error resetting password:", error);
      console.error("Error response data:", error.response?.data);

      // More specific error message
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Failed to reset password";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <GradientBox padding={150}>
      <Container maxW="md">
        <VStack>
          <GradientHeading>Reset Password</GradientHeading>
          <Text textAlign={"center"} color={"gray"} fontSize={18}>
            Enter the OTP sent to your email and new password
          </Text>

          {/* Show email for confirmation */}
          {email && (
            <Text
              fontSize="sm"
              color="blue.500"
              bg="blue.50"
              p={2}
              borderRadius="md"
            >
              Reset password for: {email}
            </Text>
          )}

          <Card.Root
            width="100%"
            bg={{
              base: "rgba(255, 255, 255, 0.3)",
              _dark: "rgba(255, 255, 255, 0.1)",
            }}
            backdropFilter="blur(10px)"
            border="1px solid"
            borderColor="rgba(255, 255, 255, 0.2)"
          >
            <Card.Body>
              <VStack>
                <Fieldset.Root size="lg" width="100%">
                  <Fieldset.Content>
                    <Field.Root>
                      <Field.Label>OTP Code</Field.Label>
                      <Input
                        name="otp"
                        value={formData.otp}
                        onChange={handleChange}
                        placeholder="Enter 6-digit OTP"
                        disabled={loading}
                        border="1px solid gray"
                        maxLength={6}
                      />
                    </Field.Root>

                    <Field.Root>
                      <Field.Label>New Password</Field.Label>
                      <Input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter new password"
                        disabled={loading}
                        border="1px solid gray"
                      />
                    </Field.Root>

                    <Field.Root>
                      <Field.Label>Confirm Password</Field.Label>
                      <Input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm new password"
                        disabled={loading}
                        border="1px solid gray"
                      />
                    </Field.Root>
                  </Fieldset.Content>
                </Fieldset.Root>

                <Button
                  onClick={handleResetPassword}
                  colorPalette="teal"
                  width="100%"
                  disabled={loading}
                >
                  {loading ? <Spinner size="sm" /> : "Reset Password"}
                </Button>

                <Flex gap={2} justifyContent="center" width="100%">
                  <Text color="gray.600">Didn't receive OTP?</Text>
                  <Link
                    to="/forgot-password"
                    style={{ color: "#3182CE", fontWeight: "bold" }}
                  >
                    Resend OTP
                  </Link>
                </Flex>
              </VStack>
            </Card.Body>
          </Card.Root>
        </VStack>
      </Container>
    </GradientBox>
  );
};

export default ResetPassword;
