import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Config } from "../../config";
import fetch from "isomorphic-fetch";
import { getSlugs, getIssue, getArticles } from "../../utils/wordpress";
import PageWrapper from "../../components/Global/PageWrapper";
import ArticleCard from "../../components/ArticleCard";
import styled from "styled-components";
import theme from "../../components/Global/Theme";
import { v4 as uuidv4 } from "uuid";

const CoverContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;
  margin: 0 auto;
  div.coverlines {
    margin-left: 20px;
    max-width: 400px;
  }
  .cover-image {
    display: block;
    width: 277px;
  }
  h3 {
    color: ${theme.colours.soil};
    font-size: 1.6rem;
    font-weight: 700;
    ${theme.mediaQuery.md`
    font-size: 3.2rem;
    `}
  }
  p {
    font-style: italic;
    font-size: 1.4rem;
    margin-top: 10px;
    ${theme.mediaQuery.md`
    font-size: 2.4rem;
    margin-top: 15px;
    `}
  }
  a {
    text-align: center;
  }
`;

const Issues = styled.div`
  hr {
    margin-bottom: 30px;
  }
  .button-container {
    display: flex;
    justify-content: center;
    margin-bottom: 60px;
  }
  .btn--secondary {
    position: relative;
    font-size: 1.4rem;
    ${theme.mediaQuery.md`
  font-size: 2.4rem;
  `}
    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 30px;
      border-bottom: 2px solid ${theme.colours.soil};
      width: 0;
      transition: all 0.25s ease-out;
    }
    &:hover {
      &::after {
        content: "";
        width: 78%;
        transition: all 0.25s ease-out;
      }
    }
  }
`;

export default function Issue({ issue, posts }) {
  const currentIssue = issue.id;

  console.log("issue posts: ", posts);
  console.log("issue: ", issue);

  const fallbackImage =
    "https://www.asparagusmagazine.com/Asparagus_Tip_Logo.svg";

  return (
    <PageWrapper
      canonicalUrl={`https://asparagusmagazine.com/${issue.slug}`}
      ogImageUrl={
        issue._embedded["wp:featuredmedia"]
          ? issue._embedded["wp:featuredmedia"]["0"].source_url
          : fallbackImage
      }
      ogType={issue.yoast_head_json.og_type}
      ogTwitterImage={
        issue._embedded["wp:featuredmedia"]
          ? issue._embedded["wp:featuredmedia"]["0"].source_url
          : fallbackImage
      }
      SEOtitle={issue.title.rendered}
    >
      <h1 className="text-center">{issue.title.rendered}</h1>
      <Issues>
        <hr />
        <div className="button-container">
          <Link href={"/past-issues"}>
            <a>
              <button className="btn--secondary">Back to Past Issues</button>
            </a>
          </Link>
        </div>
      </Issues>
      <CoverContainer className="current-issue--cover">
        <div className="cover-image">
          {issue._embedded != undefined ? (
            <Image
              src={issue._embedded["wp:featuredmedia"]["0"].source_url}
              layout="responsive"
              width="200px"
              height="250px"
              alt={issue._embedded["wp:featuredmedia"]["0"].alt_text}
            />
          ) : (
            <Image
              src="/triplestalk.svg"
              layout="responsive"
              width="200px"
              height="250px"
              alt="Asparagus logo"
            />
          )}
        </div>
        <div className="coverlines">
          <h3>From This Issue:</h3>
          <p>{issue.acf.primary_cover_line}</p>
          <p>{issue.acf.secondary_cover_line}</p>
          <a
            href="https://shop.asparagusmagazine.com/back-issues/"
            rel="noreferrer"
            target="_blank"
          >
            <button className="btn--primary">Buy Now</button>
          </a>
        </div>
      </CoverContainer>
      <ul className="card--grid single-page">
        {posts.map((article, index) => {
          const appearsIn = article.acf.appears_in;
          const printIssue = article.acf.print_issue;
          return (
            <React.Fragment key={uuidv4()}>
              {appearsIn &&
              printIssue === "Yes" &&
              appearsIn &&
              appearsIn[0] &&
              appearsIn[0].ID == currentIssue ? (
                <>
                  <ArticleCard post={article} />
                </>
              ) : null}
            </React.Fragment>
          );
        })}
      </ul>
    </PageWrapper>
  );
}

export async function getStaticPaths() {
  const paths = await getSlugs("issues");

  return {
    paths,
    //this option below renders in the server (at request time) pages that were not rendered at build time
    //e.g when a new blogpost is added to the app
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const issue = await getIssue(params.slug);
  const issuePosts = await fetch(
    `${Config.apiUrl}/wp-json/wp/v2/articles?_embed&categories=10&_embed&per_page=300`
  );

  const posts = await issuePosts.json();
  const notFound = !issue;

  return {
    props: {
      issue,

      posts,
    },
    revalidate: 1200, // In seconds
    notFound,
  };
}
