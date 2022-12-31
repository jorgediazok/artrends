import Head from "next/head";
import { useQuery, QueryClient, dehydrate } from "@tanstack/react-query";

// Charka UI
import { Heading } from "@chakra-ui/react";

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

  console.log("Google: ", google?.current?.record?.trends);
  console.log("Twitter: ", twitter?.current?.record?.trends);
  console.log("Spotify Artist: ", spotifyArtist?.current?.record?.trends);
  console.log("Spotify Song: ", spotifySong?.current?.record?.trends);
  console.log("Spotify Podcast: ", spotifyPodcast?.current?.record?.trends);
  console.log("Youtube: ", youtube?.current?.record?.trends);

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
      <Heading as="h1" size="4xl" color="cyan.200">
        Bienvenidos a Artrends
      </Heading>
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
