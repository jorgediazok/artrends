import {
  Badge,
  Box,
  Flex,
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
import { getPosition } from "../../../../../utils/position";
import { calculateLines } from "../../../../../utils/calculateLines";
import {
  getTwitterShareText,
  getWhatsappShareText,
} from "../../../../../utils/shareText";

// Icons
import ArrowDownMobile from "../../../icons/ArrowDownMobile";
import ArrowUpMobile from "../../../icons/ArrowUpMobile";
import SameMobile from "../../../icons/SameMobile";
import ThreeDots from "../../../icons/ThreeDots";
import TwitterCompartir from "../../../icons/TwitterCompartir";

// Components
import ErrorCardMobile from "../../ErrorCard/ErrorCardMobile/ErrorCardMobile";

// Styles
import theme from "../../../../../styles/theme";
import styles from "./SpotifyCardMobile.module.css";
import Whatsapp from "../../../icons/Whatsapp";

const SpotifyCardMobile = ({ spotifyArtist, spotifySong, spotifyPodcast }) => {
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
    <Tabs
      isolation="isolate"
      variant="soft-rounded"
      colorScheme="green"
      w="100%"
      className="no-padding"
      display={{ base: "block", lg: "none" }}
    >
      <TabList mb="24px" pl="16px">
        <Tab color="white" paddingX="12px" paddingY="6px" fontSize="sm">
          Artista
        </Tab>
        <Tab color="white" paddingX="12px" paddingY="6px" fontSize="sm">
          Canción
        </Tab>
        <Tab color="white" paddingX="12px" paddingY="6px" fontSize="sm">
          Podcast
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <Box
            width="100%"
            flexDirection="column"
            alignContent="space-between"
            paddingX="16px"
            alignItems="center"
            overflow="auto"
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
                return (
                  <Box
                    as="article"
                    key={trend.name}
                    color={theme.colors.white[500]}
                    bg={theme.colors.gradients["grad-cards"]}
                    border="0.5px solid"
                    borderColor="rgba(255, 255, 255, 0.1);"
                    borderRadius={theme.radius.md}
                    width="100%"
                    height="100px"
                    mb={2}
                    display={{ base: "flex", lg: "none" }}
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
                                    "spotify.artist",
                                    currentIndex,
                                    trend.name
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
                                    "spotify.artist",
                                    currentIndex,
                                    trend.name
                                  )}
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
                        position="relative"
                      >
                        <Box maxWidth="80%" display="revert">
                          <Badge
                            h="100%"
                            fontSize="xs"
                            textTransform="uppercase"
                            variant="outline"
                            colorScheme="#fff"
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
                          position="absolute"
                          bottom={0}
                          right={0}
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
        </TabPanel>
        <TabPanel>
          <Box
            width="100%"
            flexDirection="column"
            alignContent="space-between"
            paddingX="16px"
            alignItems="center"
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
                return (
                  <Box
                    as="article"
                    color={theme.colors.white[500]}
                    bg={theme.colors.gradients["grad-cards"]}
                    border="0.5px solid"
                    borderColor="rgba(255, 255, 255, 0.1);"
                    borderRadius={theme.radius.md}
                    width="100%"
                    height="100px"
                    mb={2}
                    display={{ base: "flex", lg: "none" }}
                    alignItems="center"
                    p="8px 16px"
                    key={trend.name}
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
                                    "spotify.artist",
                                    currentIndex,
                                    trend.name
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
                                    "spotify.song",
                                    currentIndex,
                                    trend.name
                                  )}
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
                        position="relative"
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
                          <Badge
                            className="one-max-line"
                            w="100%"
                            fontSize="xs"
                            fontWeight={400}
                            textTransform="uppercase"
                            variant="outline"
                            colorScheme="#fff"
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
                          position="absolute"
                          bottom={0}
                          right={0}
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
        </TabPanel>
        <TabPanel>
          <Box
            width="100%"
            flexDirection="column"
            alignContent="space-between"
            paddingX={{ base: "16px", lg: "0" }}
            alignItems="center"
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
                  return (
                    <Box
                      as="article"
                      color={theme.colors.white[500]}
                      bg={theme.colors.gradients["grad-cards"]}
                      border="0.5px solid"
                      borderColor="rgba(255, 255, 255, 0.1);"
                      borderRadius={theme.radius.md}
                      width="100%"
                      height="100px"
                      mb={2}
                      display={{ base: "flex", lg: "none" }}
                      alignItems="center"
                      p="14px 16px"
                      key={trend.name}
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
                              <a
                                href={trend.link}
                                target="_blank"
                                rel="noopener noreferrer"
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
                                      "spotify.podcast",
                                      currentIndex,
                                      trend.name
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
                                      "spotify.podcast",
                                      currentIndex,
                                      trend.name
                                    )}
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
                            </Flex>
                          </Box>
                        </Box>

                        <Box
                          display="flex"
                          w="100%"
                          justifyContent="space-between"
                          alignItems="center"
                          height="100%"
                          position="relative"
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
                          </Box>

                          <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            width="50px"
                            ml="revert"
                            position="absolute"
                            bottom={0}
                            right={0}
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
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default SpotifyCardMobile;
