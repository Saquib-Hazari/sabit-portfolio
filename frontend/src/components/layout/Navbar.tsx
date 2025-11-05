import { Box, Button, Flex, Link, Text } from "@chakra-ui/react";
import { useLocation, Link as RouterLink } from "react-router-dom";
import { ColorModeButton } from "../ui/color-mode";
import { useAuth } from "@/context/authContext";
import { toast } from "react-toastify";

const Navbar = () => {
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();

  const isAdmin = user?.role === "admin";

  const navItems = [
    { path: "/", label: "Welcome" },
    { path: "/project", label: "Creations" },
    { path: "/about", label: "Services" },
    { path: "/contact", label: "Let's talk" },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged Out Successfully!");
    } catch (error) {
      toast.error("Logout Failed!");
    }
  };

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
        alignItems="center"
      >
        <Link as={RouterLink} to={"/"} fontSize={24} fontWeight={"bold"}>
          Sabit Hazari
        </Link>

        <Flex gap={6} alignItems="center">
          {/* Regular nav items */}
          {navItems.map((items) => (
            <Link key={items.path} as={RouterLink} to={items.path}>
              {items.label}
            </Link>
          ))}

          {/* Show logout if authenticated, else show login/signup */}
          {isAuthenticated ? (
            <Flex gap={4} alignItems="center">
              <Button
                colorPalette="teal"
                rounded={"100px"}
                fontWeight={"bolder"}
                fontSize="sm"
              >
                {user?.name.slice(0, 1).toUpperCase()}
              </Button>
              <Button
                colorPalette="teal"
                variant="outline"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </Flex>
          ) : (
            <Flex gap={2}>
              <Button colorPalette="teal" as={RouterLink} to={"/login"}>
                Login
              </Button>
              <Button
                colorPalette="teal"
                variant="outline"
                as={RouterLink}
                to={"/signup"}
              >
                SignUp
              </Button>
            </Flex>
          )}

          <ColorModeButton />
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
