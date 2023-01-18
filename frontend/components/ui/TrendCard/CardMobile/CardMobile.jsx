// Chakra
import { Box, Text } from "@chakra-ui/react";

// Icons
import ArrowDown from "../../icons/ArrowDown";
import ArrowUp from "../../icons/ArrowUp";
import Same from "../../icons/Same";
import ThreeDots from "../../icons/ThreeDots";

// Theme
import theme from "../../../../styles/theme";

// Utils
import { calculateLines } from "../../../../utils/calculateLines";

// Styles
import styles from "./CardMobile.module.css";

const CardMobile = ({
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
      paddingX={type === "discutido" || type === "buscado" ? "20px" : "16px"} //VER ESTO
      paddingY="12px"
      width="100%"
      height={height}
      mb={2}
      display={{ base: "flex", lg: "none" }}
      alignItems="center"
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        w="100%"
        flexWrap="wrap"
      >
        <Box
          display="flex"
          width="100%"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box maxWidth="80%">
            <a href={link} target="_blank" rel="noopener noreferrer">
              <Text
                fontWeight={type === "leido" ? 500 : 600}
                fontSize="16px"
                className={calculateLines(type)}
              >
                {title}
              </Text>
            </a>
          </Box>
          <Box maxWidth="20%">
            <ThreeDots />
          </Box>
        </Box>

        <Box
          mt="20px"
          display="flex"
          w="100%"
          alignItems="center"
          justifyContent="space-between"
          alignContent="flex-start"
        >
          <Box maxWidth="80%">
            {type === "visto" && (
              <a href={channelLink} target="_blank" rel="noopener noreferrer">
                <Text fontSize="md">{channel}</Text>
              </a>
            )}
            {type === "podcast" && (
              <Text fontSize={{ base: "sm", lg: "xl" }}>{publisher}</Text>
            )}
            {type === "escuchado" && (
              <Text
                fontSize={{ base: "md", lg: "xl" }}
                className="one-max-line"
              >
                {author}
              </Text>
            )}
            <Text className="one-max-line" w="100%" fontSize="sm">
              {type === "discutido" && amount + " Tweets"}
              {type === "escuchado" && streak + " Semanas seguidas"}
              {type === "visto" && amount + " reproducciones"}
              {type === "buscado" && "Más de " + amount + " búsquedas"}
            </Text>
          </Box>

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            width="20%"
          >
            <Text fontSize="2xl">{position}</Text>
            {direction === "down" && <ArrowDown />}
            {direction === "up" && <ArrowUp />}
            {direction === "same" && <Same className={styles.same} />}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CardMobile;
