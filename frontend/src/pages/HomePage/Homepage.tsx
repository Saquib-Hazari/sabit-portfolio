import {
  CenteredFlex,
  DescriptionText,
  GradientBox,
  GradientHeading,
} from "@/Chakra/ui/CustomComponents";
import { Button, Flex, Image, Text } from "@chakra-ui/react";
import Experience from "./Experience";
import Project from "../Project";
import FAQ from "./FAQ";
import Nick from "@/assets/sabit.jpg";

const Homepage = () => {
  return (
    <>
      <GradientBox>
        <CenteredFlex>
          <Image
            src={Nick}
            width={"100px"}
            height={"100px"}
            rounded={"full"}
            border={"1px solid white"}
          />
          <GradientHeading>Principaled Finanacial Leadership</GradientHeading>
          <Text textAlign={"center"} paddingX={35}>
            Detailed analysis with strategic vision to turn complex financial
            data into clear growth opportunities. My approach is built on
            technical skill and a strong ethical foundation to deliver solid,
            lasting results
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
