import Image from "next/image";
import NextLink from "next/link";

// Chakra
import { Box, Text } from "@chakra-ui/react";

// Icons
import Email from "../../ui/icons/Email";
import Twitter from "../../ui/icons/Twitter";

// Theme
import theme from "../../../styles/theme";

const Footer = () => {
  return (
    <Box
      width="100%"
      bg={theme.colors.gradients["grad-purp-180"]}
      as="footer"
      display="flex"
      justifyContent="center"
      alignItems="center"
      py="64px"
    >
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Image
          src="/images/logo-desktop.png"
          alt="Artrends"
          height={40}
          width={174}
          quality={100}
        />
        <Box
          marginTop="31px"
          gap="20px"
          display="flex"
          justifyContent="center"
          flexDirection="column"
          textAlign="center"
          fontWeight="bold"
          color="#FFFFFF"
          fontSize="sm"
        >
          <NextLink href="/contacto">
            <Text as="button">Contacto</Text>
          </NextLink>

          <Box
            display="flex"
            flexDirection={{ base: "column", md: "row", lg: "row" }}
            gap={{ base: "20px", md: "32px", lg: "32px" }}
            marginTop={{ base: "0px", md: "15px", lg: "15px" }}
          >
            <NextLink href="/sobre-las-tendencias">
              <Text as="button">Sobre las tendencias</Text>
            </NextLink>

            <NextLink href="/politicas-de-privacidad">
              <Text as="button">Políticas de privacidad</Text>
            </NextLink>

            <NextLink href="/terminos-y-condiciones">
              <Text as="button">Términos y condiciones</Text>
            </NextLink>
          </Box>
        </Box>
        <Box display="flex" marginTop="38px" gap="62px">
          <Twitter />
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
