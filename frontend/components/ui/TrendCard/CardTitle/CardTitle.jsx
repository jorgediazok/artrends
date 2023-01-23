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
        <Text fontSize={{ base: "xl", lg: "3xl" }} fontWeight={700}>
          {title}
        </Text>
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

      <Badge
        background="indigo.800"
        variant="solid"
        marginTop="15px"
        p="2px 4px"
      >
        <Text fontSize="xs" fontWeight={700}>
          {title === "Lo más discutido en Twitter" && "Actualizado cada hora"}
        </Text>
        <Text fontSize="xs" fontWeight={700}>
          {title === "Lo más escuchado en Spotify" && "Actualizado cada semana"}
        </Text>
        <Text fontSize="xs" fontWeight={700}>
          {title === "Lo más visto en Youtube" && "Actualizado cada hora"}
        </Text>
        <Text fontSize="xs" fontWeight={700}>
          {title === "Lo más buscado en Google" && "Actualizado cada hora"}
        </Text>
        <Text fontSize="xs" fontWeight={700}>
          {title === "Lo más leído en portales de noticias" &&
            "Actualizado cada hora"}
        </Text>
      </Badge>
    </Box>
  );
};

export default CardTitle;
