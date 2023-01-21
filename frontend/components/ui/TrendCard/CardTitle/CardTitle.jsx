// Chakra
import { Badge, Box, Text } from "@chakra-ui/react";

// Icons
import Chat from "../../icons/Chat";
import Escuchado from "../../icons/Escuchado";
import Search from "../../icons/Search";
import Visto from "../../icons/Visto";

const CardTitle = ({ title }) => {
  return (
    <Box
      display="flex"
      color="white"
      fontWeight="bold"
      alignItems={{ base: "flex-start", lg: "center" }}
      paddingX={{ base: "16px", lg: "0" }}
      justifyContent={{ base: "flex-start", lg: "space-between" }}
      width="100%"
      flexDirection={{ base: "column", lg: "row" }}
    >
      <Box display="flex" gap={3} alignItems="center">
        <Text fontSize={{ base: "md", lg: "2xl" }}>{title}</Text>
        <Box display={{ base: "none", lg: "block" }}>
          {title === "Lo más discutido en Twitter" && <Chat />}
        </Box>
        <Box display={{ base: "none", lg: "block" }}>
          {title === "Lo más escuchado en Spotify" && <Escuchado />}
        </Box>
        <Box display={{ base: "none", lg: "block" }}>
          {title === "Lo más visto en Youtube" && <Visto />}
        </Box>
        <Box display={{ base: "none", lg: "block" }}>
          {title === "Lo más buscado en Google" && <Search />}
        </Box>
        <Box display={{ base: "none", lg: "block" }}>
          {title === "Lo más leído en portales de noticias" && <Escuchado />}
        </Box>
      </Box>

      <Badge colorScheme="purple" variant="solid" marginTop="15px">
        <Text fontSize="xs">
          {title === "Lo más discutido en Twitter" && "Actualizado cada hora"}
        </Text>
        <Text fontSize="xs">
          {title === "Lo más escuchado en Spotify" && "Actualizado cada semana"}
        </Text>
        <Text fontSize="xs">
          {title === "Lo más visto en Youtube" && "Actualizado cada hora"}
        </Text>
        <Text fontSize="xs">
          {title === "Lo más buscado en Google" && "Actualizado cada hora"}
        </Text>
        <Text fontSize="xs">
          {title === "Lo más leído en portales de noticias" &&
            "Actualizado cada hora"}
        </Text>
      </Badge>
    </Box>
  );
};

export default CardTitle;
