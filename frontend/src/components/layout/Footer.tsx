import { Box, Flex, Heading, Link, Text } from "@chakra-ui/react";
import { FaDiscord, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Link as RouterLink } from "react-router-dom";

const Footer = () => {
  const linkItems = [
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
    { path: "/pricing", label: "Pricing" },
    { path: "/services", label: "Services" },
  ];
  return (
    <Box p={"20"}>
      <Flex gap={10} justifyContent={"center"} alignItems={"center"}>
        <div>
          <Heading
            size={"4xl"}
            gradientFrom={"whiteAlpha.300"}
            gradientTo={"blue.400"}
          >
            Sabit Hazari
          </Heading>
          <Text
            color={"gray.600"}
            fontSize={"md"}
            lineHeight={"1.6"}
            width={{ base: "100%", md: "60%" }}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit
            molestiae provident harum inventore iste ipsum autem minus quod
            facilis tempore?
          </Text>
        </div>
        <Flex gap={8} justifyContent={"space-between"} alignItems={"center"}>
          <Flex gap={4} flexDirection={"column"}>
            {linkItems.map((item) => (
              <Link
                key={item.path}
                as={RouterLink}
                to={item.path}
                fontSize={"18px"}
                fontWeight={"bold"}
              >
                {item.label}
              </Link>
            ))}
          </Flex>
          <Flex gap={4} flexDirection={"column"}>
            {linkItems.map((item) => (
              <Link
                key={item.path}
                as={RouterLink}
                to={item.path}
                fontSize={"18px"}
                fontWeight={"bold"}
              >
                {item.label}
              </Link>
            ))}
          </Flex>
          <Flex gap={4} flexDirection={"column"}>
            {linkItems.map((item) => (
              <Link
                key={item.path}
                as={RouterLink}
                to={item.path}
                fontSize={"18px"}
                fontWeight={"bold"}
              >
                {item.label}
              </Link>
            ))}
          </Flex>
        </Flex>
      </Flex>
      <Flex justifyContent={"space-between"} marginTop={7}>
        <Flex gap={2}>
          <FaInstagram size={20} cursor={"pointer"} />
          <FaLinkedin size={20} cursor={"pointer"} />
          <FaDiscord size={20} cursor={"pointer"} />
          <FaTwitter size={20} cursor={"pointer"} />
        </Flex>
        <p>&copy; 2025 Copy Right Reserved by Sabit Hazari</p>
      </Flex>
    </Box>
  );
};

export default Footer;
