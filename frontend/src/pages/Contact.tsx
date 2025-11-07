import { GradientHeading } from "@/Chakra/ui/CustomComponents";
import {
  Box,
  Container,
  FieldLabel,
  Flex,
  Heading,
  Icon,
  Text,
  Textarea,
} from "@chakra-ui/react";
import {
  Button,
  Field,
  Fieldset,
  For,
  Input,
  NativeSelect,
  Stack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaTwitter, FaDiscord, FaLinkedin } from "react-icons/fa";

const Login = () => {
  const formFields = [
    { label: "Your Email", type: "email", name: "email", component: "input" },
    {
      label: "Your Password",
      type: "password",
      name: "password",
      component: "input",
    },
    {
      label: "Your Country",
      type: "text",
      name: "country",
      component: "select",
    },
  ];

  const country = [
    "United Kingdom",
    "Canada",
    "United States",
    "Asia",
    "Europe",
    "China",
    "Japan",
    "Russia",
    "Ice Land",
    "Green Land",
    "Australia",
    "Turkey",
    "Dubai",
  ];

  const links = [
    { to: "http://www.google.com", name: "Twitter", icon: FaTwitter },
    { to: "http://www.google.com", name: "Discord", icon: FaDiscord },
    { to: "http://www.google.com", name: "Linkedin", icon: FaLinkedin },
  ];

  return (
    <>
      <Box paddingTop={"150px"}>
        <GradientHeading>Connect with me</GradientHeading>

        <Flex justifyContent={"center"} alignItems={"center"} marginTop={10}>
          <Fieldset.Root
            size="lg"
            width={{ base: "100%", md: "50%" }}
            padding="20px"
            borderRadius="10px"
          >
            <Stack>
              <Fieldset.Legend fontSize={24}>Contact details</Fieldset.Legend>
              <Fieldset.HelperText>
                Please provide your contact details we'll reach out to you.
              </Fieldset.HelperText>
            </Stack>

            <Fieldset.Content>
              {formFields.map((field, index) => (
                <Field.Root key={index} marginBottom={3}>
                  <Field.Label
                    fontSize={"18px"}
                    fontWeight={"bolder"}
                    color={"gray.400"}
                    mb={2}
                  >
                    {field.name.toUpperCase()}
                  </Field.Label>
                  <Input
                    name={field.name}
                    border={"1px solid black"}
                    placeholder={field.label}
                    fontSize={"18px"}
                    padding="30px 25px"
                    bg={"gray.900"}
                  />
                </Field.Root>
              ))}
            </Fieldset.Content>

            <Field.Root>
              <Field.Label
                fontSize={"18px"}
                fontWeight={"bolder"}
                color={"gray.400"}
                mb={2}
              >
                COUNTRY
              </Field.Label>
              <NativeSelect.Root
                border={"1px solid black"}
                padding="10px 15px"
                bg={"gray.900"}
                borderRadius={"10px"}
                color={"gray.400"}
              >
                <NativeSelect.Field
                  name="country"
                  border={"none"}
                  fontSize={"18px"}
                >
                  <For each={country}>
                    {(item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    )}
                  </For>
                </NativeSelect.Field>
                <NativeSelect.Indicator />
              </NativeSelect.Root>
            </Field.Root>

            <Field.Root>
              <FieldLabel
                fontSize={"18px"}
                fontWeight={"bolder"}
                color={"gray.400"}
                mb={2}
              >
                COMMENTS
              </FieldLabel>
              <Textarea
                placeholder="Comment..."
                border={"1px solid black"}
                fontSize={"18px"}
                padding="30px 25px"
                borderRadius={"10px"}
                bg={"gray.900"}
              />
            </Field.Root>
            <Text
              marginTop={"10px"}
              textAlign={"center"}
              fontSize={"18px"}
              color={"gray.600"}
            >
              We‘re all ears! Let us know how we can make your experience even
              better.
            </Text>

            <Button
              type="submit"
              padding="25px 45px"
              colorPalette={"gray"}
              variant={"surface"}
              alignSelf="center"
              fontSize={"18px"}
            >
              Submit
            </Button>
          </Fieldset.Root>
        </Flex>
        <Heading fontSize={"35px"} marginTop={20} textAlign={"center"}>
          You can connect through socials
        </Heading>
        <Text textAlign={"center"} mt={3} fontSize="18px" color={"gray.600"}>
          Connect using Social Media.
        </Text>
        <Flex
          justifyContent={"space-between"}
          alignItems={"center"}
          marginTop={10}
        >
          <Container
            display="flex"
            flexDirection={"column"}
            width={{ base: "70%", md: "30%" }}
          >
            {links.map((item) => (
              <Link to={item.to}>
                <Button
                  colorPalette={"gray"}
                  variant={"surface"}
                  padding="25px 45px"
                  width="100%"
                  fontSize={"18px"}
                  mb={4}
                  gap={3}
                >
                  {item.name}
                  <Icon as={item.icon} />
                </Button>
              </Link>
            ))}
          </Container>
        </Flex>
      </Box>
    </>
  );
};

export default Login;
