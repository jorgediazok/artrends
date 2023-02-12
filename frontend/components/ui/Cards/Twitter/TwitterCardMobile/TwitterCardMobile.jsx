// Chakra
import { Badge, Box, Flex, Text } from "@chakra-ui/react";

// Utils
import { calculateLines } from "../../../../../utils/calculateLines";
import { getPosition } from "../../../../../utils/position";

// Components
import ArrowDownMobile from "../../../icons/ArrowDownMobile";
import ArrowUpMobile from "../../../icons/ArrowUpMobile";
import SameMobile from "../../../icons/SameMobile";
import ThreeDots from "../../../icons/ThreeDots";

// Styles
import theme from "../../../../../styles/theme";

const TwitterCardMobile = ({ twitter, twitterSectionRef }) => {
  return (
    <Flex
      width="100%"
      flexWrap={{ base: "nowrap", lg: "wrap" }}
      flexDirection="column"
      alignContent="space-between"
      paddingX={{ base: "16px", lg: "0" }}
      maxHeight={{ base: "none", lg: "540px" }}
      alignItems="center"
      ref={twitterSectionRef}
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
            key={trend.title}
            as="article"
            color={theme.colors.white[500]}
            bg={theme.colors.indigo[800]}
            border="1px"
            borderColor={theme.colors.cyan[150]}
            borderRadius={theme.radius.md}
            width="100%"
            height="72px"
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
                    <a
                      href={trend.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Text
                        width="100%"
                        fontWeight={600}
                        fontSize="16px"
                        className={calculateLines("discutido")}
                        pr="10px"
                      >
                        {trend.title}
                      </Text>
                    </a>

                    <ThreeDots />
                  </Flex>
                </Box>
              </Box>

              <Box
                display="flex"
                w="100%"
                justifyContent="space-between"
                alignItems="center"
                height="100%"
              >
                <Box maxWidth="80%" display="revert">
                  <Badge
                    className="one-max-line"
                    w="100%"
                    fontSize="sm"
                    textTransform="uppercase"
                    variant="outline"
                    colorScheme="#fff"
                    border="1px solid #fff"
                    display="revert"
                  >
                    {trend.amount + " Tweets"}
                  </Badge>
                </Box>

                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  width="50px"
                  ml="revert"
                >
                  <Text fontSize="2xl" mr="4px">
                    {currentIndex + 1}
                  </Text>
                  {getPosition(currentIndex, prevIndex) === "down" ? (
                    <ArrowDownMobile />
                  ) : getPosition(currentIndex, prevIndex) === "up" ? (
                    <ArrowUpMobile />
                  ) : (
                    <SameMobile />
                  )}
                </Box>
              </Box>
            </Box>
          </Box>
        );
      })}
    </Flex>
  );
};

export default TwitterCardMobile;
