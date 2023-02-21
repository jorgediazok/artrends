import {
  Badge,
  Box,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
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
import Whatsapp from "../../../icons/Whatsapp";
import TwitterCompartir from "../../../icons/TwitterCompartir";
import ErrorCardDesktop from "../../ErrorCard/ErrorCardDesktop/ErrorCardDesktop";

// Theme
import theme from "../../../../../styles/theme";

// Styles
import styles from "./SpotifyCardDesktop.module.css";

const SpotifyCardDesktop = ({ spotifyArtist, spotifyPodcast, spotifySong }) => {
  return (
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
            {spotifyArtist?.current?.record?.trends?.length === 0 ? (
              <ErrorCardDesktop />
            ) : (
              spotifyArtist?.current?.record?.trends?.map(
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
                      key={trend.name}
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
                            ) : getPosition(currentIndex, prevIndex) ===
                              "up" ? (
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
                              fontWeight={500}
                              colorScheme="#fff"
                              border="1px solid #fff"
                            >
                              {trend.streak +
                                " Semanas seguidas en el top 200 de spotify"}
                            </Badge>
                          </Box>
                        </Box>
                        <Box display="flex" gap={8} alignItems="center">
                          <Menu>
                            <MenuButton isolation="isolate">
                              <Share />
                            </MenuButton>
                            <MenuList
                              maxWidth="162px"
                              minWidth="162px"
                              backgroundColor="#27238F"
                              borderRadius="6px"
                              padding="6px 0px"
                              zIndex="10"
                              boxShadow="75px 75px 43px rgba(0, 0, 0, 0.01), 42px 42px 36px rgba(0, 0, 0, 0.05), 19px 19px 27px rgba(0, 0, 0, 0.09), 5px 5px 15px rgba(0, 0, 0, 0.1), 0px 0px 0px rgba(0, 0, 0, 0.1);"
                              border="none"
                            >
                              <MenuItem
                                backgroundColor="#27238F"
                                color="#FFFFFF"
                                as="a"
                                fontSize="md"
                                href={`https://api.whatsapp.com/send?text=En%20este%20momento%20${encodeURIComponent(
                                  trend.name
                                )}%20está%20en%20el%20puesto%20N°%20${
                                  currentIndex + 1
                                }%20en%20tendencias%20en%20artistas%20en%20Spotify%20Argentina.%20Mirá%20más%20en%20Artrends%20%23Artrends"
                                  `}
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
                                backgroundColor="#27238F"
                                color="#FFFFFF"
                                as="a"
                                fontSize="md"
                                href={`https://twitter.com/intent/tweet?url=artrends.ar&text=En%20este%20momento%20${encodeURIComponent(
                                  trend.name
                                )}%20está%20en%20el%20puesto%20N°%20${
                                  currentIndex + 1
                                }%20en%20tendencias%20en%20artistas%20en%20Spotify%20Argentina.%20Mirá%20más%20en%20Artrends%20%23Artrends`}
                                target="_blank"
                                rel="noopener noreferrer"
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
                }
              )
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
            {spotifySong?.current?.record?.trends?.length === 0 ? (
              <ErrorCardDesktop />
            ) : (
              spotifySong?.current?.record?.trends?.map(
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
                      key={trend.name}
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
                              {trend.streams + " reproducciones"}
                            </Badge>
                          </Box>
                        </Box>
                        <Box display="flex" gap={8} alignItems="center">
                          <Menu>
                            <MenuButton isolation="isolate">
                              <Share />
                            </MenuButton>
                            <MenuList
                              maxWidth="162px"
                              minWidth="162px"
                              backgroundColor="#27238F"
                              borderRadius="6px"
                              padding="6px 0px"
                              zIndex="10"
                              boxShadow="75px 75px 43px rgba(0, 0, 0, 0.01), 42px 42px 36px rgba(0, 0, 0, 0.05), 19px 19px 27px rgba(0, 0, 0, 0.09), 5px 5px 15px rgba(0, 0, 0, 0.1), 0px 0px 0px rgba(0, 0, 0, 0.1);"
                              border="none"
                            >
                              <MenuItem
                                backgroundColor="#27238F"
                                color="#FFFFFF"
                                as="a"
                                fontSize="md"
                                href={`https://api.whatsapp.com/send?text=En%20este%20momento%20${encodeURIComponent(
                                  trend.name
                                )}%20está%20en%20el%20puesto%20N°%20${
                                  currentIndex + 1
                                }%20en%20tendencias%20en%20canciones%20en%20Spotify%20Argentina.%20Mirá%20más%20en%20Artrends%20%23Artrends"
                                  `}
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
                                backgroundColor="#27238F"
                                color="#FFFFFF"
                                as="a"
                                fontSize="md"
                                href={`https://twitter.com/intent/tweet?url=artrends.ar&text=En%20este%20momento%20${encodeURIComponent(
                                  trend.name
                                )}%20está%20en%20el%20puesto%20N°%20${
                                  currentIndex + 1
                                }%20en%20tendencias%20en%20canciones%20en%20Spotify%20Argentina.%20Mirá%20más%20en%20Artrends%20%23Artrends`}
                                target="_blank"
                                rel="noopener noreferrer"
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
                }
              )
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
            {spotifyPodcast?.current?.record?.trends?.length === 0 ? (
              <ErrorCardDesktop />
            ) : (
              spotifyPodcast?.current?.record?.trends?.map(
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
                      key={trend.name}
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
                          <Box
                            display="flex"
                            ml={2}
                            flexDirection="column"
                            maxW="600px"
                            gap="20px"
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
                          </Box>
                        </Box>
                        <Box display="flex" gap={8} alignItems="center">
                          <Menu>
                            <MenuButton isolation="isolate">
                              <Share />
                            </MenuButton>
                            <MenuList
                              maxWidth="162px"
                              minWidth="162px"
                              backgroundColor="#27238F"
                              borderRadius="6px"
                              padding="6px 0px"
                              zIndex="10"
                              boxShadow="75px 75px 43px rgba(0, 0, 0, 0.01), 42px 42px 36px rgba(0, 0, 0, 0.05), 19px 19px 27px rgba(0, 0, 0, 0.09), 5px 5px 15px rgba(0, 0, 0, 0.1), 0px 0px 0px rgba(0, 0, 0, 0.1);"
                              border="none"
                            >
                              <MenuItem
                                backgroundColor="#27238F"
                                color="#FFFFFF"
                                as="a"
                                fontSize="md"
                                href={`https://api.whatsapp.com/send?text=En%20este%20momento%20${encodeURIComponent(
                                  trend.name
                                )}%20está%20en%20el%20puesto%20N°%20${
                                  currentIndex + 1
                                }%20en%20tendencias%20en%20podcasts%20en%20Spotify%20Argentina.%20Mirá%20más%20en%20Artrends%20%23Artrends"
                                  `}
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
                                backgroundColor="#27238F"
                                color="#FFFFFF"
                                as="a"
                                fontSize="md"
                                href={`https://twitter.com/intent/tweet?url=artrends.ar&text=En%20este%20momento%20${encodeURIComponent(
                                  trend.name
                                )}%20está%20en%20el%20puesto%20N°%20${
                                  currentIndex + 1
                                }%20en%20tendencias%20en%20podcasts%20en%20Spotify%20Argentina.%20Mirá%20más%20en%20Artrends%20%23Artrends`}
                                target="_blank"
                                rel="noopener noreferrer"
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
                }
              )
            )}
          </Box>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default SpotifyCardDesktop;
