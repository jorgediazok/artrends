import { Box, Flex } from "@chakra-ui/react";
import CardTitle from "../../../TrendCard/CardTitle/CardTitle";
import TrendCard from "../../../TrendCard/TrendCard";
import { getPosition } from "../../../../../utils/position";

const TwitterCardDesktop = ({ twitter, twitterSectionRef }) => {
  return (
    <>
      <Box
        id="twitter"
        display="flex"
        width="100%"
        mt={{ base: "60px", lg: "128px" }}
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
        maxHeight={{ base: "none", lg: "460px" }}
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
    </>
  );
};

export default TwitterCardDesktop;
