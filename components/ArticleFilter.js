import Link from "next/link";
import React from "react";
import styled from "styled-components";
import theme from "../components/Global/Theme";
import { v4 as uuidv4 } from "uuid";

const FilterButton = styled.li`
  &.active {
    border: 2px solid hotpink;
  }
`;

export default function ArticleFilter({ subcategories, onClick, subfilter }) {
  console.log("subfilter: ", subfilter);
  console.log("subcategory one id: ", subcategories[0].id);
  return (
    <div>
      <ul>
        <li onClick={() => onClick(null)}>All</li>
        {subcategories.map((subcategory, index) => {
          return (
            <React.Fragment key={uuidv4()}>
              <FilterButton
                className={`${subfilter == subcategory.id ? "active" : null}`}
                onClick={() => onClick(subcategory.id)}
              >
                {subcategory.name}
              </FilterButton>
            </React.Fragment>
          );
        })}
      </ul>
    </div>
  );
}
