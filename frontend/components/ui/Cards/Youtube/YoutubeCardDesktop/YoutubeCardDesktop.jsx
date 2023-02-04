import { Box } from "@chakra-ui/react";
import { getPosition } from "../../../../../utils/position";
import CardTitle from "../../../TrendCard/CardTitle/CardTitle";
import TrendCard from "../../../TrendCard/TrendCard";

const YoutubeCardDesktop = ({ youtube, youtubeSectionRef }) => {
  return (
    <>
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
    </>
  );
};

export default YoutubeCardDesktop;
