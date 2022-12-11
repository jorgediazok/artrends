import Head from "next/head";
//import Image from "next/image";
import theme from "../styles/theme";

import { Heading } from "@chakra-ui/react";

export default function Home() {
  return (
    <>
      <Head>
        <title>Artrends</title>
        <meta name="description" content="Tus tendencias al instante!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Heading as="h1" size="4xl">
          Bienvenidos a Artrends
        </Heading>
      </main>
    </>
  );
}
