// Chakra
import { Box, Text } from "@chakra-ui/react";

// Icons
import ArrowDown from "../../../../public/icons/ArrowDown";
import ArrowUp from "../../../../public/icons/ArrowUp";
import Same from "../../../../public/icons/Same";
import Share from "../../../../public/icons/Share";

// Theme
import theme from "../../../../styles/theme";
import { calculateLines } from "../../../../utils/calculateLines";

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
  channelLink,
  height,
  author,
}) => {
  return (
    <Box
      as="article"
      color={theme.colors.white[500]}
      bg={theme.colors.indigo[800]}
      border="1px"
      borderColor={theme.colors.cyan[150]}
      borderRadius={theme.radius.xl}
      paddingX={type === "discutido" || type === "buscado" ? "20px" : "48px"}
      paddingY="12px"
      width={type === "discutido" || type === "buscado" ? "440px" : "100%"}
      height={height}
      mb={2}
      display={{ base: "none", lg: "flex" }}
      alignItems="center"
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        w="100%"
      >
        <Box display="flex" gap={6} alignItems="center">
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
            <a href={link} target="_blank" rel="noopener noreferrer">
              <Text
                fontWeight={type === "leido" ? 500 : 600}
                fontSize="xl"
                className={calculateLines(type)}
              >
                {title}
              </Text>
            </a>
            {type === "visto" && (
              <a href={channelLink} target="_blank" rel="noopener noreferrer">
                <Text fontSize="xl">{channel}</Text>
              </a>
            )}
            {type === "podcast" && <Text fontSize="xl">{publisher}</Text>}
            {type === "escuchado" && <Text fontSize="xl">{author}</Text>}
            <Text className="one-max-line">
              {type === "discutido" && amount + " Tweets"}
              {type === "escuchado" && streak + " Semanas seguidas"}
              {type === "visto" && amount + " reproducciones"}
              {type === "buscado" && "Más de " + amount + " búsquedas"}
            </Text>
          </Box>
        </Box>
        <Box display="flex" gap={8} alignItems="center">
          <Share />
        </Box>
      </Box>
    </Box>
  );
};

export default CardDesktop;
