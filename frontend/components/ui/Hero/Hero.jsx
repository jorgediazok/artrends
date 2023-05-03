// Chakra
import { Box, Text } from "@chakra-ui/react";
import Image from "next/future/image";

// Images
import FlagMobile from "/public/images/flag-mobile.webp";
import FlagDesktop from "/public/images/flag-desktop.webp";
import Argentino from "/public/images/argentino.gif";

// Components
import Container from "../../layout/Container";

// Styles
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <Box className={styles.hero}>
      <Box
        id="flag"
        className={styles["flag-container"]}
        display="flex"
        flexDirection="column"
        justifyContent="center"
      >
        <Container>
          <Image
            className={styles["flag-image-mobile"]}
            src={FlagMobile.src}
            alt=""
            width={FlagMobile.width}
            height={FlagMobile.height}
            display={{ base: "block", lg: "none" }}
          />
          <Image
            className={styles["flag-image-desktop"]}
            src={FlagDesktop.src}
            alt=""
            width={FlagDesktop.width}
            height={FlagDesktop.height}
            display={{ base: "none", lg: "block" }}
          />
          <Box aria-hidden className={styles.gradient} />
          <Image
            src={Argentino.src}
            alt=""
            width={Argentino.width}
            height={Argentino.height}
            className={styles.argie}
          />
          <Box
            as="header"
            margin="auto"
            height="100%"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            gap={{ base: "24px", md: "64px" }}
          >
            <Text
              as="p"
              fontFamily="montserrat"
              fontWeight="bold"
              fontSize={{ base: "24px", md: "48px", lg: "64px" }}
              color="#fff"
              position="relative"
              lineHeight={1.5}
              zIndex={100}
              textShadow={{
                base: "1px 2px 2px #0A0840",
                md: "2px 3px 3px #0A0840",
              }}
              maxW={{ base: "80%", md: "50%", lg: "75%", xl: "50%" }}
            >
              DESCUBRÍ EL SENTIR ARGENTINO
            </Text>
            <Text
              as="p"
              fontFamily="Inter"
              fontSize={{ base: "14px", md: "20px", lg: "24px" }}
              color="#fff"
              position="relative"
              lineHeight={1.5}
              zIndex={100}
              textShadow="1px 2px 2px #0A0840"
              className={styles.subtitle}
              fontStyle="italic"
            >
              Artrends te acerca lo que expresan y consumen en los medios
              digitales en este momento.
            </Text>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
