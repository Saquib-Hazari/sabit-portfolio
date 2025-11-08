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
import { useState } from "react";
import { toast } from "react-toastify";

const Contact = () => {
  const [formData, setFormData] = useState({
    email: "",
    category: "",
    country: "",
    comment: "",
  });

  const [loading, setLoading] = useState(false);

  const formFields = [
    { label: "Your Email", type: "email", name: "email", component: "input" },
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

  const category = ["Branding", "Portfolio Management", "CFA services"];

  const links = [
    { to: "http://www.google.com", name: "Twitter", icon: FaTwitter },
    { to: "http://www.google.com", name: "Discord", icon: FaDiscord },
    { to: "http://www.google.com", name: "Linkedin", icon: FaLinkedin },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.comment) {
      toast.error("Please fill the required fields.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "https://formsubmit.co/ajax/saquibhazari1000@gmail.com",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: "Portfolio Contact",
            email: formData.email,
            category: formData.category || "Not specified",
            country: formData.country || "Not specified",
            message: formData.comment,
            _subject: `New Contact from ${formData.email}`,
            _template: "basic",
            _captcha: "false",
          }),
        }
      );

      const result = await response.json();

      if (response.ok && result.success === "true") {
        toast.success("Message sent successfully! I'll get back to you soon.");
        setFormData({
          email: "",
          category: "",
          country: "",
          comment: "",
        });
      } else {
        throw new Error(result.message || "Failed to send message");
      }
    } catch (error: any) {
      console.error("Error sending email:", error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Box paddingTop={"150px"}>
        <GradientHeading>Connect with me</GradientHeading>

        <Flex justifyContent={"center"} alignItems={"center"} marginTop={10}>
          <form
            onSubmit={handleSubmit}
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <Fieldset.Root
              size="lg"
              width={{ base: "100%", md: "50%" }}
              padding="20px"
              borderRadius="10px"
            >
              <Stack>
                <Fieldset.Legend fontSize={24}>Contact details</Fieldset.Legend>
                <Fieldset.HelperText>
                  Please provide your contact details and I'll reach out to you.
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
                      type={field.type}
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder={field.label}
                      fontSize={"18px"}
                      padding="30px 25px"
                      bg={{ base: "gray.200", _dark: "gray.900" }}
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
                  CATEGORY
                </Field.Label>
                <NativeSelect.Root
                  padding="10px 15px"
                  bg={{ base: "gray.200", _dark: "gray.900" }}
                  borderRadius={"10px"}
                  color={"gray.400"}
                >
                  <NativeSelect.Field
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    border={"none"}
                    fontSize={"18px"}
                  >
                    <option value="">Select a category</option>
                    <For each={category}>
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
                <Field.Label
                  fontSize={"18px"}
                  fontWeight={"bolder"}
                  color={"gray.400"}
                  mb={2}
                >
                  COUNTRY
                </Field.Label>
                <NativeSelect.Root
                  padding="10px 15px"
                  bg={{ base: "gray.200", _dark: "gray.900" }}
                  borderRadius={"10px"}
                  color={"gray.400"}
                >
                  <NativeSelect.Field
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    border={"none"}
                    fontSize={"18px"}
                  >
                    <option value="">Select your country</option>
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
                  name="comment"
                  value={formData.comment}
                  onChange={handleInputChange}
                  placeholder="Tell me about your project or how I can help..."
                  fontSize={"18px"}
                  padding="30px 25px"
                  borderRadius={"10px"}
                  bg={{ base: "gray.200", _dark: "gray.900" }}
                  rows={4}
                />
              </Field.Root>
              <Text
                marginTop={"10px"}
                textAlign={"center"}
                fontSize={"18px"}
                color={"gray.600"}
              >
                I'm all ears! Let me know how I can make your experience even
                better.
              </Text>

              <Button
                type="submit"
                padding="25px 45px"
                colorPalette={"teal"}
                variant={"solid"}
                alignSelf="center"
                fontSize={"18px"}
                isLoading={loading}
                loadingText="Sending..."
                width="100%"
                mt={4}
              >
                Send Message
              </Button>
            </Fieldset.Root>
          </form>
        </Flex>

        <Heading fontSize={"35px"} marginTop={20} textAlign={"center"}>
          You can connect through socials
        </Heading>
        <Text textAlign={"center"} mt={3} fontSize="18px" color={"gray.600"}>
          Connect using Social Media.
        </Text>
        <Flex justifyContent={"center"} alignItems={"center"} marginTop={10}>
          <Container
            display="flex"
            flexDirection={"column"}
            width={{ base: "70%", md: "30%" }}
          >
            {links.map((item, index) => (
              <Link
                key={index}
                to={item.to}
                target="_blank"
                rel="noopener noreferrer"
              >
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

export default Contact;
