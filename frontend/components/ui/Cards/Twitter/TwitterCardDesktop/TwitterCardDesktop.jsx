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
import { getPosition } from "../../../../../utils/position";
import { calculateLines } from "../../../../../utils/calculateLines";
import {
  getTwitterShareText,
  getWhatsappShareText,
} from "../../../../../utils/shareText";

// Icons
import Share from "../../../icons/Share";
import ArrowDown from "../../../icons/ArrowDown";
import ArrowUp from "../../../icons/ArrowUp";
import Same from "../../../icons/Same";
import TwitterCompartir from "../../../icons/TwitterCompartir";
import Whatsapp from "../../../icons/Whatsapp";

// Components
import ErrorCardDesktop from "../../ErrorCard/ErrorCardDesktop/ErrorCardDesktop";

// Theme
import theme from "../../../../../styles/theme";

const TwitterCardDesktop = ({ twitter }) => {
  const hasData = twitter?.current?.record?.trends?.length && twitter.current.record.trends.length > 0;

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
      display={{ base: "none", lg: "flex" }}
    >
      {!hasData ? (
        <ErrorCardDesktop />
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
              bg={theme.colors.indigo[800]}
              border="1px"
              borderColor={theme.colors.cyan[200]}
              borderRadius={theme.radius.xl}
              paddingX="20px"
              paddingY="12px"
              width="440px"
              height="100px"
              mb={2}
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
                  <Menu>
                    <MenuButton isolation="isolate">
                      <Share />
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
                </Box>
              </Box>
            </Box>
          );
        })
      )}
    </Flex>
  );
};

export default TwitterCardDesktop;
