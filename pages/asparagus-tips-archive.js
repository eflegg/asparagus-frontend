import React, { useState } from "react";
import Link from "next/link";
import { getTips } from "../utils/wordpress";
import PageWrapper from "../components/Global/PageWrapper";
import styled from "styled-components";
import theme from "../components/Global/Theme";

const NewsletterContainer = styled.section`
  border: 3px solid salmon;
  width: 70%;
  margin: 0 auto;
  img {
    height: auto;
  }
`;
export default function Tips({ tips }) {
  //use state to set the index of the selected
  //tips date, rendered the data from that position

  const [newsletterSelected, setNewsletterSelected] = useState(
    tips[0].title.rendered
  );
  console.log("news select: ", newsletterSelected);
  console.log("tips: ", tips);

  return (
    <PageWrapper className="">
      <h1>Asparagus Tips</h1>
      <select
        value={newsletterSelected}
        onChange={(e) => setNewsletterSelected(e.target.value)}
      >
        {tips.map((tip, index) => {
          return <option key={index}>{tip.title.rendered}</option>;
        })}
      </select>
      <NewsletterContainer>
        {/* <h2>{tips[newsletterSelected].title.rendered}</h2> */}
        {tips.map((tip, index) => {
          return (
            <>
              {" "}
              {tip.title.rendered == newsletterSelected ? (
                <>
                  <h2 className="text-center">{tip.title.rendered}</h2>
                  <div
                    className="newsletter-content"
                    dangerouslySetInnerHTML={{ __html: tip.content.rendered }}
                  ></div>
                </>
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

  return {
    props: {
      tips,
    },
    revalidate: 10, // In seconds
  };
}
