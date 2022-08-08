import React, { useState } from "react";
import { withRouter } from "next/router";
import fetch from "isomorphic-fetch";
import { Config } from "../config";
import Image from "next/image";
import styled from "styled-components";
import theme from "../components/Global/Theme";
import PageWrapper from "../components/Global/PageWrapper";
import ArticleCard from "../components/ArticleCard";
import { v4 as uuidv4 } from "uuid";

function SearchResults(props) {
  console.log("posts: ", props.posts);
  console.log("query: ", props.router.query.name);
  const query = props.router.query.name;
  console.log(query);

  const filterPosts = (posts, query) => {
    if (!query) {
      return posts;
    }

    return posts.filter((post) => {
      const postName = post.title.rendered.toLowerCase();
      return postName.includes(query);
    });
  };

  const filterContent = (posts, query) => {
    if (!query) {
      return posts;
    }

    return posts.filter((post) => {
      const postContent = post.content.rendered.toLowerCase();
      return postContent.includes(query);
    });
  };

  const filteredContent = filterPosts(props.posts, props.router.query.name);
  const filteredPosts = filterPosts(props.posts, props.router.query.name);

  return (
    <PageWrapper>
      <div>
        <h1>here are your search results for {props.router.query.name}</h1>

        <div className="card--grid single-page">
          {filteredPosts.map((post) => (
            <React.Fragment key={uuidv4()}>
              <ArticleCard post={post} />
            </React.Fragment>
          ))}
          {filteredContent.map((post) => (
            <React.Fragment key={uuidv4()}>
              <ArticleCard post={post} />
            </React.Fragment>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}

export default withRouter(SearchResults);

export async function getStaticProps({ params }) {
  const postsQuery = await fetch(
    `${Config.apiUrl}/wp-json/wp/v2/articles?_embed`
  );
  const posts = await postsQuery.json();

  return {
    props: {
      posts,
    },
    revalidate: 10, // In seconds
  };
}
