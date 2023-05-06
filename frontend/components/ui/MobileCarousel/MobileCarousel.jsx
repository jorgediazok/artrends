//Utils

// Icons
import Discutido from "../icons/CarouselDiscutido";
import Escuchado from "../icons/CarouselEscuchado";
import Visto from "../icons/CarouselVisto";
import Buscado from "../icons/CarouselBuscado";
import Leido from "../icons/CarouselLeido";

// Chakra
import { Box, Link, Text } from "@chakra-ui/react";

// Styles
import styles from "./MobileCarousel.module.css";

// Theme
import theme from "../../../styles/theme";

const items = [
  {
    nombre: "Más discutido",
    Icon: Discutido,
    to: "#twitter",
  },
  {
    nombre: "Más escuchado",
    Icon: Escuchado,
    to: "#spotify",
  },
  {
    nombre: "Más visto",
    Icon: Visto,
    to: "#youtube",
  },
  {
    nombre: "Más buscado",
    Icon: Buscado,
    to: "#google",
  },

  {
    nombre: "Más leído",
    Icon: Leido,
    to: "#portals",
  },
];

export default function MobileCarousel({
  activeSectionIndex,
  onCarouselItemPressed,
}) {
  return (
    <Box
      display={{ base: "flex", lg: "none" }}
      position="relative"
      top="16px"
      pt="16px"
      maxWidth="100%"
      className={styles.container}
      as="ul"
    >
      {items.map(({ nombre, to, Icon }, index) => {
        return (
          <Link href={to} key={nombre}>
            <Box
              as="li"
              shadow="sm"
              lineHeight={1.5}
              textAlign="center"
              flexDir="column"
              background={
                index === activeSectionIndex
                  ? "cyan.200"
                  : theme.colors.gradients["grad-ind-purple-2"]
              }
              height="86px"
              width="25vw"
              maxW="120px"
              display="flex"
              justifyContent="center"
              alignItems="center"
              px="11px"
              py="4px"
              borderRadius="6px"
              className={index === activeSectionIndex && styles.active}
              fontWeight={600}
              onClick={() => onCarouselItemPressed(index)}
            >
              <Icon />

              <Text
                as="p"
                fontSize="sm"
                width="min-content"
                textColor={index === activeSectionIndex ? "indigo.800" : "#fff"}
              >
                {nombre}
              </Text>
            </Box>
          </Link>
        );
      })}
    </Box>
  );
}
