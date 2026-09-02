import { useId, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Box, Flex, Popover, Portal, Text } from "@chakra-ui/react";

// Icons
import History from "../icons/History";

// Services
import { getTrendHistory } from "../../../services/services";

// Utils
import {
  areSameCalendarDay,
  buildPositionHistory,
  buildSparklinePoints,
  classifyTrendHistory,
  formatElapsedTime,
  pickTimelinePoints,
} from "../../../utils/trendHistory";

const formatTimelineLabel = (isoDate, allSameDay) => {
  if (!isoDate) return "";
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return "";

  return allSameDay
    ? date.toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" })
    : date.toLocaleDateString("es-AR", { day: "2-digit", month: "2-digit" });
};

// Small icon button (paired with the existing Share/ThreeDots button) that
// opens a popover with this specific trend's rank over the last few
// scrapes - fed by one of the /api/.../history endpoints. Reused across
// all 5 sources; `historyKey` is only needed for the combined portals
// endpoint, which nests each outlet's history under its own key.
const TrendHistoryPopover = ({ historyPath, historyKey, matchValue, field = "title" }) => {
  const [hasOpened, setHasOpened] = useState(false);
  const gradientId = `trend-spark-${useId().replace(/:/g, "")}`;

  const { data, isFetching } = useQuery({
    queryKey: ["trend-history", historyPath, historyKey],
    queryFn: () => getTrendHistory(historyPath),
    enabled: hasOpened,
    staleTime: 5 * 60 * 1000,
  });

  const rawHistory = historyKey ? data?.history?.[historyKey] : data?.history;
  const points = buildPositionHistory(rawHistory, matchValue, field);
  const timeline = pickTimelinePoints(points, 4);
  const { svgPoints, areaPoints, lastY, baseline } =
    buildSparklinePoints(timeline);
  const sameDay = areSameCalendarDay(timeline);
  const classification = classifyTrendHistory(points);

  return (
    <Popover.Root
      positioning={{ placement: "bottom-end" }}
      onOpenChange={details => {
        if (details.open) setHasOpened(true);
      }}
    >
      <Popover.Trigger
        title="Ver historial de esta tendencia"
        aria-label="Ver historial de esta tendencia"
        width="30px"
        height="30px"
        borderRadius="999px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        color="rgba(255, 255, 255, 0.55)"
        _hover={{ color: "#71E9EB", background: "rgba(255, 255, 255, 0.08)" }}
      >
        <History />
      </Popover.Trigger>
      <Portal>
        <Popover.Positioner>
          <Popover.Content
            width="280px"
            backgroundColor="indigo.600"
            borderRadius="12px"
            border="none"
            padding="16px"
            boxShadow="drop-xl"
          >
            <Popover.Arrow>
              <Popover.ArrowTip backgroundColor="indigo.600" />
            </Popover.Arrow>

            <Flex justify="space-between" align="center" mb="10px">
              <Text
                fontSize="11px"
                fontWeight="700"
                color="rgba(255, 255, 255, 0.5)"
                textTransform="uppercase"
                letterSpacing="0.04em"
              >
                Posición en el tiempo
              </Text>
              <Popover.CloseTrigger
                aria-label="Cerrar"
                color="rgba(255, 255, 255, 0.5)"
              />
            </Flex>

            {isFetching && !data ? (
              <Text fontSize="13px" color="rgba(255, 255, 255, 0.6)">
                Cargando...
              </Text>
            ) : classification.status === "new" ? (
              <Text fontSize="13px" color="rgba(255, 255, 255, 0.6)" mb="8px">
                Recién entró a las tendencias — todavía no tiene historial
                previo.
              </Text>
            ) : classification.status === "stable" ? (
              <Text fontSize="13px" color="rgba(255, 255, 255, 0.6)" mb="8px">
                Se mantiene en el puesto #{classification.position}{" "}
                {formatElapsedTime(classification.sinceDate)}.
              </Text>
            ) : (
              <>
                <Box as="svg" width="100%" height="52" viewBox="0 0 258 52" mb="8px">
                  <defs>
                    <linearGradient
                      id={gradientId}
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#71E9EB" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#71E9EB" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <line
                    x1="0"
                    y1={baseline}
                    x2="258"
                    y2={baseline}
                    stroke="rgba(255, 255, 255, 0.18)"
                    strokeWidth="1"
                  />
                  <polygon
                    points={areaPoints}
                    fill={`url(#${gradientId})`}
                    stroke="none"
                  />
                  <polyline
                    points={svgPoints}
                    fill="none"
                    stroke="#71E9EB"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="258"
                    cy={lastY}
                    r="4"
                    fill="indigo.600"
                    stroke="#71E9EB"
                    strokeWidth="2"
                  />
                </Box>
                <Flex justify="space-between" mb="10px">
                  {timeline.map((point, i) => (
                    <Flex key={i} direction="column" align="center" gap="2px">
                      <Text fontSize="11px" fontWeight="700" color="#FFFFFF">
                        {point.position ? `#${point.position}` : "—"}
                      </Text>
                      <Text fontSize="9px" color="rgba(255, 255, 255, 0.5)">
                        {formatTimelineLabel(point.date, sameDay)}
                      </Text>
                    </Flex>
                  ))}
                </Flex>
              </>
            )}
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  );
};

export default TrendHistoryPopover;
