import { Badge, Box, Flex, Text } from "@chakra-ui/react";

// Utils
import { getPosition } from "../../../../../utils/position";
import { calculateLines } from "../../../../../utils/calculateLines";
import { scrollOffset } from "../../../../../utils/scrollOffset";

// Components
import CardTitle from "../../../TrendCard/CardTitle/CardTitle";
import Share from "../../../icons/Share";
import ArrowDown from "../../../icons/ArrowDown";
import ArrowUp from "../../../icons/ArrowUp";
import Same from "../../../icons/Same";

// Theme
import theme from "../../../../../styles/theme";

// Styles
import styles from "./TwitterCardDesktop.module.css";

const TwitterCardDesktop = ({ twitter, twitterSectionRef }) => {
  return (
    <>
      <Box
        id="twitter"
        display="flex"
        width="100%"
        mt={{ base: "60px", lg: "158px" }}
        ref={twitterSectionRef}
        paddingY={scrollOffset.desktop}
        marginY={scrollOffset.desktop}
      >
        <CardTitle title="Lo más discutido en Twitter" />
      </Box>
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
            <>
              <Box
                key={trend.title}
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
                        <Same className={styles.same} />
                      )}
                    </Box>
                    <Box display="flex" gap="4px" flexDirection="column" ml={0}>
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
                    gap={8}
                    alignItems="flex-end"
                    justifyContent="flex-end"
                    marginTop="40px"
                  >
                    <Share />
                  </Box>
                </Box>
              </Box>
            </>
          );
        })}
      </Flex>
    </>
  );
};

export default TwitterCardDesktop;
