import { GradientBox, GradientHeading } from "@/Chakra/ui/CustomComponents";
import { FieldLabel, Flex, Text, Textarea } from "@chakra-ui/react";
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
        <GradientHeading>Contact Me</GradientHeading>

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
              <Fieldset.Legend fontSize={24}>Contact details</Fieldset.Legend>
              <Fieldset.HelperText>
                Please provide your contact details we'll reach out to you.
              </Fieldset.HelperText>
            </Stack>

            <Fieldset.Content>
              <Field.Root>
                <Field.Label>Email Address</Field.Label>
                <Input name="name" border={"1px solid gray"} />
              </Field.Root>

              <Field.Root>
                <Field.Label>Password</Field.Label>
                <Input name="email" type="email" border={"1px solid gray"} />
              </Field.Root>
            </Fieldset.Content>

            <Field.Root>
              <Field.Label>Country</Field.Label>
              <NativeSelect.Root>
                <NativeSelect.Field name="country" border={"1px solid gray"}>
                  <For
                    each={[
                      "United Kingdom",
                      "Canada",
                      "United States",
                      "Asia",
                      "Europe",
                      "China",
                      "Japan",
                      "Russia",
                      "Ice Land",
                      "Green Land",
                      "Australia",
                      "Turkey",
                      "Dubai",
                    ]}
                  >
                    {(item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    )}
                  </For>
                </NativeSelect.Field>
                <NativeSelect.Indicator />
              </NativeSelect.Root>
            </Field.Root>
            <Field.Root>
              <FieldLabel>Comments</FieldLabel>
              <Textarea placeholder="Comment..." border={"1px solid gray"} />
            </Field.Root>

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
