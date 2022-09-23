import React from "react";
import Link from "next/link";
import { getContributors, getCategories } from "../utils/wordpress";
import PageWrapper from "../components/Global/PageWrapper";
import styled from "styled-components";
import theme from "../components/Global/Theme";
import ContributorCard from "../components/ContributorCard";
import { Config } from "../config";
import fetch from "isomorphic-fetch";

const ContribContainer = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(40rem, 100%), 1fr));
  grid-row-gap: 50px;
  ${theme.mediaQuery.sm`
   grid-row-gap: 50px;
  `}
  grid-column-gap: 80px;
  justify-content: center;
  width: 90%;
  margin: 0 auto;
  list-style: none;
  max-width: 1200px;
  margin-bottom: 100px;
`;

export default function ContributorsPage({ contributors, categories }) {
  return (
    <PageWrapper
      canonicalUrl={`https://asparagusmagazine.com/contributors`}
      ogImageUrl="triplestalk.svg"
      ogTwitterImage="triplestalk.svg"
      SEOtitle="Contributors"
      metadescription="Meet the Asparagus contributors telling large and small stories of sustainable living"
    >
      <h1 className="text-center">Contributors</h1>
      <hr />
      <ContribContainer>
        {contributors.map((contributor, index) => {
          return (
            <ContributorCard
              contributor={contributor}
              image={contributor.acf.headshot.url}
              key={index}
              slug={contributor.slug}
              name={contributor.title.rendered}
              bio={contributor.acf.bio}
              social={contributor.acf.social_media_handle}
              socialLink={contributor.acf.social_media_link}
            />
          );
        })}
      </ContribContainer>
    </PageWrapper>
  );
}

export async function getStaticProps({ params }) {
  // const contributors = await getContributors();
  const categories = await getCategories();

  const contributorPosts = await fetch(
    `${Config.apiUrl}/wp-json/wp/v2/contributors?_embed&per_page=200`
  );

  const contributors = await contributorPosts.json();

  return {
    props: {
      contributors,
      categories,
    },
    revalidate: 10, // In seconds
  };
}
