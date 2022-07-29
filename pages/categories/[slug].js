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
import styled from "styled-components";
import theme from "../../components/Global/Theme";

const CategoryH1 = styled.h1`
  color: ${theme.colours.soil};
  font-size: 3.4rem;
  text-align: left;
  width: 90%;
  margin: 0 auto;
`;

export default function CategoryPage({ category, posts, subcategories }) {
  const dynamicRoute = useRouter().asPath;
  const [subfilter, setSubfilter] = useState(null);
  const handleClick = (subIndex) => {
    setSubfilter(subIndex);
    console.log("subfilter: ", subfilter);
  };

  useEffect(() => {
    setSubfilter(null);
  }, [dynamicRoute]);

  return (
    <PageWrapper pageTitle={category.name} className="container pt-5">
      <CategoryH1
        className="text-center"
        dangerouslySetInnerHTML={{ __html: category.name }}
      ></CategoryH1>
      <hr />

      {/* if the category is either start small or voices, show the subcategory filter
      followed by all the articles in the category. no feature article.

      if the category is awards, show all articles using special awards card. no feature article

      all other categories show feature article followed by the rest of the articles
      */}
      {category.slug == "voices" || category.slug == "start-small" ? (
        <>
          <p>{subfilter}</p>
          <ArticleFilter subcategories={subcategories} onClick={handleClick} />
          <ul className="card--grid">
            {posts.map((post, index) => {
              return (
                <>
                  {post.categories && post.categories.includes(subfilter) ? (
                    <li key={uuidv4()}>
                      <ArticleCard
                        title={post.title.rendered}
                        slug={post.slug}
                        writer={post.acf.writer[0].post_title}
                        image={
                          post._embedded["wp:featuredmedia"]["0"].source_url
                        }
                        excerpt={post.acf.excerpt}
                        byline={post.acf.writer[0].post_title}
                        read={post.acf.time_to_read}
                        date={formattedDate}
                        headshot={post.acf.writer[0].acf.headshot.url}
                        categories={post._embedded["wp:term"]["0"]}
                      />
                    </li>
                  ) : subfilter == null ? (
                    <li key={uuidv4()}>
                      <ArticleCard
                        title={post.title.rendered}
                        slug={post.slug}
                        writer={post.acf.writer[0].post_title}
                        // categories={post.categories}
                        image={
                          post._embedded["wp:featuredmedia"]["0"].source_url
                        }
                        excerpt={post.acf.excerpt}
                        byline={post.acf.writer[0].post_title}
                        read={post.acf.time_to_read}
                        date={formattedDate}
                        headshot={post.acf.writer[0].acf.headshot.url}
                        categories={post._embedded["wp:term"]["0"]}
                      />
                    </li>
                  ) : null}
                </>
              );
            })}
          </ul>
        </>
      ) : category.slug == "awards" ? (
        <ul className="card--grid">
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
              <li key={uuidv4()}>
                <AwardWinnerCard
                  title={post.title.rendered}
                  slug={post.slug}
                  writer={post.acf.writer[0].post_title}
                  excerpt={post.acf.excerpt}
                  byline={post.acf.writer[0].post_title}
                  read={post.acf.time_to_read}
                  date={formattedDate}
                  headshot={post.acf.writer[0].acf.headshot.url}
                  categories={post._embedded["wp:term"]["0"]}
                />
              </li>
            );
          })}
        </ul>
      ) : (
        <>
          <CategoryFeaturedCard
            post={posts[0]}
            title={posts[0]?.title.rendered}
            slug={posts[0]?.slug}
            writer={posts[0]?.acf.writer[0].post_title}
          />
          <ul className="card--grid">
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
                  {index != 0 && (
                    <li key={uuidv4()}>
                      <ArticleCard
                        title={post.title.rendered}
                        slug={post.slug}
                        writer={post.acf.writer[0].post_title}
                        excerpt={post.acf.excerpt}
                        byline={post.acf.writer[0].post_title}
                        read={post.acf.time_to_read}
                        date={formattedDate}
                        headshot={post.acf.writer[0].acf.headshot.url}
                        categories={post._embedded["wp:term"]["0"]}
                        image={
                          post._embedded["wp:featuredmedia"]["0"].source_url
                        }
                      />
                    </li>
                  )}
                </>
              );
            })}
          </ul>
        </>
      )}
      <Link href="/">
        <a className="btn btn-primary">Back to Home</a>
      </Link>
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

  //use this to get only subcategories for cards
  const subcategoryQuery = await fetch(
    `${Config.apiUrl}/wp-json/wp/v2/categories?parent=${category?.id}`
  );
  const subcategories = await subcategoryQuery.json();

  const categoryPosts = await fetch(
    `${Config.apiUrl}/wp-json/wp/v2/articles?categories=${category?.id}&_embed`
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
