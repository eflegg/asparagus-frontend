import React, { useState } from "react";
import { withRouter } from "next/router";
import fetch from "isomorphic-fetch";
import { Config } from "../config";
import Image from "next/image";
import styled from "styled-components";
import theme from "../components/Global/Theme";
import PageWrapper from "../components/Global/PageWrapper";
import ArticleCard from "../components/ArticleCard";
import EventCard from "../components/EventCard";
import { v4 as uuidv4 } from "uuid";
import {
  getEvents,
  getArticles,
  getContributors,
  getTeam,
  getGeneralPages,
} from "../utils/wordpress";

const SearchContainer = styled.div`
  h1 {
    width: 90%;
    margin: 0 auto;
  }
  h2 {
    color: ${theme.colours.gusGreen};
  }
`;

function SearchResults(props) {
  console.log("events: ", props.events);
  console.log("query: ", props.router.query.name);
  const query = props.router.query.name;
  console.log(query);

  //Events
  const filterEvents = (posts, query) => {
    if (!query) {
      return posts;
    }
    return posts.filter((post) => {
      const eventDescrip = post.acf.description;
      return eventDescrip.includes(query);
    });
  };

  //Articles
  const filterArticles = (posts, query) => {
    if (!query) {
      return posts;
    }
    return posts.filter((post) => {
      const postContent = post.content.rendered.toLowerCase();
      return postContent.includes(query);
    });
  };

  //General pages
  const filterGeneralPages = (posts, query) => {
    if (!query) {
      return posts;
    }
    return posts.filter((post) => {
      const postContent = post.content.rendered.toLowerCase();
      return postContent.includes(query);
    });
  };
  const filteredEvents = filterEvents(props.events, props.router.query.name);
  const filteredContent = filterArticles(props.posts, props.router.query.name);
  const filteredGeneralPages = filterEvents(
    props.generalPages,
    props.router.query.name
  );

  return (
    <PageWrapper>
      <SearchContainer>
        <h1 className="h5">Search Results</h1>
        <hr />
        <h2>Search results for: {props.router.query.name}</h2>

        <div className="card--grid single-page">
          {filteredContent.map((post) => (
            <React.Fragment key={uuidv4()}>
              <ArticleCard post={post} />
            </React.Fragment>
          ))}

          {filteredGeneralPages.map((post) => (
            <React.Fragment key={uuidv4()}>
              <div className="">
                <h3>{post.title.rendered}</h3>
              </div>
            </React.Fragment>
          ))}
        </div>
        <div>
          {filteredEvents.map((post) => (
            <React.Fragment key={uuidv4()}>
              <EventCard event={post} />
            </React.Fragment>
          ))}
        </div>
      </SearchContainer>
    </PageWrapper>
  );
}

export default withRouter(SearchResults);

export async function getStaticProps({ params }) {
  const posts = await getArticles();
  const events = await getEvents();
  const generalPages = await getGeneralPages();

  return {
    props: {
      posts,
      events,
      generalPages,
    },
    revalidate: 10, // In seconds
  };
}
