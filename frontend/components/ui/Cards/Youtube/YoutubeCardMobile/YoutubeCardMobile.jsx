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
import theme from "../../../../../styles/theme";
import { calculateLines } from "../../../../../utils/calculateLines";
import { getPosition } from "../../../../../utils/position";
import ArrowDownMobile from "../../../icons/ArrowDownMobile";
import ArrowUpMobile from "../../../icons/ArrowUpMobile";
import SameMobile from "../../../icons/SameMobile";
import ThreeDots from "../../../icons/ThreeDots";
import TwitterCompartir from "../../../icons/TwitterCompartir";
import Whatsapp from "../../../icons/Whatsapp";
import styles from "./YoutubeCardMobile.module.css";

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
      {youtube?.current?.record?.trends?.map((trend, currentIndex) => {
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
                      <MenuButton maxW="10%" minW="10%" pl={3}>
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
                          href="#"
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
      })}
    </Flex>
  );
};

export default YoutubeCardMobile;
