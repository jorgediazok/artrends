import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="es">
        <Head />
        <body>
          <Main />
          <NextScript />
          <script
            data-partytown-config
            dangerouslySetInnerHTML={{
              __html: `
                partytown = {
                  lib: "/_next/static/~partytown/",
                  forward: ["gtag"]           
          };
        `,
            }}
          />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
