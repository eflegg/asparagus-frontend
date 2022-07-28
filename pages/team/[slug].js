import styled from "styled-components";
import theme from "../../components/Global/Theme";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { getTeamMember, getSlugs } from "../../utils/wordpress";
import { Config } from "../../config";
import fetch from "isomorphic-fetch";
import ArticleCard from "../../components/ArticleCard";
import { ContribImage } from "../../components/Global/styles";

export default function TeamPage({ teamMember, posts }) {
  console.log("teamMember id: ", teamMember.id);

  // const ref = React.forwardRef(null);
  return (
    <div className="container pt-5">
      <h1>i am a single team member page</h1>
      <h1 className="text-center pb-5">{teamMember.title.rendered}</h1>
      <ContribImage team={true} className="contrib--image">
        <Image
          src={teamMember._embedded["wp:featuredmedia"]["0"].source_url}
          layout="fill"
          objectFit="cover"
          alt="teamMember photo"
        />
      </ContribImage>
      <p>{teamMember.id}</p>
      <div className="bio">
        <p>{teamMember.acf.bio}</p>
      </div>
      <ul className="card--grid">
        {posts.map((post, index) => {
          return (
            <>
              {post.acf.photographer[0]?.ID == teamMember.id ? (
                <ArticleCard
                  key={index}
                  title={post.title.rendered}
                  slug={post.slug}
                  writer={post.acf.writer[0].post_title}
                  // categories={post.categories}
                />
              ) : null}
              {post.acf.writer[0]?.ID == teamMember.id ? (
                <React.Fragment key={index}>
                  <ArticleCard
                    title={post.title.rendered}
                    slug={post.slug}
                    writer={post.acf.writer[0].post_title}
                    // categories={post.categories}
                    image={post._embedded["wp:featuredmedia"]["0"].source_url}
                  />
                </React.Fragment>
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
  const paths = await getSlugs("team_members");

  return {
    paths,
    //this option below renders in the server (at request time) pages that were not rendered at build time
    //e.g when a new blogpost is added to the app
    fallback: "blocking",
  };
}

//access the router, get the id, and get the medatada for that post

export async function getStaticProps({ params }) {
  const teamMember = await getTeamMember(params.slug);
  const teamMemberPosts = await fetch(
    // `${Config.apiUrl}/wp-json/wp/v2/articles?writer=${contributor.id}`
    // @erin this should work, come back to it
    `${Config.apiUrl}/wp-json/wp/v2/articles?_embed`
  );

  const posts = await teamMemberPosts.json();

  return {
    props: {
      teamMember,
      posts,
    },
    revalidate: 10, // In seconds
  };
}
