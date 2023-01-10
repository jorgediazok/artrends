import {
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  IconButton,
} from "@chakra-ui/react";
import { useState } from "react";
import Search from "../../../public/icons/Search";
import theme from "../../../styles/theme";

const SearchInput = () => {
  const [showInput, setShowInput] = useState(false);

  return (
    <InputGroup>
      <IconButton
        onClick={() => setShowInput(false)}
        name="close"
        icon={<Search />}
        colorScheme={theme.colors.gradients["grad-white"]}
      />
      {showInput ? (
        <Input
          placeholder="Search..."
          transition="width 0.3s ease-in-out"
          width={288}
          rounded="md"
        />
      ) : (
        <IconButton
          name="search"
          onClick={() => setShowInput(true)}
          icon={<Search />}
          colorScheme={theme.colors.gradients["grad-white"]}
        />
      )}
      {showInput && (
        <IconButton
          onClick={() => setShowInput(false)}
          name="close"
          icon={<Search />}
          colorScheme={theme.colors.gradients["grad-white"]}
        />
      )}
    </InputGroup>
  );
};

export default SearchInput;
