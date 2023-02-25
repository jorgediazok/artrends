import { Box, Flex, Text } from "@chakra-ui/react";

// Icons
import FolderMobile from "../../../icons/FolderMobile";
import FolderTwoMobile from "../../../icons/FolderTwoMobile";
import FolderThreeMobile from "../../../icons/FolderThreeMobile";
import FolderFourMobile from "../../../icons/FolderFourMobile";
import FolderFiveMobile from "../../../icons/FolderFiveMobile";
import FolderSixMobile from "../../../icons/FolderSixMobile";

// Theme
import theme from "../../../../../styles/theme";


const ErrorCardMobile = () => {
  return (
    <Flex width="100%" alignContent="space-between" alignItems="center">
      <Box
        color={theme.colors.white[500]}
        bg={theme.colors.indigo[800]}
        border="1px"
        borderColor={theme.colors.cyan[150]}
        borderRadius={theme.radius.md}
        width="100%"
        height="114px"
        display="flex"
        justifyContent="center"
        mb={2}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          w="100%"
          position="relative"
        >
          <Text
            width="80%"
            fontWeight="600"
            paddingX="16px"
            paddingY="8px"
            fontSize="md"
            color="#FFFFFF"
            display="flex"
            alignItems="center"
          >
            Uy! Al parecer no contamos con esta información en este momento.
          </Text>
          <Box paddingRight="16px">
            <FolderMobile />
            <FolderTwoMobile />
            <FolderThreeMobile />
            <FolderFourMobile />
            <FolderFiveMobile />
            <FolderSixMobile />
          </Box>
        </Box>
      </Box>
    </Flex>
  );
};

export default ErrorCardMobile;
