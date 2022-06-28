import React from "react";
import { Config } from "../config";
import fetch from "isomorphic-fetch";
import Link from "next/link";
import PageWrapper from "../components/Global/PageWrapper";

export default function Topics({ posts }) {
  console.log("posts: ", posts);
  return (
    <PageWrapper>
      <div className="">
        <h1>List of Posts</h1>
        <ul>
          {posts.map((post, index) => {
            return (
              <Link
                key={index}
                href={"/posts/[slug]"}
                as={`/posts/${post.slug}`}
              >
                <a>
                  <li>{post.title.rendered}</li>
                </a>
              </Link>
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

export async function getStaticProps() {
  const result = await fetch(`${Config.apiUrl}/wp-json/wp/v2/posts`);
  const posts = await result.json();
  return {
    props: {
      posts: posts,
    },
  };
}
