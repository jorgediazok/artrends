import { useEffect, useState } from "react";
import Head from "next/head";
import { useQuery, QueryClient, dehydrate } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";

// Charka UI
import { Box, Container, Flex, Text } from "@chakra-ui/react";
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

export default function Home() {
  const [hasCarrousel, setHasCarrousel] = useState(true);
  const [hasSearch, setHasSearch] = useState(true);
  const [activeSectionIndex, setActiveSectionIndex] = useState();

  // Hooks
  const { ref: twitterSectionRef, inView: twitterIsInView } = useInView(
    intersectionObserverOptions
  );
  const { ref: spotifySectionRef, inView: spotifyIsInView } = useInView(
    intersectionObserverOptions
  );
  const { ref: googleSectionRef, inView: googleIsInView } = useInView(
    intersectionObserverOptions
  );
  const { ref: youtubeSectionRef, inView: youtubeIsInView } = useInView(
    intersectionObserverOptions
  );
  const { ref: portalSectionRef, inView: portalsIsInView } = useInView(
    intersectionObserverOptions
  );

  // Queries
  const { data: google } = useQuery({
    queryKey: ["google"],
    queryFn: getGoogleTrends,
  });

  const { data: twitter } = useQuery({
    queryKey: ["twitter"],
    queryFn: getTwitterTrends,
  });

  const { data: spotifyArtist } = useQuery({
    queryKey: ["spotifyArtist"],
    queryFn: getSpotifyArtistTrends,
  });

  const { data: spotifySong } = useQuery({
    queryKey: ["spotifySong"],
    queryFn: getSpotifySongTrends,
  });

  const { data: spotifyPodcast } = useQuery({
    queryKey: ["spotifyPodcast"],
    queryFn: getSpotifyPodcastTrends,
  });

  const { data: youtube } = useQuery({
    queryKey: ["youtube"],
    queryFn: getYoutubeTrends,
  });

  const { data: portals } = useQuery({
    queryKey: ["portals"],
    queryFn: getPortals,
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

  if (
    !google ||
    !twitter ||
    !spotifyArtist ||
    !spotifySong ||
    !spotifyPodcast ||
    !youtube
  ) {
    return <div>No data</div>;
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
          <Box
            id="twitter"
            display="flex"
            width="100%"
            mt={{ base: "260px", lg: "128px" }}
            ref={twitterSectionRef}
          >
            <CardTitle title="Lo más discutido en Twitter" />
          </Box>
          <Flex
            width="100%"
            flexWrap={{ base: "nowrap", lg: "wrap" }}
            flexDirection="column"
            alignContent="space-between"
            paddingX={{ base: "16px", lg: "0" }}
            mt="24px"
            maxHeight={{ base: "none", lg: "540px" }}
            alignItems="center"
          >
            {twitter?.current?.record?.trends?.map((trend, currentIndex) => {
              const elementInPrevious = twitter?.previous?.record?.trends?.find(
                element => element.title === trend.title
              );
              const prevIndex = twitter?.previous?.record?.trends?.findIndex(
                element => element.title === elementInPrevious?.title
              );
              return (
                <TrendCard
                  key={trend.title}
                  position={currentIndex + 1}
                  title={trend.title}
                  direction={getPosition(currentIndex, prevIndex)}
                  amount={trend.amount}
                  link={trend.link}
                  height="72px"
                  type="discutido"
                />
              );
            })}
          </Flex>

          {/* SPOTIFY */}
          <Box
            id="spotify"
            display="flex"
            width="100%"
            mt={{ base: "24px", lg: "72px" }}
            ref={spotifySectionRef}
          >
            <CardTitle title="Lo más escuchado en Spotify" />
          </Box>
          <Tabs
            variant="soft-rounded"
            colorScheme="green"
            w="100%"
            className="no-padding"
          >
            <TabList mb="24px" ml={{ base: "16px", lg: 0 }} mt="24px">
              <Tab
                color="white"
                paddingX={{ base: "12px", lg: "16px" }}
                paddingY={{ base: "6px", lg: "8px" }}
                fontSize={{ base: "sm", lg: "md" }}
              >
                Artista
              </Tab>
              <Tab
                color="white"
                paddingX={{ base: "12px", lg: "16px" }}
                paddingY={{ base: "6px", lg: "8px" }}
                fontSize={{ base: "sm", lg: "md" }}
              >
                Canción
              </Tab>
              <Tab
                color="white"
                paddingX={{ base: "12px", lg: "16px" }}
                paddingY={{ base: "6px", lg: "8px" }}
                fontSize={{ base: "sm", lg: "md" }}
              >
                Podcast
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Box
                  width="100%"
                  flexDirection="column"
                  alignContent="space-between"
                  paddingX={{ base: "16px", lg: "0" }}
                  alignItems="center"
                  overflow="auto"
                >
                  {spotifyArtist?.current?.record?.trends?.map(
                    (trend, currentIndex) => {
                      const elementInPrevious =
                        spotifyArtist?.previous?.record?.trends?.find(
                          element => element.name === trend.name
                        );
                      const prevIndex =
                        spotifyArtist?.previous?.record?.trends?.findIndex(
                          element => element.name === elementInPrevious?.name
                        );
                      return (
                        <TrendCard
                          key={trend.name}
                          position={currentIndex + 1}
                          height={{ base: "100px", lg: "157px" }}
                          title={trend.name}
                          direction={getPosition(currentIndex, prevIndex)}
                          amount={trend.amount}
                          streak={trend.streak}
                          link={trend.link}
                          type="artist"
                        />
                      );
                    }
                  )}
                </Box>
              </TabPanel>
              <TabPanel>
                <Box
                  width="100%"
                  flexDirection="column"
                  alignContent="space-between"
                  paddingX={{ base: "16px", lg: "0" }}
                  alignItems="center"
                >
                  {spotifySong?.current?.record?.trends?.map(
                    (trend, currentIndex) => {
                      const elementInPrevious =
                        spotifySong?.previous?.record?.trends?.find(
                          element => element.name === trend.name
                        );
                      const prevIndex =
                        spotifySong?.previous?.record?.trends?.findIndex(
                          element => element.name === elementInPrevious?.name
                        );
                      return (
                        <TrendCard
                          key={trend.name}
                          position={currentIndex + 1}
                          height={{ base: "100px", lg: "157px" }}
                          title={trend.name}
                          direction={getPosition(currentIndex, prevIndex)}
                          amount={trend.streams}
                          streak={trend.streak}
                          author={trend.author}
                          link={trend.link}
                          type="song"
                        />
                      );
                    }
                  )}
                </Box>
              </TabPanel>
              <TabPanel>
                <Box
                  width="100%"
                  flexDirection="column"
                  alignContent="space-between"
                  paddingX={{ base: "16px", lg: "0" }}
                  alignItems="center"
                >
                  {spotifyPodcast?.current?.record?.trends?.map(
                    (trend, currentIndex) => {
                      const elementInPrevious =
                        spotifyPodcast?.previous?.record?.trends?.find(
                          element => element.name === trend.name
                        );
                      const prevIndex =
                        spotifyPodcast?.previous?.record?.trends?.findIndex(
                          element => element.name === elementInPrevious?.name
                        );
                      return (
                        <TrendCard
                          key={trend.name}
                          position={currentIndex + 1}
                          height={{ base: "100px", lg: "157px" }}
                          title={trend.name}
                          direction={getPosition(currentIndex, prevIndex)}
                          amount={trend.amount}
                          link={trend.link}
                          publisher={trend.publisher}
                          type="podcast"
                        />
                      );
                    }
                  )}
                </Box>
              </TabPanel>
            </TabPanels>
          </Tabs>

          {/* YOUTUBE */}
          <Box
            id="youtube"
            display="flex"
            width="100%"
            mt={{ base: "24px", lg: "72px" }}
            ref={youtubeSectionRef}
          >
            <CardTitle title="Lo más visto en Youtube" />
          </Box>

          <Box
            width="100%"
            flexDirection="column"
            alignContent="space-between"
            paddingX={{ base: "16px", lg: "0" }}
            alignItems="center"
            mt="24px"
          >
            {youtube?.current?.record?.trends?.map((trend, currentIndex) => {
              const elementInPrevious = youtube?.previous?.record?.trends?.find(
                element => element.title === trend.title
              );
              const prevIndex = youtube?.previous?.record?.trends?.findIndex(
                element => element.title === elementInPrevious?.title
              );
              return (
                <TrendCard
                  key={trend.title}
                  position={currentIndex + 1}
                  title={trend.title}
                  direction={getPosition(currentIndex, prevIndex)}
                  amount={trend.amount}
                  height={{ base: "118px", lg: "171px" }}
                  link={trend.link}
                  channel={trend.channel}
                  channelLink={trend.channelLink}
                  type="visto"
                />
              );
            })}
          </Box>

          {/* GOOGLE */}
          <Box
            id="google"
            display="flex"
            width="100%"
            mt="24px"
            ref={googleSectionRef}
          >
            <CardTitle title="Lo más buscado en Google" />
          </Box>
          <Flex
            width="100%"
            flexWrap={{ base: "nowrap", lg: "wrap" }}
            flexDirection="column"
            paddingX={{ base: "16px", lg: "0" }}
            alignContent="space-between"
            maxHeight={{ base: "none", lg: "540px" }}
            alignItems="center"
            mt="24px"
          >
            {google?.current?.record?.trends?.map((trend, currentIndex) => {
              const elementInPrevious = google?.previous?.record?.trends?.find(
                element => element.title === trend.title
              );
              const prevIndex = google?.previous?.record?.trends?.findIndex(
                element => element.title === elementInPrevious?.title
              );

              return (
                <TrendCard
                  key={trend.title}
                  position={currentIndex + 1}
                  height="94px"
                  title={trend.title}
                  direction={getPosition(currentIndex, prevIndex)}
                  amount={trend.amount}
                  streak={trend.streak}
                  link={trend.link}
                  type="buscado"
                />
              );
            })}
          </Flex>

          {/* PORTALS */}
          <Box
            id="portals"
            display="flex"
            width="100%"
            mt={{ base: "24px", lg: "72px" }}
            ref={portalSectionRef}
          >
            <CardTitle title="Lo más leído en portales de noticias" />
          </Box>
          <Tabs
            variant="soft-rounded"
            colorScheme="green"
            width="100%"
            overflow="auto"
            className="no-padding"
            mt="24px"
          >
            <TabList mb="24px" ml={{ base: "16px", lg: "0px" }}>
              <Tab
                color="white"
                paddingX={{ base: "12px", lg: "16px" }}
                paddingY={{ base: "6px", lg: "8px" }}
                fontSize={{ base: "xs", lg: "md" }}
              >
                La Nación
              </Tab>
              <Tab
                color="white"
                paddingX={{ base: "12px", lg: "16px" }}
                paddingY={{ base: "6px", lg: "8px" }}
                fontSize={{ base: "xs", lg: "md" }}
              >
                El Destape
              </Tab>
              <Tab
                color="white"
                paddingX={{ base: "12px", lg: "16px" }}
                paddingY={{ base: "6px", lg: "8px" }}
                fontSize={{ base: "xs", lg: "md" }}
              >
                Clarín
              </Tab>
              <Tab
                color="white"
                paddingX={{ base: "12px", lg: "16px" }}
                paddingY={{ base: "6px", lg: "8px" }}
                fontSize={{ base: "xs", lg: "md" }}
              >
                Télam
              </Tab>
              <Tab
                color="white"
                paddingX={{ base: "12px", lg: "16px" }}
                paddingY={{ base: "6px", lg: "8px" }}
                fontSize={{ base: "xs", lg: "md" }}
              >
                Infobae
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Box
                  width="100%"
                  flexDirection="column"
                  alignContent="space-between"
                  paddingX={{ base: "16px", lg: "0" }}
                  alignItems="center"
                >
                  {portals?.current?.laNacion?.record?.trends?.map(
                    (trend, currentIndex) => {
                      const elementInPrevious =
                        portals?.previous?.laNacion?.record?.trends?.find(
                          element => element.article === trend.article
                        );
                      const prevIndex =
                        portals?.previous?.laNacion?.record?.trends?.findIndex(
                          element =>
                            element.article === elementInPrevious?.article
                        );
                      return (
                        <TrendCard
                          key={trend.article}
                          position={currentIndex + 1}
                          title={trend.article}
                          direction={getPosition(currentIndex, prevIndex)}
                          link={trend.link}
                          type="leido"
                          height="148px"
                        />
                      );
                    }
                  )}
                </Box>
              </TabPanel>
              <TabPanel>
                <Box
                  width="100%"
                  flexDirection="column"
                  alignContent="space-between"
                  paddingX={{ base: "16px", lg: "0" }}
                  alignItems="center"
                >
                  {portals?.current?.elDestape?.record?.trends?.map(
                    (trend, currentIndex) => {
                      const elementInPrevious =
                        portals?.previous?.elDestape?.record?.trends?.find(
                          element => element.article === trend.article
                        );
                      const prevIndex =
                        portals?.previous?.elDestape?.record?.trends?.findIndex(
                          element =>
                            element.article === elementInPrevious?.article
                        );
                      return (
                        <TrendCard
                          key={trend.article}
                          position={currentIndex + 1}
                          title={trend.article}
                          direction={getPosition(currentIndex, prevIndex)}
                          link={trend.link}
                          type="leido"
                          height="114px"
                        />
                      );
                    }
                  )}
                </Box>
              </TabPanel>
              <TabPanel>
                <Box
                  width="100%"
                  flexDirection="column"
                  alignContent="space-between"
                  paddingX={{ base: "16px", lg: "0" }}
                  alignItems="center"
                >
                  {portals?.current?.clarin?.record?.trends?.map(
                    (trend, currentIndex) => {
                      const elementInPrevious =
                        portals?.previous?.clarin?.record?.trends?.find(
                          element => element.article === trend.article
                        );
                      const prevIndex =
                        portals?.previous?.clarin?.record?.trends?.findIndex(
                          element =>
                            element.article === elementInPrevious?.article
                        );
                      return (
                        <TrendCard
                          key={trend.article}
                          position={currentIndex + 1}
                          title={trend.article}
                          direction={getPosition(currentIndex, prevIndex)}
                          link={trend.link}
                          type="leido"
                          height="114px"
                        />
                      );
                    }
                  )}
                </Box>
              </TabPanel>
              <TabPanel>
                <Box
                  width="100%"
                  flexDirection="column"
                  alignContent="space-between"
                  paddingX={{ base: "16px", lg: "0" }}
                  alignItems="center"
                >
                  {portals?.current?.telam?.record?.trends?.map(
                    (trend, currentIndex) => {
                      const elementInPrevious =
                        portals?.previous?.telam?.record?.trends?.find(
                          element => element.article === trend.article
                        );
                      const prevIndex =
                        portals?.previous?.telam?.record?.trends?.findIndex(
                          element =>
                            element.article === elementInPrevious?.article
                        );
                      return (
                        <TrendCard
                          key={trend.article}
                          position={currentIndex + 1}
                          title={trend.article}
                          direction={getPosition(currentIndex, prevIndex)}
                          link={trend.link}
                          height="114px"
                          type="leido"
                        />
                      );
                    }
                  )}
                </Box>
              </TabPanel>
              <TabPanel>
                <Box
                  width="100%"
                  flexDirection="column"
                  alignContent="space-between"
                  paddingX={{ base: "16px", lg: "0" }}
                  alignItems="center"
                >
                  {portals?.current?.infobae?.record?.trends?.map(
                    (trend, currentIndex) => {
                      const elementInPrevious =
                        portals?.previous?.infobae?.record?.trends?.find(
                          element => element.article === trend.article
                        );
                      const prevIndex =
                        portals?.previous?.infobae?.record?.trends?.findIndex(
                          element =>
                            element.article === elementInPrevious?.article
                        );
                      return (
                        <TrendCard
                          key={trend.article}
                          position={currentIndex + 1}
                          title={trend.article}
                          direction={getPosition(currentIndex, prevIndex)}
                          link={trend.link}
                          type="leido"
                          height="114px"
                        />
                      );
                    }
                  )}
                </Box>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Container>
      </Box>

      {/* Footer */}
      <Footer />
    </>
  );
}

export async function getServerSideProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["google"], getGoogleTrends);
  await queryClient.prefetchQuery(["twitter"], getTwitterTrends);
  await queryClient.prefetchQuery(["spotifyArtist"], getSpotifyArtistTrends);
  await queryClient.prefetchQuery(["spotifySong"], getSpotifySongTrends);
  await queryClient.prefetchQuery(["spotifyPodcast"], getSpotifyPodcastTrends);
  await queryClient.prefetchQuery(["youtube"], getYoutubeTrends);
  await queryClient.prefetchQuery(["portals"], getPortals);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
