import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useState } from "react";

// Components
import Footer from "../../components/layout/Footer";
import Navbar from "../../components/layout/Navbar";
import Agenda from "../../components/ui/icons/Agenda";
import Archive from "../../components/ui/icons/Archive";
import ArrowRight from "../../components/ui/icons/ArrowRight";
import Enveloppe from "../../components/ui/icons/Enveloppe";
import theme from "../../styles/theme";

const Contacto = () => {
  const [hasCarrousel, setHasCarrousel] = useState(false);
  const [hasSearch, setHasSearch] = useState(false);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [typeOfMessage, setTypeOfMessage] = useState("1");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleInputChange = e => setInput(e.target.value);

  return (
    <>
      <Navbar hasCarrousel={hasCarrousel} hasSearch={hasSearch} />
      <Box paddingX={{ base: "0px", lg: "180px" }} background="#241154">
        <Box
          display="flex"
          alignItems="center"
          justifyContent="flex-start"
          marginTop={{ base: "50px", lg: "0px" }}
          marginLeft={{ base: "16px", lg: "0px" }}
        >
          <Breadcrumb
            marginTop={{ base: "32px", lg: "152px" }}
            fontSize="text-sm"
            color="#FFFFFF"
            spacing="16px"
            separator={<ArrowRight color="#FFFFFF" />}
          >
            <BreadcrumbItem>
              <NextLink href="/">
                <Text fontSize="text-sm">Home</Text>
              </NextLink>
            </BreadcrumbItem>

            <BreadcrumbItem>
              <Text fontWeight="600">Contacto</Text>
            </BreadcrumbItem>
          </Breadcrumb>
        </Box>

        <Box
          display="flex"
          marginTop={{ base: "120px", lg: "33px" }}
          border={{ base: "none", lg: "1px solid #D6F3F3" }}
          borderRadius="12px"
          flexDirection={{ base: "column", lg: "row" }}
        >
          {/* LEFT */}
          <Box
            width={{ base: "100%", lg: "50%" }}
            flexDirection="column"
            display="flex"
            justifyContent="center"
            borderTopLeftRadius={{ base: "0px", lg: "12px" }}
            borderBottomLeftRadius={{ base: "0px", lg: "12px" }}
            marginTop={{ base: "-88px", lg: "0px" }}
            background={{
              base: "#241154",
              lg: theme.colors.gradients["grad-contacto"],
            }}
            borderRight={{ base: "none", lg: "1px solid #D6F3F3" }}
            color="#FFFFFF"
          >
            <Text
              fontSize={{ base: "20px", lg: "36px" }}
              textAlign="center"
              fontWeight="700"
              lineHeight={{ base: "24px", lg: "120%" }}
            >
              Contacto
            </Text>
            <Text
              marginTop={{ base: "32px", lg: "40px" }}
              fontSize={{ base: "16px", lg: "24px" }}
              marginLeft="auto"
              marginRight="auto"
              textAlign="center"
              fontWeight={{ base: "600", lg: "400" }}
              lineHeight={{ base: "20px", lg: "175%" }}
              maxWidth={{ base: "100%", lg: "250px" }}
            >
              Para dejarnos un mensaje completa el formulario
            </Text>
          </Box>

          {/* RIGHT */}
          <Box
            width="100%"
            flexDirection="column"
            display="flex"
            justifyContent="center"
            background="#241154"
            borderTopRightRadius="12px"
            borderBottomRightRadius="12px"
            padding="32px"
          >
            <Box
              display="flex"
              alignItems="center"
              flexDirection={{ base: "column", lg: "row" }}
              marginTop={{ base: "29px", lg: "44px" }}
              gap="36px"
            >
              <Box display={{ base: "none", lg: "block" }}>
                <Agenda />
              </Box>
              <Box width="100%">
                <FormControl isInvalid={isError}>
                  <Input
                    width="100%"
                    color="#FFFFFF"
                    variant="flushed"
                    _hover={{ borderColor: "#C7F0F0" }}
                    focusBorderColor="#71E9EB"
                    errorBorderColor="red.300"
                    borderColor="rgba(255,255,255,0.5)"
                    placeholder="Ingresá tu nombre completo"
                    _placeholder={{
                      opacity: 1,
                      color: "rgba(255,255,255,0.5)",
                    }}
                  />
                  {isError && (
                    <FormErrorMessage
                      color="#FFFFFF"
                      fontSize="sm"
                      marginTop="6px"
                    >
                      Por favor complete el campo para poder enviar el mensaje
                    </FormErrorMessage>
                  )}
                </FormControl>
              </Box>
            </Box>
            <Box marginTop="50px" display="flex" alignItems="center" gap="36px">
              <Box display={{ base: "none", lg: "block" }}>
                <Enveloppe />
              </Box>
              <Box width="100%">
                <FormControl isInvalid={isError}>
                  <Input
                    width="100%"
                    focusBorderColor="#71E9EB"
                    _hover={{ borderColor: "#C7F0F0" }}
                    errorBorderColor="red.300"
                    borderColor="rgba(255,255,255,0.5)"
                    color="#FFFFFF"
                    variant="flushed"
                    placeholder="Ingresá tu correo electrónico"
                    _placeholder={{
                      opacity: 1,
                      color: "rgba(255,255,255,0.5)",
                    }}
                  />
                  {isError && (
                    <FormErrorMessage
                      color="#FFFFFF"
                      fontSize="sm"
                      marginTop="6px"
                    >
                      Por favor complete el campo para poder enviar el mensaje
                    </FormErrorMessage>
                  )}
                </FormControl>
              </Box>
            </Box>
            <Box marginTop="50px" display="flex" alignItems="center" gap="36px">
              <Box marginLeft="5px" display={{ base: "none", lg: "block" }}>
                <Archive />
              </Box>
              <Box w="100%">
                <RadioGroup onChange={setTypeOfMessage} value={typeOfMessage}>
                  <Stack
                    display="flex"
                    direction="row"
                    justifyContent="space-between"
                    color="#FFFFFF"
                  >
                    <Radio value="1" size={{ base: "sm", lg: "lg" }}>
                      Consulta
                    </Radio>
                    <Radio value="2" size={{ base: "sm", lg: "lg" }}>
                      Sugerencia
                    </Radio>
                    <Radio value="3" size={{ base: "sm", lg: "lg" }}>
                      Comentario
                    </Radio>
                  </Stack>
                </RadioGroup>
              </Box>
            </Box>
            <Box>
              <FormControl isInvalid={isError}>
                <Textarea
                  placeholder="Ingresá tu mensaje"
                  height={{ base: "132px", lg: "217px" }}
                  background={theme.colors.gradients["grad-ind-purple"]}
                  color="#FFFFFF"
                  marginTop={{ base: "24px", lg: "50px" }}
                />
                {isError && (
                  <FormErrorMessage
                    color="#FFFFFF"
                    fontSize="sm"
                    marginTop="6px"
                  >
                    Por favor complete el campo para poder enviar el mensaje
                  </FormErrorMessage>
                )}
              </FormControl>
            </Box>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box></Box>
              {/* CAPTCHA VA ACA */}
              <Button
                background={theme.colors.gradients["grad-ind-purple-2"]}
                borderRadius="6px"
                color="#FFFFFF"
                padding={{ base: "10px 16px", lg: "10px 24px" }}
                marginTop="64px"
              >
                Enviar mensaje
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default Contacto;
