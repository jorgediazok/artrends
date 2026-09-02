import { useState } from "react";
import {
  QueryClient,
  QueryClientProvider,
  HydrationBoundary,
} from "@tanstack/react-query";
import { ChakraProvider } from "@chakra-ui/react";
import { Analytics } from "@vercel/analytics/react";

// Assets
import "@fontsource/inter";
import "@fontsource/montserrat";

// Styles
import "../styles/globals.css";
import { system } from "../styles/theme";

function ArtrendsApp({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={pageProps.dehydratedState}>
        <ChakraProvider value={system}>
          <Component {...pageProps} />
          <Analytics />
        </ChakraProvider>
      </HydrationBoundary>
    </QueryClientProvider>
  );
}

export default ArtrendsApp;
