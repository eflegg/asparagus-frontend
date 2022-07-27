import styled from "styled-components";
import theme from "../Theme";

export const ContribImage = styled.div`
  position: relative;
  width: ${(props) => (props.team ? "200px" : "100px")};
  height: ${(props) => (props.team ? "200px" : "100px")};
  border-radius: 50%;
  overflow: hidden;
  flex: none;
  margin: 15px;
`;
