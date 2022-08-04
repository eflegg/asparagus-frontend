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

export default function Awards({ posts }) {
  return (
    <PageWrapper pageTitle="Awards" className="container pt-5">
      <h3>Award Winners</h3>
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
      <h3>Award Nominees</h3>
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

      <Link href="/">
        <a className="btn btn-primary">Back to Home</a>
      </Link>
    </PageWrapper>
  );
}

//access the router, get the id, and get the medatada for that post

export async function getStaticProps({ params }) {
  const awardPosts = await fetch(
    // `${Config.apiUrl}/wp-json/wp/v2/articles?writer=${contributor.id}`
    // @erin this should work, come back to it
    `${Config.apiUrl}/wp-json/wp/v2/articles?_embed`
  );

  const posts = await awardPosts.json();

  return {
    props: {
      posts,
    },
    revalidate: 10, // In seconds
  };
}
