import { Badge, Box, Flex, Text } from "@chakra-ui/react";
import { calculateLines } from "../../../../../utils/calculateLines";
import { getPosition } from "../../../../../utils/position";
import ArrowDown from "../../../icons/ArrowDown";
import ArrowUp from "../../../icons/ArrowUp";
import Same from "../../../icons/Same";
import Share from "../../../icons/Share";
import CardTitle from "../../../TrendCard/CardTitle/CardTitle";
import theme from "../../../../../styles/theme";
import styles from "./GoogleCardDesktop.module.css";

const GoogleCardDesktop = ({ google, googleSectionRef }) => {
  return (
    <>
      <Box
        id="google"
        display="flex"
        width="100%"
        mt={{ base: "24px", lg: "72px" }}
        ref={googleSectionRef}
      >
        <CardTitle title="Lo más buscado en Google" />
      </Box>
      <Flex
        width="100%"
        flexWrap={{ base: "nowrap", lg: "wrap" }}
        flexDirection="column"
        alignContent="space-between"
        paddingX={{ base: "16px", lg: "0" }}
        mt="24px"
        maxHeight={{ base: "none", lg: "540px" }}
        alignItems="center"
      >
        {google?.current?.record?.trends?.map((trend, currentIndex) => {
          const elementInPrevious = google?.previous?.record?.trends?.find(
            element => element.title === trend.title
          );
          const prevIndex = google?.previous?.record?.trends?.findIndex(
            element => element.title === elementInPrevious?.title
          );

          return (
            <>
              <Box
                key={trend.title}
                as="article"
                color={theme.colors.white[500]}
                bg={theme.colors.indigo[800]}
                border="1px"
                borderColor={theme.colors.cyan[200]}
                borderRadius={theme.radius.xl}
                paddingX="20px"
                paddingY="12px"
                width="440px"
                height="100px"
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
                  <Box display="flex" gap="9px" alignItems="center">
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      width="80px"
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
                    <Box
                      display="flex"
                      gap={2}
                      flexDirection="column"
                      maxW="600px"
                      ml={0}
                    >
                      <a
                        href={trend.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Text
                          fontWeight={600}
                          fontSize="xl"
                          className={calculateLines("buscado")}
                        >
                          {trend.title}
                        </Text>
                      </a>
                      <Badge
                        className="one-max-line"
                        width="fit-content"
                        fontSize="xs"
                        textTransform="uppercase"
                        variant="outline"
                        colorScheme="#fff"
                        border="1px solid #fff"
                      >
                        {"más de " + trend.amount + " mil búsquedas"}
                      </Badge>
                    </Box>
                  </Box>
                  <Box
                    display="flex"
                    gap={8}
                    alignItems="flex-end"
                    justifyContent="flex-end"
                    marginTop="40px"
                  >
                    <Share />
                  </Box>
                </Box>
              </Box>
            </>
          );
        })}
      </Flex>
    </>
  );
};

export default GoogleCardDesktop;
