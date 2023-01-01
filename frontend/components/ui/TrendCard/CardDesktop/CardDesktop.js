import styles from "./CardDesktop.module.css";
import { Box, Text } from "@chakra-ui/react";
import theme from "../../../../styles/theme";

const CardDesktop = () => {
  return (
    <Box
      color={theme.colors.white[500]}
      bg={theme.colors.indigo[800]}
      border="1px"
      borderColor={theme.colors.cyan[150]}
      borderRadius={theme.radius.xl}
      paddingX={12}
      paddingY={3}
    >
      <Text color={theme.colors.magenta[500]}>CardDesktop</Text>
    </Box>
  );
};

export default CardDesktop;
