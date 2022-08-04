import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getSlugs, getIssue, getArticles } from "../../utils/wordpress";
import PageWrapper from "../../components/Global/PageWrapper";
import ArticleCard from "../../components/ArticleCard";
import styled from "styled-components";
import theme from "../../components/Global/Theme";

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

export default function CurrentIssue({ issue, articles }) {
  const currentIssue = issue.ID;
  return (
    <PageWrapper pageTitle="Current Issue" className="">
      <CoverContainer className="current-issue--cover">
        <div className="cover-image">
          <Image
            src={issue._embedded["wp:featuredmedia"]["0"].source_url}
            layout="responsive"
            width="200px"
            height="250px"
            alt="Cover photo"
          />
        </div>
        <div className="coverlines">
          <h3>From This Issue:</h3>
          <p>{issue.acf.primary_cover_line}</p>
          <p>{issue.acf.secondary_cover_line}</p>
        </div>
      </CoverContainer>
      <ul className="card--grid single-page">
        {articles.map((article, index) => {
          const appearsIn = article.acf.appears_in;

          return (
            <React.Fragment key={index}>
              {currentIssue == appearsIn ? (
                <>
                  <ArticleCard
                    post={article}
                    // title={article.title.rendered}
                    // slug={article.slug}
                    // image={
                    //   article._embedded["wp:featuredmedia"]["0"].source_url
                    // }
                    // read={article.acf.time_to_read}
                    // byline={article.acf.writer[0].post_title}
                    // excerpt={article.acf.excerpt}
                    // headshot={article.acf.writer[0].acf.headshot.url}
                  />
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
