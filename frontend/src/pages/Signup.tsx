import { GradientBox, GradientHeading } from "@/Chakra/ui/CustomComponents";
import { userSignupForm } from "@/hooks/userSignupForm";
import {
  FieldLabel,
  FieldsetContent,
  Flex,
  Span,
  Text,
  Textarea,
} from "@chakra-ui/react";
import {
  Button,
  Field,
  Fieldset,
  For,
  Input,
  NativeSelect,
  Stack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Login = () => {
  const { methods, onSubmit, loading } = userSignupForm();
  const {
    register,
    formState: { errors, isValid },
    reset,
    handleSubmit,
  } = methods;
  return (
    <>
      <GradientBox minHeight={"110vh"} padding={130}>
        <GradientHeading fontSize={"45px"}>SignUp</GradientHeading>
        <Text color={"gray.500"} textAlign={"center"} marginTop={2}>
          New user SingUp
        </Text>
        <Flex justifyContent={"center"} alignItems={"center"} marginTop={7}>
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
                <Fieldset.Legend fontSize={24}>SignUp details</Fieldset.Legend>
                <Fieldset.HelperText>
                  Please provide your SignUp details. We handle your data with
                  care.
                </Fieldset.HelperText>
              </Stack>

              <Fieldset.Content>
                <Field.Root>
                  <Field.Label>Enter Full Name</Field.Label>
                  <Input
                    type="name"
                    {...register("name")}
                    disabled={loading}
                    border={"1px solid gray"}
                  />
                  {errors.name && (
                    <Text color={"red.300"} mt={1} fontSize={"16px"}>
                      {errors.name.message}
                    </Text>
                  )}
                </Field.Root>

                <Field.Root>
                  <Field.Label>Email Address</Field.Label>
                  <Input
                    {...register("email")}
                    disabled={loading}
                    type="email"
                    border={"1px solid gray"}
                  />
                  {errors.email && (
                    <Text color={"red.300"} mt={1} fontSize={"16px"}>
                      {errors.email.message}
                    </Text>
                  )}
                </Field.Root>
                <Field.Root>
                  <Field.Label>Password</Field.Label>
                  <Input
                    type="password"
                    {...register("password")}
                    disabled={loading}
                    border={"1px solid gray"}
                  />
                  {errors.password && (
                    <Text color={"red.300"} mt={1} fontSize={"16px"}>
                      {errors.password.message}
                    </Text>
                  )}
                </Field.Root>
                <Field.Root>
                  <Field.Label>Confirm Password</Field.Label>
                  <Input
                    {...register("confirmPassword")}
                    display={loading}
                    type="password"
                    border={"1px solid gray"}
                  />
                  {errors.confirmPassword && (
                    <Text color={"red.300"} mt={1} fontSize={"16px"}>
                      {errors.confirmPassword.message}
                    </Text>
                  )}
                </Field.Root>
              </Fieldset.Content>

              <FieldsetContent>
                <Text textDecoration={"underline"}>
                  Already User?{" "}
                  <Link to={"/login"} color="red">
                    Login
                  </Link>
                </Text>
              </FieldsetContent>

              <Button type="submit" alignSelf="flex-start">
                Submit
              </Button>
            </Fieldset.Root>
          </form>
        </Flex>
        <Text mt={4} fontSize={"18px"} color={"gray.500"} textAlign={"center"}>
          Ready to Elevate Your Financial Strategy? Sign up today and gain
        </Text>
      </GradientBox>
    </>
  );
};

export default Login;
