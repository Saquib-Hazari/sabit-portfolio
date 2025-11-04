import { GradientBox, GradientHeading } from "@/Chakra/ui/CustomComponents";
import { Box, FieldLabel, Flex, Text, Textarea } from "@chakra-ui/react";
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
      <Box padding={150}>
        <GradientHeading>Add Project Here</GradientHeading>
        <Text textAlign={"center"} mt={2}>
          This Page is only visible to Admin.
        </Text>

        <Flex justifyContent={"center"} alignItems={"center"} marginTop={10}>
          <Fieldset.Root
            size="lg"
            maxW="3xl"
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
              <Fieldset.Legend fontSize={24}>
                Add Your New Creations
              </Fieldset.Legend>
              <Fieldset.HelperText>
                Please provide the valid details like title, subtitle,
                description.
              </Fieldset.HelperText>
            </Stack>

            <Fieldset.Content>
              <Field.Root>
                <Field.Label>Project Title</Field.Label>
                <Input name="name" border={"1px solid gray"} />
              </Field.Root>

              <Field.Root>
                <Field.Label>Subtitle</Field.Label>
                <Input name="email" type="email" border={"1px solid gray"} />
              </Field.Root>

              <Field.Root>
                <FieldLabel>Description</FieldLabel>
                <Textarea
                  rows={8}
                  placeholder="Comment..."
                  border={"1px solid gray"}
                />
              </Field.Root>
              <Field.Root>
                <FieldLabel>Project URL</FieldLabel>
                <Input
                  type="url"
                  placeholder="http://www.github.com"
                  border={"1px solid gray"}
                />
              </Field.Root>
              <Field.Root>
                <FieldLabel>Image URL</FieldLabel>
                <Input accept="image/*" type="file" border={"1px solid gray"} />
              </Field.Root>
            </Fieldset.Content>

            <Field.Root>
              <Field.Label>Tech Stack</Field.Label>
              <NativeSelect.Root>
                <NativeSelect.Field name="country" border={"1px solid gray"}>
                  <For
                    each={[
                      "Excel",
                      "GitHub",
                      "Tally",
                      "Adobe",
                      "Word",
                      "Html",
                      "Css",
                      "JavaScript",
                      "Typescript",
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

            <Button type="submit" alignSelf="flex-start">
              Submit
            </Button>
          </Fieldset.Root>
        </Flex>
      </Box>
    </>
  );
};

export default Login;
