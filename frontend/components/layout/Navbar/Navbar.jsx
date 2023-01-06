import { Box, Flex, IconButton, Text } from "@chakra-ui/react";
import { navItems } from "../../../utils/navItems";
import theme from "../../../styles/theme";
import Search from "../../../public/icons/Search";
import Question from "../../../public/icons/Question";
import { useState } from "react";

const Navbar = () => {
  const [openSearch, setOpenSearch] = useState(false);

  const handleSearch = () => {
    setOpenSearch(!openSearch);
  };

  return (
    <Flex
      as="nav"
      maxWidth="100vw"
      align="center"
      px="26px"
      justify="space-between"
      height="100px"
      bg={theme.colors.gradients["grad-purple-2"]}
      shadow="md"
    >
      <Box display="flex" alignItems="center">
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
      <Box display="flex" alignItems="center" gap="60px">
        {navItems.map(item => (
          <Box key={item.id} d="flex" alignItems="center" as="ul">
            <Text
              as="li"
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
      <Box display="flex" alignItems="center" gap={5}>
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
