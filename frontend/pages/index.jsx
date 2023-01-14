import Head from "next/head";
import { useQuery, QueryClient, dehydrate } from "@tanstack/react-query";

// Charka UI
import { Box, Container } from "@chakra-ui/react";
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

// Utils
import { getPosition } from "../utils/position";

export default function Home() {
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

  // console.log("Google: ", google?.current?.record?.trends);
  // console.log("Google full: ", google);
  // console.log("Twitter: ", twitter?.current?.record?.trends);
  // console.log("Twitter full", twitter);
  // console.log("Spotify Artist: ", spotifyArtist?.current?.record?.trends);
  // console.log("Spotify Song: ", spotifySong?.current?.record?.trends);
  // console.log("Spotify Podcast: ", spotifyPodcast?.current?.record?.trends);
  // console.log("Spotify Podcast full: ", spotifyPodcast);
  // console.log("Youtube: ", youtube?.current?.record?.trends);
  // console.log("Youtube full: ", youtube);
  // console.log("Portals: ", portals);

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
      <Navbar />

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="100%"
        as="main"
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
          pt={10}
        >
          {/* TWITTER */}
          <Box id="twitter" display="flex" width="100%">
            <CardTitle title="Lo más discutido en Twitter" />
          </Box>
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
                height="100px"
                type="twitter"
              />
            );
          })}

          {/* SPOTIFY */}
          <Box id="spotify" display="flex" width="100%">
            <CardTitle title="Lo más escuchado en Spotify" />
          </Box>
          <Tabs
            variant="soft-rounded"
            colorScheme="green"
            w="100%"
            className="no-padding"
          >
            <TabList mb={5}>
              <Tab color="white">Artista</Tab>
              <Tab color="white">Canción</Tab>
              <Tab color="white">Podcast</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
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
                        height="171px"
                        title={trend.name}
                        direction={getPosition(currentIndex, prevIndex)}
                        amount={trend.amount}
                        streak={trend.streak}
                        link={trend.link}
                        type="escuchado"
                      />
                    );
                  }
                )}
              </TabPanel>
              <TabPanel>
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
                        height="171px"
                        title={trend.name}
                        direction={getPosition(currentIndex, prevIndex)}
                        amount={trend.amount}
                        streak={trend.streak}
                        author={trend.author}
                        link={trend.link}
                        type="escuchado"
                      />
                    );
                  }
                )}
              </TabPanel>
              <TabPanel>
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
                        height="171px"
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
              </TabPanel>
            </TabPanels>
          </Tabs>

          {/* YOUTUBE */}
          <Box id="youtube" display="flex" width="100%">
            <CardTitle title="Lo más visto en Youtube" />
          </Box>
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
                height="171px"
                link={trend.link}
                channel={trend.channel}
                channelLink={trend.channelLink}
                type="visto"
              />
            );
          })}

          {/* GOOGLE */}
          <Box id="google" display="flex" width="100%">
            <CardTitle title="Lo más buscado en Google" />
          </Box>
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
                height="100px"
                title={trend.title}
                direction={getPosition(currentIndex, prevIndex)}
                amount={trend.amount}
                streak={trend.streak}
                link={trend.link}
                type="google"
              />
            );
          })}

          {/* PORTALS */}
          <Box id="portals" display="flex" width="100%">
            <CardTitle title="Lo más leído en portales de noticias" />
          </Box>
          <Tabs
            variant="soft-rounded"
            colorScheme="green"
            w="100%"
            className="no-padding"
          >
            <TabList mb={5}>
              <Tab color="white">La Nación</Tab>
              <Tab color="white">El Destape</Tab>
              <Tab color="white">Clarín</Tab>
              <Tab color="white">Telam</Tab>
              <Tab color="white">Infobae</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
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
                        height="157px"
                      />
                    );
                  }
                )}
              </TabPanel>
              <TabPanel>
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
                        height="157px"
                      />
                    );
                  }
                )}
              </TabPanel>
              <TabPanel>
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
                        height="157px"
                      />
                    );
                  }
                )}
              </TabPanel>
              <TabPanel>
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
                        height="157px"
                        type="leido"
                      />
                    );
                  }
                )}
              </TabPanel>
              <TabPanel>
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
                        height="157px"
                      />
                    );
                  }
                )}
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
