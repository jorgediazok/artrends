import { Box, Text } from "@chakra-ui/react";
import Chat from "../../../../public/icons/Chat";
import Escuchado from "../../../../public/icons/Escuchado";
import Search from "../../../../public/icons/Search";
import Visto from "../../../../public/icons/Visto";
import theme from "../../../../styles/theme";

const CardTitle = ({ title }) => {
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Box
        display="flex"
        color="white"
        fontWeight="bold"
        alignItems="center"
        gap={3}
      >
        <Text fontSize="2xl">{title}</Text>
        <Box>{title === "Lo más discutido en twitter" && <Chat />}</Box>
        <Box>{title === "Lo más escuchado en Spotify" && <Escuchado />}</Box>
        <Box>{title === "Lo más visto en Youtube" && <Visto />}</Box>
        <Box>{title === "Lo más buscado en Google" && <Search />}</Box>
        <Box backgroundColor={theme.colors.purple[500]}>
          <Text color="white">
            {title === "Lo más discutido en twitter" && "Actualizado cada hora"}
            {title === "Lo más escuchado en Spotify" &&
              "Actualizado cada semana"}
            {title === "Lo más visto en Youtube" && "Actualizado cada hora"}
            {title === "Lo más buscado en Google" && "Actualizado cada hora"}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default CardTitle;
