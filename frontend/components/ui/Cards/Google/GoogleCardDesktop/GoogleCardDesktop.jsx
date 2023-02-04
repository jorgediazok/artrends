import { Box, Flex } from "@chakra-ui/react";
import { getPosition } from "../../../../../utils/position";
import CardTitle from "../../../TrendCard/CardTitle/CardTitle";
import TrendCard from "../../../TrendCard/TrendCard";

const GoogleCardDesktop = ({ google, googleSectionRef }) => {
  return (
    <>
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
    </>
  );
};

export default GoogleCardDesktop;
