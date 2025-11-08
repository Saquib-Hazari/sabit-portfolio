import { Box, Flex, Heading, Link, Text } from "@chakra-ui/react";
import { FaDiscord, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Link as RouterLink } from "react-router-dom";

const Footer = () => {
  const linkItems = [
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
    { path: `/about#${"pricing"}`, label: "Pricing" },
    { path: `/about#${"section.id"}`, label: "Services" },
  ];
  const linkItems2 = [
    { path: `/#${"faq"}`, label: "FAQ's" },
    { path: "/project", label: "Projects" },
    { path: "/contact", label: "Social" },
    { path: `/#${"experiences"}`, label: "Experiences" },
  ];

  return (
    <Box as="footer" paddingTop={40} bottom={0}>
      <Flex
        gap={10}
        justifyContent={"center"}
        alignItems={"center"}
        flexDirection={{ base: "column", md: "row" }}
        paddingX={20}
      >
        <div>
          <Heading
            size={"4xl"}
            gradientFrom={"whiteAlpha.300"}
            gradientTo={"blue.400"}
            textAlign={{ base: "center", md: "start" }}
          >
            Sabit Hazari
          </Heading>
          {/* ✅ Fixed: Text and Flex are separate siblings */}
          <Text
            color={"gray.600"}
            fontSize={"sm"}
            lineHeight={"1.6"}
            width={{ base: "100%", md: "60%" }}
            textAlign={{ base: "center", md: "start" }}
          >
            Interested in my services or have a project in mind? Use the contact
            form below or connect with me on social media to discuss portfolio
            management, investments, or financial consulting.
          </Text>
          {/* ✅ Moved Flex outside of Text */}
          <Flex
            mt={4}
            gap={2}
            justifyContent={{ base: "center", md: "start" }}
            alignItems={"start"}
          >
            <FaInstagram size={30} cursor={"pointer"} to={"/"} />
            <FaLinkedin size={30} cursor={"pointer"} />
            <FaDiscord size={30} cursor={"pointer"} />
            <FaTwitter size={30} cursor={"pointer"} />
          </Flex>
        </div>
        <Flex gap={8} justifyContent={"space-between"} alignItems={"center"}>
          <Flex gap={4} flexDirection={"column"}>
            {linkItems.map((item) => (
              <Link
                key={item.path}
                as={RouterLink}
                to={item.path}
                fontSize={"sm"}
                fontWeight={"bold"}
              >
                {item.label}
              </Link>
            ))}
          </Flex>
          <Flex gap={4} flexDirection={"column"}>
            {linkItems2.map((item) => (
              <Link
                key={item.path}
                as={RouterLink}
                to={item.path}
                fontSize={"sm"}
                fontWeight={"bold"}
              >
                {item.label}
              </Link>
            ))}
          </Flex>
        </Flex>
      </Flex>
      <Flex
        justifyContent={"space-around"}
        alignItems={"center"}
        gap={10}
        margin={10}
        flexWrap={"wrap"}
        flexDirection={{ base: "column", md: "row" }}
      >
        <Text fontSize={"16px"} textAlign={{ base: "center" }}>
          &copy; 2025 Copy Right Reserved by Sabit Hazari
        </Text>
      </Flex>
    </Box>
  );
};

export default Footer;
