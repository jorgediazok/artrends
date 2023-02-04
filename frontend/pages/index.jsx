import { useEffect, useState } from "react";
import Head from "next/head";
import { useQuery, QueryClient, dehydrate } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";

// Charka UI
import { Box, Container, Flex } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

// API
import {
  getGoogleTrends,
  getTwitterTrends,
  getSpotifyArtistTrends,
  getSpotifySongTrends,
  getSpotifyPodcastTrends,
  getYoutubeTrends,
  getPortals,
  getTrends,
} from "../services/services";

// Components
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import TrendCard from "../components/ui/TrendCard/TrendCard";
import CardTitle from "../components/ui/TrendCard/CardTitle/CardTitle";

// Theme
import theme from "../styles/theme";

// Utils
import { getPosition, intersectionObserverOptions } from "../utils/position";
import TwitterCardDesktop from "../components/ui/Cards/Twitter/TwitterCardDesktop/TwitterCardDesktop";
import YoutubeCardDesktop from "../components/ui/Cards/Youtube/YoutubeCardDesktop/YoutubeCardDesktop";
import GoogleCardDesktop from "../components/ui/Cards/Google/GoogleCardDesktop/GoogleCardDesktop";
import PortalesDesktop from "../components/ui/Cards/Portales/PortalesDesktop/PortalesDesktop";
import SpotifyCardDesktop from "../components/ui/Cards/Spotify/SpotifyCardDesktop/SpotifyCardDesktop";

export default function Home() {
  const [hasCarrousel, setHasCarrousel] = useState(true);
  const [hasSearch, setHasSearch] = useState(true);
  const [activeSectionIndex, setActiveSectionIndex] = useState();

  // Hooks
  const { ref: spotifySectionRef, inView: spotifyIsInView } = useInView({
    ...intersectionObserverOptions,
    skip: typeof window !== "undefined" && window.innerWidth > 1100,
  });
  const { ref: googleSectionRef, inView: googleIsInView } = useInView({
    ...intersectionObserverOptions,
    skip: typeof window !== "undefined" && window.innerWidth > 1100,
  });
  const { ref: youtubeSectionRef, inView: youtubeIsInView } = useInView({
    ...intersectionObserverOptions,
    skip: typeof window !== "undefined" && window.innerWidth > 1100,
  });
  const { ref: portalSectionRef, inView: portalsIsInView } = useInView({
    ...intersectionObserverOptions,
    skip: typeof window !== "undefined" && window.innerWidth > 1100,
  });

  const { ref: twitterSectionRef, inView: twitterIsInView } = useInView({
    ...intersectionObserverOptions,
    skip: typeof window !== "undefined" && window.innerWidth > 1100,
  });

  useEffect(() => {
    if (twitterIsInView) {
      setActiveSectionIndex(0);
      return;
    }
  }, [twitterIsInView]);

  // Queries
  const { data: trends } = useQuery({
    queryKey: ["trends"],
    queryFn: getTrends,
  });

  console.log(trends);

  // Effects
  // useEffect(() => {
  //   if (twitterIsInView) {
  //     setActiveSectionIndex(0);
  //     return;
  //   }
  //   if (spotifyIsInView) {
  //     setActiveSectionIndex(1);
  //     return;
  //   }
  //   if (youtubeIsInView) {
  //     setActiveSectionIndex(2);
  //     return;
  //   }
  //   if (googleIsInView) {
  //     setActiveSectionIndex(3);
  //     return;
  //   }
  //   if (portalsIsInView) {
  //     setActiveSectionIndex(4);
  //     return;
  //   }
  // }, [
  //   googleIsInView,
  //   portalsIsInView,
  //   spotifyIsInView,
  //   twitterIsInView,
  //   youtubeIsInView,
  // ]);

  // if (
  //   !google ||
  //   !twitter ||
  //   !spotifyArtist ||
  //   !spotifySong ||
  //   !spotifyPodcast ||
  //   !youtube
  // ) {
  //   return <div>No data</div>;
  // }

  return (
    <>
      <Head>
        <title>Artrends</title>
        <meta name="description" content="Tus tendencias al instante!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* NAV */}
      <Navbar
        activeSectionIndex={activeSectionIndex}
        hasSearch={hasSearch}
        hasCarrousel={hasCarrousel}
      />

      <Box
        as="main"
        background={{
          base: theme.colors.gradients["background-home-mobile"],
          lg: theme.colors.gradients["background-home-desktop"],
        }}
        pt={{ base: "248px", lg: 0 }}
      >
        <Container
          maxW="container.lg"
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          color="white"
          width="100%"
          p={0}
        >
          {/* TWITTER */}
          <TwitterCardDesktop
            twitter={trends.twitter}
            twitterSectionRef={twitterSectionRef}
          />
          {/* SPOTIFY */}
          <SpotifyCardDesktop
            spotifyArtist={trends.spotifyArtists}
            spotifyPodcast={trends.spotifyPodcasts}
            spotifySong={trends.spotifySongs}
            spotifySectionRef={spotifySectionRef}
          />
          {/* YOUTUBE */}
          <YoutubeCardDesktop
            youtube={trends.youtube}
            youtubeSectionRef={youtubeSectionRef}
          />
          {/* GOOGLE */}
          <GoogleCardDesktop
            google={trends.google}
            googleSectionRef={googleSectionRef}
          />
          {/* PORTALS */}
          <PortalesDesktop
            portals={trends.portals}
            portalSectionRef={portalSectionRef}
          />
        </Container>
      </Box>

      {/* Footer */}
      <Footer />
    </>
  );
}

export async function getServerSideProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["trends"], getTrends);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
