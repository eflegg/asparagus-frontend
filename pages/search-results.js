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
  getTeamMembers,
  getGeneralPages,
  getTips,
} from "../utils/wordpress";
import ContributorCard from "../components/ContributorCard";
import Link from "next/link";

const SearchContainer = styled.div`
  h1 {
    width: 90%;
    margin: 50px 0 20px 36px;
  }
  h2 {
    color: black;
    font-family: ${theme.type.medium};
    font-size: 1.7rem;
    margin: 0px 20px;
    ${theme.mediaQuery.md`
    font-size: 2.4rem;
    margin: 0px 72px;
    `}
  }

  .search-result--title {
    // margin: 0px 72px 40px 72px;
    font-size: 1.8rem;
    ${theme.mediaQuery.md`
    font-size: 3.6rem;
    `}
  }

  .search-result--content {
    width: 90%;
    margin: 60px auto;
    ${theme.mediaQuery.md`
    width: 40%;
    `}
  }
`;

function SearchResults(props) {
  const query = props.router.query.name;
  console.log(query);

  //Events
  const filterEvents = (posts, query) => {
    if (!query) {
      return posts;
    }
    return posts.filter((post) => {
      const eventDescrip = post.acf.description;
      console.log("event description: ", eventDescrip);
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
  //Contributors
  const filterContributors = (posts, query) => {
    if (!query) {
      return posts;
    }
    return posts.filter((post) => {
      const postContent = post.acf.bio.toLowerCase();
      return postContent.includes(query);
    });
  };
  //Team
  const filterTeam = (posts, query) => {
    if (!query) {
      return posts;
    }
    return posts.filter((post) => {
      const postContent = post.acf.bio.toLowerCase();
      return postContent.includes(query);
    });
  };

  //Asparagus Tips
  const filterTips = (posts, query) => {
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
  const filteredGeneralPages = filterGeneralPages(
    props.generalPages,
    props.router.query.name
  );
  const filteredContributors = filterContributors(
    props.contributors,
    props.router.query.name
  );
  const filteredTeam = filterTeam(props.team, props.router.query.name);
  const filteredTips = filterTips(props.tips, props.router.query.name);

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
        </div>
        {filteredEvents.map((post) => (
          <React.Fragment key={uuidv4()}>
            <Link href={"/pages/[events]"} as={`/pages/${post.events}`}>
              <a>
                <EventCard event={post} />
              </a>
            </Link>
          </React.Fragment>
        ))}

        <div>
          {filteredGeneralPages.map((post) => (
            <React.Fragment key={uuidv4()}>
              <div className="search-result--content">
                <Link href={"/[slug]"} as={`/${post.slug}`}>
                  <a>
                    <h3 className="search-result--title">
                      {post.title.rendered}
                    </h3>
                    <p>{post.yoast_head_json.description}</p>
                  </a>
                </Link>
              </div>
            </React.Fragment>
          ))}

          {filteredTips.map((post) => (
            <React.Fragment key={uuidv4()}>
              <div className="search-result--content">
                <Link href={"/asparagus-tips-archive"}>
                  <a>
                    <h3 className="search-result--title">
                      {post.title.rendered}
                    </h3>
                    <p>{post.yoast_head_json.description}</p>
                    {/* check to make sure the excerpt exists */}
                  </a>
                </Link>
              </div>
            </React.Fragment>
          ))}

          {filteredContributors.map((post) => (
            <React.Fragment key={uuidv4()}>
              <ContributorCard contributor={post} />
            </React.Fragment>
          ))}
          {filteredTeam.map((post) => (
            <React.Fragment key={uuidv4()}>
              <ContributorCard contributor={post} />
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
  const contributors = await getContributors();
  const team = await getTeamMembers();
  const tips = await getTips();

  return {
    props: {
      posts,
      events,
      generalPages,
      contributors,
      team,
      tips,
    },
    revalidate: 1200, // In seconds
  };
}
