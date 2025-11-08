import { GradientBox, GradientHeading } from "@/Chakra/ui/CustomComponents";
import { useLoginForm } from "@/hooks/userLoginForm";
import { Flex, Text } from "@chakra-ui/react";
import { Button, Field, Fieldset, Input, Stack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Login = () => {
  const { methods, loading, onSubmit } = useLoginForm();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = methods;

  return (
    <>
      <GradientBox padding={150}>
        <GradientHeading>Login</GradientHeading>
        <Text textAlign={"center"} color={"gray"} fontSize={18} marginTop={4}>
          Authentication for Admin and Moderators
        </Text>

        <Flex justifyContent={"center"} alignItems={"center"} marginTop={10}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Fieldset.Root
              size="lg"
              maxW="md"
              bg={{
                base: "rgba(255, 255, 255, 0.3)",
                _dark:
                  "linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1))",
              }}
              backdropFilter="blur(10px)"
              border="1px solid"
              borderColor="rgba(255, 255, 255, 0.2)"
              padding="20px"
              borderRadius="10px"
              boxShadow="0 4px 6px rgba(0, 0, 0, 0.2)"
            >
              <Stack>
                <Fieldset.Legend fontSize={24}>Login details</Fieldset.Legend>
                <Fieldset.HelperText>
                  Please provide your email id and password details below.
                </Fieldset.HelperText>
              </Stack>

              <Fieldset.Content>
                <Field.Root>
                  <Field.Label>Email Address</Field.Label>
                  <Input
                    type="email"
                    border={"1px solid gray"}
                    {...register("email")}
                    disabled={loading}
                  />
                  {errors.email && (
                    <Text color={"red.300"}>{errors.email.message}</Text>
                  )}
                </Field.Root>

                <Field.Root>
                  <Field.Label>Password</Field.Label>
                  <Input
                    type="password"
                    border={"1px solid gray"}
                    {...register("password")}
                    disabled={loading}
                  />
                  {errors.password && (
                    <Text color={"red.300"} fontSize={"sm"} mt={1}>
                      {errors.password.message}
                    </Text>
                  )}
                </Field.Root>
              </Fieldset.Content>

              <Text textDecoration={"underline"}>
                <Link
                  to="/forgot-password"
                  style={{
                    textDecoration: "underline",
                  }}
                >
                  Forgot Password?
                </Link>
              </Text>

              <Button type="submit" alignSelf="flex-start">
                Submit
              </Button>
            </Fieldset.Root>
          </form>
        </Flex>
        <Text mt={4} fontSize={"18px"} color={"gray.500"} textAlign={"center"}>
          Already have an account? Sign in to continue your progress.
        </Text>
      </GradientBox>
    </>
  );
};

export default Login;
