import React from "react";
import Link from "next/link";
import { getStockists } from "../utils/wordpress";
import PageWrapper from "../components/Global/PageWrapper";
import styled from "styled-components";
import theme from "../components/Global/Theme";

const StockistBlock = styled.div`
border: solid pink;
width: 60%;
max-width: 1000px;
padding-top: 20px;
padding-bottom: 20px;
margin: 10px auto;
h5.website {
  font-size: 1.6rem;

  ${theme.mediaQuery.md`
    font-size: 2rem;
`}

}
h5.province {
  color: ${theme.colours.gusGreen};
}
.circle {
  display: flex;
  align-items: center;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  padding: 10px;
  background: ${theme.colours.soil};
  color: ${theme.colours.darkWheat};
  text-align: center;
  font-size: 2rem;
}
.number-name-wrapper {
  border: solid teal;
  display: flex;
  flex-direction: row;
  align-items: baseline;
p {
  margin-left: 10px;
}
}
.province-wrapper {
  border: solid green;
  width: 100%;
  positon: relative;
  left: -38px;
}
.stockist-info {
  position: relative;
  left: 40px;
}

`;


export default function Stockists({ stockists }) {
  console.log("stockists: ", stockists);
  return (
    <PageWrapper className="">
      <h1 className="text-center">Stockists</h1>
      <hr/>
      <p className="text-center">Pick up the latest issue of Asparagus Magazine at any one of these fine establishments!</p>
      <StockistBlock>
      <ul>
        {stockists.map((stockist, index) => {
          return (
            <div key={index} className="stockist--single">
              <div className="province-wrapper">
                <h5 className="province">{stockist.acf.province}</h5>
              </div>
              <div className="number-name-wrapper">
              <div className="circle">1</div>
              <p>{stockist.acf.stockist_name}</p>
              </div>
              <div className="stockist-info">
              <p>{stockist.acf.stockist_address}</p>
              <p>{stockist.acf.stockist_phone_number}</p>
              <a
                target="_blank"
                rel="noreferrer"
                href={stockist.acf.stockist_website}
              >
                <h5 className="website">{stockist.acf.stockist_website}</h5>
              </a>
              </div>
            </div>
          );
        })}
      </ul>
      </StockistBlock>
    </PageWrapper>
  );
}

export async function getStaticProps({ params }) {
  const stockists = await getStockists();

  return {
    props: {
      stockists,
    },
    revalidate: 10, // In seconds
  };
}
