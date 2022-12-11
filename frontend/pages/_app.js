import { ChakraProvider } from "@chakra-ui/react";
// import "@fontsource/inter";
import "@fontsource/inter/400.css";
import "@fontsource/inter/700.css";
import theme from "../styles/theme";

function ArtrendsApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default ArtrendsApp;
