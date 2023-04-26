import Image from "next/image";
import NextLink from "next/link";

// Chakra
import { Box, Flex, Link, Text } from "@chakra-ui/react";

// Utils
import { navItems } from "../../../utils/navItems";

// Theme
import theme from "../../../styles/theme";

// Styles
import styles from "./Navbar.module.css";

// Components
import MobileCarousel from "../../ui/MobileCarousel/MobileCarousel";

const Navbar = ({
  activeSectionIndex,
  hasCarrousel,
  hasNavItems = true,
  onCarouselItemPressed,
}) => {
  return (
    <>
      {/* MOBILE */}
      <Flex
        display={{ base: "flex", lg: "none" }}
        as="nav"
        bg={theme.colors.gradients["background-mobile-2"]}
        align="center"
        justifyContent="center"
        position="fixed"
        top={0}
        flexDirection="column"
        w="100%"
        p={0}
        pb="12px"
        shadow="md"
        zIndex={103}
        maxW="1920px"
      >
        <Flex
          shadow="md"
          width="100%"
          height="100%"
          py="12px"
          alignItems="center"
          justifyContent="center"
          as="header"
        >
          <NextLink href="/">
            <a>
              <Image
                src="/images/logo-mobile.png"
                alt="Volver al Inicio"
                height={27}
                width={120}
                priority
              />
            </a>
          </NextLink>
        </Flex>

        {hasCarrousel && (
          <Text
            display={{ base: "block", lg: "none" }}
            fontSize="18px"
            color="#fff"
            fontWeight="bold"
            pt="16px"
          >
            Lista de Tendencias en Argentina
          </Text>
        )}

        {hasCarrousel && (
          <MobileCarousel
            activeSectionIndex={activeSectionIndex}
            onCarouselItemPressed={onCarouselItemPressed}
          />
        )}
      </Flex>

      <Flex
        align="center"
        bg="purple.600"
        className={styles["nav-bar"]}
        display={{ base: "none", lg: "flex" }}
        height={{ lg: "100px" }}
        justifyContent="center"
        shadow="md"
      >
        <Box
          display="flex"
          alignItems="center"
          width={hasNavItems ? "20%" : "100%"}
          marginRight={hasNavItems ? "none" : "none"}
        >
          <NextLink href="/">
            <a>
              <Image
                src="/images/logo-desktop.png"
                alt="Volver al Inicio"
                height={40}
                width={174}
                quality={100}
                priority
              />
            </a>
          </NextLink>
        </Box>
        <Box
          as="ul"
          justifyContent="center"
          flex="1"
          gap={12}
          display={{ base: "none", lg: hasNavItems ? "flex" : "none" }}
        >
          {navItems.map(item => (
            <Box
              key={item.id}
              display="flex"
              as="li"
              className={styles["nav-item"]}
            >
              <Link href={item.to}>
                <Text
                  color="white.500"
                  fontSize="18px"
                  lineHeight="28px"
                  fontWeight={600}
                  cursor="pointer"
                >
                  {item.label}
                </Text>
              </Link>
            </Box>
          ))}
        </Box>

        <Box width="20%" display={{ base: "none", lg: "flex" }} />
      </Flex>
    </>
  );
};

export default Navbar;
