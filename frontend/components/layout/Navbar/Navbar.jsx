import { useState } from "react";

// Chakra
import { Box, Flex, IconButton, Text } from "@chakra-ui/react";

// Utils
import { navItems } from "../../../utils/navItems";

// Theme
import theme from "../../../styles/theme";

// Icons
import Search from "../../../public/icons/Search";
import Question from "../../../public/icons/Question";

// Styles
import styles from "./Navbar.module.css";

const Navbar = () => {
  const [openSearch, setOpenSearch] = useState(false);

  const handleSearch = () => {
    setOpenSearch(!openSearch);
  };

  return (
    <Flex
      as="nav"
      className={styles.navbar}
      bg={theme.colors.gradients["grad-purple-2"]}
      shadow="md"
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
      <Box
        display="flex"
        as="ul"
        justifyContent="center"
        flex="1"
        mr="auto"
        ml="auto"
        gap={12}
      >
        {navItems.map(item => (
          <Box key={item.id} display="flex" as="li">
            <Text
              color="white.500"
              fontSize="18px"
              lineHeight="28px"
              fontWeight={600}
              cursor="pointer"
            >
              {item.label}
            </Text>
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
