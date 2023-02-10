import {
  Box,
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
import styles from "./PortalesCardDesktop.module.css";

const PortalesDesktop = ({ portalSectionRef, portals }) => {
  return (
    <>
      <Box
        id="portals"
        display="flex"
        width="100%"
        mt={{ base: "24px", lg: "72px" }}
        ref={portalSectionRef}
      >
        <CardTitle title="Lo más leído en portales de noticias" />
      </Box>
      <Tabs
        variant="soft-rounded"
        colorScheme="green"
        width="100%"
        display={{ base: "none", lg: "block" }}
        overflow="auto"
        className="no-padding"
        mt="24px"
      >
        <TabList mb="24px" ml={{ base: "16px", lg: "0px" }}>
          <Tab
            color="white"
            paddingX={{ base: "12px", lg: "16px" }}
            paddingY={{ base: "6px", lg: "8px" }}
            fontSize={{ base: "xs", lg: "md" }}
          >
            La Nación
          </Tab>
          <Tab
            color="white"
            paddingX={{ base: "12px", lg: "16px" }}
            paddingY={{ base: "6px", lg: "8px" }}
            fontSize={{ base: "xs", lg: "md" }}
          >
            El Destape
          </Tab>
          <Tab
            color="white"
            paddingX={{ base: "12px", lg: "16px" }}
            paddingY={{ base: "6px", lg: "8px" }}
            fontSize={{ base: "xs", lg: "md" }}
          >
            Clarín
          </Tab>
          <Tab
            color="white"
            paddingX={{ base: "12px", lg: "16px" }}
            paddingY={{ base: "6px", lg: "8px" }}
            fontSize={{ base: "xs", lg: "md" }}
          >
            Télam
          </Tab>
          <Tab
            color="white"
            paddingX={{ base: "12px", lg: "16px" }}
            paddingY={{ base: "6px", lg: "8px" }}
            fontSize={{ base: "xs", lg: "md" }}
          >
            Infobae
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Box
              width="100%"
              flexDirection="column"
              alignContent="space-between"
              alignItems="center"
            >
              {portals?.current?.laNacion?.record?.trends?.map(
                (trend, currentIndex) => {
                  const elementInPrevious =
                    portals?.previous?.laNacion?.record?.trends?.find(
                      element => element.article === trend.article
                    );
                  const prevIndex =
                    portals?.previous?.laNacion?.record?.trends?.findIndex(
                      element => element.article === elementInPrevious?.article
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
                        height="157px"
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
                                <Text
                                  fontWeight={600}
                                  fontSize="2xl"
                                  className={calculateLines("leido")}
                                >
                                  {trend.article}
                                </Text>
                              </a>
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
              {portals?.current?.elDestape?.record?.trends?.map(
                (trend, currentIndex) => {
                  const elementInPrevious =
                    portals?.previous?.elDestape?.record?.trends?.find(
                      element => element.article === trend.article
                    );
                  const prevIndex =
                    portals?.previous?.elDestape?.record?.trends?.findIndex(
                      element => element.article === elementInPrevious?.article
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
                        height="157px"
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
                                <Text
                                  fontWeight={600}
                                  fontSize="2xl"
                                  className={calculateLines("leido")}
                                >
                                  {trend.article}
                                </Text>
                              </a>
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
              {portals?.current?.clarin?.record?.trends?.map(
                (trend, currentIndex) => {
                  const elementInPrevious =
                    portals?.previous?.clarin?.record?.trends?.find(
                      element => element.article === trend.article
                    );
                  const prevIndex =
                    portals?.previous?.clarin?.record?.trends?.findIndex(
                      element => element.article === elementInPrevious?.article
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
                        height="157px"
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
                                <Text
                                  fontWeight={600}
                                  fontSize="2xl"
                                  className={calculateLines("leido")}
                                >
                                  {trend.article}
                                </Text>
                              </a>
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
              {portals?.current?.telam?.record?.trends?.map(
                (trend, currentIndex) => {
                  const elementInPrevious =
                    portals?.previous?.telam?.record?.trends?.find(
                      element => element.article === trend.article
                    );
                  const prevIndex =
                    portals?.previous?.telam?.record?.trends?.findIndex(
                      element => element.article === elementInPrevious?.article
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
                        height="157px"
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
                                <Text
                                  fontWeight={600}
                                  fontSize="2xl"
                                  className={calculateLines("leido")}
                                >
                                  {trend.article}
                                </Text>
                              </a>
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
              {portals?.current?.infobae?.record?.trends?.map(
                (trend, currentIndex) => {
                  const elementInPrevious =
                    portals?.previous?.infobae?.record?.trends?.find(
                      element => element.article === trend.article
                    );
                  const prevIndex =
                    portals?.previous?.infobae?.record?.trends?.findIndex(
                      element => element.article === elementInPrevious?.article
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
                        height="157px"
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
                                <Text
                                  fontWeight={600}
                                  fontSize="2xl"
                                  className={calculateLines("leido")}
                                >
                                  {trend.article}
                                </Text>
                              </a>
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

export default PortalesDesktop;
