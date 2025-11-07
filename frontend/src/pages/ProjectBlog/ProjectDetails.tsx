import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { api } from "@/services/api";
import type { Project } from "@/types/projectTypes";
import {
  Box,
  Container,
  Flex,
  Text,
  VStack,
  HStack,
  Badge,
  Button,
  Image,
  Spinner,
  Card,
  Icon,
} from "@chakra-ui/react";
import {
  FaArrowLeft,
  FaExternalLinkAlt,
  FaGithub,
  FaTrash,
} from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { toast } from "react-toastify";
import { useAuth } from "@/context/authContext";

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    fetchProject();
  }, [id]);

  const handleProjectDelete = async (): Promise<void> => {
    if (
      !window.confirm(`Are you sure you want to delete "${project?.title}"?`)
    ) {
      return;
    }

    setDeleteLoading(true);
    try {
      await api.delete(`/api/projects/${id}`);
      toast.success("Project Deleted Successfully!");
      navigate("/project");
    } catch (error) {
      console.error("Error Deleting project", error);
      toast.error("Failed to delete the project.");
    } finally {
      setDeleteLoading(false);
    }
  };

  const canDeleteProject = isAuthenticated && user?.role === "admin";

  const fetchProject = async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await api.get(`/api/projects/${id}`);

      // Access the project from response.data.projects
      if (response.data.success) {
        setProject(response.data.projects);
      } else {
        setError("Failed to load project");
      }
    } catch (err) {
      console.error("Error fetching project:", err);
      setError("Project not found");
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return (
      <Container paddingTop={40} textAlign="center">
        <Spinner size="xl" color="teal" />
        <Text mt={4}>Loading project...</Text>
      </Container>
    );
  }

  if (error || !project) {
    return (
      <Container paddingTop={40} textAlign="center">
        <Text color="red.500" fontSize="xl">
          {error || "Project not found"}
        </Text>
        <Button
          onClick={() => navigate("/project")}
          colorPalette={"teal"}
          mt={4}
        >
          Back to Projects
        </Button>
      </Container>
    );
  }

  return (
    <Container width={"100%"} paddingTop={28} pb={10}>
      {/* Back Button and Delete Button */}
      <Flex justifyContent="space-between" alignItems="center" mb={6}>
        <Button onClick={() => navigate("/project")}>
          {<Icon as={FaArrowLeft} />}Back to Projects
        </Button>

        {canDeleteProject && (
          <Button
            colorPalette="red"
            variant="outline"
            leftIcon={<FaTrash />}
            onClick={handleProjectDelete}
            isLoading={deleteLoading}
            size="sm"
          >
            Delete
          </Button>
        )}
      </Flex>

      <Box bg={{ base: "transparent", _dark: "gray.960" }} p={3}>
        <Box
          display={{ base: "block", sm: "block", xl: "flex" }}
          justifyContent={"center"}
          alignContent={"center"}
          gap={10}
        >
          {/* Header Section */}
          <Box>
            <Text fontSize="3xl" fontWeight="bold" mb={2}>
              {project.title}
            </Text>
            <Text fontSize="xl" color="gray.600" mb={4}>
              {project.subtitle}
            </Text>

            {/* Tech Stack */}
            {project.techStack && (
              <HStack flexWrap="wrap" gap={2} mb={4}>
                {Array.isArray(project.techStack) ? (
                  project.techStack.map((tech: string, index: number) => (
                    <Badge
                      key={index}
                      colorScheme="blue"
                      variant="subtle"
                      px={3}
                      py={1}
                    >
                      {tech}
                    </Badge>
                  ))
                ) : (
                  <Badge colorScheme="blue" variant="subtle" px={3} py={1}>
                    {project.techStack}
                  </Badge>
                )}
              </HStack>
            )}

            {/* Action Buttons */}
            <HStack>
              {project.link && (
                <Button
                  as="a"
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  leftIcon={<Icon as={FaExternalLinkAlt} />}
                  colorScheme="teal"
                >
                  Live Demo
                </Button>
              )}
              <Button variant="outline" colorPalette="green">
                {<Icon as={FaGithub} />}View Code
              </Button>
            </HStack>
          </Box>
          <Box top="0" bottom="0" width="1px" bg="gray.700" />
          {/* Project Image */}
          {project.imageUrl && (
            <Box borderRadius="lg" overflow="hidden" boxShadow="lg">
              <Image
                src={project.imageUrl}
                alt={project.title}
                width="100%"
                height="400px"
                objectFit="cover"
              />
            </Box>
          )}

          {/* Markdown Content */}
          <Box className="markdown-content" width={"100%"}>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                // Custom styling for markdown elements
                h1: ({ children }) => (
                  <Text as="h1" fontSize="2xl" fontWeight="bold" mt={6} mb={4}>
                    {children}
                  </Text>
                ),
                h2: ({ children }) => (
                  <Text as="h2" fontSize="xl" fontWeight="bold" mt={5} mb={3}>
                    {children}
                  </Text>
                ),
                h3: ({ children }) => (
                  <Text as="h3" fontSize="lg" fontWeight="bold" mt={4} mb={2}>
                    {children}
                  </Text>
                ),
                p: ({ children }) => (
                  <Text as="p" mb={4} lineHeight="1.6">
                    {children}
                  </Text>
                ),
                ul: ({ children }) => (
                  <Box as="ul" mb={4} pl={4}>
                    {children}
                  </Box>
                ),
                ol: ({ children }) => (
                  <Box as="ol" mb={4} pl={4}>
                    {children}
                  </Box>
                ),
                li: ({ children }) => (
                  <Text as="li" mb={1}>
                    {children}
                  </Text>
                ),
                strong: ({ children }) => (
                  <Text as="strong" fontWeight="bold">
                    {children}
                  </Text>
                ),
                em: ({ children }) => (
                  <Text as="em" fontStyle="italic">
                    {children}
                  </Text>
                ),
                a: ({ href, children }) => (
                  <Link
                    to={href || "#"}
                    style={{ color: "#3182CE", textDecoration: "underline" }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {children}
                  </Link>
                ),
                code: ({ children }) => (
                  <Box
                    as="code"
                    bg="gray.200"
                    color="gray.800"
                    px={2}
                    py={1}
                    borderRadius="md"
                    fontSize="0.9em"
                    fontFamily="monospace"
                    whiteSpace="pre-wrap" // Allows wrapping
                    wordBreak="break-word" // Breaks long words
                    overflowWrap="break-word" // Alternative for breaking
                    display="inline-block"
                    maxWidth="100%" // Prevents overflow
                  >
                    {children}
                  </Box>
                ),
                blockquote: ({ children }) => (
                  <Box
                    as="blockquote"
                    borderLeft="4px solid"
                    borderColor="teal.500"
                    pl={4}
                    py={2}
                    my={4}
                    bg="gray.50"
                    _dark={{ bg: "gray.700" }}
                  >
                    {children}
                  </Box>
                ),
              }}
            >
              {project.description}
            </ReactMarkdown>
          </Box>

          {/* Additional Info */}
          <Card.Root
            variant="outline"
            mt={6}
            width={{ base: "100%", md: "40%" }}
            display={"flex"}
            justifyContent={"center"}
            alignTracks={"center"}
          >
            <Card.Body>
              <Box>
                <Text fontWeight="bold" fontSize="lg">
                  Project Details
                </Text>
                <Box justifyContent="space-between">
                  <Text color="gray.600">Created</Text>
                  <Text>
                    {project.createdAt
                      ? new Date(project.createdAt).toLocaleDateString()
                      : "Recently"}
                  </Text>
                </Box>

                {project.updatedAt && (
                  <HStack justify="space-between">
                    <Text color="gray.600">Last Updated</Text>
                    <Text>
                      {new Date(project.updatedAt).toLocaleDateString()}
                    </Text>
                  </HStack>
                )}
              </Box>
            </Card.Body>
          </Card.Root>
        </Box>
      </Box>
    </Container>
  );
};

export default ProjectDetail;
