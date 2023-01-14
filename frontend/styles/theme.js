import { extendTheme } from "@chakra-ui/react";

// export const breakpoints = {
//   mobile: 0, // 0 a 550px
//   tablet: 550, // 550px a 1100px
//   laptop: 1100, // 1100px a 1500px
//   desktop: 1500, // desde 1500px
// };

// export const mediaQueries = {
//   minTablet: `@media screen and (min-width: ${breakpoints.tablet}px)`,
//   minLaptop: `@media screen and (min-width: ${breakpoints.laptop}px)`,
//   minDesktop: `@media screen and (min-width: ${breakpoints.desktop}px)`,
// };

const theme = extendTheme({
  breakpoints: {
    base: "px",
    sm: "320px",
    md: "768px",
    lg: "1100",
    xl: "1500",
    "2xl": "1920",
  },
  colors: {
    white: {
      500: "hsl(0, 0%, 100%)",
    },
    cyan: {
      200: "hsl(181, 58%, 86%)",
      500: "hsl(181, 75%, 68%)",
    },
    purple: {
      300: "hsl(257, 72%, 74%)",
      400: "hsl(257, 32%, 56%)",
      500: "hsl(257, 39%, 39%)",
      600: "hsl(257, 66%, 20%)",
    },
    magenta: {
      500: "hsl(284, 69%, 61%)",
    },
    indigo: {
      300: "hsl(239, 52%, 59%)",
      600: "hsl(242, 61%, 35%)",
      800: "hsl(242, 78%, 14%)",
    },

    gradients: {
      "grad-purple-2": `linear-gradient(180deg, #7F6BB3 0%, #241154 100%);`,
      "grad-purp-45": `linear-gradient(135deg, hsl(257, 32%, 56%) 0%, hsl(257, 66%, 20%) 100%)`,
      "grad-ind-purple": `linear-gradient(91.11deg, hsl(242, 78%, 14%) 0%, hsl(257, 39%, 39%) 100%)`,
      "grad-purp-transparent": `linear-gradient(135deg, hsla(257, 66%, 20%, 0) 0%, hsl(257, 66%, 20%) 100%)`,
      "grad-purp-transp": `linear-gradient(135deg, rgba(36, 17, 84, 0) 0%, #241154 100%);`,
      "grad-purp-90": `linear-gradient(180deg, hsl(257, 32%, 56%) 0%, hsl(257, 66%, 20%) 100%)`,
      "grad-purp-new": `linear-gradient(133.42deg, hsl(239, 52%, 59%) 0%, hsl(257, 39%, 39%) 97.4%)`,
      "grad-white": `linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0) 100%);`,
      "grad-footer": `linear-gradient(180deg, #241154 0%, #7F6BB3 100%);`,
    },
  },

  shadows: {
    "inner-md": `inset 9px 10px 5px hsla(0, 0, 0, 0.02), inset 5px 6px 5px hsla(0, 0, 0, 0.08), inset 2px 3px 3px hsla(0, 0, 0, 0.14), inset 1px 1px 2px hsla(0, 0, 0, 0.16)`,
    "drop-md": `8px 9px 5px hsla(0, 0, 0, 0.01), 5px 5px 4px hsla(0, 0, 0, 0.05), 2px 2px 3px hsla(0, 0, 0, 0.09), 1px 1px 2px hsla(0, 0, 0, 0.1), 0px 0px 0px hsla(0, 0, 0, 0.1)`,
    "inner-sm": `inset 75px 75px 43px hsla(0, 0, 0, 0.01), inset 42px 42px 36px hsla(0, 0, 0, 0.05), inset 19px 19px 27px hsla(0, 0, 0, 0.09), inset 5px 5px 15px hsla(0, 0, 0, 0.1)`,
    "drop-xl": `75px 75px 43px hsla(0, 0, 0, 0.01), 42px 42px 36px hsla(0, 0, 0, 0.05), 19px 19px 27px hsla(0, 0, 0, 0.09), 5px 5px 15px hsla(0, 0, 0, 0.1), 0px 0px 0px hsla(0, 0, 0, 0.1)`,
  },

  radius: {
    sm: "2px",
    md: "6px",
    xl: "12px",
  },

  fonts: {
    heading: `"Inter", sans-serif`,
    body: `"Inter", sans-serif`,
  },
});

export default theme;
