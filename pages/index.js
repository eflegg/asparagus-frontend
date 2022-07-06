import Image from "next/image";
import { Config } from "../config";
import fetch from "isomorphic-fetch";
import PageWrapper from "../components/Global/PageWrapper";
import Link from "next/link";

export default function Home({ categories }) {
  console.log("categories: ", categories);
  return (
    <>
      {" "}
      <PageWrapper pageTitle="">
        <main>
          <h2>I am the Home Page</h2>
          {/* use a case switch statement to render different category sections
        have option 1, 2, 3 in acf */}
        </main>
      </PageWrapper>
    </>
  );
}

export async function getStaticProps() {
  const result = await fetch(`${Config.apiUrl}/wp-json/wp/v2/categories`);
  const categories = await result.json();
  return {
    props: {
      categories: categories,
    },
  };
}
