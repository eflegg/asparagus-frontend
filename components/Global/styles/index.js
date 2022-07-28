import styled from "styled-components";
import theme from "../Theme";

export const ContribImage = styled.div`
  position: relative;
  width: ${(props) => (props.team ? "100px" : "72px")};
  height: ${(props) => (props.team ? "100px" : "72px")};
  ${theme.mediaQuery.sm`
    width: ${(props) => (props.team ? "200px" : "100px")};
  height: ${(props) => (props.team ? "200px" : "100px")};
  `}
  border-radius: 50%;
  overflow: hidden;
  flex: none;
  margin: 15px;
`;

export const Card = styled.div`
  position: relative;
  &:not(:nth-child(1))::after {
    content: "";
    position: absolute;
    border-bottom: 1px solid ${theme.colours.grey};
    width: 100%;
    top: -35px;
  }

  ${theme.mediaQuery.cardBreakSmall`
  &:not(:nth-child(1))::after{
    border-bottom: 0px;
  }
  &:nth-child(2n + 3)::after {
    content: "";
    position: absolute;
    left: 0px;
    top: -35px;
    width: calc(100% + 75px);
    border-top: 1px solid ${theme.colours.grey};
  }
  &:nth-child(2n + 4)::after {
    content: "";
    position: absolute;
    left: 0px;
    top: -35px;
    width: 100%;
    border-top: 1px solid ${theme.colours.grey};
  }
  &:nth-child(2)::before {
    content: "";
    position: absolute;
    top: 0;
    left: -35px;
    height: calc(100% + 75px);

    border-left: 1px solid ${theme.colours.grey};
  }
  &:nth-child(2n + 4)::before {
    content: "";
    position: absolute;
    top: 0px;
    left: -35px;
    height: calc(100% + 70px);
    border-left: 1px solid ${theme.colours.grey};
  }
  &:last-child::before {
    content: "";
    height: 100%;
  }
`}

  ${theme.mediaQuery.cardBreak`
   &:nth-child(2n + 4)::before {
    border-left: 0px;
   }
   &:nth-child(2n + 3)::after {
    border-top: 0px;
   }
  /* Vertical lines to the left of cells in the top row */
  &:nth-child(2)::before,
  &:nth-child(3)::before {
    content: "";
    position: absolute;
    top: 0px;
    left: -35px;
    height: calc(100% + 70px);
    border-left: 1px solid ${theme.colours.grey};
  }
  /* Vertical lines to the left of cells in all other rows */
  &:nth-child(3n + 5)::before,
  &:nth-child(3n + 6)::before {
    content: "";
    position: absolute;
    top: 0;
    left: -35px;
    height: 100%;
    border-left: 1px solid ${theme.colours.grey};
  }
  /* Horizontal lines above cells in the first column */
  &:nth-child(3n + 4)::after {
    content: "";
    position: absolute;
    top: -35px;
    left: 0;
    width: 100%;
    border-top: 1px solid ${theme.colours.grey};
  }
  /* Horizontal lines above cells in all other columns */
  &:nth-child(3n + 5)::after,
  &:nth-child(3n + 6)::after {
    content: "";
    position: absolute;
    top: -35px;
    left: -70px;
    width: calc(100% + 70px);
    border-top: 1px solid ${theme.colours.grey};
  }
  `}

  /* padding: 7%; */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .card--image {
    position: relative;
    height: 160px;
    top: 0;
  }

  .category-label {
    color: ${theme.colours.soil};
    text-transform: uppercase;
    font-size: 1.5rem;
    font-family: ${theme.type.semibold};
    padding: 0;
    &:first-child {
      &::after {
        content: "\\00B7";
        font-size: 40px;
        line-height: 5px;
        position: relative;
        top: 8px;
      }
    }
  }
  .article-details {
    display: flex;
    align-items: center;
  }
  .byline--image {
    position: relative;
    overflow: hidden;
    flex: none;
    width: 50px;
    height: 50px;
    background: slateblue;
    border-radius: 50%;
    margin-right: 10px;
  }
  .card--inner {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
  }
`;
