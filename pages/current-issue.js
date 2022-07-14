import React, { useState } from "react";
import Link from "next/link";
import { getIssues, getArticles } from "../utils/wordpress";
import PageWrapper from "../components/Global/PageWrapper";
import ArticleCard from "../components/ArticleCard";

export default function CurrentIssue({ issues, articles }) {
  console.log("issues: ", issues);
  console.log("articles: ", articles);

  const currentIssue = issues[0].id;
  console.log("current issue: ", currentIssue);
  console.log("article issue: ", articles[0].acf.appears_in);

  return (
    <PageWrapper pageTitle="Current Issue" className="">
      <ul>
        {articles.map((article, index) => {
          const appearsIn = article.acf.appears_in;

          return (
            <React.Fragment key={index}>
              {currentIssue == appearsIn ? (
                <>
                  <ArticleCard
                    title={article.title.rendered}
                    slug={article.slug}
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
