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

export default function CategoryPage({ category, posts, subcategories }) {
  // console.log("post categories: ", posts[1].categories);
  // console.log("category: ", category);
  // console.log("subcats: ", subcategories);
  // console.log("subcat id:", subcategories[0].id);

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
      <h1
        className="text-center"
        dangerouslySetInnerHTML={{ __html: category.name }}
      ></h1>

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
                        post={post}
                        title={post.title.rendered}
                        slug={post.slug}
                        writer={post.acf.writer[0].post_title}
                      />
                    </li>
                  ) : subfilter == null ? (
                    <li key={uuidv4()}>
                      <ArticleCard
                        post={post}
                        title={post.title.rendered}
                        slug={post.slug}
                        writer={post.acf.writer[0].post_title}
                      />
                    </li>
                  ) : null}
                </>
              );
            })}
          </ul>
        </>
      ) : category.slug == "awards" ? (
        <ul className="card--grid single-page">
          {posts.map((post, index) => {
            return (
              <li key={uuidv4()}>
                <AwardWinnerCard
                  title={post.title.rendered}
                  slug={post.slug}
                  writer={post.acf.writer[0].post_title}
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
              return (
                <>
                  {index != 0 && (
                    <li key={uuidv4()}>
                      <ArticleCard
                        post={post}
                        title={post.title.rendered}
                        slug={post.slug}
                        writer={post.acf.writer[0].post_title}
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

  const subcategoryQuery = await fetch(
    `${Config.apiUrl}/wp-json/wp/v2/categories?parent=${category?.id}`
  );
  const subcategories = await subcategoryQuery.json();

  const categoryPosts = await fetch(
    `${Config.apiUrl}/wp-json/wp/v2/articles?categories=${category?.id}`
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
