import {
  QueryClient,
  QueryClientProvider,
  Hydrate,
} from "@tanstack/react-query";
import { useState } from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { colors } from "../styles/theme";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient());

  const theme = extendTheme({ colors });

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

export default MyApp;
