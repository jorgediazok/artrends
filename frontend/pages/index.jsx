import { useEffect, useState } from "react";
import Head from "next/head";
import { useQuery, QueryClient, dehydrate } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";

// Charka UI
import { Box, Container } from "@chakra-ui/react";

// API
import { getTrends } from "../services/services";

// Components
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

// Theme
import theme from "../styles/theme";

// Utils
import { intersectionObserverOptions } from "../utils/position";

// Components
import Hero from "../components/ui/Hero";
import TwitterCardDesktop from "../components/ui/Cards/Twitter/TwitterCardDesktop/";
import YoutubeCardDesktop from "../components/ui/Cards/Youtube/YoutubeCardDesktop/";
import GoogleCardDesktop from "../components/ui/Cards/Google/GoogleCardDesktop/";
import SpotifyCardDesktop from "../components/ui/Cards/Spotify/SpotifyCardDesktop/";
import TwitterCardMobile from "../components/ui/Cards/Twitter/TwitterCardMobile/";
import GoogleCardMobile from "../components/ui/Cards/Google/GoogleCardMobile/";
import YoutubeCardMobile from "../components/ui/Cards/Youtube/YoutubeCardMobile/";
import SpotifyCardMobile from "../components/ui/Cards/Spotify/SpotifyCardMobile/";
import NewsPortalsMobile from "../components/ui/Cards/NewsPortals/NewsPortalsMobile";
import NewsPortalsDesktop from "../components/ui/Cards/NewsPortals/NewsPortalsDesktop";
import SectionTitle from "../components/ui/SectionTitle";

// Utils
import { scrollOffset as offset } from "../utils/scrollOffset";

export default function Home() {
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

  // Queries
  const { data: trends } = useQuery({
    queryKey: ["trends"],
    queryFn: getTrends,
  });

  // Effects
  useEffect(() => {
    if (twitterIsInView) {
      setActiveSectionIndex(0);
      return;
    }
    if (spotifyIsInView) {
      setActiveSectionIndex(1);
      return;
    }
    if (youtubeIsInView) {
      setActiveSectionIndex(2);
      return;
    }
    if (googleIsInView) {
      setActiveSectionIndex(3);
      return;
    }
    if (portalsIsInView) {
      setActiveSectionIndex(4);
      return;
    }
  }, [
    googleIsInView,
    portalsIsInView,
    spotifyIsInView,
    twitterIsInView,
    youtubeIsInView,
  ]);

  if (!trends) {
    return (
      <strong>
        No pudimos conectarnos con nuestros servidores. Estamos trabajando para
        solucionarlo.
      </strong>
    );
  }

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
        hasSearch={true}
        hasCarrousel={true}
      />

      {/* HERO */}
      <Hero />

      <Box
        as="main"
        background={{
          base: theme.colors.gradients["background-home-mobile"],
          lg: theme.colors.gradients["background-home-desktop"],
        }}
        pt={{ base: "220px", lg: "128px" }}
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
          <Box
            as="section"
            ref={twitterSectionRef}
            id="twitter"
            paddingY={{ base: `${offset.mobile}px`, lg: `${offset.desktop}px` }}
            marginY={{
              base: `${-offset.mobile}px`,
              lg: `${-offset.desktop}px`,
            }}
          >
            <SectionTitle title="Lo más discutido en Twitter" />
            <TwitterCardMobile twitter={trends.twitter} />
            <TwitterCardDesktop twitter={trends.twitter} />
          </Box>

          {/* SPOTIFY */}
          <Box
            as="section"
            id="spotify"
            ref={spotifySectionRef}
            paddingY={{ base: `${offset.mobile}px`, lg: `${offset.desktop}px` }}
            marginY={{
              base: `${-offset.mobile}px`,
              lg: `${-offset.desktop}px`,
            }}
          >
            <SectionTitle title="Lo más escuchado en Spotify" />
            <SpotifyCardMobile
              spotifyArtist={trends.spotifyArtists}
              spotifyPodcast={trends.spotifyPodcasts}
              spotifySong={trends.spotifySongs}
            />
            <SpotifyCardDesktop
              spotifyArtist={trends.spotifyArtists}
              spotifyPodcast={trends.spotifyPodcasts}
              spotifySong={trends.spotifySongs}
            />
          </Box>

          {/* YOUTUBE */}
          <Box
            as="section"
            ref={youtubeSectionRef}
            id="youtube"
            paddingY={{ base: `${offset.mobile}px`, lg: `${offset.desktop}px` }}
            marginY={{
              base: `${-offset.mobile}px`,
              lg: `${-offset.desktop}px`,
            }}
          >
            <SectionTitle title="Lo más visto en Youtube" />
            <YoutubeCardMobile youtube={trends.youtube} />
            <YoutubeCardDesktop youtube={trends.youtube} />
          </Box>

          {/* GOOGLE */}
          <Box
            as="section"
            ref={googleSectionRef}
            id="google"
            paddingY={{ base: `${offset.mobile}px`, lg: `${offset.desktop}px` }}
            marginY={{
              base: `${-offset.mobile}px`,
              lg: `${-offset.desktop}px`,
            }}
          >
            <SectionTitle title="Lo más buscado en Google" />
            <GoogleCardMobile
              google={trends.google}
              googleSectionRef={googleSectionRef}
            />
            <GoogleCardDesktop
              google={trends.google}
              googleSectionRef={googleSectionRef}
            />
          </Box>

          {/* PORTALS */}
          <Box
            as="section"
            ref={portalSectionRef}
            id="portals"
            paddingY={{ base: `${offset.mobile}px`, lg: `${offset.desktop}px` }}
            marginY={{
              base: `${-offset.mobile}px`,
              lg: `${-offset.desktop}px`,
            }}
          >
            <SectionTitle title="Las noticias más leídas" id="portals" />
            <NewsPortalsMobile
              portals={trends.portals}
              portalSectionRef={portalSectionRef}
            />
            <NewsPortalsDesktop
              portals={trends.portals}
              portalSectionRef={portalSectionRef}
            />
          </Box>
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
