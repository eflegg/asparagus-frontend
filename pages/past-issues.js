import React, { useState } from "react";
import Link from "next/link";
import { getIssues } from "../utils/wordpress";
import PageWrapper from "../components/Global/PageWrapper";
import IssueCard from "../components/IssueCard";
import styled from "styled-components";
import theme from "../components/Global/Theme";
import { v4 as uuidv4 } from "uuid";

export default function PastIssues({ issues }) {
  console.log("issues: ", issues);

  const currentIssue = issues[0].title.rendered;

  return (
    <PageWrapper
      canonicalUrl={`https://asparagusmagazine.com/past-issues`}
      ogImageUrl="triplestalk.svg"
      ogTwitterImage="triplestalk.svg"
      SEOtitl="Past Issues"
      metadescription="Peruse stories of a just society on a healthy planet in all Asparagus Magazine's past issues"
    >
      <ul className="card--grid">
        {issues.map((issue, index) => {
          return (
            <React.Fragment key={uuidv4()}>
              {issue.title.rendered != currentIssue ? (
                <>
                  <IssueCard
                    title={issue.title.rendered}
                    slug={issue.slug}
                    image={issue._embedded["wp:featuredmedia"]["0"].source_url}
                    coverLine={issue.acf.primary_cover_line}
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

  return {
    props: {
      issues,
    },
    revalidate: 10, // In seconds
  };
}
