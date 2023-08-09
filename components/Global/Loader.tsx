import styled from "styled-components";
import theme from "./Theme";
import React from "react";

const LoaderContainer = styled.div`
  height: 100vh;
  width: 100vw;
  background: oldlace;
  position: relative;
  .loader-stalk {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  svg {
    height: 300px;
    width: 190px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-0%, -50%);
    path {
      fill: transparent;
      stroke: ${theme.colours.gusGreen};
      stroke-width: 2px;
    }
  }
`;

export default function Loader() {
  return (
    <>
      <LoaderContainer className="loader-container">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 193.1 215">
          <g id="_8" data-name="8">
            <path
              className="cls-1 stalk-path"
              d="M22.57,130.62c-.71,10.22-1.65,20.43-2.75,30.61-.3,2.78-2.55,10.02-1.47,12.61,1.96,4.66,18.03,3.96,20.08-.25,1.01-2.08,.38-6.28,.52-8.54,.38-6.31,.75-12.62,1.11-18.93,.83-14.6,1.64-29.21,2.23-43.83-5.89,.7-11.26-4.18-10.16-10.21,.99-5.41,6.46-10.22,8.31-15.51,2.56-7.33-.61-17.46-2.1-25.1-4.29,11.67-11.75,1.32-17.01,8.82-2.18,3.11,.96,11.42,1.53,16.11,.74,6.03,.95,12.13,1.02,18.19,.14,12.01-.46,24.04-1.29,36.02"
            />
          </g>
          <g id="_9" data-name="9">
            <path
              className="cls-1 floret-path"
              d="M36.67,90.48c3.83-5.45,6.96-11.47,9.36-17.68,1.74,6.06,5.4,18.11,.8,23.9-4.2,5.28-14.32-.28-10.15-6.22"
            />
          </g>
          <g id="_7" data-name="7">
            <path
              className="cls-1 floret-path"
              d="M34.25,20.83c-.55-.67-1.09-1.35-1.64-2.02-2.1,9.36,6.99,13.25,6.26,27.53,6.9-7.05,.04-19.74-4.62-25.51"
            />
          </g>
          <g id="_2" data-name="2">
            <path
              className="cls-1 floret-path"
              d="M16.51,7.14c-.16,.9-.45,9.87,2.51,13.93,.47,.62,5.98,8.03,7.15,8.28,1.19-3.61,3.19-8.36,1.97-11.81-1.65-4.67-7.59-9.02-11.36-11.97-.09,.52-.18,1.04-.27,1.57"
            />
          </g>
          <g id="_3" data-name="3">
            <path
              className="cls-1 floret-path"
              d="M12.41,24.34c-1.29-2.61-6.39-4.53-8.8-6.09,.86,5.74,3.24,8.81,7.16,12.85,.37-2.29,.96-4.55,1.64-6.77Z"
            />
          </g>
          <g id="_4" data-name="4">
            <path
              className="cls-1 floret-path"
              d="M15.76,24.1c-1,3.15-2.86,7.64-1.45,10.54,1.34,2.74,5.47,5.13,7.55,7.47,1.04-4.38,3.23-7.03,1.73-10.86-1-2.55-5.18-5.96-7.46-8.27-.12,.38-.24,.75-.37,1.13"
            />
          </g>
          <g id="_5" data-name="5">
            <path
              className="cls-1 floret-path"
              d="M15.41,55.52c5.61,1.33,7.2-2.75,6.23-6.23-.97-3.48-5.58-7.6-8.49-11.49s-4.79-5.48-5.8-6.55c-.3,7.25,1.91,22.81,8.06,24.27"
            />
          </g>
          <g id="_6" data-name="6">
            <path
              className="cls-1 floret-path"
              d="M23.67,45.73c-1.13,8.58,8.58,11.65,11.81,3.65,2.77-6.86-2.68-16.6-5.9-22.02-.73,6.62-5.01,11.62-5.91,18.36"
            />
            <path
              className="cls-1 floret-path"
              d="M23.67,45.73c-1.13,8.58,8.58,11.65,11.81,3.65,2.77-6.86-2.68-16.6-5.9-22.02-.73,6.62-5.01,11.62-5.91,18.36"
            />
          </g>
          <g id="_1" data-name="1">
            <path
              className="cls-1 floret-path"
              d="M12.76,11.11C11.87,3.28,5.76,2.49,.73,.78c.96,3.48,.64,8.31,2.61,11.33,2.37,3.63,7.23,5.46,10.01,8.81,.4-.06-.48-8.64-.59-9.81Z"
            />
          </g>
        </svg>
      </LoaderContainer>
    </>
  );
}
