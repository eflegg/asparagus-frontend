import React from "react";
import Link from "next/link";
import styled from "styled-components";
import theme from "../components/Global/Theme";

export default function StockistSingle({ stockist, numeral }) {
  console.log("numeral: ", numeral);
  return (
    <div className="stockist--single">
      <div className="number-name-wrapper">
        <div className="circle">{numeral}</div>
        <p>{stockist.acf.stockist_name}</p>
      </div>
      <div className="stockist-info">
        <p>{stockist.acf.stockist_address}</p>
        <p>{stockist.acf.stockist_phone_number}</p>
        <a
          target="_blank"
          rel="noreferrer"
          href={`https://${stockist.acf.stockist_website}`}
        >
          <h5 className="website">{stockist.acf.stockist_website}</h5>
        </a>
      </div>
    </div>
  );
}
