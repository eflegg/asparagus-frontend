import styled from "styled-components";
import theme from "../../components/Global/Theme";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { getContributor, getSlugs } from "../../utils/wordpress";
import { Config } from "../../config";
import fetch from "isomorphic-fetch";
import ArticleCard from "../../components/ArticleCard";
import { ContribImage } from "../../components/Global/styles";

export default function ContributorPage({ contributor, posts }) {
  console.log("contributor id: ", contributor.id);
  console.log("posts: ", posts);
  // const ref = React.forwardRef(null);
  return (
    <div className="container pt-5">
      <h1 className="text-center pb-5">{contributor.title.rendered}</h1>
      <ContribImage className="contrib--image">
        <Image
          src={contributor._embedded["wp:featuredmedia"]["0"].source_url}
          layout="fill"
          objectFit="cover"
          alt="Contributor photo"
        />
      </ContribImage>
      <p>{contributor.id}</p>
      <div className="bio">
        <p>{contributor.acf.bio}</p>
      </div>
      <ul className="card--grid">
        {posts.map((post, index) => {
          return (
            <>
              {post.acf.photographer[0]?.ID == contributor.id ? (
                <>
                  <ArticleCard
                    key={index}
                    title={post.title.rendered}
                    slug={post.slug}
                    writer={post.acf.writer[0].post_title}
                    // categories={post.categories}
                    image={post._embedded["wp:featuredmedia"]["0"].source_url}
                  />
                </>
              ) : null}
              {post.acf.writer[0]?.ID == contributor.id ? (
                <>
                  <ArticleCard
                    key={index}
                    title={post.title.rendered}
                    slug={post.slug}
                    writer={post.acf.writer[0].post_title}
                    // categories={post.categories}
                    image={post._embedded["wp:featuredmedia"]["0"].source_url}
                  />
                </>
              ) : null}
            </>
          );
        })}
      </ul>

      <Link href="/">
        <a className="btn btn-primary">Back to Home</a>
      </Link>
    </div>
  );
}

//hey Next, these are the possible slugs
export async function getStaticPaths() {
  const paths = await getSlugs("contributors");

  return {
    paths,
    //this option below renders in the server (at request time) pages that were not rendered at build time
    //e.g when a new blogpost is added to the app
    fallback: "blocking",
  };
}

//access the router, get the id, and get the medatada for that post

export async function getStaticProps({ params }) {
  const contributor = await getContributor(params.slug);
  const contributorPosts = await fetch(
    // `${Config.apiUrl}/wp-json/wp/v2/articles?writer=${contributor.id}`
    // @erin this should work, come back to it
    `${Config.apiUrl}/wp-json/wp/v2/articles?_embed`
  );

  const posts = await contributorPosts.json();

  return {
    props: {
      contributor,
      posts,
    },
    revalidate: 10, // In seconds
  };
}
