import { GradientHeading } from "@/Chakra/ui/CustomComponents";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Span,
  Text,
} from "@chakra-ui/react";
import { FaRegCheckCircle } from "react-icons/fa";
import FAQ from "./HomePage/FAQ";

const About = () => {
  const basicFeatures = [
    "Portfolio Health Check (One-time analysis)",
    "Basic Investment Strategy Review",
    "Financial Goal Setting Session (30 mins)",
    "Market Outlook Summary Report",
    "Email Support (5 queries/month)",
    "Educational Resources Access",
  ];

  const premiumFeatures = [
    "Everything in Basic, plus:",
    "Monthly Portfolio Rebalancing",
    "Custom Investment Strategy",
    "Quarterly Performance Reviews",
    "Tax Optimization Strategies",
    "Risk Management Framework",
    "Direct WhatsApp Support",
    "Monthly Market Insights Report",
    "Financial Dashboard Access",
  ];

  const enterpriseFeatures = [
    "Everything in Premium, plus:",
    "Dedicated CFA Advisor",
    "Weekly Strategy Sessions",
    "Advanced Tax Planning",
    "Estate Planning Consultation",
    "Business Financial Consulting",
    "Custom Financial Modeling",
    "Priority 24/7 Support",
    "Family Office Services",
    "Exclusive Investment Opportunities",
  ];
  const proPlusFeatures = [
    "Everything in Basic & Premium, plus:",
    "Advanced Portfolio Analytics",
    "Quarterly In-Person Strategy Sessions",
    "24/7 Dedicated Advisor Line",
    "Custom Financial Dashboard",
    "Exclusive Research Reports",
    "CFA Charterholder Direct Access",
  ];

  const keySkills = [
    "Your unique combination of financial expertise + branding skills",
    "Understanding of compliance and regulatory considerations",
    "Data-driven, analytical approach to branding",
    "Focus on building trust and credibility",
    "Experience speaking to financial audiences",
  ];

  return (
    <>
      <Container paddingTop={"150px"}>
        <GradientHeading>My Path and Services</GradientHeading>
        <Heading
          fontSize={{ base: "24px", md: "35px" }}
          fontWeight={"bolder"}
          mb={6}
          mt={20}
        >
          💼 Portfolio Management
        </Heading>
        <Text fontSize={"18px"}>
          As a CFA charterholder, I bring world-class financial expertise to
          clients across the globe. The CFA designation represents the highest
          standard in investment analysis, ethical practice, and financial
          leadership. I provide sophisticated financial solutions that combine
          rigorous analytical frameworks with practical business insights to
          help organizations navigate complex market challenges and capitalize
          on emerging opportunities.
        </Text>
        <Heading
          fontSize={{ base: "24px", md: "35px" }}
          fontWeight={"bolder"}
          mb={6}
          mt={10}
        >
          💻 Strategic Brand Development for Financial Professionals
        </Heading>
        <Text fontSize={"18px"}>
          I provide unique branding solutions specifically designed for
          financial professionals. I understand the regulatory landscape, client
          expectations, and competitive dynamics of the financial industry. My
          services help finance professionals translate complex expertise into
          compelling brand stories that resonate with target audiences while
          maintaining professional integrity and compliance.
        </Text>
        <Heading
          fontSize={{ base: "24px", md: "35px" }}
          fontWeight={"bolder"}
          mb={6}
          mt={10}
        >
          🤝 Building Trust-Based Brands for Financial Excellence
        </Heading>
        <Text fontSize={"18px"}>
          In finance, trust is your most valuable asset. I help financial
          professionals and firms build brands that communicate competence,
          integrity, and results. Using my CFA-trained analytical approach, I
          develop branding strategies that are not just visually appealing but
          strategically sound—creating authentic connections with clients and
          stakeholders while driving business growth.
        </Text>
        <Heading fontSize={"35px"} fontWeight={"bolder"} mb={6} mt={10}>
          Key Skills:
        </Heading>
        <Text marginLeft={4} fontSize={"18px"}>
          {keySkills.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </Text>
      </Container>

      <GradientHeading m={20}>Pricing</GradientHeading>
      <Container
        display={{ base: "block", md: "flex" }}
        justifyContent={"center"}
        alignItems={"center"}
        height={"70vh"}
        gap={6}
      >
        <Box
          bg={{ base: "gray.100", _dark: "black" }}
          padding={"20px"}
          rounded={"10px"}
          mb={4}
          border={"1px solid #333"}
          width={"100%"}
          minHeight={"100%"}
          transition="all 0.2s ease-in-out"
          _hover={{
            transform: "scale(1.02)",
            borderColor: "teal.400",
            boxShadow: "0 0 20px rgba(56, 178, 172, 0.3)",
          }}
        >
          <Text fontWeight={"bolder"} fontSize={"25px"} textAlign={"center"}>
            Basic*
          </Text>
          <Text textAlign={"center"} color={"gray.400"}>
            Free Forever
          </Text>
          <Text fontWeight={"bolder"} fontSize={"75px"} marginBottom={"30px"}>
            $0
            <Span fontSize={"20px"} color={"gray.400"}>
              /month
            </Span>
          </Text>
          <Flex
            flex={1}
            flexDirection={"column"}
            justifyContent={"space-between"}
            alignItems={"start"}
            gap={4}
            height={"100%"}
          >
            {basicFeatures.map((charge) => (
              <Flex
                key={charge}
                justifyContent={"center"}
                alignItems={"center"}
                gap={3}
              >
                <FaRegCheckCircle />
                <Text>{charge}</Text>
              </Flex>
            ))}
            <Button marginTop={"auto"} width="100%">
              Contact
            </Button>
          </Flex>
        </Box>
        <Box
          bg={{
            base: "linear-gradient(180deg, #ccc, #eee)",
            _dark: "linear-gradient(180deg, #333, black)",
          }}
          padding={"20px"}
          rounded={"10px"}
          mb={4}
          border={"1px solid #333"}
          width={"100%"}
          height={"100%"}
          transition="all 0.2s ease-in-out"
          _hover={{
            transform: "scale(1.02)",
            borderColor: "teal.400",
            boxShadow: "0 0 20px rgba(56, 178, 172, 0.3)",
          }}
        >
          <Text fontWeight={"bolder"} fontSize={"25px"} textAlign={"center"}>
            Premium/Pro
          </Text>
          <Text textAlign={"center"} color={"gray.400"}>
            Planing and Execution
          </Text>
          <Text fontWeight={"bolder"} fontSize={"75px"} marginBottom={"30px"}>
            $200
            <Span fontSize={"20px"} color={"gray.400"}>
              /month
            </Span>
          </Text>
          <Flex
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"start"}
            gap={4}
          >
            {premiumFeatures.map((charge) => (
              <Flex
                key={charge}
                justifyContent={"center"}
                alignItems={"center"}
                gap={3}
              >
                <FaRegCheckCircle />
                <Text>{charge}</Text>
              </Flex>
            ))}
          </Flex>
          <Button marginTop={10} width="100%">
            Contact
          </Button>
        </Box>
        <Box
          bg={{ base: "gray.100", _dark: "black" }}
          padding={"20px"}
          rounded={"10px"}
          border={"1px solid #333"}
          width={"100%"}
          height={"100%"}
          mb={4}
          transition="all 0.2s ease-in-out"
          _hover={{
            transform: "scale(1.02)",
            borderColor: "teal.400",
            boxShadow: "0 0 20px rgba(56, 178, 172, 0.3)",
          }}
        >
          <Text fontWeight={"bolder"} fontSize={"25px"} textAlign={"center"}>
            Pro + Advance
          </Text>
          <Text textAlign={"center"} color={"gray.400"}>
            AI features and Advance Analytics
          </Text>
          <Text fontWeight={"bolder"} fontSize={"75px"} marginBottom={"30px"}>
            $800
            <Span fontSize={"20px"} color={"gray.400"}>
              /month
            </Span>
          </Text>
          <Flex
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"start"}
            gap={4}
          >
            {enterpriseFeatures.map((charge) => (
              <Flex
                key={charge}
                justifyContent={"center"}
                alignItems={"center"}
                gap={3}
              >
                <FaRegCheckCircle />
                <Text>{charge}</Text>
              </Flex>
            ))}
          </Flex>
          <Button marginTop={10} width="100%">
            Contact
          </Button>
        </Box>
      </Container>
      {/* Creating the Pricing box */}
      <Container marginTop={10}>
        <Box
          bg={{
            base: "gray.100",
            _dark: "linear-gradient(180deg, rgba(255, 255, 255, 0.1), black)",
          }}
          padding={"20px"}
          rounded={"10px"}
          border={"1px solid #333"}
          width={"100%"}
          mb={4}
          transition="all 0.2s ease-in-out"
          _hover={{
            transform: "scale(1.02)",
            borderColor: "teal.400",
            boxShadow: "0 0 20px rgba(56, 178, 172, 0.3)",
          }}
        >
          <Container
            display={{ base: "block", md: "flex" }}
            justifyContent={"center"}
            alignContent={"center"}
          >
            <Box width={"30%"}>
              <Text fontWeight={"bolder"} fontSize={"25px"}>
                Basic + Pro Advance
              </Text>
              <Text color={"gray.400"}>AI features and Advance Analytics</Text>
              <Text
                fontWeight={"bolder"}
                fontSize={"35px"}
                marginBottom={"30px"}
              >
                $800 + basic
                <Span fontSize={"20px"} color={"gray.400"}>
                  /month
                </Span>
              </Text>
            </Box>
            <Flex
              flexDirection={"column"}
              alignItems={"start"}
              width={{ base: "30%", md: "40%" }}
              gap={4}
            >
              {proPlusFeatures.map((charge) => (
                <Flex
                  key={charge}
                  justifyContent={"center"}
                  alignItems={"center"}
                  gap={3}
                >
                  <FaRegCheckCircle />
                  <Text>{charge}</Text>
                </Flex>
              ))}
            </Flex>
            <Box
              width={{ base: "100%", md: "1px" }}
              height={{ base: "1px", md: "100%" }}
              bg="gray.300"
              my={{ base: 6, md: 0 }}
              mx={{ base: 0, md: 6 }}
            />
            <Text fontSize={"35px"}>
              Custom Connection
              <Button marginTop={10} width="100%">
                Contact
              </Button>
            </Text>
          </Container>
        </Box>
      </Container>
      <Container>
        <FAQ />
      </Container>
    </>
  );
};

export default About;
