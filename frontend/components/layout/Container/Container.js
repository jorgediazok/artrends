import { Container as ChakraContainer } from "@chakra-ui/react";

export default function Container({ children, isContentCentered = true }) {
  return (
    <ChakraContainer
      display="flex"
      justifyContent="center"
      alignItems={isContentCentered ? "center" : "flex-start"}
      flexDirection="column"
      width="100%"
      maxW={{ base: "100%", md: "1140px" }}
      p={{ base: "32px 16px", md: "32px" }}
    >
      {children}
    </ChakraContainer>
  );
}
