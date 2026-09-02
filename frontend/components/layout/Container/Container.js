import { Container as ChakraContainer } from "@chakra-ui/react";

export default function Container({
  children,
  isContentCentered = true,
  flexDirection = "column",
}) {
  return (
    <ChakraContainer
      display="flex"
      justifyContent="center"
      alignItems={isContentCentered ? "center" : "flex-start"}
      flexDirection={flexDirection}
      width="100%"
      mx="auto"
      maxW={{ base: "100%", md: "1140px" }}
      p={{ base: "32px 16px", md: "32px" }}
    >
      {children}
    </ChakraContainer>
  );
}
