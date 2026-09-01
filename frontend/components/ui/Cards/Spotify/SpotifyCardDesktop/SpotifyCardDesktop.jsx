import {
  Badge,
  Box,
  Link,
  Menu,
  Portal,
  Tabs,
  Text,
} from "@chakra-ui/react";

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
import Whatsapp from "../../../icons/Whatsapp";
import TwitterCompartir from "../../../icons/TwitterCompartir";

// Components
import ErrorCardDesktop from "../../ErrorCard/ErrorCardDesktop/ErrorCardDesktop";
import CrossPlatformBadge from "../../../CrossPlatformBadge/CrossPlatformBadge";
import TrendHistoryPopover from "../../../TrendHistoryPopover/TrendHistoryPopover";

// Theme
import theme from "../../../../../styles/theme";

// Styles
import styles from "./SpotifyCardDesktop.module.css";

const SpotifyCardDesktop = ({
  spotifyArtist,
  spotifyPodcast,
  spotifySong,
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
      variant="subtle"
      colorPalette="green"
      display={{ base: "none", lg: "block" }}
      w="100%"
      className="no-padding"
      defaultValue="song"
    >
      <Tabs.List mb="24px" ml={{ base: "16px", lg: 0 }} mt="24px">
        <Tabs.Trigger
          value="song"
          color="white"
          _selected={{ color: "green.700" }}
          paddingX={{ base: "12px", lg: "16px" }}
          paddingY={{ base: "6px", lg: "8px" }}
          fontSize={{ base: "sm", lg: "md" }}
          borderRadius="full"
        >
          Canción
        </Tabs.Trigger>
        <Tabs.Trigger
          value="artist"
          color="white"
          _selected={{ color: "green.700" }}
          paddingX={{ base: "12px", lg: "16px" }}
          paddingY={{ base: "6px", lg: "8px" }}
          fontSize={{ base: "sm", lg: "md" }}
          borderRadius="full"
        >
          Artista
        </Tabs.Trigger>
        <Tabs.Trigger
          value="podcast"
          color="white"
          _selected={{ color: "green.700" }}
          paddingX={{ base: "12px", lg: "16px" }}
          paddingY={{ base: "6px", lg: "8px" }}
          fontSize={{ base: "sm", lg: "md" }}
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
          paddingX={{ base: "16px", lg: "0" }}
          alignItems="center"
        >
          {!hasSongData ? (
            <ErrorCardDesktop />
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
                  minHeight="131px"
                  mb={2}
                  key={trend.name}
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
                        width="80px"
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
                      <a
                        href={trend.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Box
                          display="flex"
                          gap={2}
                          flexDirection="column"
                          maxW="600px"
                          ml={2}
                        >
                          <Text fontSize="2xl" fontWeight={600}>
                            {trend.name}
                          </Text>
                          <Text
                            fontWeight={600}
                            fontSize="lg"
                            marginTop="-8px"
                            className={calculateLines("escuchado")}
                          >
                            {trend.author}
                          </Text>
                          {crossLabel && (
                            <CrossPlatformBadge label={crossLabel} />
                          )}
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
                            {trend.streams + " reproducciones"}
                          </Badge>
                        </Box>
                      </a>
                    </Box>
                    <Box display="flex" gap={8} alignItems="center">
                      <TrendHistoryPopover
                        historyPath="/api/spotify/song-trends/history"
                        matchValue={trend.name}
                        field="name"
                      />
                      <Menu.Root>
                        <Menu.Trigger
                          isolation="isolate"
                          title="Ver opciones para esta tendencia"
                        >
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
          paddingX={{ base: "16px", lg: "0" }}
          alignItems="center"
          overflow="auto"
        >
          {!hasArtistData ? (
            <ErrorCardDesktop />
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
                  minHeight="131px"
                  mb={2}
                  display="flex"
                  alignItems="center"
                  key={trend.name}
                  role="link"
                  tabIndex={0}
                  onClick={handleCardClick}
                  cursor="pointer"
                  _hover={{ transform: "translateY(-2.5px)" }}
                  _active={{ boxShadow: "none", transform: "translateY(0)" }}
                  transition="300ms all ease"
                  data-link={trend.link}
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
                        gap="20px"
                        flexDirection="column"
                        ml={0}
                      >
                        <Text fontSize="2xl" fontWeight={600}>
                          {trend.name}
                        </Text>
                        {crossLabel && (
                          <CrossPlatformBadge label={crossLabel} />
                        )}
                        <Badge
                          className="one-max-line"
                          width="fit-content"
                          fontSize="xs"
                          textTransform="uppercase"
                          variant="outline"
                          paddingX="8px"
                          paddingY="2px"
                          fontWeight={500}
                          color="#fff"
                          border="1px solid #fff"
                        >
                          {trend.streak +
                            " Semanas seguidas en el top 200 de spotify"}
                        </Badge>
                      </Box>
                    </Box>
                    <Box display="flex" gap={8} alignItems="center">
                      <TrendHistoryPopover
                        historyPath="/api/spotify/artist-trends/history"
                        matchValue={trend.name}
                        field="name"
                      />
                      <Menu.Root>
                        <Menu.Trigger
                          isolation="isolate"
                          title="Ver opciones para esta tendencia"
                        >
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
          paddingX={{ base: "16px", lg: "0" }}
          alignItems="center"
        >
          {!hasPodcastData ? (
            <ErrorCardDesktop />
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
                    minHeight="131px"
                    mb={2}
                    display={{ base: "none", lg: "flex" }}
                    alignItems="center"
                    key={trend.name}
                    _hover={{ transform: "translateY(-2.5px)" }}
                    _active={{
                      boxShadow: "none",
                      transform: "translateY(0)",
                    }}
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
                          width="80px"
                        >
                          <Text fontSize="4xl">{currentIndex + 1}</Text>
                          {getPosition(currentIndex, prevIndex) === "down" ? (
                            <ArrowDown />
                          ) : getPosition(currentIndex, prevIndex) ===
                            "up" ? (
                            <ArrowUp />
                          ) : (
                            <Same className={styles.same} />
                          )}
                        </Box>
                        <a
                          href={trend.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Box
                            display="flex"
                            ml={2}
                            flexDirection="column"
                            maxW="600px"
                            gap="20px"
                          >
                            <Text fontSize="2xl" fontWeight={600}>
                              {trend.name}
                            </Text>
                            <Text
                              fontWeight={600}
                              fontSize="lg"
                              marginTop="-8px"
                              className={calculateLines("escuchado")}
                            >
                              {trend.publisher}
                            </Text>
                            {crossLabel && (
                              <CrossPlatformBadge label={crossLabel} />
                            )}
                          </Box>
                        </a>
                      </Box>
                      <Box display="flex" gap={8} alignItems="center">
                        <TrendHistoryPopover
                          historyPath="/api/spotify/podcast-trends/history"
                          matchValue={trend.name}
                          field="name"
                        />
                        <Menu.Root>
                          <Menu.Trigger
                            isolation="isolate"
                            title="Ver opciones para esta tendencia"
                          >
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

export default SpotifyCardDesktop;
