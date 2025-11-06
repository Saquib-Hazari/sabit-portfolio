// Creating the forgot password page
import { useState } from "react";
import { api } from "@/services/api";
import { useNavigate, Link } from "react-router-dom";
import { GradientBox, GradientHeading } from "@/Chakra/ui/CustomComponents";
import {
  Button,
  Card,
  Container,
  Field,
  Fieldset,
  Flex,
  Input,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { toast } from "react-toastify";

const Forgotpassword = () => {
  const [loading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSendResetLink = async () => {
    if (!email) {
      toast.error("Please enter your");
      return;
    }

    try {
      setIsLoading(true);
      await api.post("/users/api/send-reset-otp", { email });
      toast.success("Password reset link send to your email");
      navigate("/reset-password", { state: { email } });
    } catch (error: any) {
      console.error("Error sending reset link: error");
      toast.error(error.response?.data?.message || "Failed to send reset link");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <GradientBox padding={150}>
      <Container maxW="md">
        <VStack>
          <GradientHeading>Forgot Password</GradientHeading>
          <Text textAlign={"center"} color={"gray"} fontSize={18}>
            Enter your email to reset your password
          </Text>

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
                      <Field.Label>Email Address</Field.Label>
                      <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your registered email"
                        disabled={loading}
                        border="1px solid gray"
                      />
                    </Field.Root>
                  </Fieldset.Content>
                </Fieldset.Root>

                <Button
                  onClick={handleSendResetLink}
                  colorPalette="teal"
                  width="100%"
                  disabled={loading || !email}
                >
                  {loading ? <Spinner size="sm" /> : "Send Reset Link"}
                </Button>

                <Flex gap={2} justifyContent="center" width="100%">
                  <Text color="gray.600">Remember your password?</Text>
                  <Link
                    to="/login"
                    style={{ color: "#3182CE", fontWeight: "bold" }}
                  >
                    Back to Login
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

export default Forgotpassword;
