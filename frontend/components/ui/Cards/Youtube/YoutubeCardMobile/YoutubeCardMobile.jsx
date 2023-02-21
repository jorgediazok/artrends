import {
  Badge,
  Box,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";

//UTILS
import { calculateLines } from "../../../../../utils/calculateLines";
import { getPosition } from "../../../../../utils/position";

//ICONS AND COMPONENTS
import ArrowDownMobile from "../../../icons/ArrowDownMobile";
import ArrowUpMobile from "../../../icons/ArrowUpMobile";
import SameMobile from "../../../icons/SameMobile";
import ThreeDots from "../../../icons/ThreeDots";
import TwitterCompartir from "../../../icons/TwitterCompartir";
import Whatsapp from "../../../icons/Whatsapp";
import ErrorCardMobile from "../../ErrorCard/ErrorCardMobile/ErrorCardMobile";

//STYLES
import styles from "./YoutubeCardMobile.module.css";
import theme from "../../../../../styles/theme";

const YoutubeCardMobile = ({ youtube, youtubeSectionRef }) => {
  return (
    <Flex
      width="100%"
      flexWrap={{ base: "nowrap", lg: "wrap" }}
      flexDirection="column"
      alignContent="space-between"
      paddingX={{ base: "16px", lg: "0" }}
      maxHeight={{ base: "none", lg: "540px" }}
      alignItems="center"
    >
      {youtube?.current?.record?.trends?.length === 0 ? (
        <ErrorCardMobile />
      ) : (
        youtube?.current?.record?.trends?.map((trend, currentIndex) => {
          const elementInPrevious = youtube?.previous?.record?.trends?.find(
            element => element.title === trend.title
          );
          const prevIndex = youtube?.previous?.record?.trends?.findIndex(
            element => element.title === elementInPrevious?.title
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
              height="118px"
              mb={2}
              display={{ base: "flex", lg: "none" }}
              alignItems="center"
              p="8px 16px"
              key={trend.title}
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
                          width="90%"
                          fontWeight={600}
                          fontSize="16px"
                          className={calculateLines("visto")}
                        >
                          {trend.title}
                        </Text>
                      </a>
                      <Menu maxW="162px">
                        <MenuButton
                          isolation="isolate"
                          width="10%"
                          minW="10%"
                          pl={3}
                        >
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
                            href={`https://api.whatsapp.com/send?text=En%20este%20momento%20${encodeURIComponent(
                              trend.title
                            )}%20está%20en%20el%20puesto%20N°%20${
                              currentIndex + 1
                            }%20en%20tendencias%20en%20Youtube%20Argentina.%20Mirá%20más%20en%20Artrends%20%23Artrends"
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
                            href={`https://twitter.com/intent/tweet?url=${
                              trend.link
                            }&text=Mirate%20este%20video%20de%20${
                              trend.channel
                            }%20que%20está%20en%20el%20puesto%20N°%20${
                              currentIndex + 1
                            }%20en%20Youtube%20en%20Argentina%20en%20este%20momento!%20%23Artrends`}
                            target="_blank"
                            rel="noreferrer"
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

                    <a
                      href={trend.channelLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Text fontSize="md">{trend.channel}</Text>
                    </a>
                  </Box>
                </Box>

                <Box
                  display="flex"
                  w="100%"
                  justifyContent="space-between"
                  alignItems="center"
                  height="100%"
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
                      {trend.amount + " reproducciones"}
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
    </Flex>
  );
};

export default YoutubeCardMobile;
