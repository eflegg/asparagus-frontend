import React, { useState } from "react";
import { Config } from "../config";
import fetch from "isomorphic-fetch";
import { getTips } from "../utils/wordpress";
import PageWrapper from "../components/Global/PageWrapper";
import styled from "styled-components";
import theme from "../components/Global/Theme";
import { v4 as uuidv4 } from "uuid";

const NewsletterContainer = styled.section`
  border: 3px solid salmon;
  width: 70%;
  margin: 0 auto;
  img {
    height: auto;
  }
`;
export default function Tips({ tips, page }) {
  //use state to set the index of the selected
  //tips date, rendered the data from that position

  const [newsletterSelected, setNewsletterSelected] = useState(
    tips[0].title.rendered
  );

  return (
    <PageWrapper
      canonicalUrl={`https://asparagusmagazine.com/${page.slug}`}
      ogImageUrl={page.yoast_head_json.og_image}
      ogType={page.yoast_head_json.og_type}
      ogTwitterImage={page.yoast_head_json.twitter_card}
      SEOtitle="Asparagus Tips Archive"
      metadescription="A newsletter series of quick tips on how to make every part of your life brighter and greener"
      className=""
    >
      <h1>Asparagus Tips</h1>
      <select
        value={newsletterSelected}
        onChange={(e) => setNewsletterSelected(e.target.value)}
      >
        {tips.map((tip, index) => {
          return <option key={uuidv4()}>{tip.title.rendered}</option>;
        })}
      </select>
      <NewsletterContainer>
        {/* <h2>{tips[newsletterSelected].title.rendered}</h2> */}
        {tips.map((tip, index) => {
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
    revalidate: 10, // In seconds
  };
}
