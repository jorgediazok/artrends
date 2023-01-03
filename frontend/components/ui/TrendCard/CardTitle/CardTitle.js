import { Box, Text } from "@chakra-ui/react";
import Chat from "../../../../public/icons/Chat";
import Escuchado from "../../../../public/icons/Escuchado";
import Visto from "../../../../public/icons/Visto";

const CardTitle = ({ title }) => {
  return (
    <Box
      display="flex"
      color="white"
      fontWeight="bold"
      alignItems="center"
      gap={4}
    >
      <Text fontSize="2xl">{title}</Text>
      <Box>{title === "Lo más discutido en twitter" && <Chat />}</Box>
      <Box>{title === "Lo más escuchado en Spotify" && <Escuchado />}</Box>
      <Box>{title === "Lo más visto en Youtube" && <Visto />}</Box>
    </Box>
  );
};

export default CardTitle;
