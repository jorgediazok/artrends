// Chakra
import { Box, Breadcrumb, BreadcrumbItem, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { useState } from "react";

// Components
import Footer from "../../components/layout/Footer";
import Navbar from "../../components/layout/Navbar";

// Icons
import ArrowRight from "../../components/ui/icons/ArrowRight";

const SobreLasTendencias = () => {
  return (
    <>
      <Navbar hasCarrousel={false} hasNavItems={false} />
      <Box paddingX={{ base: "16px", lg: "260px" }} background="#241154">
        <Box display="flex" alignItems="center" justifyContent="flex-start">
          <Breadcrumb
            marginTop={{ base: "82px", lg: "152px" }}
            fontSize="text-sm"
            color="#FFFFFF"
            spacing="16px"
            separator={<ArrowRight color="#FFFFFF" />}
          >
            <BreadcrumbItem>
              <NextLink href="/">
                <Text as="button" fontSize="text-sm">
                  Home
                </Text>
              </NextLink>
            </BreadcrumbItem>

            <BreadcrumbItem>
              <Text fontWeight="600">Sobre las tendencias</Text>
            </BreadcrumbItem>
          </Breadcrumb>
        </Box>

        <Text
          fontSize={{ base: "20px", lg: "30px" }}
          color="#FFFFFF"
          fontWeight="bold"
          marginTop="32px"
          marginBottom="40px"
          textAlign={{ base: "center", lg: "left" }}
          as="h1"
        >
          ¿Cómo se determinan las tendencias?
        </Text>

        <Box
          fontSize={{ base: "16px", lg: "20px" }}
          color="#FFFFFF"
          textAlign="left"
        >
          <Text as="p">
            Cada plataforma determina sus tendencias mediante el uso de
            algoritmos. Estos se van según el cambio de políticas o modelo de
            negocio que consideren necesario. Si bien estas empresas no brindan
            mucha información sobre los criterios que emplean para establecer
            qué es y qué no es una tendencia, existen muchos factores que
            influyen en su disposición.
          </Text>
          <Box
            display={{ base: "flex", lg: "none" }}
            flexDirection="column"
            marginTop="20px"
            gap="12px"
            textDecoration="underline"
            justifyContent="center"
            alignItems="left"
            as="nav"
          >
            <Link href="#twitter">Twitter</Link>
            <Link href="#spotify">Spotify</Link>
            <Link href="#youtube">Youtube</Link>
            <Link href="#google">Google</Link>
            <Link href="#portals">Portales de noticias</Link>
          </Box>
          <Text
            id="twitter"
            marginTop={{ base: 6, lg: "40px" }}
            fontWeight="bold"
            as="h2"
          >
            Twitter
          </Text>
          Brinda información de principales tendencias por ubicación geográfica.
          En nuestro caso, tomamos las de Argentina. <br />
          Para armar el ranking de tendencias son varios los elementos que se
          toman en cuenta. Algunos de ellos son:
          <Text className="italics" as="h3" mt={4}>
            Novedad
          </Text>
          <p>
            Se jerarquiza la etiqueta o palabras que emergen en popularidad en
            un tiempo reciente o que no hayan aparecido en interacciones
            anteriores.
          </p>
          <Text className="italics" as="h3" mt={4}>
            Cantidad de menciones
          </Text>
          <p>
            Se siguen las palabras claves o <i>hashtags</i> usados. Si existe
            repetición de frases similares o que se relacionan con un mismo tema
            el algoritmo las detecta y agrupa.
          </p>
          <Text className="italics" as="h3" mt={4}>
            Nivel de influencia
          </Text>
          <p>
            Las cuentas con más llegada y cantidad de seguidores son más
            relevantes a la hora de establecer tendencias.
          </p>
          <Text className="italics" as="h3" mt={4}>
            Interacciones
          </Text>
          <p>
            El volúmen de conversaciones creadas a partir de las palabras claves
            o hashtags.
          </p>
          <Text
            id="spotify"
            marginTop={{ base: 6, lg: "40px" }}
            fontWeight="bold"
            as="h2"
          >
            Spotify
          </Text>
          <Text as="p">
            Por lo poco que se sabe sobre cómo realizan los cálculos se presume
            que en sus métricas de interacción se valoran la cantidad de
            escuchas, repeticiones de escuchas, seguidores por oyente, guardado
            de canciones para reproducir más tarde, canciones añadidas a las
            playlists e, incluso, apariciones en la prensa musical y redes
            sociales. En el caso de los podcasts es similar.
          </Text>
          <Text
            id="youtube"
            marginTop={{ base: 6, lg: "40px" }}
            fontWeight="bold"
            as="h2"
          >
            Youtube
          </Text>
          <Text as="p">
            Considera factores como las vistas, la velocidad en que se alcanzan
            esas vistas, la antigüedad del video, el nivel de rendimiento en
            comparación con los videos subidos recientemente en el mismo canal,
            entre otros.
            <br />
            Otro dato a tomar en cuenta es que los rankings de tendencias en
            Youtube tienen como fin ser listas representativas de lo que se
            puede encontrar en la plataforma. Por consiguiente analizan el tipo
            de contenido valorando lo novedoso, lo atrayente que pueda resultar
            el contenido para una amplia variedad de personas usuarias. De esta
            forma jerarquiza el más original, entre otros puntos.
          </Text>
          <Text
            id="google"
            marginTop={{ base: 6, lg: "40px" }}
            fontWeight="bold"
            as="h2"
          >
            Google
          </Text>
          <Text as="p">
            Las tendencias que se muestran en Artrends son las del tipo
            &quot;Búsqueda diarias en Google&quot;, las cuales son las consultas
            con más aumento de tráfico en un período de 24 horas.
          </Text>
          <Text
            id="portals"
            marginTop={{ base: 6, lg: "40px" }}
            fontWeight="bold"
            as="h2"
          >
            Portales de Noticias
          </Text>
          <Text as="p">
            Se muestran los cuatro artículos más leídos según informan cada uno
            de los portales en las secciones dedicadas a tal fin.
          </Text>
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default SobreLasTendencias;
