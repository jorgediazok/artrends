import { Box, Breadcrumb, BreadcrumbItem, Text } from "@chakra-ui/react";
import Footer from "../../components/layout/Footer";
import Navbar from "../../components/layout/Navbar";
import ArrowRight from "../../public/icons/ArrowRight";

const SobreLasTendencias = () => {
  return (
    <>
      <Navbar />
      <Box paddingX="260px" background="#241154">
        <Box display="flex" alignItems="center" justifyContent="flex-start">
          <Breadcrumb
            marginTop="32px"
            fontSize="text-sm"
            color="#FFFFFF"
            spacing="16px"
            separator={<ArrowRight color="#FFFFFF" />}
          >
            <BreadcrumbItem>
              <Text fontSize="text-sm">Home</Text>
            </BreadcrumbItem>

            <BreadcrumbItem>
              <Text>Sobre las tendencias</Text>
            </BreadcrumbItem>
          </Breadcrumb>
        </Box>

        <Text
          fontSize="30px"
          color="#FFFFFF"
          fontWeight="bold"
          marginTop="32px"
          marginBottom="40px"
        >
          Sobre las tendencias
        </Text>

        <Box fontSize="20px" color="#FFFFFF" textAlign="left">
          <Text>
            Cada plataforma determina sus tendencias mediante el uso de
            algoritmos los cuales son modificados según el cambio de políticas o
            modelo de negocio que consideren necesario. Si bien éstas empresas
            no brindan mucha información sobre los criterios que emplean para
            establecer qué es y qué no es una tendencia, existen muchos factores
            que influyen en su disposición.
          </Text>

          <Text marginTop="40px" fontWeight="bold">
            Twitter
          </Text>
          <Text>
            Las Tendencias por ubicación son los temas populares entre las
            personas usuarias ubicadas en una zona geográfica específica (en
            nuestro caso Argentina) son varios los elementos que se toman en
            cuenta, algunos de ellos son:
          </Text>

          <Text marginTop="40px">
            Novedad: jerarquiza la etiqueta o palabras que “emergen” en
            popularidad en un tiempo reciente o que no hayan aparecido en
            interacciones anteriores.
          </Text>
          <Text marginTop="10px">
            Cantidad de personas usuarias: que utilizan determinada palabra
            clave o etiqueta. Si existen tendencias o hastag que se relacionan
            con un mismo tema el algoritmo las detecta y agrupa.
          </Text>
          <Text marginTop="10px">
            Nivel de influencia: las cuentas con más llegada y cantidad de
            seguidores son más relevantes a la hora de establecer tendencias.
          </Text>
          <Text marginTop="10px">
            Interacciones: volúmen de conversaciones creadas a partir de las
            palabras claves o hashtags
          </Text>

          <Text marginTop="40px" fontWeight="bold">
            Spotify
          </Text>
          <Text>
            Se sabe poco de su cálculo de popularidad pero en sus métricas de
            interacción se valoran la cantidad de escuchas, repeticiones de
            escuchas, seguidores por oyente, guardado de canciones para
            reproducir más tarde, canciones añadidas a playlists e incluso,
            apariciones en la prensa musical y redes sociales. En el caso de los
            podcast es similar.
          </Text>

          <Text marginTop="40px" fontWeight="bold">
            Youtube
          </Text>
          <Text>
            Considera factores como las vistas, la velocidad en que se alcanzan
            esas vistas, la antigüedad del video, nivel de rendimiento en
            comparación con los videos subidos recientemente del mismo canal,
            etc.
          </Text>
          <Text>
            Otro dato a tomar en cuenta es que los rankings de tendencias en
            youtube tienen como fin ser listas representativas de lo que se
            puede encontrar en la plataforma, por consiguiente analizan el tipo
            de contenido valorando lo novedoso, lo atrayente que puede resultar
            para una amplia variedad de personas usuarias y jerarquiza el
            contenido original, entre otros puntos.
          </Text>

          <Text marginTop="40px" fontWeight="bold">
            Google
          </Text>
          <Text>
            Las tendencias que se muestran en Artrends son las del tipo búsqueda
            diarias en google, las cuales son las consultas con más aumento de
            tráfico en un periodo de 24 horas.
          </Text>

          <Text marginTop="40px" fontWeight="bold">
            Portales de noticias
          </Text>
          <Text>
            Se muestran los artículos más leidos segun informan cada uno de los
            portales. La selección de estas cinco es a razon de considerarlas
            más representativas y populares.
          </Text>
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default SobreLasTendencias;
