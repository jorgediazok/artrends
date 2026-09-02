import { Box, Skeleton } from "@chakra-ui/react";

// Generic loading placeholder for a section of trend cards - used while
// the initial /api/trends fetch is still pending, instead of the blank
// gap (or the "no pudimos conectarnos" error message) that used to show
// during that window. Not a pixel-exact copy of every section's real
// layout (Spotify/Portals have tabs); a couple of row shapes is enough
// to communicate "content incoming" without a skeleton per source.
const TrendListSkeleton = ({ rows = 6, columns = 2 }) => {
  return (
    <Box mb="40px">
      <Skeleton height="28px" width="240px" mb="16px" borderRadius="6px" />
      <Box
        display="grid"
        gridTemplateColumns={{
          base: "1fr",
          lg: `repeat(${columns}, 1fr)`,
        }}
        gap="12px"
      >
        {Array.from({ length: rows }).map((_, i) => (
          <Box
            key={i}
            display="flex"
            alignItems="center"
            gap="16px"
            height="100px"
            padding="16px 20px"
            borderRadius="12px"
            background="rgba(255, 255, 255, 0.04)"
            border="0.5px solid rgba(255, 255, 255, 0.1)"
          >
            <Skeleton
              height="32px"
              width="32px"
              borderRadius="999px"
              flexShrink={0}
            />
            <Box flex="1" display="flex" flexDirection="column" gap="10px">
              <Skeleton height="16px" width="70%" borderRadius="4px" />
              <Skeleton height="12px" width="40%" borderRadius="4px" />
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default TrendListSkeleton;
