import React from "react";
import Link from "next/link";
import PageWrapper from "/components/Global/PageWrapper";
import styled from "styled-components";
import theme from "/components/Global/Theme";
import { getContributors } from "../utils/wordpress";

export default function AsparagusManifesto({ contributors }) {
  return (
    <PageWrapper pageTitle="Asparagus Manifesto" className="">
      <h1>Gus Manifesto</h1>
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
