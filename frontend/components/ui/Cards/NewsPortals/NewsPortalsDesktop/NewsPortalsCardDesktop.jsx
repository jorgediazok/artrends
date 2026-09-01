import { Box, Link, Menu, Portal, Tabs, Text } from "@chakra-ui/react";

// Utils
import { getPosition } from "../../../../../utils/position";
import { calculateLines } from "../../../../../utils/calculateLines";
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
import TwitterCompartir from "../../../icons/TwitterCompartir";
import Whatsapp from "../../../icons/Whatsapp";

// Components
import ErrorCardDesktop from "../../ErrorCard/ErrorCardDesktop/ErrorCardDesktop";
import CrossPlatformBadge from "../../../CrossPlatformBadge/CrossPlatformBadge";
import TrendHistoryPopover from "../../../TrendHistoryPopover/TrendHistoryPopover";

// Theme
import theme from "../../../../../styles/theme";

// Styles
import styles from "./NewsPortalsCardDesktop.module.css";

const NewsPortalsCardDesktop = ({ portals, handleCardClick, crossMatches }) => {
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
      variant="subtle"
      colorPalette="green"
      width="100%"
      display={{ base: "none", lg: "block" }}
      overflow="auto"
      className="no-padding"
      mt="24px"
      defaultValue="clarin"
    >
      <Tabs.List mb="24px" ml={{ base: "16px", lg: "0px" }}>
        <Tabs.Trigger
          value="clarin"
          color="white"
          _selected={{ color: "green.700" }}
          paddingX={{ base: "12px", lg: "16px" }}
          paddingY={{ base: "6px", lg: "8px" }}
          fontSize={{ base: "xs", lg: "md" }}
          borderRadius="full"
        >
          Clarín
        </Tabs.Trigger>
        <Tabs.Trigger
          value="el-destape"
          color="white"
          _selected={{ color: "green.700" }}
          paddingX={{ base: "12px", lg: "16px" }}
          paddingY={{ base: "6px", lg: "8px" }}
          fontSize={{ base: "xs", lg: "md" }}
          borderRadius="full"
        >
          El Destape
        </Tabs.Trigger>
        <Tabs.Trigger
          value="la-nacion"
          color="white"
          _selected={{ color: "green.700" }}
          paddingX={{ base: "12px", lg: "16px" }}
          paddingY={{ base: "6px", lg: "8px" }}
          fontSize={{ base: "xs", lg: "md" }}
          borderRadius="full"
        >
          La Nación
        </Tabs.Trigger>
        <Tabs.Trigger
          value="infobae"
          color="white"
          _selected={{ color: "green.700" }}
          paddingX={{ base: "12px", lg: "16px" }}
          paddingY={{ base: "6px", lg: "8px" }}
          fontSize={{ base: "xs", lg: "md" }}
          borderRadius="full"
        >
          Infobae
        </Tabs.Trigger>
        <Tabs.Trigger
          value="tn"
          color="white"
          _selected={{ color: "green.700" }}
          paddingX={{ base: "12px", lg: "16px" }}
          paddingY={{ base: "6px", lg: "8px" }}
          fontSize={{ base: "xs", lg: "md" }}
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
          paddingX={{ base: "16px", lg: "0" }}
          alignItems="center"
        >
          {!hasClarinData ? (
            <ErrorCardDesktop />
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
                const crossLabel = getCrossPlatformLabel(
                  crossMatches,
                  trend.article,
                  "Portales"
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
                    minHeight="157px"
                    mb={2}
                    display={{ base: "none", lg: "flex" }}
                    alignItems="center"
                    key={trend.article}
                    role="link"
                    tabIndex={0}
                    onClick={handleCardClick}
                    cursor="pointer"
                    _hover={{ transform: "translateY(-2.5px)" }}
                    _active={{
                      boxShadow: "none",
                      transform: "translateY(0)",
                    }}
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
                          <Text
                            fontWeight={600}
                            fontSize="2xl"
                            className={calculateLines("leido")}
                          >
                            {trend.article}
                          </Text>
                          {crossLabel && (
                            <CrossPlatformBadge label={crossLabel} />
                          )}
                        </Box>
                      </Box>
                      <Box display="flex" gap={8} alignItems="center">
                        <TrendHistoryPopover
                          historyPath="/api/portals/history"
                          historyKey="clarin"
                          matchValue={trend.article}
                          field="article"
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
          paddingX={{ base: "16px", lg: "0" }}
          alignItems="center"
        >
          {!hasElDestapeData ? (
            <ErrorCardDesktop />
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
                const crossLabel = getCrossPlatformLabel(
                  crossMatches,
                  trend.article,
                  "Portales"
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
                    minHeight="157px"
                    mb={2}
                    display={{ base: "none", lg: "flex" }}
                    alignItems="center"
                    key={trend.article}
                    tabIndex={0}
                    role="link"
                    onClick={handleCardClick}
                    cursor="pointer"
                    _hover={{ transform: "translateY(-2.5px)" }}
                    _active={{
                      boxShadow: "none",
                      transform: "translateY(0)",
                    }}
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
                          <Text
                            fontWeight={600}
                            fontSize="2xl"
                            className={calculateLines("leido")}
                          >
                            {trend.article}
                          </Text>
                          {crossLabel && (
                            <CrossPlatformBadge label={crossLabel} />
                          )}
                        </Box>
                      </Box>
                      <Box display="flex" gap={8} alignItems="center">
                        <TrendHistoryPopover
                          historyPath="/api/portals/history"
                          historyKey="elDestape"
                          matchValue={trend.article}
                          field="article"
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
        >
          {!hasLaNacionData ? (
            <ErrorCardDesktop />
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
                const crossLabel = getCrossPlatformLabel(
                  crossMatches,
                  trend.article,
                  "Portales"
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
                    minHeight="157px"
                    mb={2}
                    display={{ base: "none", lg: "flex" }}
                    alignItems="center"
                    key={trend.article}
                    tabIndex={0}
                    role="link"
                    onClick={handleCardClick}
                    cursor="pointer"
                    _hover={{ transform: "translateY(-2.5px)" }}
                    _active={{
                      boxShadow: "none",
                      transform: "translateY(0)",
                    }}
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
                          <Text
                            fontWeight={600}
                            fontSize="2xl"
                            className={calculateLines("leido")}
                          >
                            {trend.article}
                          </Text>
                          {crossLabel && (
                            <CrossPlatformBadge label={crossLabel} />
                          )}
                        </Box>
                      </Box>
                      <Box display="flex" gap={8} alignItems="center">
                        <TrendHistoryPopover
                          historyPath="/api/portals/history"
                          historyKey="laNacion"
                          matchValue={trend.article}
                          field="article"
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
          paddingX={{ base: "16px", lg: "0" }}
          alignItems="center"
        >
          {!hasInfobaeData ? (
            <ErrorCardDesktop />
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
                const crossLabel = getCrossPlatformLabel(
                  crossMatches,
                  trend.article,
                  "Portales"
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
                    minHeight="157px"
                    mb={2}
                    display={{ base: "none", lg: "flex" }}
                    alignItems="center"
                    key={trend.article}
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
                          {crossLabel && (
                            <CrossPlatformBadge label={crossLabel} />
                          )}
                        </Box>
                      </Box>
                      <Box display="flex" gap={8} alignItems="center">
                        <TrendHistoryPopover
                          historyPath="/api/portals/history"
                          historyKey="infobae"
                          matchValue={trend.article}
                          field="article"
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
                                    href={`https://api.whatsapp.com/send?text=Mirate%20esta%20noticia:%20${
                                      trend.link
                                    }%20de%20Infobae%20que%20está%20en%20el%20puesto%20N°%20${
                                      currentIndex + 1
                                    }%20en%20tendencias%20en%20noticias%20en%20Argentina.%20Mirá%20más%20en%20Artrends%20%23Artrends`}
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
                                    href={`https://twitter.com/intent/tweet?url=${
                                      trend.link
                                    }&text=Mirate%20esta%20noticia%20de%20Infobae%20que%20está%20en%20el%20puesto%20N°%20${
                                      currentIndex + 1
                                    }%20en%20tendencias%20en%20noticias%20en%20Argentina.%20Mirá%20más%20en%20Artrends%20%23Artrends`}
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
      <Tabs.Content value="tn">
        <Box
          width="100%"
          flexDirection="column"
          alignContent="space-between"
          paddingX={{ base: "16px", lg: "0" }}
          alignItems="center"
        >
          {!hasTnData ? (
            <ErrorCardDesktop />
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
              const crossLabel = getCrossPlatformLabel(
                crossMatches,
                trend.article,
                "Portales"
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
                  minHeight="157px"
                  mb={2}
                  display={{ base: "none", lg: "flex" }}
                  alignItems="center"
                  key={trend.article}
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
                        {crossLabel && (
                          <CrossPlatformBadge label={crossLabel} />
                        )}
                      </Box>
                    </Box>
                    <Box display="flex" gap={8} alignItems="center">
                      <TrendHistoryPopover
                        historyPath="/api/portals/history"
                        historyKey="tn"
                        matchValue={trend.article}
                        field="article"
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
                                  href={`https://api.whatsapp.com/send?text=Mirate%20esta%20noticia:%20${
                                    trend.link
                                  }%20de%20TN%20que%20está%20en%20el%20puesto%20N°%20${
                                    currentIndex + 1
                                  }%20en%20tendencias%20en%20noticias%20en%20Argentina.%20Mirá%20más%20en%20Artrends%20%23Artrends`}
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
                                  href={`https://twitter.com/intent/tweet?url=${
                                    trend.link
                                  }&text=Mirate%20esta%20noticia%20de%20TN%20que%20está%20en%20el%20puesto%20N°%20${
                                    currentIndex + 1
                                  }%20en%20tendencias%20en%20noticias%20en%20Argentina.%20Mirá%20más%20en%20Artrends%20%23Artrends`}
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
    </Tabs.Root>
  );
};

export default NewsPortalsCardDesktop;
