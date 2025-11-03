import { GradientHeading } from "@/Chakra/ui/CustomComponents";
import {
  Avatar,
  Button,
  Card,
  Container,
  Flex,
  HStack,
  Text,
} from "@chakra-ui/react";

const Experience = () => {
  return (
    <>
      <Container marginTop={40}>
        <GradientHeading>Experience</GradientHeading>
        <HStack fontWeight={"bolder"} fontSize={"18px"}>
          Skills and Experiences
        </HStack>
        <Flex
          justifyContent={"space-between"}
          alignItems={"center"}
          gap={4}
          flexWrap={"wrap"}
          flexDirection={{ base: "column", md: "row" }}
        >
          <Card.Root
            width="320px"
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
                adipiscing elit. Curabitur nec odio vel dui euismod fermentum.
                Curabitur nec odio vel dui euismod fermentum.
              </Card.Description>
            </Card.Body>
            <Card.Footer justifyContent="flex-end">
              <Button colorPalette={"teal"} variant="outline">
                View
              </Button>
            </Card.Footer>
          </Card.Root>
          <Card.Root width="320px" marginTop={"30px"} bg={"teal"}>
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
                adipiscing elit. Curabitur nec odio vel dui euismod fermentum.
                Curabitur nec odio vel dui euismod fermentum.
              </Card.Description>
            </Card.Body>
            <Card.Footer justifyContent="flex-end">
              <Button colorPalette={"teal"} variant="outline">
                View
              </Button>
            </Card.Footer>
          </Card.Root>
          <Card.Root
            width="320px"
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
                adipiscing elit. Curabitur nec odio vel dui euismod fermentum.
                Curabitur nec odio vel dui euismod fermentum.
              </Card.Description>
            </Card.Body>
            <Card.Footer justifyContent="flex-end">
              <Button colorPalette={"teal"} variant="outline">
                View
              </Button>
            </Card.Footer>
          </Card.Root>
          <Card.Root
            width="320px"
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
                adipiscing elit. Curabitur nec odio vel dui euismod fermentum.
                Curabitur nec odio vel dui euismod fermentum.
              </Card.Description>
            </Card.Body>
            <Card.Footer justifyContent="flex-end">
              <Button colorPalette={"teal"} variant="outline">
                View
              </Button>
            </Card.Footer>
          </Card.Root>
        </Flex>
      </Container>
    </>
  );
};

export default Experience;
