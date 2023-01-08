import { useState, useEffect } from "react";
import NextLink from "next/link";
import { Link as ChakraLink } from "@chakra-ui/react";
import {
  Box,
  Collapse,
  Flex,
  IconButton,
  Input,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { AnimatePresence, AnimateSharedLayout } from "framer-motion";
import { animateScroll as scroll, Link } from "react-scroll";
import { navItems } from "../../../utils/navItems";
import theme from "../../../styles/theme";
import Search from "../../../public/icons/Search";
import Question from "../../../public/icons/Question";

const Navbar = () => {
  const [showInput, setShowInput] = useState(false);
  const [scrollNav, setScrollNav] = useState(false);
  const { isOpen, onToggle, onClose } = useDisclosure();

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

  const handleInputClose = () => {
    setTimeout(() => {
      setShowInput(false);
    }, 300);
  };

  return (
    <AnimatePresence>
      <AnimateSharedLayout>
        <Flex
          as="nav"
          maxWidth="100vw"
          align="center"
          justify="space-between"
          height="100px"
          paddingX="26px"
          bg={theme.colors.gradients["grad-purple-2"]}
          shadow="md"
          scrollnav={scrollNav.toString()}
        >
          <Box display="flex" alignItems="center" width="25%">
            <NextLink href="/" passHref>
              <ChakraLink>
                <Text
                  as="h5"
                  cursor="pointer"
                  fontSize="30px"
                  lineHeight="120%"
                  fontWeight={700}
                  color="#ffffff"
                >
                  ARTRENDS
                </Text>
              </ChakraLink>
            </NextLink>
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
            {showInput ? (
              <>
                <Collapse in={showInput} animateOpacity>
                  <IconButton
                    onClick={() => setShowInput(!showInput)}
                    name="close"
                    icon={<Search onClick={() => setShowInput(!showInput)} />}
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

            <NextLink href="/sobre-las-tendencias" passHref>
              <ChakraLink>
                <Question />
              </ChakraLink>
            </NextLink>
          </Box>
        </Flex>
      </AnimateSharedLayout>
    </AnimatePresence>
  );
};

export default Navbar;
