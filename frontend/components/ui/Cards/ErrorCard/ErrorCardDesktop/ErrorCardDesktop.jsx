import { Box, Flex, Text } from "@chakra-ui/react";

//ICONS
import Folder from "../../../icons/Folder";
import FolderFive from "../../../icons/FolderFive";
import FolderFour from "../../../icons/FolderFour";
import FolderSix from "../../../icons/FolderSix";
import FolderThree from "../../../icons/FolderThree";
import FolderTwo from "../../../icons/FolderTwo";

//THEME
import theme from "../../../../../styles/theme";

const ErrorCardDesktop = () => {
  return (
    <Flex
      width="100%"
      flexWrap={{ base: "nowrap", lg: "wrap" }}
      flexDirection="column"
      alignContent="space-between"
      paddingX={{ base: "16px", lg: "0" }}
      mt="24px"
      maxHeight={{ base: "none", lg: "540px" }}
      alignItems="center"
    >
      <Box
        color={theme.colors.white[500]}
        bg={theme.colors.gradients["grad-cards"]}
        border="0.5px solid"
        borderColor="rgba(255, 255, 255, 0.1);"
        borderRadius={theme.radius.xl}
        boxShadow={theme.shadows["inner-card"]}
        paddingX="20px"
        paddingY="12px"
        width="100%"
        height="157px"
        mb={2}
        display={{ base: "none", lg: "flex" }}
        alignItems="center"
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          w="100%"
          position="relative"
        >
          <Text
            width="70%"
            fontWeight="600"
            paddingX="76px"
            paddingY="42px"
            fontSize="2xl"
            color="#FFFFFF"
            display="flex"
            alignItems="center"
          >
            Uy! Al parecer no contamos con esta información en este momento.
          </Text>
          <Box paddingX="76px">
            <Folder />
            <FolderTwo />
            <FolderThree />
            <FolderFour />
            <FolderFive />
            <FolderSix />
          </Box>
        </Box>
      </Box>
    </Flex>
  );
};
export default ErrorCardDesktop;
