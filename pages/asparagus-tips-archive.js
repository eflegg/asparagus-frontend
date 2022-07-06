import React from "react";
import Link from "next/link";
import { getTips } from "../utils/wordpress";
import PageWrapper from "../components/Global/PageWrapper";
import styled from "styled-components";
import theme from "../components/Global/Theme";

export default function Tips({ tips }) {
  //use state to set the index of the selected
  //tips date, rendered the data from that position

  console.log("tips: ", tips);
  return (
    <PageWrapper className="">
      <h1>Asparagus Tips</h1>
      <ul>
        {tips.map((tip, index) => {
          return <li key={index}>I am a newsletter {tip.title.rendered}</li>;
        })}
      </ul>
    </PageWrapper>
  );
}

export async function getStaticProps({ params }) {
  const tips = await getTips();

  return {
    props: {
      tips,
    },
    revalidate: 10, // In seconds
  };
}
