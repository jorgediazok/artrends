import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const colors = {
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
  blue: {
    500: "#406BAC",
  },

  gradients: {
    "grad-purple-2": `linear-gradient(180deg, #7F6BB3 0%, #241154 100%);`,
    "grad-purp-45": `linear-gradient(135deg, hsl(257, 32%, 56%) 0%, hsl(257, 66%, 20%) 100%)`,
    "grad-ind-purple": `linear-gradient(91.11deg, hsl(242, 78%, 14%) 0%, hsl(257, 39%, 39%) 100%)`,
    "grad-ind-purple-2": `linear-gradient(133.42deg, #5F61CC 0%, #533D8A 97.4%);`,
    "grad-ind-purple-3": `linear-gradient(133.42deg, #5F61CC 0%, #241154 97.4%);`,
    "grad-purp-transparent": `linear-gradient(135deg, hsla(257, 66%, 20%, 0) 0%, hsl(257, 66%, 20%) 100%)`,
    "grad-purp-transp": `linear-gradient(135deg, rgba(36, 17, 84, 0) 0%, #241154 100%);`,
    "grad-purp-90": `linear-gradient(180deg, hsl(257, 32%, 56%) 0%, hsl(257, 66%, 20%) 100%)`,
    "grad-purp-180": `linear-gradient(to bottom, #241154 0%, #533D8A 100%);`,
    "grad-purp-new": `linear-gradient(133.42deg, hsl(239, 52%, 59%) 0%, hsl(257, 39%, 39%) 97.4%)`,
    "grad-white": `linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0) 100%);`,
    "grad-footer": `linear-gradient(180deg, #241154 0%, #7F6BB3 100%);`,
    "grad-contacto": `linear-gradient(180deg, #241154 9.83%, #406BAC 100%);`,
    "background-gradient-top": `linear-gradient(to top, #406BAC 15%, #241154 100%);`,
    "background-gradient-bottom": `linear-gradient(to bottom, #406BAC 0%, #241154 100%);`,
    "background-home-desktop": `linear-gradient(to bottom, #241154 -10%, #2d5899 14.53%, #241154 100%);`,
    "grad-cards": "hsla(242, 78%, 14%, 0.3)",
    "background-mobile-2":
      "linear-gradient(to bottom, #241154 50%, #2D5899 100%);",
  },
};

const shadows = {
  "inner-md": `inset 9px 10px 5px hsla(0, 0, 0, 0.02), inset 5px 6px 5px hsla(0, 0, 0, 0.08), inset 2px 3px 3px hsla(0, 0, 0, 0.14), inset 1px 1px 2px hsla(0, 0, 0, 0.16)`,
  "drop-md": `8px 9px 5px hsla(0, 0, 0, 0.01), 5px 5px 4px hsla(0, 0, 0, 0.05), 2px 2px 3px hsla(0, 0, 0, 0.09), 1px 1px 2px hsla(0, 0, 0, 0.1), 0px 0px 0px hsla(0, 0, 0, 0.1)`,
  "inner-sm": `inset 75px 75px 43px hsla(0, 0, 0, 0.01), inset 42px 42px 36px hsla(0, 0, 0, 0.05), inset 19px 19px 27px hsla(0, 0, 0, 0.09), inset 5px 5px 15px hsla(0, 0, 0, 0.1)`,
  "drop-xl": `75px 75px 43px hsla(0, 0, 0, 0.01), 42px 42px 36px hsla(0, 0, 0, 0.05), 19px 19px 27px hsla(0, 0, 0, 0.09), 5px 5px 15px hsla(0, 0, 0, 0.1), 0px 0px 0px hsla(0, 0, 0, 0.1)`,
  "inner-card": `8px 9px 5px rgba(0, 0, 0, 0.01), 5px 5px 4px rgba(0, 0, 0, 0.05), 2px 2px 3px rgba(0, 0, 0, 0.09), 1px 1px 2px rgba(0, 0, 0, 0.1), 0px 0px 0px rgba(0, 0, 0, 0.1); 0, 0, 0.16)`,
};

const radius = {
  sm: "2px",
  md: "6px",
  xl: "12px",
};

// Turns a { shade: "cssValue" } scale into v3's { shade: { value: "cssValue" } }
// token shape, without hand-duplicating every color above.
const toTokenScale = scale =>
  Object.fromEntries(
    Object.entries(scale).map(([shade, value]) => [shade, { value }])
  );

const config = defineConfig({
  theme: {
    breakpoints: {
      sm: "320px",
      md: "768px",
      lg: "1100px",
      xl: "1500px",
      "2xl": "1920",
    },
    tokens: {
      // Only the colors actually resolved by Chakra as string-props
      // (e.g. bg="purple.600") need to be real system tokens. `gradients`
      // below is never used that way (always plain JS property access via
      // the default `theme` export), so it's intentionally left out here.
      colors: {
        white: toTokenScale(colors.white),
        cyan: toTokenScale(colors.cyan),
        purple: toTokenScale(colors.purple),
        magenta: toTokenScale(colors.magenta),
        indigo: toTokenScale(colors.indigo),
        blue: toTokenScale(colors.blue),
      },
    },
  },
});

// The Chakra v3 styling system, passed to <ChakraProvider value={system}>.
export const system = createSystem(defaultConfig, config);

// Plain JS values for components that read the theme directly
// (theme.colors.gradients[...], theme.shadows[...], theme.radius.xl),
// unchanged in shape from the v2 theme so those call sites don't need to
// change.
const theme = { colors, shadows, radius };

export default theme;
