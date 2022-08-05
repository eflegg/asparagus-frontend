import React from "react";
import { Config } from "../config";
import fetch from "isomorphic-fetch";
import { getStockists } from "../utils/wordpress";
import PageWrapper from "../components/Global/PageWrapper";
import styled from "styled-components";
import theme from "../components/Global/Theme";
import StockistSingle from "../components/StockistSingle";
import { v4 as uuidv4 } from "uuid";

const StockistBlock = styled.div`
  // border: solid pink;
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
    // border: solid teal;
    display: flex;
    flex-direction: row;
    align-items: baseline;
    p {
      margin-left: 10px;
    }
  }
  .province-wrapper {
    // border: solid green;
    width: 100%;
    positon: relative;
    left: -38px;
  }
  .stockist-info {
    position: relative;
    left: 40px;
  }
`;
const Map = styled.div`
  iframe {
    border: 0px;
    margin: 45px 0;
    width: 100%;
  }
  .stockist-map {
    width: 90%;
    margin: 0 auto;
  }
`;

const provinces = ["British Columbia", "Alberta", "Saskatchewan"];

export default function Stockists({ stockists, page }) {
  console.log("stockists: ", stockists);
  console.log("page: ", page);
  return (
    <PageWrapper
      SEOtitle="Stockists"
      metadescription="Find Asparagus Magazine in print at one of these fine retailers!"
    >
      <h1 className="text-center">Stockists</h1>
      <hr />
      <p className="text-center">
        Pick up the latest issue of <em>Asparagus Magazine</em> at any one of
        these fine establishments!
      </p>
      <Map>
        <div className="stockist-map">
          <iframe
            src={page.acf.stockist_map}
            width="100%"
            height="480"
          ></iframe>
        </div>
      </Map>
      <StockistBlock>
        {provinces.map((province, index) => {
          const newStockists = stockists.filter(
            (stockist) => stockist.acf.province === province
          );
          return (
            <React.Fragment key={uuidv4()}>
              <div className="province-wrapper">
                <h5 className="province">{province}</h5>
              </div>
              <ul>
                {newStockists.map((stockist, stockistIndex) => {
                  return (
                    <React.Fragment key={uuidv4()}>
                      {stockist.acf.province == province ? (
                        <StockistSingle
                          stockist={stockist}
                          numeral={stockistIndex + 1}
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
  const pageQuery = await fetch(`${Config.apiUrl}/wp-json/wp/v2/pages/69`);
  const page = await pageQuery.json();

  return {
    props: {
      stockists,
      page,
    },
    revalidate: 10, // In seconds
  };
}
