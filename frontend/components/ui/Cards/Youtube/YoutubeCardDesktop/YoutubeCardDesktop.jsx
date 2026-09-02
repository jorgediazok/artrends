import {
  Badge,
  Box,
  Link,
  Menu,
  Portal,
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
import { getCrossPlatformLabel } from "../../../../../utils/crossPlatform";

// Icons
import ArrowDown from "../../../icons/ArrowDown";
import ArrowUp from "../../../icons/ArrowUp";
import Same from "../../../icons/Same";
import Share from "../../../icons/Share";
import TwitterCompartir from "../../../icons/TwitterCompartir";
import Whatsapp from "../../../icons/Whatsapp";

// Components
import ErrorCardDesktop from "../../ErrorCard/ErrorCardDesktop/ErrorCardDesktop";
import CrossPlatformBadge from "../../../CrossPlatformBadge/CrossPlatformBadge";
import TrendHistoryPopover from "../../../TrendHistoryPopover/TrendHistoryPopover";

// Styles
import styles from "./YoutubeCardDesktop.module.css";

const YoutubeCardDesktop = ({ youtube, crossMatches }) => {
  const handleCardClick = (e, link) => {
    if (e.target.closest("a, button")) {
      return;
    }

    window.open(link, "_blank");

    if (e.target.dataset.link === "channel") {
      e.stopPropagation();
    }
  };

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
          const crossLabel = getCrossPlatformLabel(
            crossMatches,
            trend.title,
            "YouTube"
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
              minHeight="161px"
              mb={2}
              display="flex"
              alignItems="center"
              key={trend.title}
              role="link"
              tabIndex={0}
              onClick={e => handleCardClick(e, trend.link)}
              cursor="pointer"
              _hover={{ transform: "translateY(-2.5px)" }}
              _active={{ boxShadow: "none", transform: "translateY(0)" }}
              transition="300ms all ease"
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
                    maxW="85%"
                  >
                    <Text
                      fontWeight={600}
                      fontSize="xl"
                      className={calculateLines("visto")}
                    >
                      {trend.title}
                    </Text>

                    <Text
                      fontSize="xl"
                      data-link="channel"
                      onClick={e => {
                        handleCardClick(e, trend.channelLink);
                      }}
                    >
                      {trend.channel}
                    </Text>

                    {crossLabel && <CrossPlatformBadge label={crossLabel} />}

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
                      {trend.amount && `${trend.amount} reproducciones`}
                    </Badge>
                  </Box>
                </Box>
                <Box display="flex" gap={8} alignItems="center">
                  <TrendHistoryPopover
                    historyPath="/api/youtube-trends/history"
                    matchValue={trend.title}
                    field="title"
                  />
                  <Menu.Root maxW="162px">
                    <Menu.Trigger minW="40px" isolation="isolate">
                      <Share />
                    </Menu.Trigger>
                    <Portal>
                      <Menu.Positioner>
                        <Menu.Content
                          maxWidth="190px"
                          minWidth="190px"
                          backgroundColor="indigo.600"
                          borderRadius="6px"
                          padding="6px"
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
                                "youtube",
                                currentIndex,
                                trend.title
                              )}
                              data-action="share/whatsapp/share"
                              target="_blank"
                              aria-label="Compartir en WhatsApp"
                              display="flex"
                              flexDirection="row-reverse"
                              alignItems="center"
                              gap="10px"
                              width="100%"
                              paddingX="10px"
                              paddingY="8px"
                              borderRadius="4px"
                              _hover={{ backgroundColor: "indigo.300" }}
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
                                "youtube",
                                currentIndex,
                                trend.title
                              )}
                              target="_blank"
                              rel="noreferrer"
                              aria-label="Compartir en X"
                              display="flex"
                              flexDirection="row-reverse"
                              alignItems="center"
                              gap="10px"
                              width="100%"
                              paddingX="10px"
                              paddingY="8px"
                              borderRadius="4px"
                              _hover={{ backgroundColor: "indigo.300" }}
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
