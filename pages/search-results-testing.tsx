import React, { useState, useEffect } from "react";
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



const ResultCard = styled.div``;

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
    @media ${theme.devices.md} {
      font-size: 2.4rem;
      margin: 0px 72px;
    }
  }

  .search-result--title {
    // margin: 0px 72px 40px 72px;
    font-size: 1.8rem;
    @media ${theme.devices.md} {
      font-size: 3.6rem;
    }
  }

  .search-result--content {
    width: 90%;
    margin: 60px auto;
    @media ${theme.devices.md} {
      width: 40%;
    }
  }
`;

function SearchResults(props) {
  // @erin this will be for later with custom post object endpoint
  const [results, setResults] = useState([]);
  useEffect(() => {
    console.log("api call query: ", props.router.query.name);
    async function loadLinks() {
      const response = await fetch(
        `${Config.apiUrl}/wp-json/wp/v2/search/?search=${props.router.query.name}&_embed&per_page=100`
       
      );

      if (!response.ok) {
        // oops! something went wrong
        return;
      }

      const links = await response.json();
      setResults(links);
      console.log("results: ", results);
    }

    loadLinks();

  }, [props.router.query.name]);

  const query = props.router.query.name;

  console.log("query: ", query);

  //Events
  const filterEvents = (posts, query) => {
    if (!query) {
      return posts;
    }
    return posts.filter((post) => {
      const eventDescrip = post.acf.description
        .toLowerCase()
        .replace(/[^a-zA-Z0-9 ]/g, "");

      return eventDescrip.includes(
        query.toLowerCase().replace(/[^a-zA-Z0-9 ]/g, "")
      );
    });
  };

  //Articles
  const filterArticles = (posts, query) => {
    if (!query) {
      return posts.slice(0,3);
    }
    return posts.filter((post) => {
      const postTitle = post.title.rendered
        .toLowerCase()
        .replace(/[^a-zA-Z0-9 ]/g, "");
      const postContent = post.content.rendered
        .toLowerCase()
        .replace(/[^a-zA-Z0-9 ]/g, "");
      const postDek = post.acf.dek.toLowerCase().replace(/[^a-zA-Z0-9 ]/g, "");
      if (
        postContent.includes(query.toLowerCase().replace(/[^a-zA-Z0-9 ]/g, ""))
      ) {
        return postContent.includes(
          query.toLowerCase().replace(/[^a-zA-Z0-9 ]/g, "")
        );
      } else if (
        postTitle.includes(query.toLowerCase().replace(/[^a-zA-Z0-9 ]/g, ""))
      ) {
        return postTitle.includes(
          query.toLowerCase().replace(/[^a-zA-Z0-9 ]/g, "")
        );
      } else if (
        postDek.includes(query.toLowerCase().replace(/[^a-zA-Z0-9 ]/g, ""))
      ) {
        return postDek.includes(
          query.toLowerCase().replace(/[^a-zA-Z0-9 ]/g, "")
        );
      }
    });
  };

  //General pages
  const filterGeneralPages = (posts, query) => {
    if (!query) {
      return posts;
    }
    return posts.filter((post) => {
      const postContent = post.content.rendered
        .toLowerCase()
        .replace(/[^a-zA-Z0-9 ]/g, "");
      return postContent.includes(
        query.toLowerCase().replace(/[^a-zA-Z0-9 ]/g, "")
      );
    });
  };
  //Contributors
  const filterContributors = (posts, query) => {
    if (!query) {
      return posts;
    }
    return posts.filter((post) => {
      const postContent = post.acf.bio
        .toLowerCase()
        .replace(/[^a-zA-Z0-9 ]/g, "");
      return postContent.includes(
        query.toLowerCase().replace(/[^a-zA-Z0-9 ]/g, "")
      );
    });
  };
  //Team
  const filterTeam = (posts, query) => {
    if (!query) {
      return posts;
    }
    return posts.filter((post) => {
      const postContent = post.acf.bio
        .toLowerCase()
        .replace(/[^a-zA-Z0-9 ]/g, "");
      return postContent.includes(
        query.toLowerCase().replace(/[^a-zA-Z0-9 ]/g, "")
      );
    });
  };

  //Asparagus Tips
  const filterTips = (posts, query) => {
    if (!query) {
      return posts;
    }
    return posts.filter((post) => {
      const postContent = post.content.rendered
        .toLowerCase()
        .replace(/[^a-zA-Z0-9 ]/g, "");
      return postContent.includes(
        query.toLowerCase().replace(/[^a-zA-Z0-9 ]/g, "")
      );
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

  const fallbackImage =
    "https://www.asparagusmagazine.com/Asparagus_Tip_Logo.svg";

  return (
    <PageWrapper
      SEOtitle={`Search Results`}
      metadescription={`Can't find what you're looking for? Try a search!`}
      ogImageUrl={fallbackImage}
      ogTwitterImage={fallbackImage}
    >
      <SearchContainer>
        <h1 className="h5">Search Results</h1>
        <hr />
        <h2>Search results for: {props.router.query.name}</h2>

        <div className="card--grid single-page">
          <h2>{results.length}</h2>
           {results.map((post) => (
            (post.subtype === "articles" ? (
              
           
                <div className="card--inner">
                  <div>
                    <Link href={"/articles/[slug]"} as={`/articles/${post.slug}`}>
                      <a
                        aria-label={`Read the rest of the article ${post.title} `}
                      >
                        
                      </a>
                    </Link>
                    
                    <Link href={"/articles/[slug]"} as={`/articles/${post.slug}`}>
                      <a>
                        <h3
                          className="head--article-card"
                          dangerouslySetInnerHTML={{ __html: post.title }}
                        ></h3>
                        <hr className="hr--article-card" />
                     
                      </a>
                    </Link>{" "}
                  </div>
                 
                </div>
    
            ): null)
                      
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
    //revalidate: 1200, // In seconds
  };
}
