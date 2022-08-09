import Link from "next/link";
import React from "react";
import styled from "styled-components";
import theme from "../components/Global/Theme";
import { v4 as uuidv4 } from "uuid";

const StartVoices = styled.div`
  border: 4px solid slateblue;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: 100%;
  background-color: ${theme.colours.darkWheat};

  .btn--secondary {
    transition: all 0.25s ease-in-out;
    font-size: 2.4rem;
    &.toggle-active {
      background-color: ${theme.colours.gusYellow};
      transition: all 0.25s ease-in-out;
    }
  }
  .all {
    border: 3px solid rebeccapurple;
    margin: 20px;
    p {
      font-family: ${theme.type.medium};
      color: ${theme.colours.soil};
    }
  }
  .sub-catagories {
    border: 2px solid goldenrod;
    width: 30%;
    p {
      font-family: ${theme.type.medium};
      color: ${theme.colours.soil};
    }
  }

  .sub-container {
    border: solid yellow;
    width: 75%;
    margin: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
`;

export default function ArticleFilter({ subcategories, subfilter, onClick }) {
  return (
    <StartVoices>
      <div className="all">
        <button className="btn--secondary" onClick={() => onClick(null)}>
          All
        </button>
      </div>
      <div className="sub-container">
        {subcategories.map((subcategory, index) => {
          return (
            <React.Fragment key={uuidv4()}>
              <button
                className={`${subfilter == subcategory.id ? "active" : null}`}
                onClick={() => onClick(subcategory.id)}
              >
                {subcategory.name}
              </button>
            </React.Fragment>
          );
        })}
      </div>
    </StartVoices>
  );
}
