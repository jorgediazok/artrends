import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Checkbox,
  CheckboxGroup,
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
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [typeOfMessage, setTypeOfMessage] = useState("1");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleInputChange = e => setInput(e.target.value);

  return (
    <>
      <Navbar />
      <Box paddingX="260px" background="#241154" height="100vh">
        <Box display="flex" alignItems="center" justifyContent="flex-start">
          <Breadcrumb
            marginTop="152px"
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
          height="689px"
          display="flex"
          marginTop="33px"
          border="1px solid #D6F3F3"
          borderRadius="12px"
          marginBottom="261px"
        >
          {/* LEFT */}
          <Box
            width="50%"
            flexDirection="column"
            display="flex"
            justifyContent="center"
            borderTopLeftRadius="12px"
            borderBottomLeftRadius="12px"
            background={theme.colors.gradients["grad-contacto"]}
            borderRight="1px solid #D6F3F3"
            color="#FFFFFF"
          >
            <Text
              fontSize="36px"
              textAlign="center"
              fontWeight="700"
              lineHeight="120%"
            >
              Contacto
            </Text>
            <Text
              marginTop="40px"
              fontSize="24px"
              marginLeft="auto"
              marginRight="auto"
              textAlign="center"
              fontWeight="400"
              lineHeight="175%"
              maxWidth="250px"
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
            <Box display="flex" alignItems="center" marginTop="44px" gap="36px">
              <Box>
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
              <Box>
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
              <Box marginLeft="5px">
                <Archive />
              </Box>
              <Box w="100%" display="flex" justifyContent="space-between">
                <RadioGroup onChange={setTypeOfMessage} value={typeOfMessage}>
                  <Stack
                    display="flex"
                    direction="row"
                    justifyContent="space-between"
                    gap="210px"
                    color="#FFFFFF"
                    fontSize="18px"
                    lineHeight="28px"
                  >
                    <Radio value="1">Consulta</Radio>
                    <Radio value="2">Sugerencia</Radio>
                    <Radio value="3">Comentario</Radio>
                  </Stack>
                </RadioGroup>
              </Box>
            </Box>
            <Box>
              <FormControl isInvalid={isError}>
                <Textarea
                  placeholder="Ingresá tu mensaje"
                  height="217px"
                  background={theme.colors.gradients["grad-ind-purple"]}
                  color="#FFFFFF"
                  marginTop="50px"
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
              <Box>Captcha</Box>
              <Button
                background={theme.colors.gradients["grad-ind-purple-2"]}
                borderRadius="6px"
                color="#FFFFFF"
                padding="10px 24px"
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
