import { useState } from "react";

// Icons
import Discutido from "../icons/Chat";
import Escuchado from "../icons/Escuchado";
import Visto from "../icons/Visto";
import Buscado from "../icons/Buscado";
import Leido from "../icons/Book";

// Chakra
import { Box, Text } from "@chakra-ui/react";

// Styles
import styles from "./MobileCarousel.module.css";
import theme from "../../../styles/theme";

const items = [
  {
    nombre: "+Discutido",
    Icon: Discutido,
  },
  {
    nombre: "+Escuchado",
    Icon: Escuchado,
  },
  {
    nombre: "+Visto",
    Icon: Visto,
  },
  {
    nombre: "+Buscado",
    Icon: Buscado,
  },
  {
    nombre: "+Leído",
    Icon: Leido,
  },
];

export default function MobileCarousel({ activeSectionIndex }) {
  return (
    <Box
      as="nav"
      display={{ base: "flex", lg: "none" }}
      position="fixed"
      top="0"
      pt={2}
      maxWidth="100%"
    >
      <ul className={styles.container}>
        {items.map(({ nombre, Icon }, index) => {
          return (
            <Box
              as="li"
              key={nombre}
              shadow="sm"
              flexDir="column"
              background={
                index === activeSectionIndex
                  ? "indigo.800"
                  : theme.colors.gradients["grad-purp-45"]
              }
              height="86px"
              minW="86px"
              display="flex"
              justifyContent="center"
              alignItems="center"
              px="4px"
              width="max-content"
              textColor="#fff"
              borderRadius="6px"
            >
              <Icon />
              <Text as="p" fontSize="sm">
                {nombre}
              </Text>
            </Box>
          );
        })}
      </ul>
    </Box>
  );
}
