import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Config } from "../config";
import fetch from "isomorphic-fetch";
import styled from "styled-components";
import theme from "../components/Global/Theme";
import AwardWinnerCard from "../components/AwardWinnerCard";
import PageWrapper from "../components/Global/PageWrapper";

export default function Awards({ posts }) {
  console.log("posts: ", posts);
  console.log("award winner? ", posts[0].acf.award_winner);
  // const ref = React.forwardRef(null);
  return (
    <PageWrapper pageTitle="Awards" className="container pt-5">
      <h3>Award Winners</h3>
      <ul>
        {posts.map((post, index) => {
          return (
            <>
              {post.acf.award_winner == "Yes" ? (
                <AwardWinnerCard
                  // ref={ref}
                  title={post.title.rendered}
                  slug={post.slug}
                />
              ) : null}
            </>
          );
        })}
      </ul>
      <h3>Award Nominees</h3>
      <ul>
        {posts.map((post, index) => {
          return (
            <>
              {post.acf.award_nominee == "Yes" ? (
                <AwardWinnerCard
                  // ref={ref}
                  title={post.title.rendered}
                  slug={post.slug}
                />
              ) : null}
            </>
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
