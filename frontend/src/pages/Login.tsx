import { GradientBox, GradientHeading } from "@/Chakra/ui/CustomComponents";
import { Container, FieldsetHelperText, Flex, Text } from "@chakra-ui/react";
import {
  Button,
  Field,
  Fieldset,
  For,
  Input,
  NativeSelect,
  Stack,
} from "@chakra-ui/react";
const Login = () => {
  return (
    <>
      <GradientBox padding={150}>
        <GradientHeading>Login</GradientHeading>
        <Text textAlign={"center"} color={"gray"} fontSize={18} marginTop={4}>
          Authentication for Admin and Moderators
        </Text>

        <Flex justifyContent={"center"} alignItems={"center"} marginTop={10}>
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
                <Input name="email" border={"1px solid gray"} />
              </Field.Root>

              <Field.Root>
                <Field.Label>Password</Field.Label>
                <Input
                  name="password"
                  type="password"
                  border={"1px solid gray"}
                />
              </Field.Root>
            </Fieldset.Content>

            <Fieldset.Content>Forgot Password?</Fieldset.Content>

            <Button type="submit" alignSelf="flex-start">
              Submit
            </Button>
          </Fieldset.Root>
        </Flex>
      </GradientBox>
    </>
  );
};

export default Login;
