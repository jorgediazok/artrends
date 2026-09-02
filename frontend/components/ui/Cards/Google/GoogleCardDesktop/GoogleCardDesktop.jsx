import {
  Badge,
  Box,
  Flex,
  Link,
  Menu,
  Portal,
  Text,
} from "@chakra-ui/react";

// Utils
import { calculateLines } from "../../../../../utils/calculateLines";
import { getPosition } from "../../../../../utils/position";
import {
  getTwitterShareText,
  getWhatsappShareText,
} from "../../../../../utils/shareText";

// Icons
import ArrowDown from "../../../icons/ArrowDown";
import ArrowUp from "../../../icons/ArrowUp";
import Same from "../../../icons/Same";
import Share from "../../../icons/Share";
import TwitterCompartir from "../../../icons/TwitterCompartir";
import Whatsapp from "../../../icons/Whatsapp";
import ErrorCardDesktop from "../../ErrorCard/ErrorCardDesktop/ErrorCardDesktop";
import TrendHistoryPopover from "../../../TrendHistoryPopover/TrendHistoryPopover";

// Theme
import theme from "../../../../../styles/theme";

// Styles
import styles from "./GoogleCardDesktop.module.css";

const GoogleCardDesktop = ({ google, handleCardClick, crossMatches }) => {
  const hasData =
    google?.current?.record?.trends && google.current.record.trends.length > 0;

  return (
    <Flex
      width="100%"
      flexWrap="wrap"
      flexDirection="column"
      mt="24px"
      alignItems="center"
      justifyContent="space-between"
      alignContent="space-between"
      display={{ base: "none", lg: "flex" }}
      gap="8px"
      as="ul"
      maxH="600px"
    >
      {!hasData ? (
        <ErrorCardDesktop />
      ) : (
        google.current.record.trends.map((trend, currentIndex) => {
          const elementInPrevious = google?.previous?.record?.trends?.find(
            element => element.title === trend.title
          );
          const prevIndex = google?.previous?.record?.trends?.findIndex(
            element => element.title === elementInPrevious?.title
          );

          return (
            <Box
              key={trend.title}
              as="li"
              color={theme.colors.white[500]}
              bg={theme.colors.gradients["grad-cards"]}
              border="0.5px solid"
              borderColor="rgba(255, 255, 255, 0.1);"
              borderRadius={theme.radius.xl}
              boxShadow={theme.shadows["inner-card"]}
              paddingX="20px"
              paddingY="12px"
              width="calc(50% - 14px)"
              height="100px"
              mb={2}
              display="flex"
              alignItems="center"
              role="link"
              tabIndex={0}
              onClick={handleCardClick}
              cursor="pointer"
              _hover={{ transform: "translateY(-2.5px)" }}
              _active={{ boxShadow: "none", transform: "translateY(0)" }}
              transition="200ms all ease-out"
              data-link={trend.link}
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                w="100%"
              >
                <Box display="flex" gap="9px" alignItems="center">
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
                    ) : getPosition(currentIndex, prevIndex) === "up" ? (
                      <ArrowUp />
                    ) : (
                      <Same className={styles.same} />
                    )}
                  </Box>

                  <Box display="flex" gap="12px" flexDirection="column" ml={0}>
                    <Text
                      fontWeight={600}
                      fontSize="xl"
                      className={calculateLines("buscado")}
                    >
                      {trend.title}
                    </Text>
                    <Badge
                      className="one-max-line"
                      width="fit-content"
                      fontSize="xs"
                      textTransform="uppercase"
                      variant="outline"
                      paddingX="8px"
                      paddingY="2px"
                      color="#fff"
                      border="1px solid #fff"
                    >
                      {"más de " + trend.amount + " mil búsquedas"}
                    </Badge>
                  </Box>
                </Box>
                <Box
                  display="flex"
                  gap={8}
                  alignItems="center"
                  justifyContent="flex-end"
                >
                  <TrendHistoryPopover
                    historyPath="/api/google-trends/history"
                    matchValue={trend.title}
                    field="title"
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
                                "google",
                                currentIndex,
                                trend.title
                              )}
                              data-action="share/whatsapp/share"
                              target="_blank"
                              aria-label="Compartir en WhatsApp"
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
                                "google",
                                currentIndex,
                                trend.title
                              )}
                              target="_blank"
                              rel="noreferrer"
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
    </Flex>
  );
};

export default GoogleCardDesktop;
