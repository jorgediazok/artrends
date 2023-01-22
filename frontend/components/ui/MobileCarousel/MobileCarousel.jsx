//Utils
import { Link } from "react-scroll";

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

// Theme
import theme from "../../../styles/theme";
import { useEffect, useState } from "react";

const items = [
  {
    id: 1,
    nombre: "+Discutido",
    Icon: Discutido,
    to: "twitter",
  },
  {
    id: 2,
    nombre: "+Escuchado",
    Icon: Escuchado,
    to: "spotify",
  },
  {
    id: 3,
    nombre: "+Visto",
    Icon: Visto,
    to: "youtube",
  },
  { id: 4, nombre: "+Buscado", Icon: Buscado, to: "google" },
  {
    id: 5,
    nombre: "+Leído",
    Icon: Leido,
    to: "portals",
  },
];

export default function MobileCarousel({ activeSectionIndex }) {
  const [scrollNav, setScrollNav] = useState(false);
  // Smooth scrolling
  const changeNav = () => {
    if (window.scrollY >= 80) {
      setScrollNav(true);
    } else {
      setScrollNav(false);
    }
  };

  // Effects
  useEffect(() => {
    window.addEventListener("scroll", changeNav);
  }, []);

  return (
    <Box
      as="nav"
      display={{ base: "flex", lg: "none" }}
      position="relative"
      top="16px"
      scrollnav={scrollNav.toString()}
      pt="16px"
      maxWidth="100%"
    >
      <ul className={styles.container}>
        {items.map(({ nombre, to, id, Icon }, index) => {
          return (
            <Link
              to={to}
              key={id}
              smooth="true"
              duration={300}
              offset={-250}
              exact="true"
            >
              <Box
                as="li"
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
            </Link>
          );
        })}
      </ul>
    </Box>
  );
}
