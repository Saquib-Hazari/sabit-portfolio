import { GradientHeading } from "@/Chakra/ui/CustomComponents";

import {
  Badge,
  Box,
  Button,
  Card,
  Container,
  HStack,
  Grid,
} from "@chakra-ui/react";

const Project = () => {
  return (
    <>
      <Container paddingTop={40}>
        <GradientHeading>Projects</GradientHeading>
        <HStack fontWeight={"bolder"} fontSize={"18px"}>
          My Projects
        </HStack>
        {/* Project cards */}

        <Grid
          templateColumns="repeat(2,1fr)"
          gap={6}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Card.Root
            flexDirection="row"
            overflow="hidden"
            maxW="2xl"
            marginTop={30}
          >
            <Box>
              <Card.Body>
                <Card.Title mb="2">The perfect latte</Card.Title>
                <Card.Description>
                  Caffè latte is a coffee beverage of Italian origin made with
                  espresso and steamed milk.
                </Card.Description>
                <HStack mt="4">
                  <Badge>Hot</Badge>
                  <Badge>Caffeine</Badge>
                </HStack>
              </Card.Body>
              <Card.Footer>
                <Button colorPalette={"teal"} variant={"solid"}>
                  Explore
                </Button>
              </Card.Footer>
            </Box>
          </Card.Root>
          <Card.Root
            flexDirection="row"
            overflow="hidden"
            maxW="2xl"
            marginTop={30}
          >
            <Box>
              <Card.Body>
                <Card.Title mb="2">The perfect latte</Card.Title>
                <Card.Description>
                  Caffè latte is a coffee beverage of Italian origin made with
                  espresso and steamed milk.
                </Card.Description>
                <HStack mt="4">
                  <Badge>Hot</Badge>
                  <Badge>Caffeine</Badge>
                </HStack>
              </Card.Body>
              <Card.Footer>
                <Button colorPalette={"teal"} variant={"solid"}>
                  Explore
                </Button>
              </Card.Footer>
            </Box>
          </Card.Root>
          <Card.Root
            flexDirection="row"
            overflow="hidden"
            maxW="2xl"
            marginTop={30}
          >
            <Box>
              <Card.Body>
                <Card.Title mb="2">The perfect latte</Card.Title>
                <Card.Description>
                  Caffè latte is a coffee beverage of Italian origin made with
                  espresso and steamed milk.
                </Card.Description>
                <HStack mt="4">
                  <Badge>Hot</Badge>
                  <Badge>Caffeine</Badge>
                </HStack>
              </Card.Body>
              <Card.Footer>
                <Button colorPalette={"teal"} variant={"solid"}>
                  Explore
                </Button>
              </Card.Footer>
            </Box>
          </Card.Root>
          <Card.Root
            flexDirection="row"
            overflow="hidden"
            maxW="2xl"
            marginTop={30}
          >
            <Box>
              <Card.Body>
                <Card.Title mb="2">The perfect latte</Card.Title>
                <Card.Description>
                  Caffè latte is a coffee beverage of Italian origin made with
                  espresso and steamed milk.
                </Card.Description>
                <HStack mt="4">
                  <Badge>Hot</Badge>
                  <Badge>Caffeine</Badge>
                </HStack>
              </Card.Body>
              <Card.Footer>
                <Button colorPalette={"teal"} variant={"solid"}>
                  Explore
                </Button>
              </Card.Footer>
            </Box>
          </Card.Root>
        </Grid>
      </Container>
    </>
  );
};

export default Project;
