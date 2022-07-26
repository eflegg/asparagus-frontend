import React from "react";
import Image from "next/image";
import { Config } from "../config";
import fetch from "isomorphic-fetch";
import PageWrapper from "../components/Global/PageWrapper";
import Link from "next/link";
import ArticleCard from "../components/ArticleCard";
import NewsletterSignup from "../components/NewsletterSignupCard";
import AwardWinnerCard from "../components/AwardWinnerCard";
import styled from "styled-components";
import theme from "../components/Global/Theme";
import { v4 as uuidv4 } from "uuid";
import LeadStoryBlock from "../components/LeadStoryBlock";

const CategoryContainer = styled.section``;

export default function Home({
  page,
  catOnePosts,
  catTwoPosts,
  catThreePosts,
  posts,
}) {
  console.log("homepage ", page);
  console.log("posts ", posts);
  console.log("lead story id ", page.acf.lead_story[0]);

  // const ref = React.forwardRef(null);

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
                      date={formattedDate}
                      image={post._embedded["wp:featuredmedia"]["0"].source_url}
                      title={post.title.rendered}
                      read={post.acf.time_to_read}
                      byline={post.acf.writer[0].post_title}
                      excerpt={post.acf.excerpt}
                    />
                  ) : // <React.Fragment key={uuidv4()}>
                  //
                  //   <div className="lead-image">
                  //     <Image
                  //       src={
                  //         post._embedded["wp:featuredmedia"]["0"].source_url
                  //       }
                  //       layout="fill"
                  //       objectFit="cover"
                  //       alt="Contributor photo"
                  //     />
                  //   </div>
                  //   <div className="lead--text">
                  //     <h1>{post.title.rendered}</h1>
                  //     <p>{post.acf.writer[0].post_title}</p>
                  //     <p>
                  //       {formattedDate} - <span>{post.acf.time_to_read}</span>
                  //     </p>
                  //     <hr />
                  //     <p className="text-right lead-story--excerpt">
                  //       {post.acf.excerpt}
                  //     </p>
                  //   </div>
                  // </React.Fragment>
                  null}
                </>
              );
            })}
          </div>
          <CategoryContainer className="cat-one--container">
            <h2>{page.acf.home_category_one[0].name}</h2>
            <div className="card--grid">
              {catOnePosts.map((catOnePost, index) => {
                return (
                  <>
                    {page.acf.home_category_one[0].name == "Awards" ? (
                      <React.Fragment key={uuidv4()}>
                        <AwardWinnerCard
                          // ref={ref}
                          slug={catOnePost.slug}
                          title={catOnePost.title.rendered}
                        />
                      </React.Fragment>
                    ) : (
                      <React.Fragment key={uuidv4()}>
                        <ArticleCard
                          // ref={ref}
                          slug={catOnePost.slug}
                          title={catOnePost.title.rendered}
                        />
                      </React.Fragment>
                    )}
                  </>
                );
              })}
            </div>
          </CategoryContainer>
          {/* @elizabeth it doesn't have any children so it can be a self-closing tag */}
          <NewsletterSignup
            support
            title="Sign up for News from the Asparagus Patch"
            subtitle="pleasantly infrequent updates from asparagus magazine"
            image="cherryblossoms.jpg"
          />

          <CategoryContainer className="cat-two--container">
            <h2>{page.acf.home_category_two[0].name}</h2>
            <div className="card--grid">
              {catTwoPosts.map((catTwoPost, index) => {
                return (
                  <>
                    {page.acf.home_category_two[0].name == "Awards" ? (
                      <React.Fragment key={uuidv4()}>
                        <AwardWinnerCard
                          // ref={ref}
                          slug={catTwoPost.slug}
                          title={catTwoPost.title.rendered}
                        />
                      </React.Fragment>
                    ) : (
                      <React.Fragment key={uuidv4()}>
                        <ArticleCard
                          // ref={ref}
                          slug={catTwoPost.slug}
                          title={catTwoPost.title.rendered}
                        />
                      </React.Fragment>
                    )}
                  </>
                );
              })}
            </div>
          </CategoryContainer>
          <CategoryContainer className="cat-three--container">
            <h2>{page.acf.home_category_three[0].name}</h2>
            <div className="card--grid">
              {catThreePosts.map((catThreePost, index) => {
                return (
                  <>
                    {page.acf.home_category_three[0].name == "Awards" ? (
                      <React.Fragment key={uuidv4()}>
                        <AwardWinnerCard
                          // ref={ref}
                          slug={catThreePost.slug}
                          title={catThreePost.title.rendered}
                        />
                      </React.Fragment>
                    ) : (
                      <React.Fragment key={uuidv4()}>
                        <ArticleCard
                          // ref={ref}
                          slug={catThreePost.slug}
                          title={catThreePost.title.rendered}
                        />
                      </React.Fragment>
                    )}
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

  console.log("page: ", page);

  //query posts whose categories match the three acf values

  //cat one
  const categoryOne = page.acf.home_category_one[0].term_id;
  const postQueryOne = await fetch(
    `${Config.apiUrl}/wp-json/wp/v2/articles?categories=${categoryOne}&per_page=6`
  );
  const catOnePosts = await postQueryOne.json();

  //cat two
  const categoryTwo = page.acf.home_category_two[0].term_id;
  const postQueryTwo = await fetch(
    `${Config.apiUrl}/wp-json/wp/v2/articles?categories=${categoryTwo}&per_page=6`
  );
  const catTwoPosts = await postQueryTwo.json();

  //cat three
  const categoryThree = page.acf.home_category_three[0].term_id;
  const postQueryThree = await fetch(
    `${Config.apiUrl}/wp-json/wp/v2/articles?categories=${categoryThree}&per_page=6`
  );
  const catThreePosts = await postQueryThree.json();

  //all posts
  const postsQuery = await fetch(
    `${Config.apiUrl}/wp-json/wp/v2/articles?_embed`
  );
  const posts = await postsQuery.json();

  return {
    props: {
      page: page,
      catOnePosts: catOnePosts,
      catTwoPosts: catTwoPosts,
      catThreePosts: catThreePosts,
      posts: posts,
    },
  };
}
