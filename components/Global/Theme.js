import { css } from "styled-components";

export const type = {
  header: "Source Sans Pro",
  body: "Arial",
  accent: "",
};

export const breakpoints = {
  xs: "400px",
  sm: "768px",
  md: "1000px",
  lg: "1250px",
  xl: "1800px",
};

export const mediaQuery = Object.keys(breakpoints).reduce(
  (accumulator, label) => {
    accumulator[label] = (...args) => css`
      @media (min-width: ${breakpoints[label]}) {
        ${css(...args)};
      }
    `;
    return accumulator;
  },
  {}
);

export const colours = {
  gusGreen: "#339933",
  soil: " #913029",
  wheat: "#faf4ec",
  darkWheat: "#f0e7db",
  teaGreen: "#d3e5a0",
  gusYellow: "#f8dd8b",
  grey: "#707070",
  white: "#fff",
  black: "#000",
};
// export const lightTheme = {
//   body: "#E2E2E2",
//   text: "#363537",
//   toggleBorder: "#FFF",
//   gradient: "linear-gradient(#39598A, #79D7ED)",
// };

// export const darkTheme = {
//   body: "#363537",
//   text: "#FAFAFA",
//   toggleBorder: "#6B8096",
//   gradient: "linear-gradient(#091236, #1E215D)",
// };

const theme = {
  mediaQuery,
  breakpoints,
  colours,
  type,
};

export default theme;
