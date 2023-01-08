import { Badge, Box, Text } from "@chakra-ui/react";
import Chat from "../../../../public/icons/Chat";
import Escuchado from "../../../../public/icons/Escuchado";
import Search from "../../../../public/icons/Search";
import Visto from "../../../../public/icons/Visto";

const CardTitle = ({ title }) => {
  return (
    <Box
      display="flex"
      color="white"
      fontWeight="bold"
      alignItems="center"
      justifyContent="space-between"
      width="92%"
      marginTop="72px"
      marginBottom="22px"
    >
      <Box display="flex" gap={3} alignItems="center">
        <Text fontSize="2xl">{title}</Text>
        <Box>{title === "Lo más discutido en Twitter" && <Chat />}</Box>
        <Box>{title === "Lo más escuchado en Spotify" && <Escuchado />}</Box>
        <Box>{title === "Lo más visto en Youtube" && <Visto />}</Box>
        <Box>{title === "Lo más buscado en Google" && <Search />}</Box>
        <Box>
          {title === "Lo más leído en portales de noticias" && <Escuchado />}
        </Box>
      </Box>

      <Badge colorScheme="purple" variant="solid" marginTop="15px">
        {title === "Lo más discutido en Twitter" && "Actualizado cada hora"}
        {title === "Lo más escuchado en Spotify" && "Actualizado cada semana"}
        {title === "Lo más visto en Youtube" && "Actualizado cada hora"}
        {title === "Lo más buscado en Google" && "Actualizado cada hora"}
        {title === "Lo más leído en portales de noticias" &&
          "Actualizado cada hora"}
      </Badge>
    </Box>
  );
};

export default CardTitle;
