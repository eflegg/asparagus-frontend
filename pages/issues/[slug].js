import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getSlugs, getIssue, getArticles, getIssues } from "../../utils/wordpress";
import PageWrapper from "../../components/Global/PageWrapper";
import ArticleCard from "../../components/ArticleCard";
import styled from "styled-components";
import theme from "../../components/Global/Theme";
import { v4 as uuidv4 } from "uuid";

const CoverContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  div {
    margin: 0 24px 30px;
  }
  .cover-image {
    display: block;
    width: 277px;
  }
  h3 {
    color: ${theme.colours.soil};
    font-size: 1.6rem;
    ${theme.mediaQuery.md`
    font-size: 3.2rem;
    `}
  }
  p {
    font-style: italic;
    font-size: 1.4rem;
    margin-top: 30px;
    ${theme.mediaQuery.md`
    font-size: 2.4rem;
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
        width: 76%;
        transition: all 0.25s ease-out;
    }
  }
}
`;


export default function Issue({ issue, articles }) {
  const currentIssue = issue.ID;
  return (
    <PageWrapper
      canonicalUrl={`https://asparagusmagazine.com/${issue.slug}`}
      ogImageUrl={issue.yoast_head_json.og_image}
      ogType={issue.yoast_head_json.og_type}
      ogTwitterImage={issue.yoast_head_json.twitter_card}
      SEOtitle="Current Issue"
      className=""
    >
      <h1 className="text-center">{issue.title.rendered}</h1>
      <Issues>
      <hr/>
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
          <Image
            src={issue._embedded["wp:featuredmedia"]["0"].source_url}
            layout="responsive"
            width="200px"
            height="250px"
            alt={issue._embedded["wp:featuredmedia"]["0"].alt_text}
          />
        </div>
        <div className="coverlines">
          <h3>From This Issue:</h3>
          <p>{issue.acf.primary_cover_line}</p>
          <p>{issue.acf.secondary_cover_line}</p>
          <button className="btn--primary">Buy Now</button>
        </div>
      </CoverContainer>
      <ul className="card--grid single-page">
        {articles.map((article, index) => {
          const appearsIn = article.acf.appears_in;

          return (
            <React.Fragment key={uuidv4()}>
              {appearsIn && currentIssue == appearsIn[0].ID ? (
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
  const articles = await getArticles();

  return {
    props: {
      issue,
      articles,
    },
    revalidate: 10, // In seconds
  };
}
