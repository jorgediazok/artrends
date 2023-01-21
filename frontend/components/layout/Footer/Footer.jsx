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
      bg={theme.colors.gradients["grad-footer"]}
      height="315px"
      as="footer"
      display="flex"
      justifyContent="center"
      alignItems="center"
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
          gap="26px"
          display="flex"
          justifyContent="center"
          flexDirection="column"
          textAlign="center"
          fontWeight="bold"
          color="#FFFFFF"
          fontSize="sm"
        >
          <NextLink href="/sobre-las-tendencias">
            <Text as="button">Sobre las tendencias</Text>
          </NextLink>

          <Text>Contacto</Text>
          <Text>Políticas de privacidad</Text>
        </Box>
        <Box display="flex" marginTop="36px" gap="62px">
          <Twitter />
          <Email />
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
