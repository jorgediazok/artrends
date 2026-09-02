import NextHead from "next/head";

// Chakra
import { Box, Breadcrumb, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";

// Components
import Footer from "../../components/layout/Footer";
import Navbar from "../../components/layout/Navbar";
import Container from "../../components/layout/Container";

// Icons
import ArrowRight from "../../components/ui/icons/ArrowRight";

const PoliticasDePrivacidad = () => {
  return (
    <>
      <NextHead>
        <title>Artrends | Políticas de privacidad</title>
        <meta
          name="description"
          content="Políticas de privacidad de Artrends: cómo tratamos los datos de quienes visitan el sitio."
        />
        <meta
          name="keywords"
          content="políticas de privacidad artrends, privacidad, datos personales"
        />
        <link
          rel="canonical"
          href="https://artrends.ar/politicas-de-privacidad"
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Artrends | Políticas de privacidad" />
        <meta
          property="og:description"
          content="Políticas de privacidad de Artrends: cómo tratamos los datos de quienes visitan el sitio."
        />
        <meta
          property="og:url"
          content="https://artrends.ar/politicas-de-privacidad"
        />
        <meta property="og:site_name" content="Artrends" />
        <meta property="og:image" content="https://artrends.ar/og_image.png" />
        <link rel="icon" href="/favicon.ico" />
      </NextHead>

      <Navbar hasCarrousel={false} hasNavItems={false} />
      <Box background="#241154">
        <Container isContentCentered={false}>
          <Breadcrumb.Root
            marginTop={{ base: "82px", lg: "152px" }}
            fontSize="text-sm"
            color="#FFFFFF"
            marginRight="auto"
            marginLeft="0"
          >
            <Breadcrumb.List gap="16px">
              <Breadcrumb.Item>
                <NextLink href="/">
                  <Text as="button" fontSize="text-sm">
                    Home
                  </Text>
                </NextLink>
              </Breadcrumb.Item>

              <Breadcrumb.Separator>
                <ArrowRight color="#FFFFFF" />
              </Breadcrumb.Separator>

              <Breadcrumb.Item>
                <Text fontWeight="600">Políticas de privacidad</Text>
              </Breadcrumb.Item>
            </Breadcrumb.List>
          </Breadcrumb.Root>
        </Container>

        <Container isContentCentered={false}>
          <Text
            fontSize={{ base: "20px", lg: "30px" }}
            color="#FFFFFF"
            fontWeight="bold"
            marginTop="32px"
            marginBottom="40px"
            textAlign={{ base: "center", lg: "left" }}
            as="h1"
            textTransform="uppercase"
          >
            Políticas de privacidad
          </Text>

          <Box
            fontSize={{ base: "16px", lg: "20px" }}
            color="#FFFFFF"
            textAlign="left"
          >
            <Text as="p" fontFamily="body">
              La presente Política de Privacidad establece los términos en que
              Artrends.ar utiliza y protege la información proporcionada por sus
              usuarios al utilizar su sitio web. Artrends está comprometido con
              la seguridad de los datos de sus usuarios y se rige por las leyes
              y regulaciones aplicables a la protección de la privacidad y la
              seguridad de los datos personales.
            </Text>
            <Text
              id="recopilacion"
              marginTop={{ base: 6, lg: "40px" }}
              fontWeight="bold"
              as="h2"
            >
              Recopilación de la información
            </Text>
            <p>
              Artrends no utiliza cookies ni recopila ni almacena ningún tipo de
              información personal sobre los usuarios cuando visitan el sitio
              web. Sin embargo, se utiliza el servicio de Google Analytics para
              analizar el tráfico y el comportamiento de los usuarios en el
              sitio web. Google Analytics recopila datos mediante un
              identificador único asociado al navegador, la aplicación o el
              dispositivo del usuario, los cuales pueden incluir la dirección
              IP, la ubicación geográfica, el tipo de dispositivo, el sistema
              operativo, el navegador, el tiempo en cada página, las fuentes de
              referencia y otros datos estadísticos. Estos datos se utilizan
              para mejorar el sitio web y ofrecer una mejor experiencia de
              usuario.
            </p>
            <Text
              id="spotify"
              marginTop={{ base: 6, lg: "40px" }}
              fontWeight="bold"
              as="h2"
            >
              Uso de la información
            </Text>
            <p>
              Artrends no comparte ni vende la información personal de los
              usuarios a terceros ni la utiliza para fines publicitarios, de
              análisis o de personalización. Solo se utiliza la información
              recopilada por Google Analytics para fines estadísticos y de
              mejora del sitio web.
            </p>
            <Text
              id="spotify"
              marginTop={{ base: 6, lg: "40px" }}
              fontWeight="bold"
              as="h2"
            >
              Protección de la información
            </Text>
            <Text as="p">
              Artrends no almacena ningún tipo de información personal de los
              usuarios en sus servidores. La información recopilada por Google
              Analytics se almacena en los servidores de Google y se rige por su
              propia política de privacidad y sus términos de servicios. Los
              usuarios pueden revisar estos documentos para conocer cómo Google
              protege y procesa sus datos.
            </Text>
            <Text
              id="youtube"
              marginTop={{ base: 6, lg: "40px" }}
              fontWeight="bold"
              as="h2"
            >
              Control de la información personal
            </Text>
            <Text as="p">
              Los usuarios tienen derecho a acceder, rectificar, cancelar u
              oponerse al tratamiento de sus datos personales por parte de
              Google Analytics. Para ello, pueden utilizar las herramientas que
              Google pone a su disposición, como el complemento de
              inhabilitación para navegadores de Google Analytics o la
              configuración de anuncios de Google. También pueden configurar las
              opciones de su navegador, aplicación o dispositivo para rechazar o
              limitar el uso de identificadores únicos.
            </Text>
            <Text
              id="google"
              marginTop={{ base: 6, lg: "40px" }}
              fontWeight="bold"
              as="h2"
            >
              Enlaces a terceros
            </Text>
            <Text as="p">
              El sitio web de Artrends.ar puede contener enlaces a otros sitios
              que puedan ser de interés de los usuarios. Artrends no tiene
              control sobre el sitio al que se redirige y no es responsable de
              los términos o privacidad ni de la protección de los datos en esos
              sitios terceros. Dichos sitios están sujetos a sus propias
              políticas de privacidad, por lo que se recomienda a los usuarios
              que las consulten para confirmar que están de acuerdo con ellas.
            </Text>
            <Text
              id="portals"
              marginTop={{ base: 6, lg: "40px" }}
              fontWeight="bold"
              as="h2"
            >
              Modificaciones a la Política de Privacidad
            </Text>
            <Text as="p">
              Artrends puede modificar esta Política de Privacidad en cualquier
              momento y sin previo aviso. Se recomienda a los usuarios que
              revisen continuamente esta página para asegurarse de estar de
              acuerdo con los cambios realizados.
            </Text>
          </Box>
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default PoliticasDePrivacidad;
