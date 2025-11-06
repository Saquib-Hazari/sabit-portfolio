import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "@/services/api";
import { useAuth } from "@/context/authContext";
import { GradientBox, GradientHeading } from "@/Chakra/ui/CustomComponents";
import {
  Container,
  VStack,
  Text,
  Button,
  Card,
  Spinner,
  Flex,
} from "@chakra-ui/react";
import { toast } from "react-toastify";

const VerifyEmail = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSendVerificationEmail = async () => {
    if (!user?.email) {
      toast.error("No email found for your account");
      return;
    }

    try {
      setLoading(true);
      await api.post("/api/auth/send-verification-email", {
        email: user.email,
      });
      toast.success("Verification email sent! Check your inbox.");
      navigate("/verify-otp", { state: { email: user.email } });
    } catch (error: any) {
      console.error("Error sending verification email:", error);
      toast.error(
        error.response?.data?.message || "Failed to send verification email"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <GradientBox padding={150}>
      <Container maxW="md">
        <VStack>
          <GradientHeading>Verify Your Email</GradientHeading>

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
              <VStack textAlign="center">
                <Text fontSize="lg" color="gray.600">
                  We'll send a verification code to your email address to secure
                  your account.
                </Text>

                {user?.email && (
                  <Text fontSize="md" fontWeight="bold" color="teal.500">
                    {user.email}
                  </Text>
                )}

                <Text fontSize="sm" color="gray.500">
                  Click the button below to receive a 6-digit verification code.
                </Text>

                <Button
                  onClick={handleSendVerificationEmail}
                  colorPalette="teal"
                  width="100%"
                  disabled={loading}
                >
                  {loading ? <Spinner size="sm" /> : "Send Verification Code"}
                </Button>

                <Flex gap={2} justifyContent="center" width="100%">
                  <Button
                    variant="outline"
                    onClick={() => navigate("/project")}
                    width="100%"
                  >
                    Back to Projects
                  </Button>
                </Flex>
              </VStack>
            </Card.Body>
          </Card.Root>
        </VStack>
      </Container>
    </GradientBox>
  );
};

export default VerifyEmail;
