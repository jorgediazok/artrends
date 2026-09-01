import React from "react";

import { Box, Flex, Link, Menu, Portal, Tabs, Text } from "@chakra-ui/react";

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

const NewsPortalsCardMobile = ({ portals, handleCardClick }) => {
  const hasLaNacionData =
    portals?.current?.laNacion?.record?.trends?.length &&
    portals.current.laNacion.record.trends.length > 0;
  const hasElDestapeData =
    portals?.current?.elDestape?.record?.trends?.length &&
    portals.current.elDestape.record.trends.length > 0;
  const hasClarinData =
    portals?.current?.clarin?.record?.trends?.length &&
    portals.current.clarin.record.trends.length > 0;
  const hasInfobaeData =
    portals?.current?.infobae?.record?.trends?.length &&
    portals.current.infobae.record.trends.length > 0;
  const hasTnData =
    portals?.current?.tn?.record?.trends?.length &&
    portals.current.tn.record.trends.length > 0;

  return (
    <Tabs.Root
      isolation="isolate"
      variant="subtle"
      colorPalette="green"
      w="100%"
      className="no-padding"
      display={{ base: "block", lg: "none" }}
      defaultValue="clarin"
    >
      <Tabs.List mb="24px" pl={0}>
        <Tabs.Trigger
          value="clarin"
          color="white"
          _selected={{ color: "green.700" }}
          paddingX="12px"
          paddingY="6px"
          fontSize="sm"
          width="max-content"
          whiteSpace="nowrap"
          borderRadius="full"
        >
          Clarín
        </Tabs.Trigger>
        <Tabs.Trigger
          value="el-destape"
          color="white"
          _selected={{ color: "green.700" }}
          paddingX="12px"
          paddingY="6px"
          fontSize="sm"
          width="max-content"
          whiteSpace="nowrap"
          borderRadius="full"
        >
          El Destape
        </Tabs.Trigger>
        <Tabs.Trigger
          value="la-nacion"
          color="white"
          _selected={{ color: "green.700" }}
          paddingX="12px"
          paddingY="6px"
          fontSize="sm"
          width="max-content"
          whiteSpace="nowrap"
          borderRadius="full"
        >
          La Nación
        </Tabs.Trigger>
        <Tabs.Trigger
          value="infobae"
          color="white"
          _selected={{ color: "green.700" }}
          paddingX="12px"
          paddingY="6px"
          fontSize="sm"
          width="max-content"
          whiteSpace="nowrap"
          borderRadius="full"
        >
          Infobae
        </Tabs.Trigger>
        <Tabs.Trigger
          value="tn"
          color="white"
          _selected={{ color: "green.700" }}
          paddingX="12px"
          paddingY="6px"
          fontSize="sm"
          width="max-content"
          whiteSpace="nowrap"
          borderRadius="full"
        >
          TN
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="clarin">
        <Box
          width="100%"
          flexDirection="column"
          alignContent="space-between"
          alignItems="center"
          overflow="auto"
          as="ul"
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
                    as="li"
                    color={theme.colors.white[500]}
                    bg={theme.colors.gradients["grad-cards"]}
                    border="0.5px solid"
                    borderColor="rgba(255, 255, 255, 0.1);"
                    borderRadius={theme.radius.md}
                    width="100%"
                    height="114px"
                    mb={2}
                    display={{ base: "flex", lg: "none" }}
                    alignItems="center"
                    p="8px 16px"
                    key={trend.article}
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
                          <Text
                            maxWidth="80%"
                            fontWeight={600}
                            fontSize="16px"
                            className={calculateLines("leido")}
                          >
                            {trend.article}
                          </Text>
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
                                        "portals.clarin",
                                        currentIndex,
                                        trend.article
                                      )}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      aria-label="Compartir en WhatsApp"
                                      data-action="share/whatsapp/share"
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
                                        "portals.clarin",
                                        currentIndex,
                                        trend.article
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
      </Tabs.Content>
      <Tabs.Content value="el-destape">
        <Box
          width="100%"
          flexDirection="column"
          alignContent="space-between"
          alignItems="center"
          overflow="auto"
          as="ul"
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
                    as="li"
                    color={theme.colors.white[500]}
                    bg={theme.colors.gradients["grad-cards"]}
                    border="0.5px solid"
                    borderColor="rgba(255, 255, 255, 0.1);"
                    borderRadius={theme.radius.md}
                    width="100%"
                    height="114px"
                    mb={2}
                    display={{ base: "flex", lg: "none" }}
                    alignItems="center"
                    p="8px 16px"
                    key={trend.article}
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
                          <Text
                            maxWidth="80%"
                            fontWeight={600}
                            fontSize="16px"
                            className={calculateLines("leido")}
                          >
                            {trend.article}
                          </Text>
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
                                        "portals.elDestape",
                                        currentIndex,
                                        trend.article
                                      )}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      aria-label="Compartir en WhatsApp"
                                      data-action="share/whatsapp/share"
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
                                        "portals.elDestape",
                                        currentIndex,
                                        trend.article
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
      </Tabs.Content>
      <Tabs.Content value="la-nacion">
        <Box
          width="100%"
          flexDirection="column"
          alignContent="space-between"
          alignItems="center"
          overflow="auto"
          as="ul"
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
                    as="li"
                    color={theme.colors.white[500]}
                    bg={theme.colors.gradients["grad-cards"]}
                    border="0.5px solid"
                    borderColor="rgba(255, 255, 255, 0.1);"
                    borderRadius={theme.radius.md}
                    width="100%"
                    height="114px"
                    mb={2}
                    display={{ base: "flex", lg: "none" }}
                    alignItems="center"
                    p="8px 16px"
                    key={trend.article}
                    boxShadow={theme.shadows["inner-card"]}
                    role="link"
                    tabIndex={0}
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
                          <Text
                            maxWidth="80%"
                            fontWeight={600}
                            fontSize="16px"
                            className={calculateLines("leido")}
                          >
                            {trend.article}
                          </Text>
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
                                        "portals.laNacion",
                                        currentIndex,
                                        trend.article
                                      )}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      aria-label="Compartir en WhatsApp"
                                      data-action="share/whatsapp/share"
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
                                        "portals.laNacion",
                                        currentIndex,
                                        trend.article
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
      </Tabs.Content>
      <Tabs.Content value="infobae">
        <Box
          width="100%"
          flexDirection="column"
          alignContent="space-between"
          alignItems="center"
          overflow="auto"
          as="ul"
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
                    as="li"
                    color={theme.colors.white[500]}
                    bg={theme.colors.gradients["grad-cards"]}
                    border="0.5px solid"
                    borderColor="rgba(255, 255, 255, 0.1);"
                    borderRadius={theme.radius.md}
                    width="100%"
                    height="114px"
                    mb={2}
                    display={{ base: "flex", lg: "none" }}
                    alignItems="center"
                    p="8px 16px"
                    key={trend.article}
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
                          <Text
                            maxWidth="80%"
                            fontWeight={600}
                            fontSize="16px"
                            className={calculateLines("leido")}
                          >
                            {trend.article}
                          </Text>
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
                                        "portals.infobae",
                                        currentIndex,
                                        trend.article
                                      )}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      aria-label="Compartir en WhatsApp"
                                      data-action="share/whatsapp/share"
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
                                        "portals.infobae",
                                        currentIndex,
                                        trend.article
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
      </Tabs.Content>
      <Tabs.Content value="tn">
        <Box
          width="100%"
          flexDirection="column"
          alignContent="space-between"
          alignItems="center"
          overflow="auto"
          as="ul"
        >
          {!hasTnData ? (
            <ErrorCardMobile />
          ) : (
            portals.current.tn.record.trends.map((trend, currentIndex) => {
              const elementInPrevious =
                portals?.previous?.tn?.record?.trends?.find(
                  element => element.article === trend.article
                );
              const prevIndex =
                portals?.previous?.tn?.record?.trends?.findIndex(
                  element => element.article === elementInPrevious?.article
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
                  height="114px"
                  mb={2}
                  display={{ base: "flex", lg: "none" }}
                  alignItems="center"
                  p="8px 16px"
                  key={trend.article}
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
                        <Text
                          maxWidth="80%"
                          fontWeight={600}
                          fontSize="16px"
                          className={calculateLines("leido")}
                        >
                          {trend.article}
                        </Text>
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
                                      "portals.tn",
                                      currentIndex,
                                      trend.article
                                    )}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Compartir en WhatsApp"
                                    data-action="share/whatsapp/share"
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
                                      "portals.tn",
                                      currentIndex,
                                      trend.article
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
            })
          )}
        </Box>
      </Tabs.Content>
    </Tabs.Root>
  );
};

export default React.memo(NewsPortalsCardMobile);
