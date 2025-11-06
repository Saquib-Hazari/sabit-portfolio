import { GradientHeading } from "@/Chakra/ui/CustomComponents";
import {
  Avatar,
  Button,
  Card,
  Container,
  Grid,
  HStack,
  Text,
} from "@chakra-ui/react";

const Experience = () => {
  return (
    <>
      <Container marginTop={40}>
        <GradientHeading>Experience</GradientHeading>
        <Text textAlign={"center"}>My Journey in Finance & Technology</Text>
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
          {/* Card 1 */}
          <Card.Root
            marginTop={"30px"}
            bg={{ base: "gray.100", _dark: "gray.900" }}
          >
            <Card.Body gap="2">
              <Avatar.Root
                size="2xl"
                shape="rounded"
                bg={"cyan.900"}
                border={"2px solid cyan"}
              >
                <Text fontWeight={"bolder"} color={"white"}>
                  120+
                </Text>
              </Avatar.Root>
              <Card.Title mt="2">Nue Camp</Card.Title>
              <Card.Description>
                This is the card body. Lorem ipsum dolor sit amet, consectetur
                adipiscing elit.
              </Card.Description>
            </Card.Body>
            <Card.Footer justifyContent="flex-end">
              <Button colorPalette={"teal"} variant="outline">
                View
              </Button>
            </Card.Footer>
          </Card.Root>

          {/* Card 2 */}
          <Card.Root marginTop={"30px"} bg={"teal"}>
            <Card.Body gap="2">
              <Avatar.Root
                size="2xl"
                shape="rounded"
                bg={"cyan.900"}
                border={"2px solid cyan"}
              >
                <Text fontWeight={"bolder"} color={"white"}>
                  99+
                </Text>
              </Avatar.Root>
              <Card.Title mt="2">Nue Camp</Card.Title>
              <Card.Description color={"black"}>
                This is the card body. Lorem ipsum dolor sit amet, consectetur
                adipiscing elit.
              </Card.Description>
            </Card.Body>
            <Card.Footer justifyContent="flex-end">
              <Button colorPalette={"teal"} variant="outline">
                View
              </Button>
            </Card.Footer>
          </Card.Root>

          {/* Card 3 */}
          <Card.Root
            marginTop={"30px"}
            bg={{ base: "gray.100", _dark: "gray.900" }}
          >
            <Card.Body gap="2">
              <Avatar.Root
                size="2xl"
                shape="rounded"
                bg={"cyan.900"}
                border={"2px solid cyan"}
              >
                <Text fontWeight={"bolder"} color={"white"}>
                  200+
                </Text>
              </Avatar.Root>
              <Card.Title mt="2">Nue Camp</Card.Title>
              <Card.Description>
                This is the card body. Lorem ipsum dolor sit amet, consectetur
                adipiscing elit.
              </Card.Description>
            </Card.Body>
            <Card.Footer justifyContent="flex-end">
              <Button colorPalette={"teal"} variant="outline">
                View
              </Button>
            </Card.Footer>
          </Card.Root>

          {/* Card 4 */}
          <Card.Root
            marginTop={"30px"}
            bg={{ base: "gray.100", _dark: "gray.900" }}
          >
            <Card.Body gap="2">
              <Avatar.Root
                size="2xl"
                shape="rounded"
                bg={"cyan.900"}
                border={"2px solid cyan"}
              >
                <Text fontWeight={"bolder"} color={"white"}>
                  4+
                </Text>
              </Avatar.Root>
              <Card.Title mt="2">Nue Camp</Card.Title>
              <Card.Description>
                This is the card body. Lorem ipsum dolor sit amet, consectetur
                adipiscing elit.
              </Card.Description>
            </Card.Body>
            <Card.Footer justifyContent="flex-end">
              <Button colorPalette={"teal"} variant="outline">
                View
              </Button>
            </Card.Footer>
          </Card.Root>
        </Grid>
      </Container>
    </>
  );
};

export default Experience;
