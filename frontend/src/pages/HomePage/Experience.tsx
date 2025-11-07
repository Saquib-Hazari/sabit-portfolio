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
  const score = ["12+", "40+", "120+", "200+"];
  const cardTitle = ["CFA level 1", "CA", "Branding", "Logo Designer"];
  const cardDescription = [
    "This is the card body. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "This is the card body. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "This is the card body. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "This is the card body. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  ];

  return (
    <>
      <Container marginTop={40}>
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
          {score.map((item, index) => (
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
                    {item}
                  </Text>
                </Avatar.Root>

                <Card.Title mt="2">{cardTitle[index]}</Card.Title>
                <Card.Description>{cardDescription[index]}</Card.Description>
              </Card.Body>
              <Card.Footer justifyContent="flex-end">
                <Button colorPalette={"teal"} variant="outline">
                  View
                </Button>
              </Card.Footer>
            </Card.Root>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Experience;
