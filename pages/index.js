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
  //use this to get only subcategories for cards
  // const subcategoryQuery = await fetch(
  //   `${Config.apiUrl}/wp-json/wp/v2/categories?parent=${category?.id}`
  // );

  const catOne = page.acf.home_category_one[0].term_id;
  const catTwo = page.acf.home_category_two[0].term_id;
  const catThree = page.acf.home_category_three[0].term_id;

  return (
    <>
      <PageWrapper pageTitle="Asparagus Magazine - Home">
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
                <>
                  {post.id == page.acf.lead_story[0].ID ? (
                    <LeadStoryBlock
                      post={post}
                      date={formattedDate}
                      image={post._embedded["wp:featuredmedia"]["0"].source_url}
                      title={post.title.rendered}
                      read={post.acf.time_to_read}
                      byline={post.acf.writer[0].post_title}
                      excerpt={post.acf.excerpt}
                      headshot={post.acf.writer[0].acf.headshot.url}
                    />
                  ) : null}
                </>
              );
            })}
          </div>
          <CategoryContainer className="new-from--container">
            <h2>New From Asparagus</h2>
            <hr />
            <div className="card--grid">
              {posts.map((post, index) => {
                // let initialDate = post.date;
                // let formattedDate = new Date(initialDate).toLocaleDateString(
                //   "en-US",
                //   {
                //     year: "numeric",
                //     month: "long",
                //     day: "2-digit",
                //   }
                // );

                return (
                  <>
                    {index <= 5 ? (
                      <>
                        <ArticleCard
                          post={post}
                          // title={post.title.rendered}
                          // slug={post.slug}
                          // categories={post._embedded["wp:term"]["0"]}
                          // image={
                          //   post._embedded["wp:featuredmedia"]["0"].source_url
                          // }
                          // excerpt={post.acf.excerpt}
                          // byline={post.acf.writer[0].post_title}
                          // read={post.acf.time_to_read}
                          // date={formattedDate}
                          // headshot={post.acf.writer[0].acf.headshot.url}
                        />
                      </>
                    ) : null}
                  </>
                );
              })}
            </div>
          </CategoryContainer>

          <CategoryContainer className="cat-one--container">
            <h2>{page.acf.home_category_one[0].name}</h2>
            <hr />
            <div className="card--grid">
              {posts.map((post, index) => {
                // let initialDate = post.date;
                // let formattedDate = new Date(initialDate).toLocaleDateString(
                //   "en-US",
                //   {
                //     year: "numeric",
                //     month: "long",
                //     day: "2-digit",
                //   }
                // );
                return (
                  <>
                    {page.acf.home_category_one[0].name == "Awards" &&
                    post.categories.includes(catOne) ? (
                      <React.Fragment key={uuidv4()}>
                        <AwardWinnerCard post={post} />
                      </React.Fragment>
                    ) : post.categories.includes(catOne) ? (
                      <React.Fragment key={uuidv4()}>
                        <ArticleCard post={post} />
                      </React.Fragment>
                    ) : null}
                  </>
                );
              })}
            </div>
          </CategoryContainer>

          <NewsletterSignup
            support={false}
            title="Sign up for News from the Asparagus Patch"
            subtitle="Pleasantly Infrequent Updates from Asparagus Magazine"
            image="triplestalk.svg"
          />

          <CategoryContainer className="cat-two--container">
            <h2>{page.acf.home_category_two[0].name}</h2>
            <hr />
            <div className="card--grid">
              {posts.map((post, index) => {
                // let initialDate = post.date;
                // let formattedDate = new Date(initialDate).toLocaleDateString(
                //   "en-US",
                //   {
                //     year: "numeric",
                //     month: "long",
                //     day: "2-digit",
                //   }
                // );
                return (
                  <>
                    {page.acf.home_category_two[0].name == "Awards" &&
                    post.categories.includes(catTwo) &&
                    index <= 5 ? (
                      <React.Fragment key={uuidv4()}>
                        <AwardWinnerCard
                          post={post}
                          // date={formattedDate}
                          // read={post.acf.time_to_read}
                          // slug={post.slug}
                          // title={post.title.rendered}
                        />
                      </React.Fragment>
                    ) : post.categories.includes(catTwo) && index <= 6 ? (
                      <React.Fragment key={uuidv4()}>
                        <ArticleCard post={post} />
                      </React.Fragment>
                    ) : null}
                  </>
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
            <div className="card--grid">
              {posts.map((post, index) => {
                // let initialDate = post.date;
                // let formattedDate = new Date(initialDate).toLocaleDateString(
                //   "en-US",
                //   {
                //     year: "numeric",
                //     month: "long",
                //     day: "2-digit",
                //   }
                // );
                return (
                  <>
                    {page.acf.home_category_three[0].name == "Awards" &&
                    post.categories.includes(catThree) &&
                    index <= 5 ? (
                      <React.Fragment key={uuidv4()}>
                        <AwardWinnerCard
                          post={post}
                          // date={formattedDate}
                          // read={post.acf.time_to_read}
                          // slug={post.slug}
                          // title={post.title.rendered}
                        />
                      </React.Fragment>
                    ) : post.categories.includes(catThree) && index <= 5 ? (
                      <React.Fragment key={uuidv4()}>
                        <ArticleCard post={post} />
                      </React.Fragment>
                    ) : null}
                  </>
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

  //query posts whose categories match the three acf values

  //cat one
  // const categoryOne = page.acf.home_category_one[0].term_id;
  // const postQueryOne = await fetch(
  //   `${Config.apiUrl}/wp-json/wp/v2/articles?categories=${categoryOne}&_embed&per_page=6`
  // );
  // const catOnePosts = await postQueryOne.json();

  return {
    props: {
      page: page,
      posts: posts,
    },
  };
}
