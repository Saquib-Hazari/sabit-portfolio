import { GradientHeading } from "@/Chakra/ui/CustomComponents";
import { Box, Container, Flex, Image, Text } from "@chakra-ui/react";
import { useState } from "react";
import { IoIosArrowDropdown, IoIosArrowDropup } from "react-icons/io";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqData = [
    {
      question: "Why choose a CFA for branding services?",
      answer:
        "I speak your language and understand financial compliance, ensuring your brand builds trust while showcasing expertise.",
    },
    {
      question: "What's included in your branding package?",
      answer:
        "Strategic positioning, visual identity guidance, content framework, and implementation roadmap—all tailored for financial professionals.",
    },
    {
      question: "How long does the branding process take?",
      answer:
        "Typically 4-6 weeks, depending on complexity and your availability for collaboration.",
    },
    {
      question: "Do you work with financial firms or individual professionals?",
      answer:
        "Both! I serve individual financial advisors, wealth managers, and institutional firms seeking to enhance their market positioning.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Container paddingTop={40} id="faq">
      <GradientHeading>Frequently Asked Questions</GradientHeading>
      <Text textAlign={"center"} color={"gray.400"} mt={3}>
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
