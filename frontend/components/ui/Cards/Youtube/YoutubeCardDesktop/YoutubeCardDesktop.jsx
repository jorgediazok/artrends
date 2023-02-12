import { Badge, Box, Text } from "@chakra-ui/react";

// Theme
import theme from "../../../../../styles/theme";

// Utils
import { calculateLines } from "../../../../../utils/calculateLines";
import { getPosition } from "../../../../../utils/position";
import { scrollOffset } from "../../../../../utils/scrollOffset";

// Icons
import ArrowDown from "../../../icons/ArrowDown";
import ArrowUp from "../../../icons/ArrowUp";
import Same from "../../../icons/Same";
import Share from "../../../icons/Share";

// Styles
import styles from "./YoutubeCardDesktop.module.css";

const YoutubeCardDesktop = ({ youtube, youtubeSectionRef }) => {
  return (
    <Box
      width="100%"
      flexDirection="column"
      alignContent="space-between"
      paddingX={{ base: "16px", lg: "0" }}
      alignItems="center"
      mt="24px"
    >
      {youtube?.current?.record?.trends?.map((trend, currentIndex) => {
        const elementInPrevious = youtube?.previous?.record?.trends?.find(
          element => element.title === trend.title
        );
        const prevIndex = youtube?.previous?.record?.trends?.findIndex(
          element => element.title === elementInPrevious?.title
        );
        return (
          <Box
            as="article"
            color={theme.colors.white[500]}
            bg={theme.colors.indigo[800]}
            border="1px"
            borderColor={theme.colors.cyan[150]}
            borderRadius={theme.radius.xl}
            paddingX="48px"
            paddingY="12px"
            width="100%"
            height="161px"
            mb={2}
            display={{ base: "none", lg: "flex" }}
            alignItems="center"
            key={trend.title}
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
                  w="80px"
                  className="position-container"
                >
                  <Text fontSize="4xl">{currentIndex + 1}</Text>
                  {getPosition(currentIndex, prevIndex) === "down" ? (
                    <ArrowDown />
                  ) : getPosition(currentIndex, prevIndex) === "up" ? (
                    <ArrowUp />
                  ) : (
                    <Same className={styles.same} />
                  )}
                </Box>
                <Box
                  display="flex"
                  gap="4px"
                  flexDirection="column"
                  ml={0}
                  maxW="80%"
                >
                  <a
                    href={trend.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Text
                      fontWeight={600}
                      fontSize="xl"
                      className={calculateLines("visto")}
                    >
                      {trend.title}
                    </Text>
                  </a>
                  <a
                    href={trend.channelLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Text fontSize="xl">{trend.channel}</Text>
                  </a>

                  <Badge
                    className="one-max-line"
                    width="fit-content"
                    fontSize="xs"
                    textTransform="uppercase"
                    variant="outline"
                    colorScheme="#fff"
                    border="1px solid #fff"
                  >
                    {trend.amount + " reproducciones"}
                  </Badge>
                </Box>
              </Box>
              <Box display="flex" gap={8} alignItems="center">
                <Share />
              </Box>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default YoutubeCardDesktop;
