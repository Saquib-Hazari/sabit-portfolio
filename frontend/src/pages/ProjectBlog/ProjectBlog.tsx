import { GradientHeading } from "@/Chakra/ui/CustomComponents";
import { useProjectForm } from "@/hooks/addProjectForm";
import type { Project } from "@/types/projectTypes";
import {
  Box,
  Container,
  FieldLabel,
  Flex,
  Image,
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
import { useRef, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";

interface AddProjectProps {
  onProjectAdded?: (project: Project) => void;
}

const AddProjectModal = ({ onProjectAdded }: AddProjectProps) => {
  const navigate = useNavigate();

  const { form, onSubmit, handleImageChange, uploading, submitting } =
    useProjectForm({
      onSubmitSuccess: (project) => {
        onProjectAdded?.(project);
        navigate("/projects");
      },
    });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    watch,
  } = form;

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    await handleImageChange(file);
  };

  const removeImage = () => {
    setValue("imageUrl", undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const imageFile = watch("imageUrl");

  return (
    <Box paddingTop={150}>
      <GradientHeading>Add Project Here</GradientHeading>
      <Text textAlign={"center"} mt={2}>
        This Page is only visible to Admin.
      </Text>

      <Flex justifyContent={"center"} alignItems={"center"} marginTop={10}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ minWidth: "60%", maxWidth: "100%" }}
        >
          <Fieldset.Root size="lg" padding="20px">
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
                <Field.Label marginBottom={3} fontSize={"18px"}>
                  Project Title
                </Field.Label>
                <Input
                  {...register("title")}
                  disabled={uploading}
                  padding="25px 35px"
                  bg={{ base: "gray.200", _dark: "gray.950" }}
                />
                {errors.title && (
                  <Text color={"red.300"} mt={1}>
                    {errors.title.message}
                  </Text>
                )}
              </Field.Root>

              <Field.Root>
                <Field.Label>Subtitle</Field.Label>
                <Input
                  {...register("subtitle")}
                  disabled={uploading}
                  padding="25px 35px"
                  bg={{ base: "gray.200", _dark: "gray.950" }}
                />
                {errors.subtitle && (
                  <Text color={"red.300"} mt={1}>
                    {errors.subtitle.message}
                  </Text>
                )}
              </Field.Root>

              <Field.Root>
                <FieldLabel>
                  Description{" "}
                  <Text
                    as="span"
                    fontSize="sm"
                    color="gray.500"
                    fontWeight="normal"
                  >
                    (Supports Markdown)
                  </Text>
                </FieldLabel>
                <Textarea
                  rows={8}
                  {...register("description")}
                  disabled={uploading}
                  padding="25px 35px"
                  bg={{ base: "gray.200", _dark: "gray.950" }}
                  placeholder={`# Heading 1
## Heading 2
**Bold text**
*Italic text*
- List item 1
- List item 2

[Link text](https://example.com)`}
                  fontFamily="monospace"
                  fontSize="sm"
                />
                {errors.description && (
                  <Text color={"red.300"} mt={1}>
                    {errors.description.message}
                  </Text>
                )}
              </Field.Root>

              <Field.Root>
                <FieldLabel>Project URL</FieldLabel>
                <Input
                  type="url"
                  {...register("link")}
                  disabled={uploading}
                  placeholder="http://www.github.com"
                  padding="25px 35px"
                  bg={{ base: "gray.200", _dark: "gray.950" }}
                />
                {errors.link && (
                  <Text color={"red.300"} mt={1}>
                    {errors.link.message}
                  </Text>
                )}
              </Field.Root>

              <Field.Root>
                <FieldLabel>Project Image</FieldLabel>
                <Input
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleFileChange}
                  disabled={uploading}
                  type="file"
                  padding="25px 35px"
                  bg={{ base: "gray.200", _dark: "gray.950" }}
                />
                {uploading && (
                  <Text color={"blue.500"}>Uploading Image...</Text>
                )}
                {errors.imageUrl && (
                  <Text color={"red.300"} mt={1}>
                    {errors.imageUrl.message}
                  </Text>
                )}
                {imageFile && (
                  <Container position="relative" mt={2}>
                    <Image
                      src={
                        typeof imageFile === "string"
                          ? imageFile
                          : URL.createObjectURL(imageFile)
                      }
                      alt="Preview"
                      width={"200px"}
                      height={"150px"}
                      objectFit={"cover"}
                      borderRadius={"lg"}
                    />
                    <Button
                      type="button"
                      onClick={removeImage}
                      position={"absolute"}
                      borderRadius={"full"}
                      color={"white"}
                      width={6}
                      height={6}
                      top={2}
                      right={2}
                      bg={"red.500"}
                      display={"flex"}
                      justifyContent={"center"}
                      alignItems={"center"}
                      fontSize={"sm"}
                    >
                      ×
                    </Button>
                    <Text color={"green.500"} mt={1}>
                      Image Selected
                    </Text>
                  </Container>
                )}
              </Field.Root>

              <Field.Root>
                <Field.Label>Tech Stack</Field.Label>
                <NativeSelect.Root>
                  <NativeSelect.Field
                    {...register("techStack")}
                    disabled={uploading}
                    padding="25px 35px"
                    bg={{ base: "gray.200", _dark: "gray.950" }}
                  >
                    <For
                      each={[
                        "Excel",
                        "GitHub",
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
                {errors.techStack && (
                  <Text color={"red.300"} mt={1}>
                    {errors.techStack.message}
                  </Text>
                )}
              </Field.Root>
            </Fieldset.Content>

            <Flex gap={4} mt={6}>
              <Button
                type="button"
                onClick={() => navigate("/project")}
                colorPalette={"teal"}
                variant={"outline"}
                disabled={submitting || uploading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={submitting || uploading || !isValid}
              >
                {submitting ? "Submitting..." : "Submit"}
              </Button>
            </Flex>
          </Fieldset.Root>
        </form>
      </Flex>
    </Box>
  );
};

export default AddProjectModal;
