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

const CategoryContainer = styled.section``;

export default function Home({
  page,
  catOnePosts,
  catTwoPosts,
  catThreePosts,
}) {
  console.log("cat one posts: ", catOnePosts);
  console.log("cat two posts: ", catTwoPosts);
  console.log("cat three posts: ", catThreePosts);

  // const ref = React.forwardRef(null);

  return (
    <>
      <PageWrapper pageTitle="Asparagus Magazine - Home">
        <main>
          <CategoryContainer className="cat-one--container">
            <h2>{page.acf.home_category_one[0].name}</h2>
            <div className="card--grid">
              {catOnePosts.map((catOnePost, index) => {
                return (
                  <>
                    {page.acf.home_category_one[0].name == "Awards" ? (
                      <React.Fragment key={index}>
                        <AwardWinnerCard
                          // ref={ref}
                          slug={catOnePost.slug}
                          title={catOnePost.title.rendered}
                        />
                      </React.Fragment>
                    ) : (
                      <React.Fragment key={index}>
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
          <CategoryContainer className="cat-two--container">
            <h2>{page.acf.home_category_two[0].name}</h2>
            <div className="card--grid">
              {catTwoPosts.map((catTwoPost, index) => {
                return (
                  <>
                    {page.acf.home_category_two[0].name == "Awards" ? (
                      <React.Fragment key={index}>
                        <AwardWinnerCard
                          // ref={ref}
                          slug={catTwoPost.slug}
                          title={catTwoPost.title.rendered}
                        />
                      </React.Fragment>
                    ) : (
                      <React.Fragment key={index}>
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
                      <React.Fragment key={index}>
                        <AwardWinnerCard
                          // ref={ref}
                          slug={catThreePost.slug}
                          title={catThreePost.title.rendered}
                        />
                      </React.Fragment>
                    ) : (
                      <React.Fragment key={index}>
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
  // const page = await pageQuery.text();
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

  return {
    props: {
      page: page,
      catOnePosts: catOnePosts,
      catTwoPosts: catTwoPosts,
      catThreePosts: catThreePosts,
    },
  };
}
