// Chakra
import { Box, Text } from "@chakra-ui/react";

// Icons
import ArrowDown from "../../../../public/icons/ArrowDown";
import ArrowUp from "../../../../public/icons/ArrowUp";
import Open from "../../../../public/icons/Open";
import Same from "../../../../public/icons/Same";
import Share from "../../../../public/icons/Share";

// Theme
import theme from "../../../../styles/theme";

// Styles
import styles from "./CardDesktop.module.css";

const CardDesktop = ({
  title,
  link,
  amount,
  position,
  direction,
  streak,
  type,
  publisher,
  channel,
  height,
  author,
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
      width="100%"
      maxHeight={height}
      mb={2}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box display="flex" gap={6}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            width="80px"
          >
            <Text fontSize="3xl">{position}</Text>
            {direction === "down" && <ArrowDown />}
            {direction === "up" && <ArrowUp />}
            {direction === "same" && <Same className={styles.same} />}
          </Box>
          <Box
            display="flex"
            gap={2}
            flexDirection="column"
            maxW="600px"
            ml={2}
          >
            <Text fontWeight="bold">{title}</Text>
            {type === "visto" && <Text>{channel}</Text>}
            {type === "podcast" && <Text>{publisher}</Text>}
            {type === "escuchado" && <Text>{author}</Text>}
            <Text>
              {type === "twitter" && amount + " Tweets"}
              {type === "escuchado" && streak + " Semanas seguidas"}
              {type === "visto" && amount + " reproducciones"}
              {type === "google" && "Más de " + amount + " búsquedas"}
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
