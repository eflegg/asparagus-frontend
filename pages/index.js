import React from "react";
import Image from "next/image";
import { Config } from "../config";
import fetch from "isomorphic-fetch";
import PageWrapper from "../components/Global/PageWrapper";
import Link from "next/link";
import ArticleCard from "../components/ArticleCard";
import AwardWinnerCard from "../components/AwardWinnerCard";
import styled from "styled-components";
import theme from "../components/Global/Theme";
import { v4 as uuidv4 } from "uuid";
import LeadStoryBlock from "../components/LeadStoryBlock";
import { getContributors } from "../utils/wordpress";

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

export default function Home({
  page,
  catOnePosts,
  catTwoPosts,
  catThreePosts,
  posts,
}) {
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
                let initialDate = post.date;
                let formattedDate = new Date(initialDate).toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "long",
                    day: "2-digit",
                  }
                );
                console.log(index);
                return (
                  <>
                    {index <= 5 ? (
                      <>
                        <ArticleCard
                          title={post.title.rendered}
                          slug={post.slug}
                          categories={post._embedded["wp:term"]["0"]}
                          image={
                            post._embedded["wp:featuredmedia"]["0"].source_url
                          }
                          excerpt={post.acf.excerpt}
                          byline={post.acf.writer[0].post_title}
                          read={post.acf.time_to_read}
                          date={formattedDate}
                          headshot={post.acf.writer[0].acf.headshot.url}
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
              {catOnePosts.map((catOnePost, index) => {
                let initialDate = catOnePost.date;
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
                    {page.acf.home_category_one[0].name == "Awards" ? (
                      <React.Fragment key={uuidv4()}>
                        <AwardWinnerCard
                          date={formattedDate}
                          slug={catOnePost.slug}
                          title={catOnePost.title.rendered}
                          read={catOnePost.acf.time_to_read}
                        />
                      </React.Fragment>
                    ) : (
                      <React.Fragment key={uuidv4()}>
                        <ArticleCard
                          // ref={ref}
                          date={formattedDate}
                          read={catOnePost.acf.time_to_read}
                          slug={catOnePost.slug}
                          title={catOnePost.title.rendered}
                          categories={catOnePost._embedded["wp:term"]["0"]}
                          image={
                            catOnePost._embedded["wp:featuredmedia"]["0"]
                              .source_url
                          }
                          excerpt={catOnePost.acf.excerpt}
                          byline={catOnePost.acf.writer[0].post_title}
                        />
                      </React.Fragment>
                    )}
                  </>
                );
              })}
            </div>
          </CategoryContainer>
          <CategoryContainer className="cat-two--container">
            <h2>{page.acf.home_category_two[0].name}</h2>
            <hr />
            <div className="card--grid">
              {catTwoPosts.map((catTwoPost, index) => {
                let initialDate = catTwoPost.date;
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
                    {page.acf.home_category_two[0].name == "Awards" ? (
                      <React.Fragment key={uuidv4()}>
                        <AwardWinnerCard
                          date={formattedDate}
                          read={catTwoPost.acf.time_to_read}
                          slug={catTwoPost.slug}
                          title={catTwoPost.title.rendered}
                        />
                      </React.Fragment>
                    ) : (
                      <React.Fragment key={uuidv4()}>
                        <ArticleCard
                          // ref={ref}
                          date={formattedDate}
                          read={catTwoPost.acf.time_to_read}
                          slug={catTwoPost.slug}
                          title={catTwoPost.title.rendered}
                          categories={catTwoPost._embedded["wp:term"]["0"]}
                          image={
                            catTwoPost._embedded["wp:featuredmedia"]["0"]
                              .source_url
                          }
                          excerpt={catTwoPost.acf.excerpt}
                          byline={catTwoPost.acf.writer[0].post_title}
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
            <hr />
            <div className="card--grid">
              {catThreePosts.map((catThreePost, index) => {
                let initialDate = catThreePost.date;
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
                    {page.acf.home_category_three[0].name == "Awards" ? (
                      <React.Fragment key={uuidv4()}>
                        <AwardWinnerCard
                          read={catThreePost.acf.time_to_read}
                          date={formattedDate}
                          slug={catThreePost.slug}
                          title={catThreePost.title.rendered}
                          excerpt={catThreePost.acf.excerpt}
                          byline={catThreePost.acf.writer[0].post_title}
                        />
                      </React.Fragment>
                    ) : (
                      <React.Fragment key={uuidv4()}>
                        <ArticleCard
                          read={catThreePost.acf.time_to_read}
                          date={formattedDate}
                          slug={catThreePost.slug}
                          title={catThreePost.title.rendered}
                          categories={catThreePost._embedded["wp:term"]["0"]}
                          image={
                            catThreePost._embedded["wp:featuredmedia"]["0"]
                              .source_url
                          }
                          excerpt={catThreePost.acf.excerpt}
                          writer={catThreePost.acf.writer[0].post_title}
                          byline={catThreePost.acf.writer[0].post_title}
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
    `${Config.apiUrl}/wp-json/wp/v2/articles?categories=${categoryOne}&_embed&per_page=6`
  );
  const catOnePosts = await postQueryOne.json();

  //cat two
  const categoryTwo = page.acf.home_category_two[0].term_id;
  const postQueryTwo = await fetch(
    `${Config.apiUrl}/wp-json/wp/v2/articles?categories=${categoryTwo}&_embed&per_page=6`
  );
  const catTwoPosts = await postQueryTwo.json();

  //cat three
  const categoryThree = page.acf.home_category_three[0].term_id;
  const postQueryThree = await fetch(
    `${Config.apiUrl}/wp-json/wp/v2/articles?categories=${categoryThree}&_embed&per_page=6`
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
