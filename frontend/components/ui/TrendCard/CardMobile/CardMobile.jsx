// Chakra
import { Badge, Box, Flex, Text } from "@chakra-ui/react";

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
      borderRadius={theme.radius.md}
      width="100%"
      height={height}
      mb={2}
      display={{ base: "flex", lg: "none" }}
      alignItems="center"
      p="8px 16px"
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        width="100%"
        flexDir="column"
      >
        <Box
          display="flex"
          width="100%"
          height="100%"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box w="100%">
            <Flex
              justifyContent="space-between"
              alignItems="center"
              flexDirection="row"
            >
              <a href={link} target="_blank" rel="noopener noreferrer">
                <Text
                  width={type === "leido" ? "85%" : "100%"}
                  fontWeight={600}
                  fontSize="16px"
                  className={calculateLines(type)}
                  pr="10px"
                >
                  {title}
                </Text>
              </a>

              <ThreeDots />
            </Flex>

            {type === "song" && (
              <Text
                fontSize={{ base: "md", lg: "xl" }}
                className="one-max-line"
                lineHeight={1.5}
                mt="2px"
              >
                {author}
              </Text>
            )}

            {type === "podcast" && (
              <Text
                fontSize={{ base: "md", lg: "xl" }}
                className="one-max-line"
                mt="6px"
              >
                {publisher}
              </Text>
            )}

            {type === "visto" && (
              <a href={channelLink} target="_blank" rel="noopener noreferrer">
                <Text fontSize="md">{channel}</Text>
              </a>
            )}
          </Box>
        </Box>

        <Box
          display="flex"
          w="100%"
          justifyContent="space-between"
          alignItems="center"
          height="100%"
        >
          <Box maxWidth="80%" display={type === "podcast" ? "none" : "revert"}>
            <Badge
              className="one-max-line"
              w="100%"
              fontSize="sm"
              textTransform="uppercase"
              variant="outline"
              colorScheme="#fff"
              border="1px solid #fff"
              display={
                type === "podcast" || type === "leido" ? "none" : "revert"
              }
            >
              {type === "discutido" && amount + " Tweets"}
              {type === "artist" && streak + " Semanas seguidas"}
              {type === "song" && amount + " reproducciones"}
              {type === "visto" && amount + " reproducciones"}
              {type === "buscado" && "Más de " + amount + " búsquedas"}
            </Badge>
          </Box>

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            width="50px"
            ml={type === "podcast" || type === "leido" ? "auto" : "revert"}
          >
            <Text fontSize="2xl" mr="4px">
              {position}
            </Text>
            {direction === "down" && <ArrowDown />}
            {direction === "up" && <ArrowUp />}
            {direction === "same" && <Same />}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CardMobile;
