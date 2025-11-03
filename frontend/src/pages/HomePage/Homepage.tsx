import {
  CenteredFlex,
  DescriptionText,
  GradientBox,
  GradientHeading,
} from "@/Chakra/ui/CustomComponents";
import { Button, Flex } from "@chakra-ui/react";
import Experience from "./Experience";
import Project from "../Project";
import FAQ from "./FAQ";

const Homepage = () => {
  return (
    <>
      <GradientBox>
        <CenteredFlex>
          <GradientHeading>Principaled Finanacial Leadership</GradientHeading>
          <DescriptionText>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Est ab
            eveniet aut nostrum, vero ratione repellendus vel mollitia, ullam
            quod dolor velit iure reprehenderit sint sit, quo porro nulla! In.
          </DescriptionText>
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
