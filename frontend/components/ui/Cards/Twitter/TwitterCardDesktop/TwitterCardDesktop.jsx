import { Badge, Box, Flex, Text } from "@chakra-ui/react";

// Utils
import { getPosition } from "../../../../../utils/position";
import { calculateLines } from "../../../../../utils/calculateLines";

// Components
import Share from "../../../icons/Share";
import ArrowDown from "../../../icons/ArrowDown";
import ArrowUp from "../../../icons/ArrowUp";
import Same from "../../../icons/Same";

// Theme
import theme from "../../../../../styles/theme";

const TwitterCardDesktop = ({ twitter, twitterSectionRef }) => {
  return (
    <Flex
      width="100%"
      flexWrap={{ base: "nowrap", lg: "wrap" }}
      flexDirection="column"
      alignContent="space-between"
      paddingX={{ base: "16px", lg: "0" }}
      mt="24px"
      maxHeight={{ base: "none", lg: "540px" }}
      alignItems="center"
    >
      {twitter?.current?.record?.trends?.map((trend, currentIndex) => {
        const elementInPrevious = twitter?.previous?.record?.trends?.find(
          element => element.title === trend.title
        );
        const prevIndex = twitter?.previous?.record?.trends?.findIndex(
          element => element.title === elementInPrevious?.title
        );
        return (
          <Box
            key={currentIndex}
            as="article"
            color={theme.colors.white[500]}
            bg={theme.colors.indigo[800]}
            border="1px"
            borderColor={theme.colors.cyan[200]}
            borderRadius={theme.radius.xl}
            paddingX="20px"
            paddingY="12px"
            width="440px"
            height="100px"
            mb={2}
            display={{ base: "none", lg: "flex" }}
            alignItems="center"
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              w="100%"
              position="relative"
            >
              <Box display="flex" gap="9px" alignItems="center">
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
                    <Same className="same" />
                  )}
                </Box>
                <Box display="flex" gap="12px" flexDirection="column" ml={0}>
                  <a
                    href={trend.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Text
                      fontWeight={600}
                      fontSize="xl"
                      className={calculateLines("discutido")}
                    >
                      {trend.title}
                    </Text>
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
                    {trend.amount + " Tweets"}
                  </Badge>
                </Box>
              </Box>
              <Box
                display="flex"
                alignItems="flex-end"
                justifyContent="flex-end"
                position="absolute"
                bottom={0}
                right="16px"
              >
                <a
                  href="https://twitter.com/intent/tweet?url=https://artrends.ar&text=Mirate%20qué%20tendencia%20esta%20siendo%20discutida%20en%20Twitter%20en%20Argentina%20en%20este%20momento!%20%23Artrends"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Share />
                </a>
              </Box>
            </Box>
          </Box>
        );
      })}
    </Flex>
  );
};

export default TwitterCardDesktop;
