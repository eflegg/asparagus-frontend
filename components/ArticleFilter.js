import Link from "next/link";
import React from "react";
import styled from "styled-components";
import theme from "../components/Global/Theme";
import { v4 as uuidv4 } from "uuid";

const StartVoices = styled.div`
  // border: 4px solid slateblue;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;

  background-color: ${theme.colours.darkWheat};

  .btn--secondary {
    transition: all 0.25s ease-in-out;
    &.toggle-active {
      background-color: ${theme.colours.gusYellow};
      transition: all 0.25s ease-in-out;
    }
  }
  .all {
    // border: 3px solid rebeccapurple;
    margin: 10px;
    ${theme.mediaQuery.md`
    margin: 20px;
    `}
    &.toggle-active {
      background-color: ${theme.colours.gusYellow};
      transition: all 0.25s ease-in-out;
    }
    p {
      font-family: ${theme.type.medium};
      color: ${theme.colours.soil};
    }
  }
  .sub-catagories {
    // border: 2px solid goldenrod;
    width: 50%;
    ${theme.mediaQuery.md`
    width: 30%;
    `}

    p {
      font-family: ${theme.type.medium};
      color: ${theme.colours.soil};
    }
  }

  .sub-container {
    // border: solid yellow;
    width: 75%;
    margin: 10px;
    ${theme.mediaQuery.md`
    margin: 20px;
    `}
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
`;

export default function ArticleFilter({ subcategories, subfilter, onClick }) {
  console.log("subfilter: ", subfilter);

  return (
    <StartVoices>
      <div className="all">
        <button
          className={`${
            subfilter == null ? "toggle-active" : null
          } btn--secondary`}
          onClick={() => onClick(null)}
        >
          All
        </button>
      </div>
      <div className="sub-container">
        {subcategories.map((subcategory, index) => {
          return (
            <React.Fragment key={uuidv4()}>
              <div className="sub-catagories">
                <button
                  className={`${
                    subfilter == subcategory.id ? "toggle-active" : null
                  } btn--secondary`}
                  onClick={() => onClick(subcategory.id)}
                >
                  {subcategory.name}
                </button>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </StartVoices>
  );
}
