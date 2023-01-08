import { Box, Text } from "@chakra-ui/react";
import Email from "../../../public/icons/Email";
import Twitter from "../../../public/icons/Twitter";
import theme from "../../../styles/theme";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <Box
      width="100%"
      bg={theme.colors.gradients["grad-footer"]}
      height="315px"
      mt="80px"
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
        <Text fontSize="md" fontWeight="bold" color="#FFFFFF">
          ARTRENDS
        </Text>
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
          <Text>Sobre las tendencias</Text>
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
