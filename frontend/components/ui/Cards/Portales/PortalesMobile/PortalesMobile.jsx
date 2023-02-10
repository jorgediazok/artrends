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
import theme from "../../../../../styles/theme";
import { calculateLines } from "../../../../../utils/calculateLines";
import { getPosition } from "../../../../../utils/position";
import ArrowDownMobile from "../../../icons/ArrowDownMobile";
import ArrowUpMobile from "../../../icons/ArrowUpMobile";
import SameMobile from "../../../icons/SameMobile";
import ThreeDots from "../../../icons/ThreeDots";
import styles from "./PortalesCardMobile.module.css";

const PortalesMobile = ({ portals }) => {
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
          La Nación
        </Tab>
        <Tab color="white" paddingX="12px" paddingY="6px" fontSize="sm">
          El Destape
        </Tab>
        <Tab color="white" paddingX="12px" paddingY="6px" fontSize="sm">
          Clarín
        </Tab>
        <Tab color="white" paddingX="12px" paddingY="6px" fontSize="sm">
          Télam
        </Tab>
        <Tab color="white" paddingX="12px" paddingY="6px" fontSize="sm">
          Infobae
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
                      borderRadius={theme.radius.md}
                      width="100%"
                      height="114px"
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
                        <Box w="100%">
                          <Flex
                            justifyContent="flex-end"
                            alignItems="center"
                            flexDirection="row"
                          >
                            <ThreeDots />
                          </Flex>
                        </Box>

                        <Box
                          display="flex"
                          w="100%"
                          justifyContent="space-between"
                          alignItems="center"
                          height="100%"
                          marginTop="10px"
                        >
                          <Box width="100%" display="revert" marginTop="-15px">
                            <a
                              href={trend.link}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Text
                                maxWidth="80%"
                                fontWeight={600}
                                fontSize="16px"
                                className={calculateLines("leido")}
                                pr="10px"
                              >
                                {trend.article}
                              </Text>
                            </a>
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
                      borderRadius={theme.radius.md}
                      width="100%"
                      height="114px"
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
                        <Box w="100%">
                          <Flex
                            justifyContent="flex-end"
                            alignItems="center"
                            flexDirection="row"
                          >
                            <ThreeDots />
                          </Flex>
                        </Box>

                        <Box
                          display="flex"
                          w="100%"
                          justifyContent="space-between"
                          alignItems="center"
                          height="100%"
                          marginTop="10px"
                        >
                          <Box width="100%" display="revert" marginTop="-15px">
                            <a
                              href={trend.link}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Text
                                maxWidth="80%"
                                fontWeight={600}
                                fontSize="16px"
                                className={calculateLines("leido")}
                                pr="10px"
                              >
                                {trend.article}
                              </Text>
                            </a>
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
                      borderRadius={theme.radius.md}
                      width="100%"
                      height="114px"
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
                        <Box w="100%">
                          <Flex
                            justifyContent="flex-end"
                            alignItems="center"
                            flexDirection="row"
                          >
                            <ThreeDots />
                          </Flex>
                        </Box>

                        <Box
                          display="flex"
                          w="100%"
                          justifyContent="space-between"
                          alignItems="center"
                          height="100%"
                          marginTop="10px"
                        >
                          <Box width="100%" display="revert" marginTop="-15px">
                            <a
                              href={trend.link}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Text
                                maxWidth="80%"
                                fontWeight={600}
                                fontSize="16px"
                                className={calculateLines("leido")}
                                pr="10px"
                              >
                                {trend.article}
                              </Text>
                            </a>
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
                      borderRadius={theme.radius.md}
                      width="100%"
                      height="114px"
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
                        <Box w="100%">
                          <Flex
                            justifyContent="flex-end"
                            alignItems="center"
                            flexDirection="row"
                          >
                            <ThreeDots />
                          </Flex>
                        </Box>

                        <Box
                          display="flex"
                          w="100%"
                          justifyContent="space-between"
                          alignItems="center"
                          height="100%"
                          marginTop="10px"
                        >
                          <Box width="100%" display="revert" marginTop="-15px">
                            <a
                              href={trend.link}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Text
                                maxWidth="80%"
                                fontWeight={600}
                                fontSize="16px"
                                className={calculateLines("leido")}
                                pr="10px"
                              >
                                {trend.article}
                              </Text>
                            </a>
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
                      borderRadius={theme.radius.md}
                      width="100%"
                      height="114px"
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
                        <Box w="100%">
                          <Flex
                            justifyContent="flex-end"
                            alignItems="center"
                            flexDirection="row"
                          >
                            <ThreeDots />
                          </Flex>
                        </Box>

                        <Box
                          display="flex"
                          w="100%"
                          justifyContent="space-between"
                          alignItems="center"
                          height="100%"
                          marginTop="10px"
                        >
                          <Box width="100%" display="revert" marginTop="-15px">
                            <a
                              href={trend.link}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Text
                                maxWidth="80%"
                                fontWeight={600}
                                fontSize="16px"
                                className={calculateLines("leido")}
                                pr="10px"
                              >
                                {trend.article}
                              </Text>
                            </a>
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

export default PortalesMobile;
