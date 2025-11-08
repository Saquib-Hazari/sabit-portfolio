import {
  CenteredFlex,
  DescriptionText,
  GradientBox,
  GradientHeading,
} from "@/Chakra/ui/CustomComponents";
import { Box, Button, Flex, Image, Span, Text } from "@chakra-ui/react";
import Experience from "./Experience";
import Project from "../Project";
import FAQ from "./FAQ";
import Nick from "@/assets/sabit.jpg";

const Homepage = () => {
  return (
    <>
      <GradientBox>
        <CenteredFlex>
          <Box
            p={2}
            bg="linear-gradient(90deg, teal, black)"
            borderRadius="full"
            boxShadow="lg"
            blur={"10px"}
          >
            <Image
              src={Nick}
              width={"100px"}
              height={"100px"}
              rounded={"full"}
              border={"2px solid white"}
              boxShadow="inner"
            />
          </Box>
          <GradientHeading>Principaled Finanacial Leadership</GradientHeading>
          <Text
            textAlign={"center"}
            width={{ base: "100%", xl: "50%", lg: "70%" }}
            fontSize={{ base: "12px", md: "xl" }}
            marginTop={2}
            color={"gray.400"}
          >
            <Span fontWeight={"bolder"}>
              Hi, I'm Sabit: CFA Level 1 Passed{" "}
            </Span>
            <br />I transform complex financial data into strategic growth
            opportunities through detailed analysis and forward-thinking vision.
            My approach combines technical skills with strong ethical
            foundations to deliver sustainable results that create lasting
            value.
          </Text>
          <Flex gap={2} marginTop={"30px"}>
            <Button colorPalette={"teal"}>My Project</Button>
            <Button colorPalette={"teal"} variant={"outline"}>
              Services
            </Button>
          </Flex>
        </CenteredFlex>
      </GradientBox>
      <Experience />
      <Project />
      <FAQ />
    </>
  );
};

export default Homepage;
