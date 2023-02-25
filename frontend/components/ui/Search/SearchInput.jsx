import { useState } from "react";

// Chakra
import { Input, IconButton, Box, Collapse } from "@chakra-ui/react";

// Icons
import Search from "../../ui/icons/Search";

// Theme
import theme from "../../../styles/theme";

const SearchInput = () => {
  const [showInput, setShowInput] = useState(false);

  const handleInputClose = () => {
    setTimeout(() => {
      setShowInput(false);
    }, 300);
  };

  return (
    <Box
      alignItems="center"
      justifyContent="flex-end"
      gap={5}
      width={{ base: "100%", lg: "20%" }}
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
  );
};

export default SearchInput;
