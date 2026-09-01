// Chakra
import { Badge, Box, Text } from "@chakra-ui/react";

// Icons
import Chat from "../icons/Chat";
import Escuchado from "../icons/Escuchado";
import Search from "../icons/Search";
import Visto from "../icons/Visto";

const SectionTitle = ({ title, id }) => {
  return (
    <Box
      as="header"
      display="flex"
      color="white"
      fontWeight="bold"
      alignItems={{ base: "flex-start", lg: "center" }}
      justifyContent={{ base: "flex-start", lg: "space-between" }}
      width="100%"
      flexDirection={{ base: "column", lg: "row" }}
      id={id}
    >
      <Box display="flex" alignItems="center">
        <Text
          fontSize={{ base: "xl", lg: "3xl" }}
          fontWeight={700}
          as="h2"
          mr="24px"
        >
          {title}
        </Text>
        <Box display={{ base: "none", lg: "initial" }}>
          {title === "Lo más discutido en X" && <Chat />}
        </Box>
        <Box display={{ base: "none", lg: "initial" }}>
          {title === "Lo más escuchado en Spotify" && <Escuchado />}
        </Box>
        <Box display={{ base: "none", lg: "block" }}>
          {title === "Lo más visto en YouTube" && <Visto />}
        </Box>
        <Box display={{ base: "none", lg: "block" }}>
          {title === "Lo más buscado en Google" && <Search />}
        </Box>
        <Box display={{ base: "none", lg: "block" }}>
          {title === "Las noticias más leídas" && <Escuchado />}
        </Box>
      </Box>

      <Badge
        background="indigo.800"
        variant="solid"
        marginTop="24px"
        marginBottom={{ base: "24px", lg: "12px" }}
        p="2px 4px"
        fontSize="xs"
        fontWeight="700"
      >
        {title === "Lo más discutido en X" && "Actualizado cada hora"}
        {title === "Lo más escuchado en Spotify" && "Actualizado cada semana"}
        {title === "Lo más visto en YouTube" && "Actualizado cada dos horas"}
        {title === "Lo más buscado en Google" && "Actualizado cada hora"}
        {title === "Las noticias más leídas" && "Actualizado cada hora"}
      </Badge>
    </Box>
  );
};

export default SectionTitle;
