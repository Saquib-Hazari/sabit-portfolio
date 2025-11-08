import { GradientHeading } from "@/Chakra/ui/CustomComponents";
import { Link } from "react-router-dom";
import {
  Avatar,
  Button,
  Card,
  Container,
  Grid,
  HStack,
  Link as link,
  Text,
} from "@chakra-ui/react";

const Experience = () => {
  const score = ["12+", "40+", "120+", "200+"];

  const services = [
    {
      id: "cfa",
      title: "CFA Level 1 Expertise",
      description:
        "Mastering financial analysis, equity valuation, and investment principles with comprehensive CFA Level 1 knowledge to deliver data-driven insights and rigorous financial evaluation.",
    },
    {
      id: "portfolio",
      title: "Portfolio Management",
      description:
        "Designing sophisticated investment strategies through modern portfolio theory, asset allocation optimization, and risk management frameworks to maximize risk-adjusted returns.",
    },
    {
      id: "investment",
      title: "Investment Management",
      description:
        "Developing customized wealth management solutions that balance growth objectives with capital preservation using fundamental analysis and performance monitoring.",
    },
    {
      id: "branding",
      title: "Financial Branding",
      description:
        "Crafting compelling financial narratives and professional branding that communicates expertise and establishes strong market positioning in competitive financial landscapes.",
    },
  ];

  return (
    <>
      <Container marginTop={40} id="experiences">
        <GradientHeading>Experience</GradientHeading>
        <Text textAlign={"center"} color={"gray.400"}>
          My Journey in Finance & Technology
        </Text>
        <HStack fontWeight={"bolder"} fontSize={"18px"}>
          Skills and Experiences
        </HStack>
        <Grid
          templateColumns={{
            base: "1fr",
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
            xl: "repeat(4, 1fr)",
          }}
          gapX={6}
          marginTop={8}
        >
          {services.map((service, index) => (
            <Card.Root
              key={index}
              marginTop={"30px"}
              bg={{
                base: "gray.100",
                _dark: "linear-gradient(180deg, #181C14, black)",
              }}
            >
              <Card.Body gap="2">
                <Avatar.Root
                  size="2xl"
                  shape="rounded"
                  bg={"#181C14"}
                  border={"2px solid cyan"}
                >
                  <Text fontWeight={"bolder"} color={"white"}>
                    {score[index]}
                  </Text>
                </Avatar.Root>

                <Card.Title mt="2">{service.title}</Card.Title>
                <Card.Description>{service.description}</Card.Description>
              </Card.Body>
              <Card.Footer justifyContent="flex-end">
                <Link
                  to={`about#${service.id}`}
                  onClick={() =>
                    console.log("Navigate to: ", `/about#${service.id}`)
                  }
                >
                  <Button colorPalette={"teal"} variant="outline">
                    View
                  </Button>
                </Link>
              </Card.Footer>
            </Card.Root>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Experience;
