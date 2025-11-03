import { GradientHeading } from "@/Chakra/ui/CustomComponents";
import { Container } from "@chakra-ui/react";
import React from "react";

const About = () => {
  return (
    <>
      <Container paddingTop={"150px"}>
        <GradientHeading>About Me</GradientHeading>
      </Container>
    </>
  );
};

export default About;
