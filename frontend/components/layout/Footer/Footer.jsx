import { Box } from "@chakra-ui/react";
import theme from "../../../styles/theme";
import styles from "./Footer.module.css";

const Footer = () => {
  return <Box width="100vw" bg={theme.colors.gradients["grad-footer"]}></Box>;
};

export default Footer;
