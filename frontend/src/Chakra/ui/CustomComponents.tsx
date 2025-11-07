// components/CustomComponents.tsx
import { Box, Flex, Heading, Text, Button } from "@chakra-ui/react";

interface Props {
  children: any;
}

export const GradientBox = ({ children, ...props }: Props) => (
  <Box
    height="80vh"
    bg="linear-gradient(180deg, white 40%, #f0f0f0)"
    _dark={{
      bg: "linear-gradient(180deg, black 40%, #181C14)",
    }}
    paddingTop={150}
    {...props}
  >
    {children}
  </Box>
);

export const CenteredFlex = ({ children, ...props }: Props) => (
  <Flex
    flexDirection="column"
    justifyContent="center"
    alignItems="center"
    position="relative"
    top="50%"
    left="50%"
    transform="translate(-50%, -50%)"
    {...props}
  >
    {children}
  </Flex>
);

export const GradientHeading = ({ children, ...props }: Props) => (
  <Heading
    fontSize={{
      base: "28px",
      sm: "45px",
      md: "50px",
      lg: "65px",
      xl: "85px",
    }}
    textAlign="center"
    lineHeight={1.2}
    px={5}
    _dark={{
      bg: "linear-gradient(90deg, white 20%,rgb(84, 99, 70))",
      bgClip: "text",
      color: "transparent",
    }}
    {...props}
  >
    {children}
  </Heading>
);

export const DescriptionText = ({ children, ...props }: Props) => (
  <Text
    px={{ base: "10px", md: "100px", xl: "500px" }}
    textAlign="center"
    marginTop="30px"
    fontSize={{ base: "16px", sm: "18px" }}
    _dark={{ color: "gray.400" }}
    {...props}
  >
    {children}
  </Text>
);
