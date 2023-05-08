// Chakra
import { Box, Text } from "@chakra-ui/react";
import Image from "next/future/image";

// Images
import FlagMobile from "/public/images/bg-mobile.webp";
import FlagTablet from "/public/images/bg-tablet.webp";
import FlagDesktop from "/public/images/bg-desktop.webp";
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
            className={styles["bg-mobile"]}
            src={FlagMobile.src}
            alt=""
            width={FlagMobile.width}
            height={FlagMobile.height}
            quality={100}
          />
          <Image
            className={styles["bg-tablet"]}
            src={FlagMobile.src}
            alt=""
            width={FlagMobile.width}
            height={FlagMobile.height}
            quality={100}
          />
          <Image
            className={styles["bg-desktop"]}
            src={FlagDesktop.src}
            alt=""
            width={FlagDesktop.width}
            height={FlagDesktop.height}
            quality={100}
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
            pt={{ lg: "5rem" }}
            gap={{ base: "24px", md: "48px" }}
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
