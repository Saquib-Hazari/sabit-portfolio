import { GradientBox, GradientHeading } from "@/Chakra/ui/CustomComponents";
import { api } from "@/services/api";
import {
  Button,
  Card,
  Container,
  Field,
  Fieldset,
  Flex,
  HStack,
  Input,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const email = location.state?.email || "";

  const handleOtpChange = (value: string, index: number) => {
    if (!/^[0-9]?$/.test(value)) return; // Only allow numbers

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all fields are filled
    if (newOtp.every((digit) => digit !== "") && index === 5) {
      handleVerifyOtp();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      // Move to previous input on backspace
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOtp = async () => {
    const otpString = otp.join("");

    if (otpString.length !== 6) {
      toast.error("Please enter the 6-digit OTP");
      return;
    }

    try {
      setLoading(true);
      await api.post("/api/auth/verify-email", {
        email,
        otp: otpString,
      });

      toast.success("Email verified successfully! 🎉");
      navigate("/project");
    } catch (error: any) {
      console.error("Error verifying OTP:", error);
      toast.error(error.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (!email) {
      toast.error("Email not found");
      return;
    }

    try {
      setResendLoading(true);
      await api.post("/api/auth/resend-verification-email", { email });
      toast.success("New OTP sent to your email!");
      setOtp(["", "", "", "", "", ""]); // Reset OTP fields
      inputRefs.current[0]?.focus(); // Focus first input
    } catch (error: any) {
      console.error("Error resending OTP:", error);
      toast.error(error.response?.data?.message || "Failed to resend OTP");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <GradientBox padding={150}>
      <Container maxW="md">
        <VStack>
          <GradientHeading>Enter Verification Code</GradientHeading>

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
                <Text color="gray.600" textAlign="center">
                  We've sent a 6-digit code to{" "}
                  <Text as="span" fontWeight="bold" color="teal.500">
                    {email}
                  </Text>
                </Text>

                <Fieldset.Root size="lg" width="100%">
                  <Fieldset.Content>
                    <Field.Root>
                      <Field.Label>Verification Code</Field.Label>
                      <HStack justify="center">
                        {otp.map((digit, index) => (
                          <Input
                            key={index}
                            ref={(el) => (inputRefs.current[index] = el)}
                            value={digit}
                            onChange={(e) =>
                              handleOtpChange(e.target.value, index)
                            }
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            type="text"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            maxLength={1}
                            width="50px"
                            height="50px"
                            textAlign="center"
                            fontSize="xl"
                            fontWeight="bold"
                            border="2px solid"
                            borderColor="gray.300"
                            _focus={{
                              borderColor: "teal.500",
                              boxShadow: "0 0 0 1px teal.500",
                            }}
                          />
                        ))}
                      </HStack>
                    </Field.Root>
                  </Fieldset.Content>
                </Fieldset.Root>

                <Button
                  onClick={handleVerifyOtp}
                  colorPalette="teal"
                  width="100%"
                  disabled={loading || otp.join("").length !== 6}
                >
                  {loading ? <Spinner size="sm" /> : "Verify Email"}
                </Button>

                <Flex gap={4} width="100%">
                  <Button
                    variant="outline"
                    onClick={handleResendOtp}
                    disabled={resendLoading}
                    flex={1}
                  >
                    {resendLoading ? <Spinner size="sm" /> : "Resend Code"}
                  </Button>

                  <Button
                    variant="ghost"
                    onClick={() => navigate("/verify-email")}
                    flex={1}
                  >
                    Change Email
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

export default VerifyOtp;
