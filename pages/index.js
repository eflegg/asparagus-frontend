import React from "react";
import Image from "next/image";
import { Config } from "../config";
import fetch from "isomorphic-fetch";
import PageWrapper from "../components/Global/PageWrapper";
import Link from "next/link";
import ArticleCard from "../components/ArticleCard";
import AwardWinnerCard from "../components/AwardWinnerCard";

export default function Home({
  page,
  catOnePosts,
  catTwoPosts,
  catThreePosts,
}) {
  console.log("cat one posts: ", catOnePosts);
  console.log("cat two posts: ", catTwoPosts);
  console.log("cat three posts: ", catThreePosts);

  const ref = React.forwardRef();

  return (
    <>
      {" "}
      <PageWrapper pageTitle="Asparagus Magazine - Home">
        <main>
          <div className="cat-one--container">
            <h2>{page.acf.home_category_one[0].name}</h2>
            {catOnePosts.map((catOnePost, index) => {
              return (
                <>
                  {page.acf.home_category_one[0].name == "Awards" ? (
                    <AwardWinnerCard
                      key={index}
                      ref={ref}
                      slug={catOnePost.slug}
                      title={catOnePost.title.rendered}
                    />
                  ) : (
                    <ArticleCard
                      key={index}
                      ref={ref}
                      slug={catOnePost.slug}
                      title={catOnePost.title.rendered}
                    />
                  )}
                </>
              );
            })}
          </div>
          <div className="cat-two--container">
            <h2>{page.acf.home_category_two[0].name}</h2>
            {catTwoPosts.map((catTwoPost, index) => {
              return (
                <>
                  {page.acf.home_category_two[0].name == "Awards" ? (
                    <AwardWinnerCard
                      key={index}
                      ref={ref}
                      slug={catTwoPost.slug}
                      title={catTwoPost.title.rendered}
                    />
                  ) : (
                    <ArticleCard
                      key={index}
                      ref={ref}
                      slug={catTwoPost.slug}
                      title={catTwoPost.title.rendered}
                    />
                  )}
                </>
              );
            })}
          </div>
          <div className="cat-three--container">
            <h2>{page.acf.home_category_three[0].name}</h2>
            {catThreePosts.map((catThreePost, index) => {
              return (
                <>
                  {page.acf.home_category_three[0].name == "Awards" ? (
                    <AwardWinnerCard
                      key={index}
                      ref={ref}
                      slug={catThreePost.slug}
                      title={catThreePost.title.rendered}
                    />
                  ) : (
                    <ArticleCard
                      key={index}
                      ref={ref}
                      slug={catThreePost.slug}
                      title={catThreePost.title.rendered}
                    />
                  )}
                </>
              );
            })}
          </div>
        </main>
      </PageWrapper>
    </>
  );
}

export async function getStaticProps() {
  //query the home page to get the acf
  const pageQuery = await fetch(`${Config.apiUrl}/wp-json/wp/v2/pages/114`);
  const page = await pageQuery.json();

  //query posts whose categories match the three acf values

  //cat one
  const categoryOne = page.acf.home_category_one[0].term_id;
  const postQueryOne = await fetch(
    `${Config.apiUrl}/wp-json/wp/v2/articles?categories=${categoryOne}`
  );
  const catOnePosts = await postQueryOne.json();

  //cat two
  const categoryTwo = page.acf.home_category_two[0].term_id;
  const postQueryTwo = await fetch(
    `${Config.apiUrl}/wp-json/wp/v2/articles?categories=${categoryTwo}`
  );
  const catTwoPosts = await postQueryTwo.json();

  //cat three
  const categoryThree = page.acf.home_category_three[0].term_id;
  const postQueryThree = await fetch(
    `${Config.apiUrl}/wp-json/wp/v2/articles?categories=${categoryThree}`
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
