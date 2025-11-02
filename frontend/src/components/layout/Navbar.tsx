import { Box, Button, Flex, Link } from "@chakra-ui/react";
import { useLocation, Link as RouterLink } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/project", label: "Project" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <Box as="nav" bg="black" py={4} px={20}>
      <Flex
        bgGradient="linear(to-br, blue.400, purple.500, pink.500)"
        justifyContent={"space-between"}
        gap={8}
        bg="rgba(255, 255, 255, 0.1)"
        backdropFilter="blur(10px)"
        border="1px solid rgba(255, 255, 255, 0.2)"
        borderRadius="2xl"
        p={5}
        boxShadow="0 8px 32px rgba(0, 0, 0, 0.1)"
      >
        <Link fontSize={24} fontWeight={"bold"}>
          Sabit Hazari
        </Link>

        <Flex gap={6}>
          {navItems.map((items) => (
            <Link
              key={items.path}
              as={RouterLink}
              to={items.path}
              borderStyle={"none"}
              fontWeight={location.pathname === items.path ? "bold" : "normal"}
              color={location.pathname === items.path ? "white" : "gray.600"}
            >
              {items.label}
            </Link>
          ))}
          <Button as={RouterLink} to={"/login"}>
            Login
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
