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

// Icons
import ArrowDownMobile from "../../../icons/ArrowDownMobile";
import ArrowUpMobile from "../../../icons/ArrowUpMobile";
import SameMobile from "../../../icons/SameMobile";
import ThreeDots from "../../../icons/ThreeDots";
import TwitterCompartir from "../../../icons/TwitterCompartir";
import Whatsapp from "../../../icons/Whatsapp";

// Styles
import styles from "./NewsPortalsCardMobile.module.css";

const NewsPortalsCardMobile = ({ portals }) => {
  return (
    <Tabs
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
                            <MenuButton>
                              <ThreeDots />
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
                                href="#"
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
                                href={`https://twitter.com/intent/tweet?url=${
                                  trend.link
                                }&text=Mirate%20esta%20noticia%20de%20La%20Nación%20que%20está%20en%20el%20puesto%20N°%20${
                                  currentIndex + 1
                                }%20en%20tendencias%20en%20noticias%20en%20Argentina.%20Mirá%20más%20en%20Artrends%20%23Artrends`}
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
                              <MenuItem
                                color="#FFFFFF"
                                backgroundColor="#27238F"
                                fontSize="md"
                                variant="mobile"
                                _active={{
                                  boxShadow:
                                    "inset 75px 75px 43px rgba(0, 0, 0, 0.01), inset 42px 42px 36px rgba(0, 0, 0, 0.05), inset 19px 19px 27px rgba(0, 0, 0, 0.09), inset 5px 5px 15px rgba(0, 0, 0, 0.1)",
                                }}
                              >
                                Ir al sitio
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
                            <MenuButton>
                              <ThreeDots />
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
                                href="#"
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
                                href={`https://twitter.com/intent/tweet?url=${
                                  trend.link
                                }&text=Mirate%20esta%20noticia%20de%20El%20Destape%20que%20está%20en%20el%20puesto%20N°%20${
                                  currentIndex + 1
                                }%20en%20tendencias%20en%20noticias%20en%20Argentina.%20Mirá%20más%20en%20Artrends%20%23Artrends`}
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
                              <MenuItem
                                color="#FFFFFF"
                                backgroundColor="#27238F"
                                fontSize="md"
                                variant="mobile"
                                _active={{
                                  boxShadow:
                                    "inset 75px 75px 43px rgba(0, 0, 0, 0.01), inset 42px 42px 36px rgba(0, 0, 0, 0.05), inset 19px 19px 27px rgba(0, 0, 0, 0.09), inset 5px 5px 15px rgba(0, 0, 0, 0.1)",
                                }}
                              >
                                Ir al sitio
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
                            <MenuButton>
                              <ThreeDots />
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
                                href="#"
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
                                href={`https://twitter.com/intent/tweet?url=${
                                  trend.link
                                }&text=Mirate%20esta%20noticia%20de%20Clarín%20que%20está%20en%20el%20puesto%20N°%20${
                                  currentIndex + 1
                                }%20en%20tendencias%20en%20noticias%20en%20Argentina.%20Mirá%20más%20en%20Artrends%20%23Artrends`}
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
                              <MenuItem
                                color="#FFFFFF"
                                backgroundColor="#27238F"
                                fontSize="md"
                                variant="mobile"
                                _active={{
                                  boxShadow:
                                    "inset 75px 75px 43px rgba(0, 0, 0, 0.01), inset 42px 42px 36px rgba(0, 0, 0, 0.05), inset 19px 19px 27px rgba(0, 0, 0, 0.09), inset 5px 5px 15px rgba(0, 0, 0, 0.1)",
                                }}
                              >
                                Ir al sitio
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
                            <MenuButton>
                              <ThreeDots />
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
                                href="#"
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
                                href={`https://twitter.com/intent/tweet?url=${
                                  trend.link
                                }&text=Mirate%20esta%20noticia%20de%20Télam%20que%20está%20en%20el%20puesto%20N°%20${
                                  currentIndex + 1
                                }%20en%20tendencias%20en%20noticias%20en%20Argentina.%20Mirá%20más%20en%20Artrends%20%23Artrends`}
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
                              <MenuItem
                                color="#FFFFFF"
                                backgroundColor="#27238F"
                                fontSize="md"
                                variant="mobile"
                                _active={{
                                  boxShadow:
                                    "inset 75px 75px 43px rgba(0, 0, 0, 0.01), inset 42px 42px 36px rgba(0, 0, 0, 0.05), inset 19px 19px 27px rgba(0, 0, 0, 0.09), inset 5px 5px 15px rgba(0, 0, 0, 0.1)",
                                }}
                              >
                                Ir al sitio
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
                            <MenuButton>
                              <ThreeDots />
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
                                href="#"
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
                                href={`https://twitter.com/intent/tweet?url=${
                                  trend.link
                                }&text=Mirate%20esta%20noticia%20de%20Infobae%20que%20está%20en%20el%20puesto%20N°%20${
                                  currentIndex + 1
                                }%20en%20tendencias%20en%20noticias%20en%20Argentina.%20Mirá%20más%20en%20Artrends%20%23Artrends`}
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
                              <MenuItem
                                color="#FFFFFF"
                                backgroundColor="#27238F"
                                fontSize="md"
                                variant="mobile"
                                _active={{
                                  boxShadow:
                                    "inset 75px 75px 43px rgba(0, 0, 0, 0.01), inset 42px 42px 36px rgba(0, 0, 0, 0.05), inset 19px 19px 27px rgba(0, 0, 0, 0.09), inset 5px 5px 15px rgba(0, 0, 0, 0.1)",
                                }}
                              >
                                Ir al sitio
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
              }
            )}
          </Box>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default NewsPortalsCardMobile;
