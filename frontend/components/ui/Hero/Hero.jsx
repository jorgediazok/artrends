// Chakra
import { Box, Flex, Text } from "@chakra-ui/react";

// Icons
import Chart from "../icons/Chart";

// Styles
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <Box
      pt="132px"
      px="96px"
      justifyContent="center"
      alignItems="center"
      display={{ base: "none", lg: "flex" }}
      bg="#241154"
      position="relative"
      width="100%"
      as="header"
      id="Hero"
      overflow="hidden"
    >
      <Flex direction="column">
        <Text
          as="h1"
          fontSize="64px"
          color="white"
          fontWeight="black"
          maxW="648px"
          textShadow="inner-md"
          textAlign="left"
        >
          ¿En qué piensan los argentinos?
        </Text>
        <Text
          as="p"
          fontSize="2xl"
          color="white"
          maxWidth="552px"
          fontWeight="semibold"
          textAlign="left"
          mt="48px"
        >
          Artrends te brinda las listas de tendencias dentro de Argentina en las
          plataformas más populares.
        </Text>
      </Flex>

      <Chart className={styles.chart} />

      <img
        src="images/argentino.gif"
        alt="argentino"
        className={styles.argentino}
      />
    </Box>
  );
}
