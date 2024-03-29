import React from "react";
import Loader from "../components/Global/Loader";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
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

const CategoryContainer = styled.section`
  overflow: hidden;
  margin-bottom: 45px;
  @media ${theme.devices.sm} {
    margin-bottom: 80px;
  }

  h2 {
    color: ${theme.colours.soil};
    padding-bottom: 0;
    width: 80%;
    margin: 0 0 0 72px;
  }
`;

export default function Home({
  page,
  posts,
  catThreePosts,
  catTwoPosts,
  catOnePosts,
  leadStoryPost,
}) {
  // get URL parameters
  const { query: queryParams } = useRouter();
  //default to 1 if no parameter
  const first = queryParams.first != undefined ? queryParams.first : 1;
  //pagewrapper is rendered with the URL parameter

  const fallbackImage =
    "https://www.asparagusmagazine.com/Asparagus_Tip_Logo.svg";

  return (
    <>
      <PageWrapper
        canonicalUrl="https://asparagusmagazine.com/"
        ogImageUrl={fallbackImage}
        ogTwitterImage={fallbackImage}
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
            <LeadStoryBlock post={leadStoryPost[0]} />
          </div>
          <CategoryContainer className="new-from--container">
            <h2 className="h5">New from Asparagus</h2>
            <hr />
            <div className="card--grid">
              {posts.map((post, index) => {
                return (
                  <React.Fragment key={uuidv4()}>
                    <>
                      <ArticleCard post={post} />
                    </>
                  </React.Fragment>
                );
              })}
            </div>
          </CategoryContainer>

          <CategoryContainer className="cat-one--container">
            <h2
              className="h5"
              dangerouslySetInnerHTML={{
                __html: page.acf.home_category_one[0].name,
              }}
            ></h2>

            <hr />
            <div
              className={`${
                page.acf.home_category_one[0].name == "Awards"
                  ? "awards--container__home"
                  : "card--grid"
              }`}
            >
              {catOnePosts.map((catOnePost: any, index) => {
                return (
                  <React.Fragment key={uuidv4()}>
                    {page.acf.home_category_one[0].name !== "Awards" ? (
                      <ArticleCard post={catOnePost} />
                    ) : page.acf.home_category_one[0].name == "Awards" &&
                      index <= 2 ? (
                      <AwardWinnerCard post={catOnePost} />
                    ) : null}
                  </React.Fragment>
                );
              })}
            </div>
          </CategoryContainer>

          <CategoryContainer className="cat-two--container">
            <h2
              className="h5"
              dangerouslySetInnerHTML={{
                __html: page.acf.home_category_two[0].name,
              }}
            ></h2>
            <hr />
            <div
              className={`${
                page.acf.home_category_two[0].name == "Awards"
                  ? "awards--container__home"
                  : "card--grid"
              }`}
            >
              {catTwoPosts.map((catTwoPost: any, index) => {
                return (
                  <React.Fragment key={uuidv4()}>
                    {page.acf.home_category_two[0].name !== "Awards" ? (
                      <ArticleCard post={catTwoPost} />
                    ) : page.acf.home_category_two[0].name == "Awards" &&
                      index <= 2 ? (
                      <AwardWinnerCard post={catTwoPost} />
                    ) : null}
                  </React.Fragment>
                );
              })}
            </div>
          </CategoryContainer>

          {page.acf.include_support_block == "Yes" ? (
            page.acf.which_block == "Newsletter" ? (
              <NewsletterSignup
                support={false}
                title="Sign up for the Asparagus Newsletter"
                subtitle="Pleasantly infrequent updates from the asparagus patch"
                image="/triplestalk.svg"
              />
            ) : (
              <NewsletterSignup
                support
                title="Asparagus relies on readers like you!"
                subtitle="Support Asparagus Magazine"
                image="/cherryblossoms.jpg"
              />
            )
          ) : null}

          <CategoryContainer className="cat-three--container">
            <h2
              className="h5"
              dangerouslySetInnerHTML={{
                __html: page.acf.home_category_three[0].name,
              }}
            ></h2>

            <hr />
            <div
              className={`${
                page.acf.home_category_three[0].name == "Awards"
                  ? "awards--container__home"
                  : "card--grid"
              }`}
            >
              {catThreePosts.map((catThreePost: any, index) => {
                return (
                  <React.Fragment key={uuidv4()}>
                    {page.acf.home_category_three[0].name !== "Awards" ? (
                      <ArticleCard post={catThreePost} />
                    ) : page.acf.home_category_three[0].name == "Awards" &&
                      index <= 2 ? (
                      <AwardWinnerCard post={catThreePost} />
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

  const categoryOnePosts = await fetch(
    `${Config.apiUrl}/wp-json/wp/v2/articles?_embed&categories=${page?.acf.home_category_one[0].term_id}&per_page=6`
  );
  const catOnePosts = await categoryOnePosts.json();

  const categoryTwoPosts = await fetch(
    `${Config.apiUrl}/wp-json/wp/v2/articles?_embed&categories=${page?.acf.home_category_two[0].term_id}&_embed&per_page=6`
  );
  const catTwoPosts = await categoryTwoPosts.json();

  const categoryThreePosts = await fetch(
    `${Config.apiUrl}/wp-json/wp/v2/articles?_embed&categories=${page?.acf.home_category_three[0].term_id}&_embed&per_page=6`
  );
  const catThreePosts = await categoryThreePosts.json();

  const leadStory = await fetch(
    `${Config.apiUrl}/wp-json/wp/v2/articles?_embed&include=${page?.acf.lead_story[0].ID}
  `
  );

  const leadStoryPost = await leadStory.json();

  //all posts
  const postsQuery = await fetch(
    `${Config.apiUrl}/wp-json/wp/v2/articles?_embed&per_page=6`
  );
  const posts = await postsQuery.json();

  const notFound = !page;
  return {
    props: {
      page: page,
      posts: posts,
      catThreePosts: catThreePosts,
      catTwoPosts: catTwoPosts,
      catOnePosts: catOnePosts,
      leadStoryPost: leadStoryPost,
    },
    //revalidate: 1200, // In seconds
    notFound,
  };
}
