import React from "react";
import Link from "next/link";
import { getStockists } from "../utils/wordpress";
import PageWrapper from "../components/Global/PageWrapper";

export default function Stockists({ stockists }) {
  console.log("stockists: ", stockists);
  return (
    <PageWrapper className="">
      <h1>Stockists</h1>
      <ul>
        {stockists.map((stockist, index) => {
          return (
            <div key={index} className="stockist--single">
              <a
                target="_blank"
                rel="noreferrer"
                href={stockist.acf.stockist_website}
              >
                <h3>{stockist.title.rendered}</h3>
              </a>
            </div>
          );
        })}
      </ul>
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
