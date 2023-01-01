import { Box, Text } from "@chakra-ui/react";
import Link from "next/link";
import ArrowDown from "../../../../public/icons/ArrowDown";
import Open from "../../../../public/icons/Open";
import Share from "../../../../public/icons/Share";
import theme from "../../../../styles/theme";

const CardDesktop = ({ title, link, amount, position }) => {
  return (
    <Box
      color={theme.colors.white[500]}
      bg={theme.colors.indigo[800]}
      border="1px"
      borderColor={theme.colors.cyan[150]}
      borderRadius={theme.radius.xl}
      paddingX={12}
      paddingY={5}
      marginTop={5}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box display="flex" gap={6}>
          <Box display="flex" alignItems="center" gap={4}>
            <Text fontSize="2xl">{position}</Text>
            <ArrowDown />
          </Box>
          <Box>
            <Text>{title}</Text>
            <Text>{amount} tweets</Text>
          </Box>
        </Box>
        <Box display="flex" gap={8} alignItems="center">
          <a href={link} target="_blank" rel="noreferrer">
            <Share />
          </a>
          <Open />
        </Box>
      </Box>
    </Box>
  );
};

export default CardDesktop;
