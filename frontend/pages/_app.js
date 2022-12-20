import { ChakraProvider } from "@chakra-ui/react";
import "@fontsource/inter";
import theme from "../styles/theme";

function ArtrendsApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default ArtrendsApp;
