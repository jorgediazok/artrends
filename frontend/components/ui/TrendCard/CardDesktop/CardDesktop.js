import { Box, Text } from "@chakra-ui/react";
import ArrowDown from "../../../../public/icons/ArrowDown";
import ArrowUp from "../../../../public/icons/ArrowUp";
import Circle from "../../../../public/icons/Circle";
import Open from "../../../../public/icons/Open";
import Share from "../../../../public/icons/Share";
import theme from "../../../../styles/theme";

const CardDesktop = ({ title, link, amount, position, direction, streak }) => {
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
          <Box display="flex" alignItems="center" f gap={4}>
            <Text fontSize="2xl">{position}</Text>
            {direction === "down" && <ArrowDown />}
            {direction === "up" && <ArrowUp />}
            {direction === "same" && <Circle />}
          </Box>
          <Box display="flex" gap={3} flexDirection="column">
            <Text>{title}</Text>
            <Text>
              {amount && amount + " Tweets"}
              {streak && streak + " Semanas seguidas"}
            </Text>
          </Box>
        </Box>
        <Box display="flex" gap={8} alignItems="center">
          <Share />
          <a href={link} target="_blank" rel="noreferrer">
            <Open />
          </a>
        </Box>
      </Box>
    </Box>
  );
};

export default CardDesktop;
