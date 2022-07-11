import React from "react";
import Link from "next/link";
import { getContributors } from "../utils/wordpress";
import PageWrapper from "../components/Global/PageWrapper";
import styled from "styled-components";
import theme from "../components/Global/Theme";

export default function Contributors({ contributors }) {
  console.log("contributors: ", contributors);
  return (
    <PageWrapper className="">
      <h1>List of Contributors</h1>
      <ul>
        {contributors.map((contributor, index) => {
          return (
            <Link
              key={index}
              href={"/contributors/[slug]"}
              as={`/contributors/${contributor.slug}`}
            >
              <a>
                <li>{contributor.title.rendered}</li>
              </a>
            </Link>
          );
        })}
      </ul>
    </PageWrapper>
  );
}

export async function getStaticProps({ params }) {
  const contributors = await getContributors();

  return {
    props: {
      contributors,
    },
    revalidate: 10, // In seconds
  };
}
