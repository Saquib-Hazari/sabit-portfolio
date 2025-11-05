import { GradientBox, GradientHeading } from "@/Chakra/ui/CustomComponents";
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
import { useNavigate } from "react-router-dom"; // ✅ Add this

interface AddProjectProps {
  onProjectAdded?: (project: Project) => void;
}

const AddProjectModal = ({ onProjectAdded }: AddProjectProps) => {
  // ✅ Remove isOpen and onClose
  const navigate = useNavigate();

  const { form, onSubmit, handleImageChange, uploading, submitting } =
    useProjectForm({
      onSubmitSuccess: (project) => {
        onProjectAdded?.(project);
        navigate("/project");
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
    <Box padding={150}>
      <GradientHeading>Add Project Here</GradientHeading>
      <Text textAlign={"center"} mt={2}>
        This Page is only visible to Admin.
      </Text>

      <Flex justifyContent={"center"} alignItems={"center"} marginTop={10}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Fieldset.Root
            size="lg"
            minW={"4xl"}
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
              {/* Your form fields remain the same */}
              <Field.Root>
                <Field.Label>Project Title</Field.Label>
                <Input
                  {...register("title")}
                  disabled={uploading}
                  border={"1px solid gray"}
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
                  border={"1px solid gray"}
                />
                {errors.subtitle && (
                  <Text color={"red.300"} mt={1}>
                    {errors.subtitle.message}
                  </Text>
                )}
              </Field.Root>

              <Field.Root>
                <FieldLabel>Description</FieldLabel>
                <Textarea
                  rows={8}
                  {...register("description")}
                  disabled={uploading}
                  placeholder="Comment..."
                  border={"1px solid gray"}
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
                  border={"1px solid gray"}
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
                  border={"1px solid gray"}
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
                    border={"1px solid gray"}
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
              {/* ✅ FIXED: Navigate back on cancel */}
              <Button
                type="button"
                onClick={() => navigate("/projects")} // ✅ Go back to projects page
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
