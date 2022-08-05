import React from "react";
import { Config } from "../config";
import fetch from "isomorphic-fetch";
import PageWrapper from "../components/Global/PageWrapper";
import ArticleCard from "../components/ArticleCard";
import NewsletterSignup from "../components/NewsletterSignupCard";
import AwardWinnerCard from "../components/AwardWinnerCard";
import styled from "styled-components";
import theme from "../components/Global/Theme";
import { v4 as uuidv4 } from "uuid";
import LeadStoryBlock from "../components/LeadStoryBlock";
import SupportCard from "../components/SupportCard";

const CategoryContainer = styled.section`
  margin-bottom: 45px;
  ${theme.mediaQuery.sm`
margin-bottom: 80px;
`}
  hr {
    height: 3px;
    border: 0px;
    background: ${theme.colours.teaGreen};
    margin-bottom: 65px;
  }
  h2 {
    color: ${theme.colours.soil};
    padding-bottom: 0;
    width: 80%;
    margin: 0 auto;
  }
`;

export default function Home({ page, posts }) {
  const catOne = page.acf.home_category_one[0].term_id;
  const catTwo = page.acf.home_category_two[0].term_id;
  const catThree = page.acf.home_category_three[0].term_id;

  return (
    <>
      <PageWrapper
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
      >
        <main>
          <div>
            {posts.map((post, index) => {
              let initialDate = post.date;
              let formattedDate = new Date(initialDate).toLocaleDateString(
                "en-US",
                {
                  year: "numeric",
                  month: "long",
                  day: "2-digit",
                }
              );
              return (
                <React.Fragment key={uuidv4()}>
                  {post.id == page.acf.lead_story[0].ID ? (
                    <LeadStoryBlock
                      post={post}
                      date={formattedDate}
                      image={post._embedded["wp:featuredmedia"]["0"].source_url}
                      title={post.title.rendered}
                      read={post.acf.time_to_read}
                      byline={post.acf.writer[0].post_title}
                      excerpt={post.acf.dek}
                      headshot={post.acf.writer[0].acf.headshot.url}
                    />
                  ) : null}
                </React.Fragment>
              );
            })}
          </div>
          <CategoryContainer className="new-from--container">
            <h2>New From Asparagus</h2>
            <hr />
            <div className="card--grid">
              {posts.map((post, index) => {
                return (
                  <React.Fragment key={uuidv4()}>
                    {index <= 5 ? (
                      <>
                        <ArticleCard post={post} />
                      </>
                    ) : null}
                  </React.Fragment>
                );
              })}
            </div>
          </CategoryContainer>

          <CategoryContainer className="cat-one--container">
            <h2>{page.acf.home_category_one[0].name}</h2>
            <hr />
            <div
              className={`${
                page.acf.home_category_one[0].name == "Awards"
                  ? "awards--container__home"
                  : "card--grid"
              }`}
            >
              {posts.map((post, index) => {
                return (
                  <React.Fragment key={uuidv4()}>
                    {page.acf.home_category_one[0].name == "Awards" &&
                    post.categories.includes(catOne) ? (
                      <AwardWinnerCard post={post} />
                    ) : post.categories.includes(catOne) ? (
                      <ArticleCard post={post} />
                    ) : null}
                  </React.Fragment>
                );
              })}
            </div>
          </CategoryContainer>

          <CategoryContainer className="cat-two--container">
            <h2>{page.acf.home_category_two[0].name}</h2>
            <hr />
            <div
              className={`${
                page.acf.home_category_two[0].name == "Awards"
                  ? "awards--container__home"
                  : "card--grid"
              }`}
            >
              {posts.map((post, index) => {
                return (
                  <React.Fragment key={uuidv4()}>
                    {page.acf.home_category_two[0].name == "Awards" &&
                    post.categories.includes(catTwo) &&
                    index <= 5 ? (
                      <AwardWinnerCard post={post} />
                    ) : post.categories.includes(catTwo) && index <= 6 ? (
                      <ArticleCard post={post} />
                    ) : null}
                  </React.Fragment>
                );
              })}
            </div>
          </CategoryContainer>

          <NewsletterSignup
            title="Sign up for the Asparagus Newsletter"
            subtitle="Pleasantly infrequent updates from the asparagus patch"
            image="triplestalk.svg"
          />

          <CategoryContainer className="cat-three--container">
            <h2>{page.acf.home_category_three[0].name}</h2>
            <hr />
            <div
              className={`${
                page.acf.home_category_three[0].name == "Awards"
                  ? "awards--container__home"
                  : "card--grid"
              }`}
            >
              {posts.map((post, index) => {
                return (
                  <React.Fragment key={uuidv4()}>
                    {page.acf.home_category_three[0].name == "Awards" &&
                    post.categories.includes(catThree) &&
                    index <= 5 ? (
                      <AwardWinnerCard post={post} />
                    ) : post.categories.includes(catThree) && index <= 5 ? (
                      <ArticleCard post={post} />
                    ) : null}
                  </React.Fragment>
                );
              })}
            </div>
          </CategoryContainer>
        </main>
      </PageWrapper>
    </>
  );
}

export async function getStaticProps() {
  //query the home page to get the acf
  const pageQuery = await fetch(`${Config.apiUrl}/wp-json/wp/v2/pages/114`);
  const page = await pageQuery.json();

  //all posts
  const postsQuery = await fetch(
    `${Config.apiUrl}/wp-json/wp/v2/articles?_embed`
  );
  const posts = await postsQuery.json();

  return {
    props: {
      page: page,
      posts: posts,
    },
  };
}
