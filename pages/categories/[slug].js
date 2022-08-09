import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getCategory, getSlugs } from "../../utils/wordpress";
import { Config } from "../../config";
import { useRouter } from "next/router";
import fetch from "isomorphic-fetch";
import ArticleCard from "../../components/ArticleCard";
import AwardWinnerCard from "../../components/AwardWinnerCard";
import PageWrapper from "../../components/Global/PageWrapper";
import CategoryFeaturedCard from "../../components/CategoryFeaturedCard";
import ArticleFilter from "../../components/ArticleFilter";
import { v4 as uuidv4 } from "uuid";
import NewsletterSignup from "../../components/NewsletterSignupCard";
import styled from "styled-components";
import theme from "../../components/Global/Theme";

const CategoryH1 = styled.h1`
  width: 90%;
  margin: 0 auto;
`;

export default function CategoryPage({ category, posts, subcategories }) {
  const dynamicRoute = useRouter().asPath;
  const [subfilter, setSubfilter] = useState(null);
  const handleClick = (subIndex) => {
    setSubfilter(subIndex);
  };

  useEffect(() => {
    setSubfilter(null);
  }, [dynamicRoute]);

  // console.log("category: ", category);
  // console.log("posts: ", posts);
  return (
    <PageWrapper
      SEOtitle={category.name}
      metadescription={
        category.yoast_head_json.description
          ? category.yoast_head_json.title
          : "Telling the large and small stories of how we can live more sustainably"
      }
    >
      {/* if the category is either start small or voices, show the subcategory filter
      followed by all the articles in the category. no feature article.

      if the category is awards, show all articles using special awards card. no feature article

      all other categories show feature article followed by the rest of the articles
      */}
      <CategoryH1
        className="h5"
        dangerouslySetInnerHTML={{ __html: category.name }}
      ></CategoryH1>
      <hr />
      {category.slug == "voices" || category.slug == "start-small" ? (
        <>
          <p>{subfilter}</p>
          <ArticleFilter subcategories={subcategories} onClick={handleClick} subfilter={subfilter} />
          <div className="card--grid single-page">
            {posts.map((post, index) => {
              return (
                <React.Fragment key={uuidv4()}>
                  {post.categories && post.categories.includes(subfilter) ? (
                    <ArticleCard
                      post={post}
                      title={post.title.rendered}
                      slug={post.slug}
                      writer={post.acf.writer[0].post_title}
                    />
                  ) : subfilter == null ? (
                    <ArticleCard
                      post={post}
                      title={post.title.rendered}
                      slug={post.slug}
                      writer={post.acf.writer[0].post_title}
                    />
                  ) : null}
                </React.Fragment>
              );
            })}
          </div>
        </>
      ) : category.slug == "awards" ? (
        <div className="card--grid single-page">
          {posts.map((post, index) => {
            return (
              <React.Fragment key={uuidv4()}>
                <AwardWinnerCard post={post} />
              </React.Fragment>
            );
          })}
        </div>
      ) : (
        <>
          {posts ? <CategoryFeaturedCard post={posts[0]} /> : null}
          <div className="card--grid single-page">
            {posts.map((post, index) => {
              return (
                <React.Fragment key={uuidv4()}>
                  {index != 0 && <ArticleCard post={post} />}
                </React.Fragment>
              );
            })}
          </div>
          <NewsletterSignup
            title="Sign up for the Asparagus Newsletter"
            subtitle="Pleasantly infrequent updates from the asparagus patch"
            image="/triplestalk.svg"
          />
        </>
      )}
    </PageWrapper>
  );
}

export async function getStaticPaths() {
  const paths = await getSlugs("categories");

  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const category = await getCategory(params.slug);

  const subcategoryQuery = await fetch(
    `${Config.apiUrl}/wp-json/wp/v2/categories?parent=${category?.id}&_embed?per_page=100`
  );
  const subcategories = await subcategoryQuery.json();

  const categoryPosts = await fetch(
    `${Config.apiUrl}/wp-json/wp/v2/articles?_embed&categories=${category?.id}`
  );
  const posts = await categoryPosts.json();

  return {
    props: {
      category,
      subcategories,
      posts,
    },
    revalidate: 10, // In seconds
  };
}
