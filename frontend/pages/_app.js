import { useState } from "react";
import {
  QueryClient,
  QueryClientProvider,
  Hydrate,
} from "@tanstack/react-query";
import { ChakraProvider } from "@chakra-ui/react";

// Theme
import theme, { colors } from "../styles/theme";

// Assets
import "@fontsource/inter";

// Styles
import "../styles/globals.css";

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
