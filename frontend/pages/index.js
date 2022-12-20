import Head from "next/head";
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
        <Heading as="h1" size="4xl" color="purple.500">
          Bienvenidos a Artrends
        </Heading>
      </main>
    </>
  );
}
