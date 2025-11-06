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
import { FaArrowLeft, FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProject();
  }, [id]);

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
    <Container maxW="4xl" paddingTop={28} pb={10}>
      {/* Back Button */}
      <Button onClick={() => navigate("/project")} mb={6}>
        {<Icon as={FaArrowLeft} />}Back to Projects
      </Button>

      <Card.Root bg={{ base: "transparent", _dark: "gray.800" }} p={6}>
        <VStack align="stretch">
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
          <Box className="markdown-content">
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
                    bg="gray.100"
                    color="gray.800"
                    px={2}
                    py={1}
                    borderRadius="md"
                    fontSize="0.9em"
                    fontFamily="monospace"
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
          <Card.Root variant="outline" mt={6}>
            <Card.Body>
              <VStack align="stretch">
                <Text fontWeight="bold" fontSize="lg">
                  Project Details
                </Text>
                <HStack justify="space-between">
                  <Text color="gray.600">Created</Text>
                  <Text>
                    {project.createdAt
                      ? new Date(project.createdAt).toLocaleDateString()
                      : "Recently"}
                  </Text>
                </HStack>
                {/* TODO: rendering the project details */}
                {project.updatedAt && (
                  <HStack justify="space-between">
                    <Text color="gray.600">Last Updated</Text>
                    <Text>
                      {new Date(project.updatedAt).toLocaleDateString()}
                    </Text>
                  </HStack>
                )}
              </VStack>
            </Card.Body>
          </Card.Root>
        </VStack>
      </Card.Root>
    </Container>
  );
};

export default ProjectDetail;
