import React, { useState } from "react";
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
    margin: 0 24px 30px;
  }
  .cover-image {
    display: block;
    width: 277px;
  }
`;

export default function CurrentIssue({ issues, articles }) {
  return (
    <PageWrapper
      SEOtitle="Current Issue"
      metadescription="All the sustainble stories from Asparagus Magazine's most recent issue"
    >
      <CoverContainer className="current-issue--cover">
        <div className="cover-image">
          <Image
            src={issues[0]._embedded["wp:featuredmedia"]["0"].source_url}
            layout="responsive"
            width="200px"
            height="250px"
            alt="Cover photo"
          />
        </div>
        <div className="coverlines">
          <h3>From This Issue:</h3>
          <p>{issues[0].acf.primary_cover_line}</p>
          <p>{issues[0].acf.secondary_cover_line}</p>
        </div>
      </CoverContainer>
      <ul className="card--grid">
        {articles.map((article, index) => {
          const appearsIn = article.acf.appears_in;

          return (
            <React.Fragment key={uuidv4()}>
              {currentIssue == appearsIn ? (
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

  return {
    props: {
      issues,
      articles,
    },
    revalidate: 10, // In seconds
  };
}
