import {
  Badge,
  Box,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { getPosition } from "../../../../../utils/position";
import { calculateLines } from "../../../../../utils/calculateLines";
import ArrowDownMobile from "../../../icons/ArrowDownMobile";
import ArrowUpMobile from "../../../icons/ArrowUpMobile";
import SameMobile from "../../../icons/SameMobile";
import theme from "../../../../../styles/theme";
import ThreeDots from "../../../icons/ThreeDots";
import styles from "./SpotifyCardMobile.module.css";

const SpotifyCardMobile = ({ spotifyArtist, spotifySong, spotifyPodcast }) => {
  return (
    <Tabs
      variant="soft-rounded"
      colorScheme="green"
      w="100%"
      className="no-padding"
      display={{ base: "block", lg: "none" }}
    >
      <TabList mb="24px" ml="16px" mt="24px">
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
                      borderRadius={theme.radius.md}
                      width="100%"
                      height="100px"
                      mb={2}
                      display={{ base: "flex", lg: "none" }}
                      alignItems="center"
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

                              <ThreeDots />
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
                            <Badge
                              className="one-max-line"
                              w="100%"
                              fontSize="sm"
                              textTransform="uppercase"
                              variant="outline"
                              colorScheme="#fff"
                              border="1px solid #fff"
                              display="revert"
                            >
                              {trend.streak + " Semanas seguidas en el top"}
                            </Badge>
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
            paddingX="16px"
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
                      borderRadius={theme.radius.md}
                      width="100%"
                      height="100px"
                      mb={2}
                      display={{ base: "flex", lg: "none" }}
                      alignItems="center"
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
                              <ThreeDots />
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
                            <Badge
                              className="one-max-line"
                              w="100%"
                              fontSize="sm"
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
                          >
                            <Text fontSize="2xl" mr="4px">
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
                      borderRadius={theme.radius.md}
                      width="100%"
                      height="100px"
                      mb={2}
                      display={{ base: "flex", lg: "none" }}
                      alignItems="center"
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
                              <ThreeDots />
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
                          >
                            <Text fontSize="2xl" mr="4px">
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
                  </>
                );
              }
            )}
          </Box>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default SpotifyCardMobile;
