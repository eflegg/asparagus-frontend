import Link from "next/link";
import React from "react";
import styled from "styled-components";
import theme from "../components/Global/Theme";

export default function ArticleFilter({ subcategories, onClick }) {
  return (
    <div>
      <ul>
        <li onClick={() => onClick(null)}>All</li>
        {subcategories.map((subcategory, index) => {
          return (
            <React.Fragment key={subcategory.id}>
              <li onClick={() => onClick(subcategory.id)}>
                {subcategory.name}
              </li>
            </React.Fragment>
          );
        })}
      </ul>
    </div>
  );
}
