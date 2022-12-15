import Head from "next/head";
import { Heading } from "@chakra-ui/react";

// import theme from "../styles/theme";

import Background from "../components/ui/Background/Background";

export default function Home() {
  return (
    <>
      <Head>
        <title>Artrends</title>
        <meta name="description" content="Tus tendencias al instante!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Background />
        <Heading as="h1" size="4xl" color="cyan.200">
          Bienvenidos a Artrends
        </Heading>
      </main>
    </>
  );
}
