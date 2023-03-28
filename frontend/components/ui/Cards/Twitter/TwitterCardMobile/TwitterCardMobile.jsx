// Chakra
import {
  Badge,
  Box,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
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
      paddingX={{ base: "16px", lg: "0" }}
      maxHeight={{ base: "none", lg: "540px" }}
      alignItems="center"
      ref={twitterSectionRef}
      display={{ base: "flex", lg: "none" }}
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
              as="article"
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

                      <Menu maxW="162px">
                        <MenuButton
                          isolation="isolate"
                          title="Ver opciones para esta tendencia"
                        >
                          <ThreeDots />
                        </MenuButton>
                        <MenuList
                          maxWidth="162px"
                          minWidth="162px"
                          backgroundColor="purple.500"
                          borderRadius="6px"
                          padding="6px 0px"
                          zIndex="10"
                          boxShadow="75px 75px 43px rgba(0, 0, 0, 0.01), 42px 42px 36px rgba(0, 0, 0, 0.05), 19px 19px 27px rgba(0, 0, 0, 0.09), 5px 5px 15px rgba(0, 0, 0, 0.1), 0px 0px 0px rgba(0, 0, 0, 0.1);"
                          border="none"
                        >
                          <MenuItem
                            backgroundColor="purple.500"
                            color="#FFFFFF"
                            as="a"
                            fontSize="md"
                            href={getWhatsappShareText(
                              "twitter",
                              currentIndex,
                              trend.title
                            )}
                            data-action="share/whatsapp/share"
                            target="_blank"
                            rel="noreferrer"
                            icon={<Whatsapp />}
                            iconSpacing="10px"
                            flexDirection="row-reverse"
                            display="flex"
                            alignItems="center"
                            _active={{
                              boxShadow:
                                "inset 75px 75px 43px rgba(0, 0, 0, 0.01), inset 42px 42px 36px rgba(0, 0, 0, 0.05), inset 19px 19px 27px rgba(0, 0, 0, 0.09), inset 5px 5px 15px rgba(0, 0, 0, 0.1)",
                            }}
                          >
                            Compartir por
                          </MenuItem>
                          <MenuItem
                            backgroundColor="purple.500"
                            color="#FFFFFF"
                            as="a"
                            fontSize="md"
                            href={getTwitterShareText(
                              "twitter",
                              currentIndex,
                              trend.title
                            )}
                            target="_blank"
                            rel="noreferrer"
                            iconSpacing="10px"
                            flexDirection="row-reverse"
                            alignItems="center"
                            display="flex"
                            icon={<TwitterCompartir />}
                            _active={{
                              boxShadow:
                                "inset 75px 75px 43px rgba(0, 0, 0, 0.01), inset 42px 42px 36px rgba(0, 0, 0, 0.05), inset 19px 19px 27px rgba(0, 0, 0, 0.09), inset 5px 5px 15px rgba(0, 0, 0, 0.1)",
                            }}
                          >
                            Compartir por
                          </MenuItem>
                        </MenuList>
                      </Menu>
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
                    {trend.amount && (
                      <Badge
                        className="one-max-line"
                        width="fit-content"
                        fontSize="xs"
                        textTransform="uppercase"
                        variant="outline"
                        colorScheme="#fff"
                        border="1px solid #fff"
                      >
                        {trend.amount}
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

export default TwitterCardMobile;
