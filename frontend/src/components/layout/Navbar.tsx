import { Box, Button, Flex, Link } from "@chakra-ui/react";
import { useLocation, Link as RouterLink } from "react-router-dom";
import { ColorModeButton } from "../ui/color-mode";

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/project", label: "Project" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <Box
      as="nav"
      py={4}
      px={{ base: "20px", lg: "50px", md: "100px", xl: "350px" }}
      position={"fixed"}
      zIndex={100}
      top={0}
      width={"100%"}
    >
      <Flex
        justifyContent={"space-between"}
        gap={8}
        p={4}
        bg={{
          base: "rgba(0, 0, 0, 0.1)",
          _dark: "rgba(255, 255, 255, 0.1)",
        }}
        backdropFilter="blur(10px)"
        borderRadius="10px"
        border="1px solid rgba(255, 255, 255, 0.2)"
      >
        <Link as={RouterLink} to={"/"} fontSize={24} fontWeight={"bold"}>
          Sabit Hazari
        </Link>

        <Flex gap={6}>
          {navItems.map((items) => (
            <Link key={items.path} as={RouterLink} to={items.path}>
              {items.label}
            </Link>
          ))}
          <Button as={RouterLink} to={"/login"}>
            Login
          </Button>
          <ColorModeButton />
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
