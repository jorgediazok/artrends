import React from "react";

// Chakra
import {
  Badge,
  Box,
  Flex,
  Link,
  Menu,
  Portal,
  Text,
} from "@chakra-ui/react";

// Utils
import { calculateLines } from "../../../../../utils/calculateLines";
import { getPosition } from "../../../../../utils/position";
import {
  getWhatsappShareText,
  getTwitterShareText,
} from "../../../../../utils/shareText";

// Icons & Components
import ArrowDownMobile from "../../../icons/ArrowDownMobile";
import ArrowUpMobile from "../../../icons/ArrowUpMobile";
import SameMobile from "../../../icons/SameMobile";
import ThreeDots from "../../../icons/ThreeDots";
import Whatsapp from "../../../icons/Whatsapp";
import TwitterCompartir from "../../../icons/TwitterCompartir";

// Components
import ErrorCardMobile from "../../ErrorCard/ErrorCardMobile/ErrorCardMobile";

// Styles
import theme from "../../../../../styles/theme";

const TwitterCardMobile = ({ twitter, twitterSectionRef, handleCardClick }) => {
  const hasData =
    twitter?.current?.record?.trends?.length &&
    twitter.current.record.trends.length > 0;

  return (
    <Flex
      width="100%"
      flexWrap={{ base: "nowrap", lg: "wrap" }}
      flexDirection="column"
      alignContent="space-between"
      maxHeight={{ base: "none", lg: "540px" }}
      alignItems="center"
      ref={twitterSectionRef}
      display={{ base: "flex", lg: "none" }}
      as="ul"
    >
      {!hasData ? (
        <ErrorCardMobile />
      ) : (
        twitter.current.record.trends.map((trend, currentIndex) => {
          const elementInPrevious = twitter?.previous?.record?.trends?.find(
            element => element.title === trend.title
          );
          const prevIndex = twitter?.previous?.record?.trends?.findIndex(
            element => element.title === elementInPrevious?.title
          );
          return (
            <Box
              key={currentIndex}
              as="li"
              color={theme.colors.white[500]}
              bg={theme.colors.gradients["grad-cards"]}
              border="0.5px solid"
              borderColor="rgba(255, 255, 255, 0.1);"
              borderRadius={theme.radius.md}
              width="100%"
              height="72px"
              mb={2}
              display="flex"
              alignItems="center"
              p="8px 16px"
              boxShadow={theme.shadows["inner-card"]}
              role="link"
              tabIndex={0}
              data-link={trend.link}
              _active={{ boxShadow: "none" }}
              transition="300ms all ease"
              onClick={handleCardClick}
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
                      <Text
                        width="100%"
                        fontWeight={600}
                        fontSize="16px"
                        className={calculateLines("discutido")}
                        pr="10px"
                      >
                        {trend.title}
                      </Text>

                      <Menu.Root maxW="162px">
                        <Menu.Trigger
                          isolation="isolate"
                          title="Ver opciones para esta tendencia"
                        >
                          <ThreeDots />
                        </Menu.Trigger>
                        <Portal>
                          <Menu.Positioner>
                            <Menu.Content
                              maxWidth="162px"
                              minWidth="162px"
                              backgroundColor="indigo.600"
                              borderRadius="6px"
                              padding="6px 0px"
                              zIndex="10"
                              boxShadow="75px 75px 43px rgba(0, 0, 0, 0.01), 42px 42px 36px rgba(0, 0, 0, 0.05), 19px 19px 27px rgba(0, 0, 0, 0.09), 5px 5px 15px rgba(0, 0, 0, 0.1), 0px 0px 0px rgba(0, 0, 0, 0.1);"
                              border="none"
                            >
                              <Menu.Item value="whatsapp" asChild>
                                <Link
                                  backgroundColor="indigo.600"
                                  color="#FFFFFF"
                                  fontSize="md"
                                  href={getWhatsappShareText(
                                    "twitter",
                                    currentIndex,
                                    trend.title
                                  )}
                                  data-action="share/whatsapp/share"
                                  target="_blank"
                                  rel="noreferrer"
                                  display="flex"
                                  flexDirection="row-reverse"
                                  alignItems="center"
                                  gap="10px"
                                  _active={{
                                    boxShadow:
                                      "inset 75px 75px 43px rgba(0, 0, 0, 0.01), inset 42px 42px 36px rgba(0, 0, 0, 0.05), inset 19px 19px 27px rgba(0, 0, 0, 0.09), inset 5px 5px 15px rgba(0, 0, 0, 0.1)",
                                  }}
                                >
                                  <Whatsapp />
                                  Compartir por
                                </Link>
                              </Menu.Item>
                              <Menu.Item value="twitter" asChild>
                                <Link
                                  backgroundColor="indigo.600"
                                  color="#FFFFFF"
                                  fontSize="md"
                                  href={getTwitterShareText(
                                    "twitter",
                                    currentIndex,
                                    trend.title
                                  )}
                                  target="_blank"
                                  rel="noreferrer"
                                  display="flex"
                                  flexDirection="row-reverse"
                                  alignItems="center"
                                  gap="10px"
                                  _active={{
                                    boxShadow:
                                      "inset 75px 75px 43px rgba(0, 0, 0, 0.01), inset 42px 42px 36px rgba(0, 0, 0, 0.05), inset 19px 19px 27px rgba(0, 0, 0, 0.09), inset 5px 5px 15px rgba(0, 0, 0, 0.1)",
                                  }}
                                >
                                  <TwitterCompartir />
                                  Compartir por
                                </Link>
                              </Menu.Item>
                            </Menu.Content>
                          </Menu.Positioner>
                        </Portal>
                      </Menu.Root>
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
                    {trend.amount && !trend.amount.includes("trending") && (
                      <Badge
                        className="one-max-line"
                        width="fit-content"
                        fontSize="xs"
                        textTransform="uppercase"
                        variant="outline"
                        paddingX="8px"
                        paddingY="2px"
                        color="#fff"
                        border="1px solid #fff"
                      >
                        {trend.amount.replace(",", ".")} tweets
                      </Badge>
                    )}
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
        })
      )}
    </Flex>
  );
};

export default React.memo(TwitterCardMobile);
