import { Badge } from "@chakra-ui/react";

// "También en Google" pill shown when a trend also appears in another
// source right now - `label` comes from utils/crossPlatform.js's
// getCrossPlatformLabel, already null-checked by the caller.
const CrossPlatformBadge = ({ label }) => {
  return (
    <Badge
      width="fit-content"
      display="inline-flex"
      alignItems="center"
      gap="4px"
      fontSize="11px"
      fontWeight="600"
      textTransform="none"
      color="#1B4B4C"
      backgroundColor="#71E9EB"
      paddingX="8px"
      paddingY="3px"
      borderRadius="999px"
      marginBottom="6px"
    >
      {label}
    </Badge>
  );
};

export default CrossPlatformBadge;
