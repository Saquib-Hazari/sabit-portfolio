import { GradientHeading } from "@/Chakra/ui/CustomComponents";
import { useAuth } from "@/context/authContext";
import { api } from "@/services/api";
import { type Project } from "@/types/projectTypes";
import addBlogImage from "@/assets/NIck.jpg";

import {
  Badge,
  Box,
  Button,
  Card,
  Container,
  HStack,
  Grid,
  Flex,
  Text,
  Image,
  VStack,
  Spinner,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaApple, FaGithub } from "react-icons/fa";
import { FcFaq } from "react-icons/fc";

const Project = () => {
  const { isAuthenticated, user } = useAuth();
  const isAdmin = user?.role === "admin";

  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.get("/api/projects");

      const responseData = response.data;

      if (responseData.success && Array.isArray(responseData.projects)) {
        setProjects(responseData.projects);
      } else {
        console.warn("❌ Unexpected response structure:", responseData);
        setProjects([]);
      }
    } catch (error: any) {
      console.error("❌ Error fetching projects:", error);
      setError(error.message || "Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container paddingTop={40} textAlign={"center"}>
        <Spinner size="xl" color="teal" />
        <Text mt={4} color={"teal"}>
          Loading projects...
        </Text>
      </Container>
    );
  }

  if (error) {
    return (
      <Container paddingTop={40} textAlign={"center"}>
        <Text color="red.500" fontSize="xl">
          Error loading projects: {error}
        </Text>
        <Button onClick={fetchProjects} colorScheme="teal" mt={4}>
          Try Again
        </Button>
      </Container>
    );
  }

  return (
    <Container paddingTop={40}>
      <VStack mb={8}>
        <GradientHeading>Showcase</GradientHeading>
        <Text fontSize="xl" textAlign="center">
          Transforming financial complexity into elegant digital solutions
          through code and CFA principles.
        </Text>
      </VStack>
      <Text fontSize={"18px"} fontWeight={"bold"}>
        Project work
      </Text>
      <Grid
        templateColumns={{ base: "repeat(1fr)", md: "repeat(2,1fr)" }}
        gapX={6}
        justifyContent={"center"}
        alignItems={"center"}
      >
        {projects.map((project) => (
          <Card.Root
            key={project._id}
            flexDirection="row"
            bg={{ base: "gray.100", _dark: "gray.900" }}
            overflow="hidden"
            flex={"1"}
            marginTop={30}
            border={"1px solid rgba(255, 255, 255, 0.1)"}
            transition="all 0.1s ease-in-out"
            _hover={{
              transform: "translateY(-4px)",
              boxShadow: "lg",
            }}
          >
            <Box flex="2">
              <Card.Body>
                <Flex gap={3} justifyContent={"space-between"}>
                  <Card.Title mb="2" fontSize="xl">
                    {project.title || "Untitled Project"}
                  </Card.Title>
                  <Image
                    src={addBlogImage}
                    objectFit="cover"
                    width="50px"
                    height="50px"
                    borderRadius={"100%"}
                    border={"2px solid gray"}
                  />
                </Flex>
                <VStack align="start">
                  <Card.Description color="teal.600" fontWeight="medium">
                    {project.subtitle || "No subtitle"}
                  </Card.Description>
                  <Text
                    color="gray.500"
                    css={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {project.description || "No description available"}
                  </Text>

                  {project.techStack && (
                    <HStack mt="4" wrap="wrap">
                      {Array.isArray(project.techStack) ? (
                        project.techStack.map((tech, index) => (
                          <Badge
                            key={index}
                            colorScheme="blue"
                            variant="subtle"
                          >
                            {tech}
                          </Badge>
                        ))
                      ) : (
                        <Badge colorScheme="blue" variant="subtle">
                          {project.techStack}
                        </Badge>
                      )}
                    </HStack>
                  )}
                </VStack>
              </Card.Body>

              <Box>
                <Box padding={4}>
                  <Flex justifyContent={"space-between"} alignItems={"center"}>
                    <Button
                      as={Link}
                      to={`/projects/${project._id}`}
                      colorPalette={"teal"}
                      variant={"solid"}
                    >
                      Explore
                    </Button>

                    <Flex gap={2}>
                      <FaGithub />
                      <FaApple />
                      <FcFaq />
                    </Flex>
                  </Flex>
                </Box>
              </Box>
            </Box>
          </Card.Root>
        ))}
      </Grid>

      {/* Add Project Button for Admin */}
      {isAuthenticated && isAdmin && projects.length > 0 && (
        <Container marginTop={50}>
          <Flex
            justifyContent={"center"}
            flexDirection={"column"}
            alignItems={"center"}
          >
            <Text fontSize={"24px"} fontWeight={"bold"}>
              To Add New Project Click Below{" "}
            </Text>
            <Text color={"cyan"} mb={5}>
              This button is only visible to Admin User.
            </Text>
            <Button
              as={Link}
              to="/add-project"
              variant={"solid"}
              colorScheme="teal"
            >
              + Add Projects
            </Button>
          </Flex>
        </Container>
      )}
    </Container>
  );
};

export default Project;
