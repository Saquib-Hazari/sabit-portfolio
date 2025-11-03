import { GradientHeading } from "@/Chakra/ui/CustomComponents";
import { Badge, Container, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const ProjectBlog = () => {
  return (
    <>
      <Container>
        <GradientHeading>Project Title</GradientHeading>
        <Heading>Project Subtitle</Heading>
        <Link to={"/github.com"}>
          <Badge>Github</Badge>
        </Link>
      </Container>
    </>
  );
};

export default ProjectBlog;
