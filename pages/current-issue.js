import React from "react";
import Link from "next/link";
import Image from "next/image";
import { getIssues, getArticles } from "../utils/wordpress";
import PageWrapper from "../components/Global/PageWrapper";
import ArticleCard from "../components/ArticleCard";
import styled from "styled-components";
import theme from "../components/Global/Theme";
import { v4 as uuidv4 } from "uuid";

const CoverContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  div {
    margin: 0 10px 20px;
  }
  h3 {
    color: ${theme.colours.soil};
    font-size: 1.6rem;
    ${theme.mediaQuery.md`
    font-size: 3.2rem;
    `}
  }
  .cover-image {
    display: block;
    width: 277px;
  }
  p {
    font-style: italic;
    font-size: 1.4rem;
    margin-top: 10px;
    ${theme.mediaQuery.md`
    font-size: 2.4rem;
    margin-top: 30px;
    `}
  }
  a {
    text-align: center;
  }
`;

const Issues = styled.div`
  .button-container {
    display: flex;
    justify-content: center;
    margin-bottom: 60px;
  }
  .btn--secondary {
    position: relative;
    font-size: 1.6rem;
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
        width: 76%;
        transition: all 0.25s ease-out;
      }
    }
  }
  hr {
    margin-bottom: 30px;
  }
`;

export default function CurrentIssue({ issues, articles }) {
  const currentIssue = issues[0];
  // console.log("current issue: ", currentIssue.id);
  // console.log("articles: ", articles);
  return (
    <PageWrapper
      canonicalUrl={`https://asparagusmagazine.com/${currentIssue.slug}`}
      ogImageUrl="triplestalk.svg"
      ogTwitterImage="triplestalk.svg"
      SEOtitle="Current Issue"
      metadescription="All the sustainble stories from Asparagus Magazine's most recent issue"
    >
      <Issues>
        <h1 className="text-center">{issues[0].title.rendered}</h1>
        <hr />
        <div className="button-container">
          <Link href={"/past-issues"}>
            <a>
              <button className="btn--secondary">Go to Past Issues</button>
            </a>
          </Link>
        </div>
      </Issues>
      <CoverContainer className="current-issue--cover">
        <div className="cover-image">
          {issues[0]._embedded != undefined ? (
            <Image
              src={issues[0]._embedded["wp:featuredmedia"]["0"].source_url}
              layout="responsive"
              width="200px"
              height="250px"
              alt={issues[0]._embedded["wp:featuredmedia"]["0"].alt_text}
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
          <p>{issues[0].acf.primary_cover_line}</p>
          <p>{issues[0].acf.secondary_cover_line}</p>
          <a
            href="https://shop.asparagusmagazine.com/current-issue/"
            rel="noreferrer"
            target="_blank"
          >
            <button className="btn--primary">Buy Now</button>
          </a>
        </div>
      </CoverContainer>
      <ul className="card--grid single-page">
        {articles.map((article, index) => {
          const appearsIn = article.acf.appears_in;
          const printIssue = article.acf.print_issue;

          return (
            <React.Fragment key={uuidv4()}>
              {appearsIn &&
              printIssue === "Yes" &&
              appearsIn &&
              appearsIn[0] &&
              appearsIn[0].ID == currentIssue.id ? (
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

export async function getStaticProps({ params }) {
  const issues = await getIssues();
  const articles = await getArticles();

  //could query for only articles in category magazine, and tell staff they have to add category magazine to all print stories

  return {
    props: {
      issues,
      articles,
    },
    revalidate: 600, // In seconds
  };
}
