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
import ArrowDownMobile from "../../../icons/ArrowDownMobile";
import ArrowUpMobile from "../../../icons/ArrowUpMobile";
import SameMobile from "../../../icons/SameMobile";
import ThreeDots from "../../../icons/ThreeDots";
import TwitterCompartir from "../../../icons/TwitterCompartir";
import Whatsapp from "../../../icons/Whatsapp";

// Components
import ErrorCardMobile from "../../ErrorCard/ErrorCardMobile/ErrorCardMobile";

// Styles
import styles from "./NewsPortalsCardMobile.module.css";

const NewsPortalsCardMobile = ({ portals }) => {
  const hasLaNacionData =
    portals?.current?.laNacion?.record?.trends?.length &&
    portals.current.laNacion.record.trends.length > 0;
  const hasElDestapeData =
    portals?.current?.elDestape?.record?.trends?.length &&
    portals.current.elDestape.record.trends.length > 0;
  const hasClarinData =
    portals?.current?.clarin?.record?.trends?.length &&
    portals.current.clarin.record.trends.length > 0;
  const hasTelamData =
    portals?.current?.telam?.record?.trends?.length &&
    portals.current.telam.record.trends.length > 0;
  const hasInfobaeData =
    portals?.current?.infobae?.record?.trends?.length &&
    portals.current.infobae.record.trends.length > 0;

  return (
    <Tabs
      isolation="isolate"
      variant="soft-rounded"
      colorScheme="green"
      w="100%"
      className="no-padding"
      display={{ base: "block", lg: "none" }}
    >
      <TabList mb="24px" pl="16px" overflow="auto">
        <Tab
          color="white"
          paddingX="12px"
          paddingY="6px"
          fontSize="sm"
          width="max-content"
          whiteSpace="nowrap"
        >
          La Nación
        </Tab>
        <Tab
          color="white"
          paddingX="12px"
          paddingY="6px"
          fontSize="sm"
          width="max-content"
          whiteSpace="nowrap"
        >
          El Destape
        </Tab>
        <Tab
          color="white"
          paddingX="12px"
          paddingY="6px"
          fontSize="sm"
          width="max-content"
          whiteSpace="nowrap"
        >
          Clarín
        </Tab>
        <Tab
          color="white"
          paddingX="12px"
          paddingY="6px"
          fontSize="sm"
          width="max-content"
          whiteSpace="nowrap"
        >
          Télam
        </Tab>
        <Tab
          color="white"
          paddingX="12px"
          paddingY="6px"
          fontSize="sm"
          width="max-content"
          whiteSpace="nowrap"
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
            paddingX="16px"
            alignItems="center"
            overflow="auto"
          >
            {!hasLaNacionData ? (
              <ErrorCardMobile />
            ) : (
              portals.current.laNacion.record.trends.map(
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
                      key={trend.article}
                    >
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        width="100%"
                        height="100%"
                        flexDir="column"
                      >
                        <Box w="100%">
                          <Flex
                            justifyContent="flex-end"
                            alignItems="center"
                            flexDirection="row"
                          ></Flex>
                        </Box>

                        <Box
                          display="flex"
                          w="100%"
                          justifyContent="space-between"
                          alignItems="center"
                          height="100%"
                        >
                          <Box width="100%" display="revert">
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
                              >
                                {trend.article}
                              </Text>
                            </a>
                          </Box>

                          <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="flex-end"
                            height="100%"
                            ml=""
                            flexDirection="column"
                            py="8px"
                          >
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
                                    "portals.laNacion",
                                    currentIndex,
                                    trend.article
                                  )}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  data-action="share/whatsapp/share"
                                  iconSpacing="10px"
                                  flexDirection="row-reverse"
                                  display="flex"
                                  alignItems="center"
                                  icon={<Whatsapp />}
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
                                    "portals.laNacion",
                                    currentIndex,
                                    trend.article
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
                            <Box
                              display="flex"
                              justifyContent="space-between"
                              alignItems="center"
                              width="50px"
                            >
                              <Text fontSize="2xl" mr="4px">
                                {currentIndex + 1}
                              </Text>
                              {getPosition(currentIndex, prevIndex) ===
                              "down" ? (
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
            paddingX="16px"
            alignItems="center"
          >
            {!hasElDestapeData ? (
              <ErrorCardMobile />
            ) : (
              portals.current.elDestape.record.trends.map(
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
                      key={trend.article}
                    >
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        width="100%"
                        height="100%"
                        flexDir="column"
                      >
                        <Box w="100%">
                          <Flex
                            justifyContent="flex-end"
                            alignItems="center"
                            flexDirection="row"
                          ></Flex>
                        </Box>

                        <Box
                          display="flex"
                          w="100%"
                          justifyContent="space-between"
                          alignItems="center"
                          height="100%"
                        >
                          <Box width="100%" display="revert">
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
                              >
                                {trend.article}
                              </Text>
                            </a>
                          </Box>

                          <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="flex-end"
                            height="100%"
                            ml=""
                            flexDirection="column"
                            py="8px"
                          >
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
                                    "portals.elDestape",
                                    currentIndex,
                                    trend.article
                                  )}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  data-action="share/whatsapp/share"
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
                                    "portals.elDestape",
                                    currentIndex,
                                    trend.article
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
                            <Box
                              display="flex"
                              justifyContent="space-between"
                              alignItems="center"
                              width="50px"
                            >
                              <Text fontSize="2xl" mr="4px">
                                {currentIndex + 1}
                              </Text>
                              {getPosition(currentIndex, prevIndex) ===
                              "down" ? (
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
            {!hasClarinData ? (
              <ErrorCardMobile />
            ) : (
              portals.current.clarin.record.trends.map(
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
                      key={trend.article}
                    >
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        width="100%"
                        height="100%"
                        flexDir="column"
                      >
                        <Box w="100%">
                          <Flex
                            justifyContent="flex-end"
                            alignItems="center"
                            flexDirection="row"
                          ></Flex>
                        </Box>

                        <Box
                          display="flex"
                          w="100%"
                          justifyContent="space-between"
                          alignItems="center"
                          height="100%"
                        >
                          <Box width="100%" display="revert">
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
                              >
                                {trend.article}
                              </Text>
                            </a>
                          </Box>

                          <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="flex-end"
                            height="100%"
                            ml=""
                            flexDirection="column"
                            py="8px"
                          >
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
                                    "portals.clarin",
                                    currentIndex,
                                    trend.article
                                  )}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  data-action="share/whatsapp/share"
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
                                    "portals.clarin",
                                    currentIndex,
                                    trend.article
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
                            <Box
                              display="flex"
                              justifyContent="space-between"
                              alignItems="center"
                              width="50px"
                            >
                              <Text fontSize="2xl" mr="4px">
                                {currentIndex + 1}
                              </Text>
                              {getPosition(currentIndex, prevIndex) ===
                              "down" ? (
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
            {!hasTelamData ? (
              <ErrorCardMobile />
            ) : (
              portals.current.telam.record.trends.map((trend, currentIndex) => {
                const elementInPrevious =
                  portals?.previous?.telam?.record?.trends?.find(
                    element => element.article === trend.article
                  );
                const prevIndex =
                  portals?.previous?.telam?.record?.trends?.findIndex(
                    element => element.article === elementInPrevious?.article
                  );
                return (
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
                    key={trend.article}
                  >
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      width="100%"
                      height="100%"
                      flexDir="column"
                    >
                      <Box w="100%">
                        <Flex
                          justifyContent="flex-end"
                          alignItems="center"
                          flexDirection="row"
                        ></Flex>
                      </Box>

                      <Box
                        display="flex"
                        w="100%"
                        justifyContent="space-between"
                        alignItems="center"
                        height="100%"
                      >
                        <Box width="100%" display="revert">
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
                            >
                              {trend.article}
                            </Text>
                          </a>
                        </Box>

                        <Box
                          display="flex"
                          justifyContent="space-between"
                          alignItems="flex-end"
                          height="100%"
                          ml=""
                          flexDirection="column"
                          py="8px"
                        >
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
                                  "portals.telam",
                                  currentIndex,
                                  trend.article
                                )}
                                target="_blank"
                                rel="noopener noreferrer"
                                data-action="share/whatsapp/share"
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
                                  "portals.telam",
                                  currentIndex,
                                  trend.article
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
                          <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            width="50px"
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
            {!hasInfobaeData ? (
              <ErrorCardMobile />
            ) : (
              portals.current.infobae.record.trends.map(
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
                      key={trend.article}
                    >
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        width="100%"
                        height="100%"
                        flexDir="column"
                      >
                        <Box w="100%">
                          <Flex
                            justifyContent="flex-end"
                            alignItems="center"
                            flexDirection="row"
                          ></Flex>
                        </Box>

                        <Box
                          display="flex"
                          w="100%"
                          justifyContent="space-between"
                          alignItems="center"
                          height="100%"
                        >
                          <Box width="100%" display="revert">
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
                              >
                                {trend.article}
                              </Text>
                            </a>
                          </Box>

                          <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="flex-end"
                            height="100%"
                            ml=""
                            flexDirection="column"
                            py="8px"
                          >
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
                                    "portals.infobae",
                                    currentIndex,
                                    trend.article
                                  )}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  data-action="share/whatsapp/share"
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
                                    "portals.infobae",
                                    currentIndex,
                                    trend.article
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
                            <Box
                              display="flex"
                              justifyContent="space-between"
                              alignItems="center"
                              width="50px"
                            >
                              <Text fontSize="2xl" mr="4px">
                                {currentIndex + 1}
                              </Text>
                              {getPosition(currentIndex, prevIndex) ===
                              "down" ? (
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

export default NewsPortalsCardMobile;
