import { Box, Text } from "@chakra-ui/react";
import ArrowDown from "../../../../public/icons/ArrowDown";
import ArrowUp from "../../../../public/icons/ArrowUp";
import Open from "../../../../public/icons/Open";
import Same from "../../../../public/icons/Same";
import Share from "../../../../public/icons/Share";
import theme from "../../../../styles/theme";

const CardDesktop = ({
  title,
  link,
  amount,
  position,
  direction,
  streak,
  referencia,
}) => {
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
      width="920px"
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box display="flex" gap={6}>
          <Box display="flex" alignItems="center" gap={5}>
            <Text fontSize="2xl">{position}</Text>
            {direction === "down" && <ArrowDown />}
            {direction === "up" && <ArrowUp />}
            {direction === "same" && (
              <Box marginLeft={2}>
                <Same />
              </Box>
            )}
          </Box>
          <Box display="flex" gap={3} flexDirection="column" maxW="600px">
            <Text>{title}</Text>
            <Text>
              {referencia === "twitter" && amount + " Tweets"}
              {referencia === "escuchado" && streak + " Semanas seguidas"}
              {referencia === "visto" && amount + " reproducciones"}
              {referencia === "google" && "Más de " + amount + " búsquedas"}
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
