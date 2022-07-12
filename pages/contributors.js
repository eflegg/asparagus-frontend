import React from "react";
import Link from "next/link";
import { getContributors } from "../utils/wordpress";
import PageWrapper from "../components/Global/PageWrapper";
import styled from "styled-components";
import theme from "../components/Global/Theme";
import ContributorCard from "../components/ContributorCard";

const ContribContainer = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(40rem, 100%), 1fr));
  grid-row-gap: 100px;
  grid-column-gap: 80px;
  justify-content: center;
  width: 90%;
  margin: 0 auto;
  list-style: none;
`;

export default function Contributors({ contributors }) {
  console.log("contributors: ", contributors);
  const ref = React.forwardRef();
  return (
    <PageWrapper className="">
      <h1>List of Contributors</h1>
      <ContribContainer>
        {contributors.map((contributor, index) => {
          return (
            <ContributorCard
              image={contributor._embedded["wp:featuredmedia"]["0"].source_url}
              key={index}
              slug={contributor.slug}
              name={contributor.title.rendered}
              bio={contributor.acf.bio}
              ref={ref}
            />
          );
        })}
      </ContribContainer>
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
