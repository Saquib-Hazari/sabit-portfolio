import {
  Box,
  Button,
  Drawer,
  Flex,
  Icon,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useLocation, Link as RouterLink } from "react-router-dom";
import { ColorModeButton } from "../ui/color-mode";
import { useAuth } from "@/context/authContext";
import { toast } from "react-toastify";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();
  const [isDrawOpen, setIsDrawOpen] = useState(false);

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
      setIsDrawOpen(false);
    } catch (error) {
      toast.error("Logout Failed!");
    }
  };

  const toggleDrawer = () => {
    setIsDrawOpen(!isDrawOpen);
  };

  const name = "Sabit";

  return (
    <Box
      as="nav"
      py={4}
      px={{ base: "20px", lg: "50px", md: "20px", xl: "350px" }}
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
          {name.toUpperCase()}
        </Link>

        {/* Desktop Menu */}
        <Flex
          gap={4}
          alignItems="center"
          display={{ base: "none", md: "flex" }}
        >
          {navItems.map((items) => (
            <Link key={items.path} as={RouterLink} to={items.path}>
              {items.label}
            </Link>
          ))}

          {isAuthenticated ? (
            <Flex gap={6} alignItems="center">
              <Button
                colorPalette="teal"
                rounded={"100px"}
                fontWeight={"bolder"}
                fontSize="sm"
              >
                {user?.name.slice(0, 1).toUpperCase()}
              </Button>
              <Button onClick={handleLogout}>Logout</Button>
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

        <Icon
          as={isDrawOpen ? FaTimes : FaBars}
          display={{ base: "flex", md: "none" }}
          aria-label="Open menu"
          onClick={toggleDrawer}
          color="teal.500"
          zIndex={150}
          position="relative"
          boxSize="30px"
          cursor="pointer"
        />
      </Flex>

      <Drawer.Root
        open={isDrawOpen}
        onOpenChange={(e) => setIsDrawOpen(e.open)}
        placement="top"
        size="full"
      >
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content bg="bg.panel" height="100vh" zIndex={140}>
            <Drawer.Header paddingTop={"40px"}>
              <Text fontSize="xl" fontWeight="bold">
                Sabit Hazari
              </Text>

              <Drawer.CloseTrigger right={"30px"} top={"30px"}>
                <Icon
                  as={isDrawOpen ? FaTimes : FaBars}
                  display={{ base: "flex", md: "none" }}
                  aria-label="Open menu"
                  onClick={toggleDrawer}
                  color="teal.500"
                  zIndex={150}
                  position="relative"
                  boxSize="30px"
                  cursor="pointer"
                />
              </Drawer.CloseTrigger>
            </Drawer.Header>
            <Drawer.Body>
              <VStack align="stretch" mt={8}>
                {navItems.map((items) => (
                  <Link
                    key={items.path}
                    as={RouterLink}
                    to={items.path}
                    onClick={() => setIsDrawOpen(false)}
                    fontSize="xl"
                    py={3}
                    borderBottom="1px solid"
                    borderColor="gray.200"
                    _dark={{ borderColor: "gray.600" }}
                  >
                    {items.label}
                  </Link>
                ))}

                {isAuthenticated ? (
                  <>
                    <Text py={3} fontSize="lg" fontWeight="bold">
                      Welcome, {user?.name}
                    </Text>
                    <Button
                      colorPalette="teal"
                      variant="outline"
                      onClick={handleLogout}
                      size="lg"
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <VStack spacing={3} mt={4}>
                    <Button
                      colorPalette="teal"
                      as={RouterLink}
                      to={"/login"}
                      onClick={() => setIsDrawOpen(false)}
                      size="lg"
                      width="100%"
                    >
                      Login
                    </Button>
                    <Button
                      colorPalette="teal"
                      variant="outline"
                      as={RouterLink}
                      to={"/signup"}
                      onClick={() => setIsDrawOpen(false)}
                      size="lg"
                      width="100%"
                    >
                      SignUp
                    </Button>
                  </VStack>
                )}

                <Flex justifyContent="center" mt={8}>
                  <ColorModeButton />
                </Flex>
              </VStack>
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Positioner>
      </Drawer.Root>
    </Box>
  );
};

export default Navbar;
