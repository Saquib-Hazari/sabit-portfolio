import { GradientHeading } from "@/Chakra/ui/CustomComponents";
import { Box, Container, Flex, Image, Text } from "@chakra-ui/react";
import { useState } from "react";
import { IoIosArrowDropdown, IoIosArrowDropup } from "react-icons/io";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqData = [
    {
      question: "What is your return policy?",
      answer:
        "We offer a 30-day return policy for all unused items in original packaging.",
    },
    {
      question: "How long does shipping take?",
      answer:
        "Standard shipping takes 3-5 business days. Express shipping is 1-2 business days.",
    },
    {
      question: "Do you offer international shipping?",
      answer:
        "Yes, we ship to over 50 countries worldwide. Shipping costs vary by location.",
    },
    {
      question: "How can I track my order?",
      answer:
        "You'll receive a tracking number via email once your order ships.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Container paddingTop={40}>
      <GradientHeading>Frequently Asked Questions</GradientHeading>
      <Text textAlign={"center"}>
        Some of the common Queries people may ask.
      </Text>
      <Text fontSize={"18px"} fontWeight={"bold"} mt="20px">
        Common Questions
      </Text>

      <Flex gap={10} direction={{ base: "column", lg: "row" }} align="start">
        {/* FAQ Section */}
        <Box flex={1} marginTop={30} width={"100%"}>
          {faqData.map((faq, index) => (
            <Box
              key={index}
              mb={4}
              border={{ base: "1px solid", _dark: "1px solid black" }}
              borderColor="gray.200"
              borderRadius="lg"
              overflow="hidden"
              transition="all 0.3s ease"
            >
              {/* Question Button */}
              <Box
                as="button"
                onClick={() => toggleFAQ(index)}
                width="100%"
                textAlign="left"
                p={4}
                bg={{ base: "gray.100", _dark: "gray.800" }}
                _hover={{
                  bg: "gray.400",
                  _dark: {
                    bg: "gray.700",
                  },
                }}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                transition="all 0.2s ease"
              >
                <Text fontWeight="semibold" fontSize="lg">
                  {faq.question}
                </Text>
                {openIndex === index ? (
                  <IoIosArrowDropup size={20} />
                ) : (
                  <IoIosArrowDropdown size={20} />
                )}
              </Box>

              {/* Answer Panel */}
              {openIndex === index && (
                <Box
                  p={4}
                  bg={{ _dark: "gray.900" }}
                  borderTop="1px solid"
                  borderColor="gray.900"
                  animation="fadeIn 0.3s ease"
                >
                  <Text
                    color={{ base: "gray.600", _dark: "gray.300" }}
                    lineHeight="1.7"
                  >
                    {faq.answer}
                  </Text>
                </Box>
              )}
            </Box>
          ))}
        </Box>
      </Flex>
    </Container>
  );
};

export default FAQ;
