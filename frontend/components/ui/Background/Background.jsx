import { Box, Image } from "@chakra-ui/react";
import background from "../../../public/images/background.svg";

const Background = () => {
  return (
    // <Box
    //   w="100vw"
    //   h="100vh"
    //   //   bgImage={`url(${background})`}
    //   bgImage="url('../../../public/images/background.svg')"
    //   bgPosition="center"
    //   bgRepeat="repeat"
    // />
    <Image src={background} alt="Imágen de Fondo" />
  );
};

export default Background;
