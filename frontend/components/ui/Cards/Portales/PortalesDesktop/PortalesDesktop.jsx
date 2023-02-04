import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { getPosition } from "../../../../../utils/position";
import CardTitle from "../../../TrendCard/CardTitle/CardTitle";
import TrendCard from "../../../TrendCard/TrendCard";

const PortalesDesktop = ({ portalSectionRef, portals }) => {
  console.log(portals);

  return (
    <>
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
                      element => element.article === elementInPrevious?.article
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
                      element => element.article === elementInPrevious?.article
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
                      element => element.article === elementInPrevious?.article
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
                      element => element.article === elementInPrevious?.article
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
                      element => element.article === elementInPrevious?.article
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
    </>
  );
};

export default PortalesDesktop;
