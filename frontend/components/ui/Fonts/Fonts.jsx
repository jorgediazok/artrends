import { Global } from "@emotion/react";

const Fonts = () => (
  <Global
    styles={`
      @font-face {
        font-family: 'Inter';
        font-weight: 700;
        src: url('https://fonts.googleapis.com/css2?family=Inter&display=swap');
      }
      `}
  />
);

export default Fonts;
