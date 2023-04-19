// Chakra
import { Box, Flex, Text } from "@chakra-ui/react";
import Image from "next/future/image";

// Styles
import styles from "./Hero.module.css";

// Thene
import theme from "../../../styles/theme";

export default function Hero() {
  return (
    <Box
      pt="132px"
      justifyContent="center"
      alignItems="center"
      display={{ lg: "flex" }}
      bg="#241154"
      position="relative"
      width="100%"
      as="header"
      id="Hero"
      overflow="hidden"
      w="100%"
      height={{ base: "80%", lg: "70%" }}
      borderTop="1px solid"
      borderBottom="1px solid"
      borderColor="indigo.800"
      boxShadow={theme.shadows["drop-md"]}
    >
      <Flex
        direction="column"
        w="70%"
        h="100%"
        position="relative"
        justifyContent="center"
        p={{ base: "150px 16px 32px 16px", lg: "32px 16px 32px 128px" }}
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
        <Image
          src="/images/chart-mobile.png"
          alt="Imágen de fondo"
          aria-hidden
          layout="fill"
          width={1000}
          height={280}
          className={styles["chart-mobile"]}
        />
        <div className={styles.layer} aria-hidden />
        <Text
          as="h1"
          fontSize={{ base: "24px", lg: "64px" }}
          color="white"
          fontWeight="black"
          textAlign="left"
          position="relative"
          className={styles.shadow}
          lineHeight={1.2}
          maxWidth="80%"
        >
          ¿En qué piensan los argentinos?
        </Text>
        <Text
          as="p"
          fontSize={{ base: "16px", lg: "20px" }}
          color="white"
          fontWeight={{ base: "medium", lg: "semibold" }}
          textAlign="left"
          mt="32px"
          maxW={{ base: "70%", lg: "50%" }}
          position="relative"
          className={styles.shadow}
        >
          Te damos las listas de tendencias dentro de Argentina en las
          plataformas más populares.
        </Text>
      </Flex>

      <Flex w={{ base: "100%", lg: "30%" }}>
        <img
          src="images/argentino.gif"
          alt="argentino"
          className={styles.argentino}
        />
      </Flex>
    </Box>
  );
}
