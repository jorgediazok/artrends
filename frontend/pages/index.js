import Head from "next/head";
import { useQuery, QueryClient, dehydrate } from "@tanstack/react-query";

// Charka UI
import { Container, Heading } from "@chakra-ui/react";

// API
import {
  getGoogleTrends,
  getTwitterTrends,
  getSpotifyArtistTrends,
  getSpotifySongTrends,
  getSpotifyPodcastTrends,
  getYoutubeTrends,
} from "../services/services";

// Components
import Navbar from "../components/layout/Navbar";
import TrendCard from "../components/ui/TrendCard/TrendCard";
import { getPosition } from "../utils/position";
import CardTitle from "../components/ui/TrendCard/CardTitle/CardTitle";
import CardDesktop from "../components/ui/TrendCard/CardDesktop/CardDesktop";

export default function Home(props) {
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

  // console.log("Google: ", google?.current?.record?.trends);
  console.log("Twitter: ", twitter?.current?.record?.trends);
  console.log("Twitter full", twitter);
  console.log("Spotify Artist: ", spotifyArtist?.current?.record?.trends);
  // console.log("Spotify Song: ", spotifySong?.current?.record?.trends);
  // console.log("Spotify Podcast: ", spotifyPodcast?.current?.record?.trends);
  // console.log("Youtube: ", youtube?.current?.record?.trends);

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
      <Navbar />
      <main>
        {/* TWITTER */}
        <Container maxW="container.md" bg="transparent" color="white" mt={50}>
          <CardTitle title="Lo más discutido en twitter" />

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
              />
            );
          })}
        </Container>

        {/* SPOTIFY */}
        <Container maxW="container.md" bg="transparent" color="white" mt={50}>
          <CardTitle title="Lo más escuchado en Spotify" />
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
                  key={trend.title}
                  position={currentIndex + 1}
                  title={trend.name}
                  direction={getPosition(currentIndex, prevIndex)}
                  amount={trend.amount}
                  streak={trend.streak}
                  link={trend.link}
                />
              );
            }
          )}
        </Container>

        {/* YOUTUBE */}
        <Container maxW="container.md" bg="transparent" color="white" mt={50}>
          <CardTitle title="Lo más visto en Youtube" />
        </Container>
      </main>
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

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
