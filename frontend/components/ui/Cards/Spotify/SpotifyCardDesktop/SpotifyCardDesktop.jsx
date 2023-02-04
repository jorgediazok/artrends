import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { getPosition } from "../../../../../utils/position";
import CardTitle from "../../../TrendCard/CardTitle/CardTitle";
import TrendCard from "../../../TrendCard/TrendCard";

const SpotifyCardDesktop = ({
  spotifyArtist,
  spotifyPodcast,
  spotifySong,
  spotifySectionRef,
}) => {
  return (
    <>
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
    </>
  );
};

export default SpotifyCardDesktop;
