import { useState, useEffect } from "react";
import { Box, Flex, IconButton, Text } from "@chakra-ui/react";
import { animateScroll as scroll, Link } from "react-scroll";
import { navItems } from "../../../utils/navItems";
import theme from "../../../styles/theme";
import Search from "../../../public/icons/Search";
import Question from "../../../public/icons/Question";

const Navbar = () => {
  const [openSearch, setOpenSearch] = useState(false);
  const [scrollNav, setScrollNav] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", changeNav);
  }, []);

  const handleSearch = () => {
    setOpenSearch(!openSearch);
  };

  //PARA EL SMOOTH SCROLLING
  const changeNav = () => {
    if (window.scrollY >= 80) {
      setScrollNav(true);
    } else {
      setScrollNav(false);
    }
  };

  const toggleHome = () => {
    scroll.scrollToTop();
  };

  return (
    <Flex
      as="nav"
      maxWidth="100vw"
      align="center"
      justify="space-between"
      height="100px"
      bg={theme.colors.gradients["grad-purple-2"]}
      shadow="md"
      scrollnav={scrollNav.toString()}
    >
      <Box display="flex" alignItems="center" width="25%">
        <Text
          as="h5"
          fontSize="30px"
          lineHeight="120%"
          fontWeight={700}
          color="#ffffff"
        >
          ARTRENDS
        </Text>
      </Box>
      <Box display="flex" as="ul" justifyContent="center" flex="1" gap={12}>
        {navItems.map(item => (
          <Box key={item.id} display="flex" as="li">
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
      <Box
        display="flex"
        alignItems="center"
        justifyContent="flex-end"
        gap={5}
        flex="0 1 25%"
        width="25%"
      >
        <IconButton
          icon={<Search onClick={handleSearch} />}
          colorScheme={theme.colors.gradients["grad-white"]}
        />
        <Question />
      </Box>
    </Flex>
  );
};

export default Navbar;
