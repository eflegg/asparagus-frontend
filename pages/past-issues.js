import React, { useState } from "react";
import Link from "next/link";
import { getCategories } from "../utils/wordpress";
import PageWrapper from "../components/Global/PageWrapper";

export default function PastIssues({ categories }) {
  console.log("cats: ", categories);

  return (
    <PageWrapper pageTitle="Events" className="">
      <ul>
        {categories.map((category, index) => {
          return (
            <>
              <p>{category.title}</p>
            </>
          );
        })}
      </ul>
    </PageWrapper>
  );
}

export async function getStaticProps({ params }) {
  const categories = await getCategories();

  return {
    props: {
      categories,
    },
    revalidate: 10, // In seconds
  };
}
