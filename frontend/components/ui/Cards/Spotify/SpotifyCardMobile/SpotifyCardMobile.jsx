import React from "react";

import {
  Badge,
  Box,
  Flex,
  Link,
  Menu,
  Portal,
  Tabs,
  Text,
} from "@chakra-ui/react";

// Utils
import { getPosition } from "../../../../../utils/position";
import { calculateLines } from "../../../../../utils/calculateLines";
import {
  getTwitterShareText,
  getWhatsappShareText,
} from "../../../../../utils/shareText";
import { getCrossPlatformLabel } from "../../../../../utils/crossPlatform";

// Icons
import ArrowDownMobile from "../../../icons/ArrowDownMobile";
import ArrowUpMobile from "../../../icons/ArrowUpMobile";
import SameMobile from "../../../icons/SameMobile";
import ThreeDots from "../../../icons/ThreeDots";
import TwitterCompartir from "../../../icons/TwitterCompartir";
import Whatsapp from "../../../icons/Whatsapp";

// Components
import ErrorCardMobile from "../../ErrorCard/ErrorCardMobile/ErrorCardMobile";
import CrossPlatformBadge from "../../../CrossPlatformBadge/CrossPlatformBadge";
import TrendHistoryPopover from "../../../TrendHistoryPopover/TrendHistoryPopover";

// Styles
import theme from "../../../../../styles/theme";
import styles from "./SpotifyCardMobile.module.css";

const SpotifyCardMobile = ({
  spotifyArtist,
  spotifySong,
  spotifyPodcast,
  handleCardClick,
  crossMatches,
}) => {
  const hasArtistData =
    spotifyArtist?.current?.record?.trends?.length &&
    spotifyArtist.current.record.trends.length > 0;
  const hasSongData =
    spotifySong?.current?.record?.trends?.length &&
    spotifySong.current.record.trends.length > 0;
  const hasPodcastData =
    spotifyPodcast?.current?.record?.trends?.length &&
    spotifyPodcast.current.record.trends.length > 0;

  return (
    <Tabs.Root
      isolation="isolate"
      variant="subtle"
      colorPalette="green"
      w="100%"
      className="no-padding"
      display={{ base: "block", lg: "none" }}
      defaultValue="song"
    >
      <Tabs.List mb="24px" pl={0}>
        <Tabs.Trigger
          value="song"
          color="white"
          _selected={{ color: "green.700" }}
          paddingX="12px"
          paddingY="6px"
          fontSize="sm"
          borderRadius="full"
        >
          Canción
        </Tabs.Trigger>
        <Tabs.Trigger
          value="artist"
          color="white"
          _selected={{ color: "green.700" }}
          paddingX="12px"
          paddingY="6px"
          fontSize="sm"
          borderRadius="full"
        >
          Artista
        </Tabs.Trigger>
        <Tabs.Trigger
          value="podcast"
          color="white"
          _selected={{ color: "green.700" }}
          paddingX="12px"
          paddingY="6px"
          fontSize="sm"
          borderRadius="full"
        >
          Podcast
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="song">
        <Box
          width="100%"
          flexDirection="column"
          alignContent="space-between"
          alignItems="center"
          as="ul"
        >
          {!hasSongData ? (
            <ErrorCardMobile />
          ) : (
            spotifySong.current.record.trends.map((trend, currentIndex) => {
              const elementInPrevious =
                spotifySong?.previous?.record?.trends?.find(
                  element => element.name === trend.name
                );
              const prevIndex =
                spotifySong?.previous?.record?.trends?.findIndex(
                  element => element.name === elementInPrevious?.name
                );
              const crossLabel = getCrossPlatformLabel(
                crossMatches,
                trend.name,
                "Spotify"
              );
              return (
                <Box
                  as="li"
                  color={theme.colors.white[500]}
                  bg={theme.colors.gradients["grad-cards"]}
                  border="0.5px solid"
                  borderColor="rgba(255, 255, 255, 0.1);"
                  borderRadius={theme.radius.md}
                  width="100%"
                  minHeight="100px"
                  mb={2}
                  display={{ base: "flex", lg: "none" }}
                  alignItems="center"
                  p="8px 16px"
                  key={trend.name}
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
                            style={{ width: "100%" }}
                          >
                            <Text
                              width="100%"
                              maxW="248px"
                              fontWeight={600}
                              fontSize="16px"
                              className={calculateLines("escuchado")}
                              pr="10px"
                            >
                              {trend.name}
                            </Text>
                          </a>
                          <Flex alignItems="center" gap="8px" flexShrink={0}>
                          <TrendHistoryPopover
                            historyPath="/api/spotify/song-trends/history"
                            matchValue={trend.name}
                            field="name"
                          />
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
                                        "spotify.artist",
                                        currentIndex,
                                        trend.name
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
                                        "spotify.song",
                                        currentIndex,
                                        trend.name
                                      )}
                                      target="_blank"
                                      rel="noopener noreferrer"
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
                          </Flex>
                        </Flex>
                      </Box>
                    </Box>

                    <Box
                      display="flex"
                      w="100%"
                      justifyContent="space-between"
                      alignItems="center"
                      height="100%"
                      marginTop="10px"
                    >
                      <Box maxWidth="80%" display="revert">
                        <Text
                          fontSize="md"
                          className="one-max-line"
                          lineHeight={1.5}
                          mb="4px"
                        >
                          {trend.author}
                        </Text>
                        {crossLabel && (
                          <CrossPlatformBadge label={crossLabel} />
                        )}
                        <Badge
                          className="one-max-line"
                          w="100%"
                          fontSize="xs"
                          fontWeight={400}
                          textTransform="uppercase"
                          variant="outline"
                          paddingX="8px"
                          paddingY="2px"
                          color="#fff"
                          border="1px solid #fff"
                          display="revert"
                        >
                          {trend.streams + " reproducciones"}
                        </Badge>
                      </Box>

                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        width="50px"
                        ml="revert"
                      >
                        <Text fontSize="2xl" mr="4px" lineHeight={1}>
                          {currentIndex + 1}
                        </Text>
                        {getPosition(currentIndex, prevIndex) === "down" ? (
                          <ArrowDownMobile />
                        ) : getPosition(currentIndex, prevIndex) === "up" ? (
                          <ArrowUpMobile />
                        ) : (
                          <SameMobile className={styles.same} />
                        )}
                      </Box>
                    </Box>
                  </Box>
                </Box>
              );
            })
          )}
        </Box>
      </Tabs.Content>

      <Tabs.Content value="artist">
        <Box
          width="100%"
          flexDirection="column"
          alignContent="space-between"
          alignItems="center"
          overflow="auto"
          as="ul"
        >
          {!hasArtistData ? (
            <ErrorCardMobile />
          ) : (
            spotifyArtist.current.record.trends.map((trend, currentIndex) => {
              const elementInPrevious =
                spotifyArtist?.previous?.record?.trends?.find(
                  element => element.name === trend.name
                );
              const prevIndex =
                spotifyArtist?.previous?.record?.trends?.findIndex(
                  element => element.name === elementInPrevious?.name
                );
              const crossLabel = getCrossPlatformLabel(
                crossMatches,
                trend.name,
                "Spotify"
              );
              return (
                <Box
                  as="li"
                  key={trend.name}
                  color={theme.colors.white[500]}
                  bg={theme.colors.gradients["grad-cards"]}
                  border="0.5px solid"
                  borderColor="rgba(255, 255, 255, 0.1);"
                  borderRadius={theme.radius.md}
                  width="100%"
                  minHeight="100px"
                  mb={2}
                  display={{ base: "flex", lg: "none" }}
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
                              className={calculateLines("escuchado")}
                              pr="10px"
                            >
                              {trend.name}
                            </Text>
                          </a>
                          <Flex alignItems="center" gap="8px" flexShrink={0}>
                          <TrendHistoryPopover
                            historyPath="/api/spotify/artist-trends/history"
                            matchValue={trend.name}
                            field="name"
                          />
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
                                        "spotify.artist",
                                        currentIndex,
                                        trend.name
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
                                        "spotify.artist",
                                        currentIndex,
                                        trend.name
                                      )}
                                      target="_blank"
                                      rel="noopener noreferrer"
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
                          </Flex>
                        </Flex>
                      </Box>
                    </Box>

                    <Box
                      display="flex"
                      w="100%"
                      justifyContent="space-between"
                      alignItems="center"
                      height="100%"
                      marginTop="10px"
                    >
                      <Box maxWidth="80%" display="revert">
                        {crossLabel && (
                          <CrossPlatformBadge label={crossLabel} />
                        )}
                        <Badge
                          h="100%"
                          fontSize="xs"
                          textTransform="uppercase"
                          variant="outline"
                          paddingX="8px"
                          paddingY="2px"
                          color="#fff"
                          border="1px solid #fff"
                          display="flex"
                          whiteSpace="wrap"
                          fontWeight={400}
                          w="217px"
                        >
                          {trend.streak +
                            " Semanas seguidas en el top 200 de Spotify"}
                        </Badge>
                      </Box>

                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        width="50px"
                        ml="revert"
                      >
                        <Text fontSize="2xl" mr="4px" lineHeight={1}>
                          {currentIndex + 1}
                        </Text>
                        {getPosition(currentIndex, prevIndex) === "down" ? (
                          <ArrowDownMobile />
                        ) : getPosition(currentIndex, prevIndex) === "up" ? (
                          <ArrowUpMobile />
                        ) : (
                          <SameMobile className={styles.same} />
                        )}
                      </Box>
                    </Box>
                  </Box>
                </Box>
              );
            })
          )}
        </Box>
      </Tabs.Content>

      <Tabs.Content value="podcast">
        <Box
          width="100%"
          flexDirection="column"
          alignContent="space-between"
          alignItems="center"
          overflow="auto"
          as="ul"
        >
          {!hasPodcastData ? (
            <ErrorCardMobile />
          ) : (
            spotifyPodcast.current.record.trends.map(
              (trend, currentIndex) => {
                const elementInPrevious =
                  spotifyPodcast?.previous?.record?.trends?.find(
                    element => element.name === trend.name
                  );
                const prevIndex =
                  spotifyPodcast?.previous?.record?.trends?.findIndex(
                    element => element.name === elementInPrevious?.name
                  );
                const crossLabel = getCrossPlatformLabel(
                  crossMatches,
                  trend.name,
                  "Spotify"
                );
                return (
                  <Box
                    as="li"
                    color={theme.colors.white[500]}
                    bg={theme.colors.gradients["grad-cards"]}
                    border="0.5px solid"
                    borderColor="rgba(255, 255, 255, 0.1);"
                    borderRadius={theme.radius.md}
                    width="100%"
                    minHeight="100px"
                    mb={2}
                    display={{ base: "flex", lg: "none" }}
                    alignItems="center"
                    p="14px 16px"
                    key={trend.name}
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
                      height="100%"
                      flexDir="column"
                    >
                      <Box
                        display="flex"
                        width="100%"
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
                              maxW="248px"
                              fontWeight={600}
                              fontSize="16px"
                              className={calculateLines("escuchado")}
                              pr="10px"
                            >
                              {trend.name}
                            </Text>

                            <Flex alignItems="center" gap="8px" flexShrink={0}>
                            <TrendHistoryPopover
                              historyPath="/api/spotify/podcast-trends/history"
                              matchValue={trend.name}
                              field="name"
                            />
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
                                          "spotify.podcast",
                                          currentIndex,
                                          trend.name
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
                                          "spotify.podcast",
                                          currentIndex,
                                          trend.name
                                        )}
                                        target="_blank"
                                        rel="noopener noreferrer"
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
                            </Flex>
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
                          <Text
                            fontWeight={400}
                            fontSize="16px"
                            marginTop="-8px"
                            className={calculateLines("escuchado")}
                          >
                            {trend.publisher}
                          </Text>
                          {crossLabel && (
                            <CrossPlatformBadge label={crossLabel} />
                          )}
                        </Box>

                        <Box
                          display="flex"
                          justifyContent="space-between"
                          alignItems="center"
                          width="50px"
                          ml="revert"
                        >
                          <Text fontSize="2xl" mr="4px" lineHeight={1}>
                            {currentIndex + 1}
                          </Text>
                          {getPosition(currentIndex, prevIndex) === "down" ? (
                            <ArrowDownMobile />
                          ) : getPosition(currentIndex, prevIndex) ===
                            "up" ? (
                            <ArrowUpMobile />
                          ) : (
                            <SameMobile className={styles.same} />
                          )}
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                );
              }
            )
          )}
        </Box>
      </Tabs.Content>
    </Tabs.Root>
  );
};

export default React.memo(SpotifyCardMobile);
