import { css } from "styled-components";

export const type = {
  header: "Source Serif Pro",
  body: "Arial",
  accent: "halcyon-regular",
  medium: "halcyon-medium",
  semibold: "halcyon-semibold",
  medium: "halcyon-medium",
  italic: "halcyon-regularitalic",
};

export const breakpoints = {
  xs: "400px",
  sm: "768px",
  md: "1000px",
  lg: "1250px",
  xl: "1800px",
  cardBreakSmall: "645px",
  cardBreak: "1006px",
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

const theme = {
  mediaQuery,
  breakpoints,
  colours,
  type,
};

export default theme;
