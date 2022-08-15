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
} from "../utils/wordpress";
import ContributorCard from "../components/ContributorCard";
import Link from "next/link";

const SearchContainer = styled.div`
  h1 {
    width: 90%;
    margin: 0 auto;
  }
  h2 {
    color: black;
    font-family: ${theme.type.medium};
    font-size: 2.4rem;
    margin: 0px 72px;
  }

  .search-result--title {
    // margin: 0px 72px 40px 72px;
    font-size: 3.6rem;
  }

  .search-result--content {
    width: 90%;
    margin: 20px 72px;
    ${theme.mediaQuery.md`
    width: 40%;
    `}
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

          {filteredEvents.map((post) => (
            <React.Fragment key={uuidv4()}>
              <EventCard event={post} />
            </React.Fragment>
          ))}
        </div>
        <div>
          {filteredGeneralPages.map((post) => (
            <React.Fragment key={uuidv4()}>
              <div className="search-result--content">
              <Link href={"/[slug]"} as={`/${post.slug}`}>
                <a>
                <h3 className="search-result--title">{post.title.rendered}</h3>

                {post.content.rendered &&
						post.content.rendered.length > 100 ? (
							<>
								<p dangerouslySetInnerHTML={{ __html: post.content.rendered }}>
									{post.content.rendered.replace(
										/^(.{175}[^\s]*).*/,
										'$1',
									)}
									..
								</p>
							</>
						) : (
							<p dangerouslySetInnerHTML={{ __html: post.content.rendered }}></p>
						)}

                

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

  return {
    props: {
      posts,
      events,
      generalPages,
      contributors,
      team,
    },
    revalidate: 10, // In seconds
  };
}
