import React from "react";
import Link from "next/link";
import { getStockists } from "../utils/wordpress";
import PageWrapper from "../components/Global/PageWrapper";
import styled from "styled-components";
import theme from "../components/Global/Theme";
import StockistSingle from "../components/StockistSingle";
import { v4 as uuidv4 } from "uuid";

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
  iframe {
    border: 0px;
    margin: 45px 0;
  }
`;

const provinces = ["British Columbia", "Alberta", "Saskatchewan"];

export default function Stockists({ stockists }) {
  console.log("stockists: ", stockists);
  return (
    <PageWrapper className="">
      <h1 className="text-center">Stockists</h1>
      <hr />
      <p className="text-center">
        Pick up the latest issue of Asparagus Magazine at any one of these fine
        establishments!
      </p>
      <StockistBlock>
        <div className="stockist-map">
          <iframe
            src="https://www.google.com/maps/d/u/1/embed?mid=1blqMUcfw2nIdUyHBsWc9diqt3sNqbVKI&ehbc=2E312F"
            width="100%"
            height="480"
          ></iframe>
        </div>
        {provinces.map((province, index) => {
          return (
            <React.Fragment key={uuidv4()}>
              <div className="province-wrapper">
                <h5 className="province">{province}</h5>
              </div>
              <ul>
                {stockists.map((stockist, stockistIndex) => {
                  return (
                    <React.Fragment key={uuidv4()}>
                      {stockist.acf.province == province ? (
                        <StockistSingle
                          stockist={stockist}
                          numeral={index + 1}
                        />
                      ) : null}
                    </React.Fragment>
                  );
                })}
              </ul>
            </React.Fragment>
          );
        })}
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
