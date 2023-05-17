import NextHead from "next/head";

// Chakra
import { Box, Breadcrumb, BreadcrumbItem, Text } from "@chakra-ui/react";
import NextLink from "next/link";

// Components
import Footer from "../../components/layout/Footer";
import Navbar from "../../components/layout/Navbar";
import Container from "../../components/layout/Container";

// Icons
import ArrowRight from "../../components/ui/icons/ArrowRight";

const TerminosYCondiciones = () => {
  return (
    <>
      <NextHead>
        <title>Artrends | Términos y condiciones</title>
        <meta
          name="description"
          content="Enterate rápido y en un sólo lugar qué les interesa ahora a los argentinos. Tendencias de Twitter, lo más buscado en Google, lo más visto en Youtube, lo más escuchado en Spotify, lo más leído en portales de noticias y más."
        />
        <meta
          name="keywords"
          content="trends, tendencias, argentina, tt, trending topics, google, qué buscan argentinos en google, ranking de canciones, ranking de artistas, ranking de podcasts, intereses de los argentinos, portales de noticias, twitter argentina, noticias de Argentina, intereses de argentinos, spotify argentina, youtubers argentinos, youtube argentina, lo más leído, lo más buscado, lo más escuchado, lo más visto."
        />
        <meta name="canonical" content="https://artrends.ar" />
        <meta name="robots" content="index follow" />
        <meta property="og:title" content="Artrends | Sobre las tendencias" />
        <meta
          property="og:description"
          content="Enterate rápido y en un sólo lugar qué les interesa ahora a los argentinos. Tendencias de Twitter, lo más buscado en Google, lo más visto en Youtube, lo más escuchado en Spotify, lo más leído en portales de noticias y más."
        />
        <meta property="og:url" content="https://artrends.ar" />
        <meta property="og:site_name" content="Artrends" />
        <meta property="og:image" content="https://artrends.ar/og_image.png" />
        <link rel="icon" href="/favicon.ico" />
      </NextHead>

      <Navbar hasCarrousel={false} hasNavItems={false} />
      <Box background="#241154">
        <Container isContentCentered={false}>
          <Breadcrumb
            marginTop={{ base: "82px", lg: "152px" }}
            fontSize="text-sm"
            color="#FFFFFF"
            spacing="16px"
            separator={<ArrowRight color="#FFFFFF" />}
            marginRight="auto"
            marginLeft="0"
          >
            <BreadcrumbItem>
              <NextLink href="/">
                <Text as="button" fontSize="text-sm">
                  Home
                </Text>
              </NextLink>
            </BreadcrumbItem>

            <BreadcrumbItem>
              <Text fontWeight="600">Términos y condiciones</Text>
            </BreadcrumbItem>
          </Breadcrumb>
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
            Términos y condiciones
          </Text>

          <Box
            fontSize={{ base: "16px", lg: "20px" }}
            color="#FFFFFF"
            textAlign="left"
          >
            <Text as="p" fontFamily="body">
              Al acceder y utilizar este sitio web, usted acepta y accede a
              estar obligado por los términos y disposiciones de este acuerdo.
            </Text>
            <Text
              id="recopilacion"
              marginTop={{ base: 6, lg: "40px" }}
              fontWeight="bold"
              as="h2"
            >
              Aceptacion de los términos
            </Text>
            <p>
              La participación en este sitio web implica la aceptación de los
              términos y condiciones presentes. Si no acepta cumplir con lo
              anterior se solicita no utilizarlo. <br />
              El contenido original de este sitio web, incluyendo su logo,
              imágenes, y demás elementos de propiedad intelectual, son
              propiedad exclusiva del equipo de Artrends y están protegidos por
              las leyes de propiedad intelectual y derechos de autor.
            </p>
            <Text
              id="spotify"
              marginTop={{ base: 6, lg: "40px" }}
              fontWeight="bold"
              as="h2"
            >
              Uso del sitio web
            </Text>
            <p>
              Este sitio web proporciona información relacionada con las
              tendencias en las plataformas más populares de Argentina,
              incluyendo Twitter, Spotify, Youtube, Google y medios de
              comunicación. El acceso y consulta de esta información es gratuito
              y no requiere registro. Su uso se encuentra limitado a fines
              personales y no comerciales. No está permitida la modificación,
              copia, distribución, transmisión, visualización, ejecución,
              reproducción, publicación, otorgamiento de licencias, creación de
              trabajos derivados, transferencia o venta de ningún contenido de
              este sitio web sin el consentimiento previo y por escrito de sus
              propietarios. <br />
              El usuario es responsable del uso que haga del sitio web y de
              cumplir con estos términos y condiciones. No está permitido
              utilizar el sitio web con fines ilegales o no autorizados, ni
              interferir con su funcionamiento normal.
            </p>
            <Text
              id="spotify"
              marginTop={{ base: 6, lg: "40px" }}
              fontWeight="bold"
              as="h2"
            >
              Recopilación de información de terceros
            </Text>
            <Text as="p">
              Este sitio web recopila información de sitios de terceros para
              proporcionar contenido relevante y actualizado a los usuarios. La
              información de terceros puede incluir, entre otros, datos y
              textos. El contenido de terceros se proporciona &apos;tal
              cual&apos; sin garantía de ningún tipo. No somos responsables de
              la precisión, integridad o idoneidad del contenido de terceros.
            </Text>
            <Text
              id="youtube"
              marginTop={{ base: 6, lg: "40px" }}
              fontWeight="bold"
              as="h2"
            >
              Exclusión de garantías
            </Text>
            <Text as="p">
              La información proporcionada en este sitio web es solamente
              informativa y se obtiene de diversas fuentes, sin garantía de su
              presición, integridad o idoneidad. Asimismo, el sitio web no
              garantiza la disponibilidad ininterrumpida o libre de errores.
            </Text>
            <Text
              id="google"
              marginTop={{ base: 6, lg: "40px" }}
              fontWeight="bold"
              as="h2"
            >
              Limitación de responsabilidad
            </Text>
            <Text as="p">
              En ningún caso el sitio web será responsable por daños de ningún
              tipo, incluyendo daños directos, indirectos, especiales, fortuitos
              o consecuentes, que surjan del uso o imposibilidad de usar el
              sitio web o su contenido. El sitio web no controla ni supervisa el
              contenido de las plataformas externas a las que se enlaza y no se
              hace responsable de los posibles cambios o modificaciones que
              puedan sufrir.
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
            <br />
            <Text as="p">
              Nos reservamos el derecho a modificar estos términos y condiciones
              en cualquier momento, siendo su uso continuado del sitio web la
              aceptación de cualquier cambio en los términos. Se recomienda a
              los usuarios que revisen continuamente esta página para asegurarse
              de estar de acuerdo con los cambios realizados.
            </Text>
            <br />
            <Text as="p">
              Los presentes términos y condiciones se rigen por las leyes
              argentinas y cualquier disputa que surja entre el usuario y el
              equipo de Artrends se someterá a la jurisdicción exclusiva de los
              tribunales competentes del país.
            </Text>
          </Box>
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default TerminosYCondiciones;
