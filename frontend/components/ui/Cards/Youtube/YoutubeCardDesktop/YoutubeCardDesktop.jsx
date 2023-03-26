import {
  Badge,
  Box,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";

// Theme
import theme from "../../../../../styles/theme";

// Utils
import { calculateLines } from "../../../../../utils/calculateLines";
import { getPosition } from "../../../../../utils/position";
import {
  getTwitterShareText,
  getWhatsappShareText,
} from "../../../../../utils/shareText";

// Icons
import ArrowDown from "../../../icons/ArrowDown";
import ArrowUp from "../../../icons/ArrowUp";
import Same from "../../../icons/Same";
import Share from "../../../icons/Share";
import TwitterCompartir from "../../../icons/TwitterCompartir";
import Whatsapp from "../../../icons/Whatsapp";

// Components
import ErrorCardDesktop from "../../ErrorCard/ErrorCardDesktop/ErrorCardDesktop";

// Styles
import styles from "./YoutubeCardDesktop.module.css";

const YoutubeCardDesktop = ({ youtube }) => {
  const hasData =
    youtube?.current?.record?.trends?.length &&
    youtube.current.record?.trends.length > 0;

  return (
    <Box
      width="100%"
      flexDirection="column"
      alignContent="space-between"
      paddingX={{ base: "16px", lg: "0" }}
      alignItems="center"
      mt="24px"
      display={{ base: "none", lg: "flex" }}
    >
      {!hasData ? (
        <ErrorCardDesktop />
      ) : (
        youtube.current.record.trends.map((trend, currentIndex) => {
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
              bg={theme.colors.gradients["grad-cards"]}
              border="0.5px solid"
              borderColor="rgba(255, 255, 255, 0.1);"
              borderRadius={theme.radius.xl}
              boxShadow={theme.shadows["inner-card"]}
              paddingX="48px"
              paddingY="12px"
              width="100%"
              height="161px"
              mb={2}
              display="flex"
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
                  <Menu maxW="162px">
                    <MenuButton minW="40px" isolation="isolate">
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
                          "youtube",
                          currentIndex,
                          trend.title
                        )}
                        data-action="share/whatsapp/share"
                        target="_blank"
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
                          "youtube",
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
    </Box>
  );
};

export default YoutubeCardDesktop;
