import { useState, useEffect } from "react";
import Image from "next/image";

// Chakra
import { Box, Collapse, Flex, IconButton, Input, Text } from "@chakra-ui/react";

// Utils
import { Link } from "react-scroll";
import { navItems } from "../../../utils/navItems";

// Theme
import theme from "../../../styles/theme";

// Icons
import Search from "../../ui/icons/Search";

// Styles
import styles from "./Navbar.module.css";

// Hooks
import { useScrollDirection } from "../../../utils/hooks";

// Components
import MobileCarousel from "../../ui/MobileCarousel/MobileCarousel";
import SearchInput from "../../ui/Search/SearchInput";

const Navbar = ({ activeSectionIndex }) => {
  const [showInput, setShowInput] = useState(false);
  const [scrollNav, setScrollNav] = useState(false);

  // Hooks
  const scrollDirection = useScrollDirection();

  // const handleSearch = () => {
  //   setOpenSearch(!openSearch);
  // };

  // Handlers
  // Smooth scrolling
  const changeNav = () => {
    if (window.scrollY >= 80) {
      setScrollNav(true);
    } else {
      setScrollNav(false);
    }
  };

  const handleInputClose = () => {
    setTimeout(() => {
      setShowInput(false);
    }, 300);
  };

  // Effects
  useEffect(() => {
    window.addEventListener("scroll", changeNav);
  }, []);

  // Constans
  const navBarStyles =
    scrollDirection === "up" ? styles["nav-bar"] : styles["nav-hidden"];

  return (
    <>
      {/* MOBILE */}
      <Flex
        display={{ base: "flex", lg: "none" }}
        as="nav"
        bg="purple.600"
        align="center"
        justifyContent="center"
        position="fixed"
        top={0}
        flexDirection="column"
        py="12px"
        w="100%"
      >
        <Image
          src="/images/logo-mobile.png"
          alt="Artrends"
          height={27}
          width={120}
          quality={100}
        />

        <MobileCarousel activeSectionIndex={activeSectionIndex} />

        {/* SEARCH INPUT */}
        <Box
          display={{ base: "block", lg: "none" }}
          alignItems="center"
          width="100%"
          justifyContent="center"
          marginTop="24px"
          padding="0 16px"
        >
          <SearchInput />
        </Box>
      </Flex>

      <Flex
        as="nav"
        align="center"
        bg="purple.600"
        className={navBarStyles}
        display={{ base: "none", lg: "flex" }}
        height={{ lg: "100px" }}
        justifyContent="center"
        scrollnav={scrollNav.toString()}
        shadow="md"
      >
        <Box display="flex" alignItems="center" width="20%">
          <Image
            src="/images/logo-desktop.png"
            alt="Artrends"
            height={40}
            width={174}
            quality={100}
          />
        </Box>
        <Box
          as="ul"
          justifyContent="center"
          flex="1"
          gap={12}
          display={{ base: "none", lg: "flex" }}
        >
          {navItems.map(item => (
            <Box
              key={item.id}
              display="flex"
              as="li"
              className={styles["nav-item"]}
            >
              <Link to={item.to} smooth="true" duration={300} exact="true">
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
        {/* Desktop Search Icon */}
        <Box
          alignItems="center"
          justifyContent="flex-end"
          gap={5}
          flex="0 1 20%"
          width="20%"
          display={{ base: "none", lg: "flex" }}
        >
          {showInput ? (
            <>
              <Collapse in={showInput} animateOpacity>
                <IconButton
                  onClick={() => setShowInput(true)}
                  name="close"
                  icon={<Search onClick={() => setShowInput(true)} />}
                  colorScheme={theme.colors.gradients["grad-ind-purple"]}
                  position="absolute"
                  width="20px"
                  zIndex={999}
                />
                <Input
                  focusBorderColor={theme.colors["cyan-500"]}
                  transition="width 0.5s ease-in-out"
                  _focus={{
                    width: "288px",
                  }}
                  width="0px"
                  height="40px"
                  color="white"
                  rounded="md"
                  autoFocus
                  background={theme.colors.gradients["grad-ind-purple"]}
                  position="relative"
                  paddingLeft="40px"
                  onBlur={handleInputClose}
                />
              </Collapse>
            </>
          ) : (
            <IconButton
              onClick={() => setShowInput(true)}
              name="close"
              icon={<Search />}
              colorScheme={theme.colors.gradients["grad-white"]}
              _hover={{
                background: theme.colors.gradients["grad-purp-transp"],
              }}
            />
          )}
        </Box>
      </Flex>
    </>
  );
};

export default Navbar;
