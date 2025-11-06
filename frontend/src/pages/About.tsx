import { GradientHeading } from "@/Chakra/ui/CustomComponents";
import { Box, Button, Container, Flex, Heading, Text } from "@chakra-ui/react";
import { FaRegCheckCircle } from "react-icons/fa";

const About = () => {
  const charges = [
    "UI/Ux desing",
    "Branding",
    "Portfolio Management",
    "Full end to end dev",
    "Figma desing",
    "More than 5 revisions",
  ];

  const premiumCharges = [
    "UI/Ux desing",
    "Branding",
    "Portfolio Management",
    "Full end to end dev",
    "Figma desing",
    "More than 5 revisions",
    "React js",
    "Node and express.js",
    "Typescirpt",
    "jacaScript",
  ];
  return (
    <>
      <Container paddingTop={"150px"}>
        <GradientHeading>My Path and Services</GradientHeading>
        <Heading fontSize={"24px"} fontWeight={"bolder"} mb={4} mt={20}>
          Portfolio Management
        </Heading>
        <Text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam
          provident, nulla recusandae saepe quisquam nesciunt aut rem quae
          doloremque ea adipisci, accusantium nobis natus, voluptates iusto sed
          est ipsa enim!
        </Text>
        <Heading fontSize={"24px"} fontWeight={"bolder"} mb={4}>
          Portfolio Management
        </Heading>
        <Text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam
          provident, nulla recusandae saepe quisquam nesciunt aut rem quae
          doloremque ea adipisci, accusantium nobis natus, voluptates iusto sed
          est ipsa enim!
        </Text>
        <Heading fontSize={"24px"} fontWeight={"bolder"} mb={4}>
          Portfolio Management
        </Heading>
        <Text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam
          provident, nulla recusandae saepe quisquam nesciunt aut rem quae
          doloremque ea adipisci, accusantium nobis natus, voluptates iusto sed
          est ipsa enim!
        </Text>
      </Container>

      <Heading textAlign={"center"} fontSize={"45px"} margin={50}>
        Pricing
      </Heading>
      <Container display={"flex"} justifyContent={"center"} gap={6}>
        <Box
          bg={{ base: "gray.100", _dark: "gray.900" }}
          padding={"20px"}
          rounded={"10px"}
          border={"1px solid #333"}
          width={"100%"}
          transition="all 0.2s ease-in-out"
          _hover={{
            transform: "scale(1.02)",
            borderColor: "teal.400",
            boxShadow: "0 0 20px rgba(56, 178, 172, 0.3)",
          }}
        >
          <Text
            fontWeight={"bolder"}
            fontSize={"35px"}
            textAlign={"center"}
            marginBottom={"30px"}
          >
            800/mo
          </Text>
          <Flex
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"start"}
            gap={4}
          >
            {charges.map((charge) => (
              <Flex
                key={charge}
                justifyContent={"center"}
                alignItems={"center"}
                gap={3}
              >
                <FaRegCheckCircle />
                <Text>{charge}</Text>
              </Flex>
            ))}
          </Flex>
          <Button marginTop={10} width="100%">
            Contact
          </Button>
        </Box>
        <Box
          bg={"teal"}
          padding={"20px"}
          rounded={"10px"}
          border={"1px solid #333"}
          width={"100%"}
          transition="all 0.1s ease-in-out"
          _hover={{
            transform: "scale(1.02)",
            borderColor: "cyan-800",
            boxShadow: "0 0 20px rgba(56, 178, 172, 0.3)",
          }}
        >
          <Text
            fontWeight={"bolder"}
            fontSize={"35px"}
            textAlign={"center"}
            marginBottom={"30px"}
          >
            1200/mo
          </Text>
          <Flex
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"start"}
            gap={4}
          >
            {charges.map((charge) => (
              <Flex
                key={charge}
                justifyContent={"center"}
                alignItems={"center"}
                gap={3}
              >
                <FaRegCheckCircle />
                <Text>{charge}</Text>
              </Flex>
            ))}
          </Flex>
          <Button marginTop={10} width="100%">
            Contact
          </Button>
        </Box>
        <Box
          bg={{ base: "gray.100", _dark: "gray.900" }}
          padding={"20px"}
          rounded={"10px"}
          border={"1px solid #333"}
          width={"100%"}
          transition="all 0.2s ease-in-out"
          _hover={{
            transform: "scale(1.02)",
            borderColor: "teal.400",
            boxShadow: "0 0 20px rgba(56, 178, 172, 0.3)",
          }}
        >
          <Text
            fontWeight={"bolder"}
            fontSize={"35px"}
            textAlign={"center"}
            marginBottom={"30px"}
          >
            3300/mo
          </Text>
          <Flex
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"start"}
            gap={4}
          >
            {charges.map((charge) => (
              <Flex
                key={charge}
                justifyContent={"center"}
                alignItems={"center"}
                gap={3}
              >
                <FaRegCheckCircle />
                <Text>{charge}</Text>
              </Flex>
            ))}
          </Flex>
          <Button marginTop={10} width="100%">
            Contact
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default About;
