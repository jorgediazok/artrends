import { Box, Flex, Text } from "@chakra-ui/react";
import { navItems } from "../../../utils/navItems";
import theme from "../../../styles/theme";
import Search from "../../../public/icons/Search";

const Navbar = () => {
  return (
    <Flex
      as="nav"
      maxWidth="100vw"
      align="center"
      px="64px"
      justify="space-between"
      height="100px"
      bg={theme.colors.gradients["grad-purple-2"]}
    >
      <Box display="flex" gap="88px" alignItems="center">
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
            <Box key={item.id} d="flex" alignItems="center">
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
      </Box>

      <Box
        width="40px"
        height="40px"
        cursor="pointer"
        display="flex"
        justifyContent="center"
        alignItems="center"
        borderRadius="6px"
        bg={theme.colors.gradients["grad-white"]}
      >
        <Search />
      </Box>
    </Flex>
  );
};

export default Navbar;
