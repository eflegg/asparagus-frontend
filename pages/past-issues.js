import React, { useState } from "react";
import Link from "next/link";
import { getIssues } from "../utils/wordpress";
import PageWrapper from "../components/Global/PageWrapper";
import IssueCard from "../components/IssueCard";
import styled from "styled-components";
import theme from "../components/Global/Theme";
import { v4 as uuidv4 } from "uuid";

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

export default function PastIssues({ issues }) {
  const currentIssue = issues[0].title.rendered;
  const fallbackImage =
    "https://www.asparagusmagazine.com/Asparagus_Tip_Logo.svg";

  return (
    <PageWrapper
      canonicalUrl={`https://asparagusmagazine.com/past-issues`}
      ogImageUrl={fallbackImage}
      ogTwitterImage={fallbackImage}
      SEOtitl="Past Issues"
      metadescription="Peruse stories of a just society on a healthy planet in all Asparagus Magazine's past issues"
    >
      <Issues>
        <h1 className="text-center">Past Issues</h1>
        <hr />
        <div className="button-container">
          <Link href={"/current-issue"}>
            <a>
              <button className="btn--secondary">Go to Current Issue</button>
            </a>
          </Link>
        </div>
      </Issues>
      <ul className="card--grid single-page">
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
  const notFound = !issues;

  return {
    props: {
      issues,
    },
    revalidate: 1200, // In seconds
    notFound,
  };
}
