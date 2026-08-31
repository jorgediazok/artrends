import NextLink from "next/link";
import NextHead from "next/head";
import { useState } from "react";

// Chakra
import {
  Box,
  Breadcrumb,
  Button,
  Field,
  Input,
  RadioGroup,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";

// Components
import Container from "../../components/layout/Container";
import Footer from "../../components/layout/Footer";
import Navbar from "../../components/layout/Navbar";
import Agenda from "../../components/ui/icons/Agenda";
import Archive from "../../components/ui/icons/Archive";
import ArrowRight from "../../components/ui/icons/ArrowRight";
import Envelope from "../../components/ui/icons/Envelope";

// Theme
import theme from "../../styles/theme";

const Contacto = () => {
  const [name, setName] = useState("");
  const [nameHasError, setNameHasError] = useState(false);

  const [email, setEmail] = useState("");
  const [emailHasError, setEmailHasError] = useState(false);

  const [typeOfMessage, setTypeOfMessage] = useState("Consulta");

  const [message, setMessage] = useState("");
  const [messageHasError, setMessageHasError] = useState(false);

  const [messageHasBeenSent, setMessageHasBeenSent] = useState(false);

  // Helper
  const resetErrors = () => {
    setNameHasError(false);
    setEmailHasError(false);
    setMessageHasError(false);
  };

  // Handlers
  const handleFormSubmit = async event => {
    event.preventDefault();

    resetErrors();

    if (!name) {
      setNameHasError(true);
      return;
    }
    if (!email) {
      setEmailHasError(true);
      return;
    }
    if (!message) {
      setMessageHasError(true);
      return;
    }

    await fetch("https://api.artrends.ar/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName: name,
        email,
        subject: typeOfMessage,
        message,
      }),
    }).catch(e => {
      console.log("[Contacto]: ", e);
    });

    setMessageHasBeenSent(true);
  };

  return (
    <>
      <NextHead>
        <title>Artrends | Contacto</title>
        <meta
          name="description"
          content="Enterate rápido y en un sólo lugar qué les interesa ahora a los argentinos. Tendencias de X, lo más buscado en Google, lo más visto en Youtube, lo más escuchado en Spotify, lo más leído en portales de noticias y más."
        />
        <meta
          name="keywords"
          content="trends, tendencias, argentina, tt, trending topics, google, qué buscan argentinos en google, ranking de canciones, ranking de artistas, ranking de podcasts, intereses de los argentinos, portales de noticias, twitter argentina, noticias de Argentina, intereses de argentinos, spotify argentina, youtubers argentinos, youtube argentina, lo más leído, lo más buscado, lo más escuchado, lo más visto."
        />
        <meta name="canonical" content="https://artrends.ar" />
        <meta name="robots" content="index follow" />
        <meta property="og:title" content="Artrends | Contacto" />
        <meta
          property="og:description"
          content="Enterate rápido y en un sólo lugar qué les interesa ahora a los argentinos. Tendencias de X, lo más buscado en Google, lo más visto en Youtube, lo más escuchado en Spotify, lo más leído en portales de noticias y más."
        />
        <meta property="og:url" content="https://artrends.ar" />
        <meta property="og:site_name" content="Artrends" />
        <meta property="og:image" content="https://artrends.ar/og_image.png" />
        <link rel="icon" href="/favicon.ico" />
      </NextHead>

      <Box background="#241154">
        <Navbar hasCarrousel={false} hasNavItems={false} />
        <Container>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="flex-start"
            marginTop={{ base: "50px", lg: "0px" }}
            as="section"
            id="contacto"
          >
            <Breadcrumb.Root
              marginTop={{ base: "32px", lg: "152px" }}
              fontSize="text-sm"
              color="#FFFFFF"
            >
              <Breadcrumb.List gap="16px">
                <Breadcrumb.Item>
                  <NextLink href="/">
                    <Text fontSize="text-sm">Home</Text>
                  </NextLink>
                </Breadcrumb.Item>

                <Breadcrumb.Separator>
                  <ArrowRight color="#FFFFFF" />
                </Breadcrumb.Separator>

                <Breadcrumb.Item>
                  <Text fontWeight="600">Contacto</Text>
                </Breadcrumb.Item>
              </Breadcrumb.List>
            </Breadcrumb.Root>
          </Box>

          {!messageHasBeenSent && (
            <Box
              display="flex"
              marginTop={{ base: "120px", lg: "33px" }}
              border={{ base: "none", lg: "1px solid #D6F3F3" }}
              borderRadius="12px"
              flexDirection={{ base: "column", lg: "row" }}
              as="form"
              onSubmit={handleFormSubmit}
              width="100%"
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
              >
                <Text
                  fontSize={{ base: "20px", lg: "36px" }}
                  textAlign="center"
                  fontWeight="700"
                  lineHeight={{ base: "24px", lg: "120%" }}
                  color="#fff"
                >
                  Contacto
                </Text>
                <Text
                  marginTop={{ base: "32px", lg: "40px" }}
                  fontSize={{ base: "16px", lg: "24px" }}
                  marginLeft={{ base: "none", lg: "auto" }}
                  marginRight="auto"
                  textAlign={{ base: "left", lg: "center" }}
                  fontWeight={{ base: "600", lg: "400" }}
                  lineHeight={{ base: "20px", lg: "175%" }}
                  color="#fff"
                >
                  Para dejarnos un mensaje completá el formulario
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
                padding={{ base: 0, lg: "32px" }}
              >
                <Box
                  display="flex"
                  alignItems="center"
                  flexDirection={{ base: "column", lg: "row" }}
                  marginTop={{ base: "29px", lg: "44px" }}
                  gap="36px"
                  zIndex={0}
                >
                  <Box display={{ base: "none", lg: "block" }}>
                    <Agenda />
                  </Box>
                  <Box width="100%">
                    <Field.Root invalid={nameHasError}>
                      <Input
                        width="100%"
                        color="#FFFFFF"
                        variant="flushed"
                        _hover={{ borderColor: "#C7F0F0" }}
                        _focusVisible={{ borderColor: "#71E9EB" }}
                        _invalid={{ borderColor: "red.300" }}
                        borderColor="rgba(255,255,255,0.5)"
                        placeholder="Ingresá tu nombre completo"
                        _placeholder={{
                          opacity: 1,
                          color: "rgba(255,255,255,0.5)",
                        }}
                        onInput={event => setName(event.currentTarget.value)}
                      />
                      {nameHasError && (
                        <Field.ErrorText
                          color="#FFFFFF"
                          fontSize="sm"
                          marginTop="6px"
                        >
                          Por favor completá el campo para poder enviar el
                          mensaje.
                        </Field.ErrorText>
                      )}
                    </Field.Root>
                  </Box>
                </Box>
                <Box
                  marginTop="50px"
                  display="flex"
                  alignItems="center"
                  gap="36px"
                  justifyContent="space-between"
                >
                  <Box display={{ base: "none", lg: "block" }}>
                    <Envelope />
                  </Box>
                  <Box width="100%">
                    <Field.Root invalid={emailHasError}>
                      <Input
                        width="100%"
                        _focusVisible={{ borderColor: "#71E9EB" }}
                        _hover={{ borderColor: "#C7F0F0" }}
                        _invalid={{ borderColor: "red.300" }}
                        borderColor="rgba(255,255,255,0.5)"
                        color="#FFFFFF"
                        variant="flushed"
                        type="email"
                        placeholder="Ingresá tu correo electrónico"
                        _placeholder={{
                          opacity: 1,
                          color: "rgba(255,255,255,0.5)",
                        }}
                        onInput={event => setEmail(event.currentTarget.value)}
                      />
                      {emailHasError && (
                        <Field.ErrorText
                          color="#FFFFFF"
                          fontSize="sm"
                          marginTop="6px"
                        >
                          Por favor ingresá un coreo electrónico válido.
                        </Field.ErrorText>
                      )}
                    </Field.Root>
                  </Box>
                </Box>
                <Box
                  marginTop="50px"
                  display="flex"
                  alignItems="center"
                  gap="36px"
                >
                  <Box display={{ base: "none", lg: "block" }}>
                    <Archive />
                  </Box>
                  <Box w="100%">
                    <RadioGroup.Root
                      onValueChange={details =>
                        setTypeOfMessage(details.value)
                      }
                      value={typeOfMessage}
                      size={{ base: "sm", lg: "lg" }}
                    >
                      <Stack
                        display="flex"
                        direction="row"
                        justifyContent="space-between"
                        color="#FFFFFF"
                      >
                        <RadioGroup.Item
                          value="Consulta"
                          bg={theme.colors.gradients["grad-ind-purple-2"]}
                          colorPalette={
                            theme.colors.gradients["grad-ind-purple-2"]
                          }
                        >
                          <RadioGroup.ItemHiddenInput />
                          <RadioGroup.ItemIndicator />
                          <RadioGroup.ItemText>Consulta</RadioGroup.ItemText>
                        </RadioGroup.Item>
                        <RadioGroup.Item
                          value="Sugerencia"
                          bg={theme.colors.gradients["grad-ind-purple-2"]}
                          colorPalette={
                            theme.colors.gradients["grad-ind-purple-2"]
                          }
                        >
                          <RadioGroup.ItemHiddenInput />
                          <RadioGroup.ItemIndicator />
                          <RadioGroup.ItemText>
                            Sugerencia
                          </RadioGroup.ItemText>
                        </RadioGroup.Item>
                        <RadioGroup.Item
                          value="Comentario"
                          bg={theme.colors.gradients["grad-ind-purple-2"]}
                          colorPalette={
                            theme.colors.gradients["grad-ind-purple-2"]
                          }
                        >
                          <RadioGroup.ItemHiddenInput />
                          <RadioGroup.ItemIndicator />
                          <RadioGroup.ItemText>
                            Comentario
                          </RadioGroup.ItemText>
                        </RadioGroup.Item>
                      </Stack>
                    </RadioGroup.Root>
                  </Box>
                </Box>
                <Box>
                  <Field.Root invalid={messageHasError}>
                    <Textarea
                      placeholder="Ingresá tu mensaje"
                      height={{ base: "132px", lg: "217px" }}
                      color="#FFFFFF"
                      marginTop={{ base: "24px", lg: "50px" }}
                      onInput={event => setMessage(event.currentTarget.value)}
                      _focus={{ borderColor: "cyan.500" }}
                    />
                    {messageHasError && (
                      <Field.ErrorText
                        color="#FFFFFF"
                        fontSize="sm"
                        marginTop="6px"
                      >
                        Por favor completá el campo para poder enviar el mensaje
                      </Field.ErrorText>
                    )}
                  </Field.Root>
                </Box>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Button
                    background={theme.colors.gradients["grad-ind-purple-2"]}
                    _hover={{
                      background: theme.colors.gradients["grad-ind-purple-3"],
                    }}
                    _active={{
                      background: "indigo.300",
                    }}
                    borderRadius="6px"
                    color="#FFFFFF"
                    padding={{ base: "10px 16px", lg: "10px 24px" }}
                    marginTop="64px"
                    transition="all 0.5s"
                    type="submit"
                    marginLeft="auto"
                  >
                    Enviar
                  </Button>
                </Box>
              </Box>
            </Box>
          )}

          {messageHasBeenSent && (
            <Box
              display="flex"
              marginTop={{ base: "120px" }}
              borderRadius="12px"
              flexDirection={{ base: "column", lg: "row" }}
              py={{ base: "32px", lg: "164px" }}
            >
              <Text color="#fff" maxHeight="100px" fontSize="2xl">
                Tu mensaje fue enviado. Lo leeremos pronto. ¡Muchas gracias!
              </Text>
            </Box>
          )}
        </Container>
        <Footer />
      </Box>
    </>
  );
};

export default Contacto;
