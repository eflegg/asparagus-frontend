import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Config } from "../config";
import fetch from "isomorphic-fetch";
import styled from "styled-components";
import theme from "../components/Global/Theme";
import AwardWinnerCard from "../components/AwardWinnerCard";
import PageWrapper from "../components/Global/PageWrapper";
import { v4 as uuidv4 } from "uuid";

const AwardContainer = styled.section`
  margin-bottom: 50px;
  h5 {
    margin: 0 72px 30px 72px;
    /* width: 90%; */
    // margin: 0 auto;
  }
  hr {
    margin-bottom: 30px;
  }
`;

export default function Awards({ posts }) {
  console.log("awards page posts: ", posts);
  const fallbackImage =
    "https://www.asparagusmagazine.com/Asparagus_Tip_Logo.svg";

  return (
    <PageWrapper
      canonicalUrl={`https://asparagusmagazine.com/awards`}
      ogImageUrl={
        posts[0]._embedded["wp:featuredmedia"]
          ? posts[0]._embedded["wp:featuredmedia"]["0"].source_url
          : fallbackImage
      }
      ogTwitterImage={
        posts[0]._embedded["wp:featuredmedia"]
          ? posts[0]._embedded["wp:featuredmedia"]["0"].source_url
          : fallbackImage
      }
      SEOtitle="Awards"
      metadescription="A showcase of all our award-winning and nominated Asparagus Magazine stories"
    >
      <h1 className="text-center">Awards</h1>
      <AwardContainer>
        <hr />
        <h5>Award Winners</h5>
        <ul>
          {posts.map((post, index) => {
            return (
              <React.Fragment key={uuidv4()}>
                {post.acf.award_winner == "Yes" ? (
                  <AwardWinnerCard post={post} />
                ) : null}
              </React.Fragment>
            );
          })}
        </ul>
      </AwardContainer>
      <AwardContainer>
        <h5>Award Nominees</h5>
        <ul>
          {posts.map((post, index) => {
            return (
              <React.Fragment key={uuidv4()}>
                {post.acf.award_nominee == "Yes" ? (
                  <AwardWinnerCard post={post} />
                ) : null}
              </React.Fragment>
            );
          })}
        </ul>
      </AwardContainer>
    </PageWrapper>
  );
}

//access the router, get the id, and get the medatada for that post

export async function getStaticProps({ params }) {
  const awardPosts = await fetch(
    // `${Config.apiUrl}/wp-json/wp/v2/articles?writer=${contributor.id}`
    // @erin this should work, come back to it
    `${Config.apiUrl}/wp-json/wp/v2/articles?_embed&categories=18&per_page=100`
  );

  const posts = await awardPosts.json();

  return {
    props: {
      posts,
    },
    //revalidate: 1200, // In seconds
  };
}
