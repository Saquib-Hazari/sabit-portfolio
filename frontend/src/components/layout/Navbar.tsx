import { Box, Button, Flex, Link, useTagsInput } from "@chakra-ui/react";
import { useLocation, Link as RouterLink } from "react-router-dom";
import { ColorModeButton } from "../ui/color-mode";
import { useAuth } from "@/context/authContext";
import { toast } from "react-toastify";
import { useEffect } from "react";

const Navbar = () => {
  const location = useLocation();
  const { isAuthenticated, user, logout, login } = useAuth();

  const isAdmin = user?.role === "admin";

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/project", label: "Project" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
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

          {isAuthenticated && isAdmin && (
            <Text>
              <Link as={RouterLink} to={"/add-project"}>
                Add Project
              </Link>
            </Text>
          )}

          {/* Show user email and lout if authenticated, else show login */}
          {isAuthenticated ? (
            <Button
              colorPalette={"teal"}
              variant={"outline"}
              onClick={handleLogout}
            >
              Logout
            </Button>
          ) : (
            <>
              <Button colorPalette={"teal"} as={RouterLink} to={"/login"}>
                Login
              </Button>

              <Button
                colorPalette={"teal"}
                variant={"outline"}
                as={RouterLink}
                to={"/signup"}
              >
                SignUp
              </Button>
            </>
          )}
          <ColorModeButton />
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
