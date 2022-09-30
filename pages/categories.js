import React from "react";
import { Config } from "../config";
import fetch from "isomorphic-fetch";
import Link from "next/link";
import PageWrapper from "../components/Global/PageWrapper";
import { getCategories } from "../utils/wordpress";
import { v4 as uuidv4 } from "uuid";

export default function AllCategories({ categories }) {
  // console.log("categories: ", categories);
  return (
    <PageWrapper>
      <div className="">
        <h1>List of categories</h1>
        <ul>
          {categories.map((category, index) => {
            return (
              <React.Fragment key={uuidv4()}>
                <Link
                  href={"/categories/[slug]"}
                  as={`/categories/${category.slug}`}
                >
                  <a>
                    <li>{category.name}</li>
                  </a>
                </Link>
              </React.Fragment>
            );
          })}
        </ul>
        <Link href="/">
          <a className="btn btn-primary">Back to Home</a>
        </Link>
      </div>
    </PageWrapper>
  );
}

export async function getStaticProps({ params }) {
  const categories = await getCategories();
  return {
    props: {
      categories,
    },
    revalidate: 10,
  };
}
