import {
  Badge,
  Box,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";

// Utils
import { calculateLines } from "../../../../../utils/calculateLines";
import { getPosition } from "../../../../../utils/position";

// Icons
import ArrowDown from "../../../icons/ArrowDown";
import ArrowUp from "../../../icons/ArrowUp";
import Same from "../../../icons/Same";
import Share from "../../../icons/Share";

// Components
import CardTitle from "../../../TrendCard/CardTitle/CardTitle";

// Theme
import theme from "../../../../../styles/theme";

// Styles
import styles from "./SpotifyCardDesktop.module.css";

const SpotifyCardDesktop = ({
  spotifyArtist,
  spotifyPodcast,
  spotifySong,
  spotifySectionRef,
}) => {
  return (
    <>
      <Box
        id="spotify"
        display="flex"
        width="100%"
        mt={{ base: "24px", lg: "72px" }}
        ref={spotifySectionRef}
      >
        <CardTitle title="Lo más escuchado en Spotify" />
      </Box>
      <Tabs
        variant="soft-rounded"
        colorScheme="green"
        display={{ base: "none", lg: "block" }}
        w="100%"
        className="no-padding"
      >
        <TabList mb="24px" ml={{ base: "16px", lg: 0 }} mt="24px">
          <Tab
            color="white"
            paddingX={{ base: "12px", lg: "16px" }}
            paddingY={{ base: "6px", lg: "8px" }}
            fontSize={{ base: "sm", lg: "md" }}
          >
            Artista
          </Tab>
          <Tab
            color="white"
            paddingX={{ base: "12px", lg: "16px" }}
            paddingY={{ base: "6px", lg: "8px" }}
            fontSize={{ base: "sm", lg: "md" }}
          >
            Canción
          </Tab>
          <Tab
            color="white"
            paddingX={{ base: "12px", lg: "16px" }}
            paddingY={{ base: "6px", lg: "8px" }}
            fontSize={{ base: "sm", lg: "md" }}
          >
            Podcast
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Box
              width="100%"
              flexDirection="column"
              alignContent="space-between"
              paddingX={{ base: "16px", lg: "0" }}
              alignItems="center"
              overflow="auto"
            >
              {spotifyArtist?.current?.record?.trends?.map(
                (trend, currentIndex) => {
                  const elementInPrevious =
                    spotifyArtist?.previous?.record?.trends?.find(
                      element => element.name === trend.name
                    );
                  const prevIndex =
                    spotifyArtist?.previous?.record?.trends?.findIndex(
                      element => element.name === elementInPrevious?.name
                    );
                  return (
                    <>
                      <Box
                        as="article"
                        color={theme.colors.white[500]}
                        bg={theme.colors.indigo[800]}
                        border="1px"
                        borderColor={theme.colors.cyan[150]}
                        borderRadius={theme.radius.xl}
                        paddingX="48px"
                        paddingY="12px"
                        width="100%"
                        height="131px"
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
                          <Box display="flex" gap={6} alignItems="center">
                            <Box
                              display="flex"
                              justifyContent="space-between"
                              alignItems="center"
                              w="80px"
                              className="position-container"
                            >
                              <Text fontSize="4xl">{currentIndex + 1}</Text>
                              {getPosition(currentIndex, prevIndex) ===
                              "down" ? (
                                <ArrowDown />
                              ) : getPosition(currentIndex, prevIndex) ===
                                "up" ? (
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
                            >
                              <a
                                href={trend.link}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Text fontSize="2xl" fontWeight={600}>
                                  {trend.name}
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
                                {trend.streak +
                                  " Semanas seguidas en el top 200 de spotify"}
                              </Badge>
                            </Box>
                          </Box>
                          <Box display="flex" gap={8} alignItems="center">
                            <Share />
                          </Box>
                        </Box>
                      </Box>
                    </>
                  );
                }
              )}
            </Box>
          </TabPanel>
          <TabPanel>
            <Box
              width="100%"
              flexDirection="column"
              alignContent="space-between"
              paddingX={{ base: "16px", lg: "0" }}
              alignItems="center"
            >
              {spotifySong?.current?.record?.trends?.map(
                (trend, currentIndex) => {
                  const elementInPrevious =
                    spotifySong?.previous?.record?.trends?.find(
                      element => element.name === trend.name
                    );
                  const prevIndex =
                    spotifySong?.previous?.record?.trends?.findIndex(
                      element => element.name === elementInPrevious?.name
                    );
                  return (
                    <>
                      <Box
                        as="article"
                        color={theme.colors.white[500]}
                        bg={theme.colors.indigo[800]}
                        border="1px"
                        borderColor={theme.colors.cyan[150]}
                        borderRadius={theme.radius.xl}
                        paddingX="48px"
                        paddingY="12px"
                        width="100%"
                        height="131px"
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
                          <Box display="flex" gap={6} alignItems="center">
                            <Box
                              display="flex"
                              justifyContent="space-between"
                              alignItems="center"
                              width="80px"
                            >
                              <Text fontSize="4xl">{currentIndex + 1}</Text>
                              {getPosition(currentIndex, prevIndex) ===
                              "down" ? (
                                <ArrowDown />
                              ) : getPosition(currentIndex, prevIndex) ===
                                "up" ? (
                                <ArrowUp />
                              ) : (
                                <Same className={styles.same} />
                              )}
                            </Box>
                            <Box
                              display="flex"
                              gap={2}
                              flexDirection="column"
                              maxW="600px"
                              ml={2}
                            >
                              <a
                                href={trend.link}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Text fontSize="2xl" fontWeight={600}>
                                  {trend.name}
                                </Text>
                              </a>
                              <Text
                                fontWeight={600}
                                fontSize="lg"
                                marginTop="-8px"
                                className={calculateLines("escuchado")}
                              >
                                {trend.author}
                              </Text>
                              <Badge
                                className="one-max-line"
                                width="fit-content"
                                fontSize="xs"
                                textTransform="uppercase"
                                variant="outline"
                                colorScheme="#fff"
                                border="1px solid #fff"
                              >
                                {trend.streak + " Semanas seguidas"}
                              </Badge>
                            </Box>
                          </Box>
                          <Box display="flex" gap={8} alignItems="center">
                            <Share />
                          </Box>
                        </Box>
                      </Box>
                    </>
                  );
                }
              )}
            </Box>
          </TabPanel>
          <TabPanel>
            <Box
              width="100%"
              flexDirection="column"
              alignContent="space-between"
              paddingX={{ base: "16px", lg: "0" }}
              alignItems="center"
            >
              {spotifyPodcast?.current?.record?.trends?.map(
                (trend, currentIndex) => {
                  const elementInPrevious =
                    spotifyPodcast?.previous?.record?.trends?.find(
                      element => element.name === trend.name
                    );
                  const prevIndex =
                    spotifyPodcast?.previous?.record?.trends?.findIndex(
                      element => element.name === elementInPrevious?.name
                    );
                  return (
                    <>
                      <Box
                        as="article"
                        color={theme.colors.white[500]}
                        bg={theme.colors.indigo[800]}
                        border="1px"
                        borderColor={theme.colors.cyan[150]}
                        borderRadius={theme.radius.xl}
                        paddingX="48px"
                        paddingY="12px"
                        width="100%"
                        height="131px"
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
                          <Box display="flex" gap={6} alignItems="center">
                            <Box
                              display="flex"
                              justifyContent="space-between"
                              alignItems="center"
                              width="80px"
                            >
                              <Text fontSize="4xl">{currentIndex + 1}</Text>
                              {getPosition(currentIndex, prevIndex) ===
                              "down" ? (
                                <ArrowDown />
                              ) : getPosition(currentIndex, prevIndex) ===
                                "up" ? (
                                <ArrowUp />
                              ) : (
                                <Same className={styles.same} />
                              )}
                            </Box>
                            <Box
                              display="flex"
                              gap={2}
                              flexDirection="column"
                              maxW="600px"
                              ml={2}
                            >
                              <a
                                href={trend.link}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Text fontSize="2xl" fontWeight={600}>
                                  {trend.name}
                                </Text>
                              </a>
                              <Text
                                fontWeight={600}
                                fontSize="lg"
                                marginTop="-8px"
                                className={calculateLines("escuchado")}
                              >
                                {trend.publisher}
                              </Text>
                              <Badge
                                className="one-max-line"
                                width="fit-content"
                                fontSize="xs"
                                textTransform="uppercase"
                                variant="outline"
                                colorScheme="#fff"
                                border="1px solid #fff"
                              >
                                {getPosition(currentIndex, prevIndex) === "down"
                                  ? "En descenso"
                                  : getPosition(currentIndex, prevIndex) ===
                                    "up"
                                  ? "En ascenso"
                                  : "Misma posición"}
                              </Badge>
                            </Box>
                          </Box>
                          <Box display="flex" gap={8} alignItems="center">
                            <Share />
                          </Box>
                        </Box>
                      </Box>
                    </>
                  );
                }
              )}
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default SpotifyCardDesktop;
