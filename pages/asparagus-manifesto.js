import React from "react";
import Link from "next/link";
import { Config } from "../config";
import fetch from "isomorphic-fetch";
import PageWrapper from "/components/Global/PageWrapper";
import styled from "styled-components";
import theme from "/components/Global/Theme";
import { getContributors } from "../utils/wordpress";

const SingleContainer = styled.div`
  height: 100%;
  figure {
    text-align: center;
    margin: 50px auto;
    &.size-large {
      img {
        height: 100%;
        width: 100%;
      }
    }
  }

  figcaption {
    &.credit {
      /* position: absolute; */
    }
    width: 90%;
    ${theme.mediaQuery.md`
     width: 100%;
    `}
    margin: 0 auto;
    font-family: ${theme.type.accent};
    font-size: 1.6rem;
    &.caption {
      p {
        font-size: 1.6rem;
        margin-left: 0px;
        margin-bottom: 85px;
        font-family: ${theme.type.header};
        font-style: italic;
        font-weight: 700;
        line-height: 2rem;
      }
    }
    strong {
      font-family: ${theme.type.header};
      font-style: italic;
      position: relative;
      // top: 5px;
    }
  }
  li {
    margin: 0 auto 20px;
    width: 90%;
    max-width: 680px;
    list-style: disc;
  }

  h2 {
    width: 90%;
    max-width: 680px;
    margin: 30px auto 20px;
    color: ${theme.colours.gusGreen};
    font-size: 1.8rem;
    ${theme.mediaQuery.sm`
      font-size: 2.3rem;
    `}
    ${theme.mediaQuery.md`
       font-size: 2.8rem;
    `}
  }
  .body-content {
    p {
      width: 90%;
      max-width: 680px;
      margin: 17px auto;
      letter-spacing: 0;
      ${theme.mediaQuery.sm`
       margin: 25px auto;
    `}
    }
    a {
      letter-spacing: 0;
    }
    em {
      font-size: 1.7rem;
      font-weight: 600;
      ${theme.mediaQuery.md`
      font-size: 2rem;
      `}
    }
    strong {
      em {
        font-size: 1.7rem;
        font-weight: 800;
        ${theme.mediaQuery.md`
      font-size: 2rem;
      `}
      }
    }
    a {
      text-decoration: underline;
      text-decoration-skip-ink: auto;
      font-family: ${theme.type.bodyFont};
      color: black;
      font-weight: 400;
    }

    a:visited {
      color: ${theme.colours.soil};
    }

    a:hover {
      color: ${theme.colours.gusGreen};
    }

    a:active {
      color: ${theme.colours.gusYellow};
    }

    .wp-block-pullquote {
      p {
        font-size: 18px;
        font-weight: 600;
        color: ${theme.colours.gusGreen};
        width: 80%;
        margin: 20px auto;
        text-align: center;
        font-family: ${theme.type.semibold};
        ${theme.mediaQuery.md`
      font-size: 2.8rem;
     `}
      }
      em {
        font-size: 18px;
        font-weight: 600;
        ${theme.mediaQuery.md`
        font-size: 2.8rem;
       `}
      }
    }

    .related--header {
      width: 90%;
      margin: 50px auto 0;
      line-height: 100%;
    }
    .content--container {
    }
  }
  .print-details {
    width: 90%;
    text-align: center;
    margin: 45px auto;
    p {
      margin: 5px auto;
      font-style: italic;
      font-weight: 600;
    }
  }

  .share-block {
    width: 90%;
    max-width: 680px;
    margin: 45px auto;
    svg {
      circle {
        fill: transparent;
      }
      path {
        fill: ${theme.colours.soil};
      }
    }
    .share {
      font-family: ${theme.type.semibold};
      font-size: 1.8rem;
    }
  }
`;

export default function AsparagusManifesto({ contributors, page }) {
  return (
    <PageWrapper
      canonicalUrl={`https://asparagusmagazine.com/${page.slug}`}
      ogImageUrl={page.yoast_head_json.og_image}
      ogType={page.yoast_head_json.og_type}
      ogTwitterImage={page.yoast_head_json.twitter_card}
      SEOtitle={
        page.yoast_head_json.title
          ? page.yoast_head_json.title
          : "Asparagus Magazine"
      }
      metadescription={
        page.yoast_head_json.description
          ? page.yoast_head_json.title
          : "Telling the large and small stories of how we can live more sustainably"
      }
      className=""
    >
      <SingleContainer>
        <h1
          className="article--title text-center"
          dangerouslySetInnerHTML={{ __html: page.title.rendered }}
        ></h1>
        <hr />
        <div
          className="body-content"
          dangerouslySetInnerHTML={{ __html: page.content.rendered }}
        ></div>
      </SingleContainer>
    </PageWrapper>
  );
}

//this can be made into a special page at the end

export async function getStaticProps({ params }) {
  const contributors = await getContributors();

  const pageQuery = await fetch(`${Config.apiUrl}/wp-json/wp/v2/pages/105`);
  const page = await pageQuery.json();

  return {
    props: {
      contributors,
      page,
    },
    //revalidate: 2000, // In seconds
  };
}
