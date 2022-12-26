export const breakpoints = {
  mobile: 0, // 0 a 550px
  tablet: 550, // 550px a 1100px
  laptop: 1100, // 1100px a 1500px
  desktop: 1500, // desde 1500px
};

export const mediaQueries = {
  minTablet: `@media screen and (min-width: ${breakpoints.tablet}px)`,
  minLaptop: `@media screen and (min-width: ${breakpoints.laptop}px)`,
  minDesktop: `@media screen and (min-width: ${breakpoints.desktop}px)`,
};

export const spacing = {
  zero: "0px",
  one: "4px",
  two: "8px",
  three: "12px",
  four: "16px",
  five: "20px",
  six: "24px",
  seven: "28px",
  eight: "32px",
  nine: "36px",
  ten: "40px",
  twelve: "48px",
  fourteen: "56px",
  sixteen: "64px",
  twenty: "80px",
  twentyfour: "96px",
  twentyeight: "112px",
  thirtytwo: "128px",
  thirtysix: "144px",
  fourty: "160px",
  fourtyfour: "176px",
  fourtyeight: "192px",
  fiftytwo: "208px",
  fiftysix: "224px",
  sixty: "240px",
  sixtyfour: "256px",
  seventytwo: "288px",
  eighty: "320px",
  ninetysix: "384px",
};

export const colors = {
  white: {
    500: "#FFFF",
  },
  cyan: {
    200: "#C7F0F0",
    500: "#71E9EB",
  },
  purple: {
    300: "#A88DEC",
    400: "#7F6BB3",
    500: "#533D8A",
    600: "#241154",
  },
  magenta: {
    500: "#BC55E0",
  },
  indigo: {
    300: "#5F61CC",
    600: "#27238F",
    800: "#0A0840",
  },
  gradients: {
    "grad-purp-45": `linear-gradient(135deg, #7F6BB3 0%, #241154 100%);`,
    "grad-ind-purple": `linear-gradient(91.11deg, #0A0840 0%, #533D8A 100%)`,
    "grad-purp-transparent": `linear-gradient(135deg, rgba(36, 17, 84, 0) 0%, #241154 100%);`,
    "grad-purp-90": `linear-gradient(180deg, #7F6BB3 0%, #241154 100%);`,
    "grad-purp-100": `linear-gradient(133.42deg, #5F61CC 0%, #533D8A 97.4%)`,
  },
};

export const theme = {
  breakpoints,
  mediaQueries,
  colors,
  spacing,
};
