import React, { useState } from "react";
import { Config } from "../config";
import fetch from "isomorphic-fetch";
import { getTips } from "../utils/wordpress";
import PageWrapper from "../components/Global/PageWrapper";
import styled from "styled-components";
import theme from "../components/Global/Theme";
import { v4 as uuidv4 } from "uuid";
import SupportCard from "../components/SupportCard";

const NewsletterContainer = styled.section`
  // border: 3px solid salmon;
  width: 70%;
  margin: 30px auto;
  h2 {
    color: ${theme.colours.soil};
    font-size: 2.8rem;
    @media ${theme.devices.md} {
      font-size: 3.6rem;
    }
  }
  img {
    height: auto;
  }
  ul {
    list-style: none;
  }
  ol {
    padding-left: 0;
  }
  li {
    margin: 0 auto 20px;
    width: 90%;
    max-width: 680px;
  }
  figure.wp-block-pullquote {
    margin: 20px auto;
    p {
      font-family: ${theme.type.semibold};
      color: ${theme.colours.gusGreen};
      font-size: 1.8rem;
      text-align: center;
      @media ${theme.devices.md} {
        font-size: 2.8rem;
        margin: 40px auto;
      }
    }
  }
  figcaption {
    width: 90%;
    margin: 8px auto 0;
    font-family: ${theme.type.accent};
    font-size: 1.6rem;

    strong {
      font-family: ${theme.type.header};
      font-style: italic;
      position: relative;
      top: 5px;
    }
  }
`;

const TipDropdown = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  @media ${theme.devices.sm} {
    justify-content: flex-start;
    margin-left: 20px;
  }
  select {
    font-family: ${theme.type.medium};
    font-size: 20px;
    color: black;
    border: 3px solid ${theme.colours.teaGreen};
  }
`;

export default function Tips({ tips, page }) {
  //use state to set the index of the selected
  //tips date, rendered the data from that position

  const [newsletterSelected, setNewsletterSelected] = useState(
    tips[0].title.rendered
  );

  const fallbackImage =
    "https://www.asparagusmagazine.com/Asparagus_Tip_Logo.svg";
  return (
    <PageWrapper
      canonicalUrl={`https://asparagusmagazine.com/${page.slug}`}
      ogImageUrl={fallbackImage}
      ogType={page.yoast_head_json.og_type}
      ogTwitterImage={page.yoast_head_json.twitter_card}
      SEOtitle="Asparagus Tips Archive"
      metadescription="A newsletter series of quick tips on how to make every part of your life brighter and greener"
    >
      <h1 className="text-center">Asparagus Tips</h1>
      <hr />
      <TipDropdown>
        <select
          value={newsletterSelected}
          onChange={(e) => setNewsletterSelected(e.target.value)}
        >
          {tips.map((tip: any, index) => {
            return <option key={uuidv4()}>{tip.title.rendered}</option>;
          })}
        </select>
      </TipDropdown>
      <NewsletterContainer>
        {/* <h2>{tips[newsletterSelected].title.rendered}</h2> */}
        {tips.map((tip: any, index) => {
          return (
            <>
              {" "}
              {tip.title.rendered == newsletterSelected ? (
                <React.Fragment key={uuidv4()}>
                  <h2 className="text-center">{tip.title.rendered}</h2>
                  <div
                    className="newsletter-content"
                    dangerouslySetInnerHTML={{ __html: tip.content.rendered }}
                  ></div>
                </React.Fragment>
              ) : null}
            </>
          );
        })}
      </NewsletterContainer>
      <SupportCard />
    </PageWrapper>
  );
}

export async function getStaticProps({ params }) {
  const tips = await getTips();

  const pageQuery = await fetch(`${Config.apiUrl}/wp-json/wp/v2/pages/80`);
  const page = await pageQuery.json();

  return {
    props: {
      tips,
      page,
    },
    //revalidate: 1200, // In seconds
  };
}
