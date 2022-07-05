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
          {/* <ul>
            {categories.map((category, index) => {
              return (
                <Link
                  key={index}
                  href={"/categories/[slug]"}
                  as={`/categories/${category.slug}`}
                >
                  <a>
                    <li>{category.name}</li>
                  </a>
                </Link>
              );
            })}
          </ul> */}
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
