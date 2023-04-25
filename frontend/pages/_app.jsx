import { useState } from "react";
import {
  QueryClient,
  QueryClientProvider,
  Hydrate,
} from "@tanstack/react-query";
import { ChakraProvider } from "@chakra-ui/react";

// Assets
import "@fontsource/inter";
import "@fontsource/montserrat";

// Styles
import "../styles/globals.css";
import theme from "../styles/theme";

function ArtrendsApp({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default ArtrendsApp;
