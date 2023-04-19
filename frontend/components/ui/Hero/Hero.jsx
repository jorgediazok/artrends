// Chakra
import { Box, Flex, Text } from "@chakra-ui/react";
import Image from "next/future/image";

// Styles
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <Box
      pt="132px"
      justifyContent="center"
      alignItems="center"
      display={{ base: "none", lg: "flex" }}
      bg="#241154"
      position="relative"
      width="100%"
      as="header"
      id="Hero"
      overflow="hidden"
      w="100%"
      height="70%"
      maxHeight="620px"
    >
      <Flex
        direction="column"
        w="70%"
        h="100%"
        position="relative"
        justifyContent="center"
        alignItems="center"
      >
        <Image
          src="/images/chart.png"
          alt="Imágen de fondo"
          aria-hidden
          layout="fill"
          width={1095}
          height={792}
          className={styles.chart}
        />
        <div className={styles.layer} aria-hidden />{" "}
        <Text
          as="h1"
          fontSize="64px"
          color="white"
          fontWeight="black"
          maxW="648px"
          textAlign="left"
          position="relative"
          className={styles.shadow}
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
          maxW="648px"
          position="relative"
          className={styles.shadow}
        >
          Artrends te brinda las listas de tendencias dentro de Argentina en las
          plataformas más populares.
        </Text>
      </Flex>

      <Flex w="30%">
        <img
          src="images/argentino.gif"
          alt="argentino"
          className={styles.argentino}
        />
      </Flex>
    </Box>
  );
}
