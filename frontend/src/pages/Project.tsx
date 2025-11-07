import { GradientHeading } from "@/Chakra/ui/CustomComponents";
import { useAuth } from "@/context/authContext";
import { api } from "@/services/api";
import { type Project } from "@/types/projectTypes";
import addBlogImage from "@/assets/sabit1.jpg";

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
  const [currentPage, setCurrentPage] = useState();
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
        <Text fontSize="xl" textAlign="center" color={"gray.400"}>
          Financial Productivity Showcase Projects
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
            bg={{
              base: "gray.100",
              _dark: "linear-gradient(180deg, #181C14, black)",
            }}
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
                  <Card.Title mb="2" fontSize={{ base: "lg", md: "xl" }}>
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
                    fontSize={{ base: "sm", md: "lg" }}
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
        <Container
          marginTop={50}
          rounded={"10px"}
          bg={{
            base: "#eee",
            _dark: "linear-gradient(90deg, #181C14 70%, black)",
          }}
          border={{ base: "1px solid gray", _dark: "1px solid #333" }}
        >
          <Flex
            justifyContent={"space-between"}
            alignItems={"center"}
            padding={"10px"}
          >
            <Box>
              <Text fontSize={{ base: "18px", md: "24px" }} fontWeight={"bold"}>
                To Add New Project Click Below{" "}
              </Text>
              <Text
                fontSize={{ base: "16px", md: "18px" }}
                mb={5}
                color={"gray.400"}
              >
                This button is only visible to Admin User.
              </Text>
            </Box>
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
