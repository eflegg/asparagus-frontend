import React from "react";
import Link from "next/link";
import styled from "styled-components";
import theme from "../components/Global/Theme";

const StockistContainer = styled.div`
  width: 100%;
  padding-left: 30px;
  margin-bottom: 20px;

  p {
    margin: 0;
    letter-spacing: 0;
  }
  ${theme.mediaQuery.sm`
  padding-left: 60px;
 `}
`;

export default function StockistSingle({ stockist, numeral }) {
  console.log("stockist: ", stockist);
  return (
    <StockistContainer className="stockist--single">
      <div className="number-name-wrapper">
        <div className="circle">{stockist.acf.map_number}</div>
        <p>{stockist.acf.stockist_name}</p>
      </div>
      <div className="stockist-info">
        <p>{stockist.acf.stockist_address}</p>
        <p>{stockist.acf.stockist_phone_number}</p>
        <a
          target="_blank"
          rel="noreferrer"
          href={`https://www.${stockist.acf.stockist_website}`}
        >
          <h5 className="website">Website</h5>
        </a>
      </div>
    </StockistContainer>
  );
}
