import { GradientBox, GradientHeading } from "@/Chakra/ui/CustomComponents";
import {
  Box,
  Container,
  FieldLabel,
  Flex,
  Heading,
  Image,
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
import { Link, Links } from "react-router-dom";
import Logo from "@/assets/phone.svg";

const Login = () => {
  return (
    <>
      <Box paddingTop={"100px"} margin={"40px"}>
        <GradientHeading>Connect with me</GradientHeading>

        <Flex justifyContent={"center"} alignItems={"center"} marginTop={10}>
          <Fieldset.Root
            size="lg"
            width="100%"
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
              <Field.Root>
                <Field.Label>Email Address</Field.Label>
                <Input name="name" border={"1px solid gray"} />
              </Field.Root>

              <Field.Root>
                <Field.Label>Password</Field.Label>
                <Input name="email" type="email" border={"1px solid gray"} />
              </Field.Root>
            </Fieldset.Content>

            <Field.Root>
              <Field.Label>Country</Field.Label>
              <NativeSelect.Root>
                <NativeSelect.Field name="country" border={"1px solid gray"}>
                  <For
                    each={[
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
                    ]}
                  >
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
              <FieldLabel>Comments</FieldLabel>
              <Textarea placeholder="Comment..." border={"1px solid gray"} />
            </Field.Root>

            <Button width="100%" type="submit" alignSelf="flex-start">
              Submit
            </Button>
          </Fieldset.Root>
        </Flex>
        <Text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi
          consequuntur eum molestias in nemo ex nobis earum vero voluptatibus,
          dolorum autem repellat iste amet nesciunt! Iure dolores sequi fugit
          voluptas.
        </Text>
        <Heading fontSize={"35px"} marginTop={20} textAlign={"center"}>
          You can connect through socials
        </Heading>
        <Text textAlign={"center"}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia,
          blanditiis.
        </Text>
        <Flex justifyContent={"space-between"} alignItems={"center"} gap={40}>
          <Container display="flex" flexDirection={"column"}>
            <Link to={"http://www.google.com"}>
              <Button width="100%" mb={4}>
                Twitter
              </Button>
            </Link>
            <Button colorPalette={"blue"} mb={4}>
              Linkedin
            </Button>
            <Button colorPalette={"red"}>Facebook</Button>
          </Container>
          <Image src={Logo} height={"30%"} width={"40%"} objectFit={"cover"} />
        </Flex>
      </Box>
    </>
  );
};

export default Login;
