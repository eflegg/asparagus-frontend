import React from "react";
import Link from "next/link";
import { getCategory, getSlugs } from "../../utils/wordpress";
import { Config } from "../../config";
import fetch from "isomorphic-fetch";
import ArticleCard from "../../components/ArticleCard";
import AwardWinnerCard from "../../components/AwardWinnerCard";
import PageWrapper from "../../components/Global/PageWrapper";

export default function CategoryPage({ category, posts }) {
  console.log("posts: ", posts);
  console.log("category: ", category);

  // const ref = React.forwardRef(null);
  return (
    <PageWrapper pageTitle={category.name} className="container pt-5">
      <h1
        className="text-center"
        dangerouslySetInnerHTML={{ __html: category.name }}
      ></h1>
      {category.slug == "awards" ? (
        <ul>
          {posts.map((post, index) => {
            return (
              <li key={index}>
                <AwardWinnerCard
                  // ref={ref}
                  title={post.title.rendered}
                  slug={post.slug}
                />
              </li>
            );
          })}
        </ul>
      ) : category.slug == "past-issues" ? (
        <h2>past issues cards that link through to single issue.</h2>
      ) : (
        <ul className="card--grid">
          {posts.map((post, index) => {
            return (
              <li key={index}>
                <ArticleCard
                  // refprop={ref}
                  title={post.title.rendered}
                  slug={post.slug}
                />
              </li>
            );
          })}
        </ul>
      )}
      <Link href="/">
        <a className="btn btn-primary">Back to Home</a>
      </Link>
    </PageWrapper>
  );
}

//hey Next, these are the possible slugs
export async function getStaticPaths() {
  const paths = await getSlugs("categories");

  return {
    paths,
    //this option below renders in the server (at request time) pages that were not rendered at build time
    //e.g when a new blogpost is added to the app
    fallback: "blocking",
  };
}

//access the router, get the id, and get the data for that post
export async function getStaticProps({ params }) {
  const category = await getCategory(params.slug);
  const categoryPosts = await fetch(
    // `${Config.apiUrl}/wp-json/wp/v2/articles?categories=11`
    `${Config.apiUrl}/wp-json/wp/v2/articles?categories=${category?.id}`
  );
  const posts = await categoryPosts.json();

  return {
    props: {
      category,
      posts,
    },
    revalidate: 10, // In seconds
  };
}
