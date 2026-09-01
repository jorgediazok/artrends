import { useEffect, useMemo, useState } from "react";
import { Partytown } from "@builder.io/partytown/react";
import NextHead from "next/head";
import Script from "next/script";

import { useQuery, QueryClient, dehydrate } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";

// Charka UI
import { Box, Text } from "@chakra-ui/react";

// API
import { getTrends } from "../services/services";

// Components
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

// Theme
import theme from "../styles/theme";

// Utils
import { intersectionObserverOptions } from "../utils/position";
import { findCrossPlatformMatches } from "../utils/crossPlatform";

// Components
import Container from "../components/layout/Container";
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
import TrendListSkeleton from "../components/ui/TrendListSkeleton/TrendListSkeleton";

// Utils
import { scrollOffset as offset } from "../utils/scrollOffset";

export default function Home() {
  const [activeSectionIndex, setActiveSectionIndex] = useState();

  // Hooks
  // const { ref: spotifySectionRef, inView: spotifyIsInView } = useInView({
  //   ...intersectionObserverOptions,
  //   skip: typeof window !== "undefined" && window.innerWidth > 1100,
  // });
  // const { ref: googleSectionRef, inView: googleIsInView } = useInView({
  //   ...intersectionObserverOptions,
  //   skip: typeof window !== "undefined" && window.innerWidth > 1100,
  // });
  // const { ref: youtubeSectionRef, inView: youtubeIsInView } = useInView({
  //   ...intersectionObserverOptions,
  //   skip: typeof window !== "undefined" && window.innerWidth > 1100,
  // });
  // const { ref: portalSectionRef, inView: portalsIsInView } = useInView({
  //   ...intersectionObserverOptions,
  //   skip: typeof window !== "undefined" && window.innerWidth > 1100,
  // });

  // const { ref: twitterSectionRef, inView: twitterIsInView } = useInView({
  //   ...intersectionObserverOptions,

  //   skip: typeof window !== "undefined" && window.innerWidth > 1100,
  // });

  // Queries
  const {
    data: trends,
    isPending: trendsArePending,
    isError: trendsHaveError,
  } = useQuery({
    queryKey: ["trends"],
    queryFn: getTrends,
  });

  const crossMatches = useMemo(() => findCrossPlatformMatches(trends), [trends]);

  // Handlers
  const handleCardClick = e => {
    if (e.target.closest("a, button")) {
      return;
    }
    window.open(e.currentTarget.dataset.link, "_blank");
  };

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

  if (trendsArePending) {
    return (
      <>
        <Navbar hasSearch={true} hasCarrousel={false} />
        <Hero />
        <Container isContentCentered={false}>
          <TrendListSkeleton rows={10} columns={2} />
          <TrendListSkeleton rows={10} columns={1} />
          <TrendListSkeleton rows={10} columns={1} />
        </Container>
      </>
    );
  }

  if (trendsHaveError || !trends) {
    return (
      <strong>
        No pudimos conectarnos con nuestros servidores. Estamos trabajando para
        solucionarlo.
      </strong>
    );
  }

  return (
    <>
      <NextHead>
        <title>
          Artrends | Lo que nos interesa a los argentinos en un sólo lugar
        </title>
        <Partytown debug={true} forward={["dataLayer.push"]} />

        <meta
          name="description"
          content="Enterate rápido y en un sólo lugar qué les interesa ahora a los argentinos. Tendencias de X, lo más buscado en Google, lo más visto en YouTube, lo más escuchado en Spotify, lo más leído en portales de noticias y más."
        />
        <meta
          name="keywords"
          content="trends, tendencias, argentina, tt, trending topics, google, qué buscan argentinos en google, ranking de canciones, ranking de artistas, ranking de podcasts, intereses de los argentinos, portales de noticias, twitter argentina, noticias de Argentina, intereses de argentinos, spotify argentina, youtubers argentinos, youtube argentina, lo más leído, lo más buscado, lo más escuchado, lo más visto."
        />
        <link rel="canonical" href="https://artrends.ar/" />
        <meta name="robots" content="index, follow" />
        <meta
          property="og:title"
          content="Artrends | Lo que nos interesa a los argentinos en un sólo lugar"
        />
        <meta
          property="og:description"
          content="Enterate rápido y en un sólo lugar qué les interesa ahora a los argentinos. Tendencias de X, lo más buscado en Google, lo más visto en YouTube, lo más escuchado en Spotify, lo más leído en portales de noticias y más."
        />
        <meta property="og:url" content="https://artrends.ar/" />
        <meta property="og:site_name" content="Artrends" />
        <meta property="og:image" content="https://artrends.ar/og_image.png" />
        <link rel="icon" href="/favicon.ico" />
      </NextHead>

      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-6G64M8FYKB"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          window.gtag = function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-6G64M8FYKB', {
              page_path: window.location.pathname,
          });
        `}
      </Script>

      {/* NAV */}
      <Navbar
        activeSectionIndex={activeSectionIndex}
        hasSearch={true}
        hasCarrousel={true}
        onCarouselItemPressed={setActiveSectionIndex}
      />

      {/* HERO */}
      <Hero />

      <Container isContentCentered={false}>
        <Text
          as="h1"
          color="#fff"
          fontSize="40px"
          fontWeight="bold"
          textAlign="left"
          display={{ base: "none", lg: "block" }}
          fontFamily="Montserrat"
          pt="64px"
        >
          Listas de Tendencias en Argentina
        </Text>
      </Container>

      <Box as="main">
        {/* TWITTER */}
        <Box
          as="section"
          //    ref={twitterSectionRef}
          id="twitter"
          background="blue.500"
          paddingTop={{ base: `${offset.mobile}px`, lg: `${offset.desktop}px` }}
          marginTop={{
            base: `${-offset.mobile + 2}px`,
            lg: `${-offset.desktop + 24}px`,
          }}
          bg={theme.colors.gradients["background-gradient-top"]}
        >
          <Container>
            <SectionTitle title="Lo más discutido en X" />
            <TwitterCardMobile
              twitter={trends.twitter}
              handleCardClick={handleCardClick}
              crossMatches={crossMatches}
            />
            <TwitterCardDesktop
              twitter={trends.twitter}
              handleCardClick={handleCardClick}
              crossMatches={crossMatches}
            />
          </Container>
        </Box>

        {/* SPOTIFY */}
        <Box
          as="section"
          id="spotify"
          //        ref={spotifySectionRef}
          paddingTop={{ base: `${offset.mobile}px`, lg: `${offset.desktop}px` }}
          marginTop={{
            base: `${-offset.mobile + 24}px`,
            lg: `${-offset.desktop + 24}px`,
          }}
          background="blue.500"
        >
          <Container>
            <SectionTitle title="Lo más escuchado en Spotify" />
            <SpotifyCardMobile
              spotifyArtist={trends.spotifyArtists}
              spotifyPodcast={trends.spotifyPodcasts}
              spotifySong={trends.spotifySongs}
              handleCardClick={handleCardClick}
              crossMatches={crossMatches}
            />
            <SpotifyCardDesktop
              spotifyArtist={trends.spotifyArtists}
              spotifyPodcast={trends.spotifyPodcasts}
              spotifySong={trends.spotifySongs}
              handleCardClick={handleCardClick}
              crossMatches={crossMatches}
            />
          </Container>
        </Box>

        {/* YOUTUBE */}
        <Box
          as="section"
          //   ref={youtubeSectionRef}
          id="youtube"
          background="blue.500"
          paddingTop={{ base: `${offset.mobile}px`, lg: `${offset.desktop}px` }}
          marginTop={{
            base: `${-offset.mobile}px`,
            lg: `${-offset.desktop + 24}px`,
          }}
        >
          <Container>
            <SectionTitle title="Lo más visto en YouTube" />
            <YoutubeCardMobile
              youtube={trends.youtube}
              crossMatches={crossMatches}
            />
            <YoutubeCardDesktop
              youtube={trends.youtube}
              crossMatches={crossMatches}
            />
          </Container>
        </Box>

        {/* GOOGLE */}
        <Box
          as="section"
          //  ref={googleSectionRef}
          id="google"
          py="32px"
          background="blue.500"
          paddingTop={{ base: `${offset.mobile}px`, lg: `${offset.desktop}px` }}
          marginTop={{
            base: `${-offset.mobile}px`,
            lg: `${-offset.desktop + 24}px`,
          }}
        >
          <Container>
            <SectionTitle title="Lo más buscado en Google" />
            <GoogleCardMobile
              google={trends.google}
              //   googleSectionRef={googleSectionRef}
              handleCardClick={handleCardClick}
              crossMatches={crossMatches}
            />
            <GoogleCardDesktop
              google={trends.google}
              // googleSectionRef={googleSectionRef}
              handleCardClick={handleCardClick}
              crossMatches={crossMatches}
            />
          </Container>
        </Box>

        {/* PORTALS */}
        <Box
          as="section"
          // ref={portalSectionRef}
          id="portals"
          paddingTop={{ base: `${offset.mobile}px`, lg: `${offset.desktop}px` }}
          marginTop={{
            base: `${-offset.mobile}px`,
            lg: `${-offset.desktop + 24}px`,
          }}
          bg={theme.colors.gradients["background-gradient-bottom"]}
        >
          <Container>
            <SectionTitle title="Las noticias más leídas" id="portals" />
            <NewsPortalsMobile
              portals={trends.portals}
              //  portalSectionRef={portalSectionRef}
              handleCardClick={handleCardClick}
              crossMatches={crossMatches}
            />
            <NewsPortalsDesktop
              portals={trends.portals}
              //portalSectionRef={portalSectionRef}
              handleCardClick={handleCardClick}
              crossMatches={crossMatches}
            />
          </Container>
        </Box>
      </Box>
      {/* Footer */}
      <Footer />
    </>
  );
}

export async function getServerSideProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({ queryKey: ["trends"], queryFn: getTrends });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
