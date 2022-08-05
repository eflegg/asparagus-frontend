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
import PageWrapper from "../../components/Global/PageWrapper";
import { v4 as uuidv4 } from "uuid";

const ContribHeader = styled.div`
  margin: 0 auto 70px;
  width: 90%;
  max-width: 1000px;
  ${theme.mediaQuery.sm`
  width: 75%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 160px;
  `}
  .contrib--image {
    position: relative;
    overflow: hidden;
    margin: 10px auto 20px;
    width: 250px;
    height: 250px;
    border-radius: 50%;
    flex: none;
    ${theme.mediaQuery.sm`
    margin: initial;
 margin-right: 20px;
  `}
  }
  .where-to-find {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    ${theme.mediaQuery.sm`
flex-direction: row;
justify-content: flex-start;
  `}
  }
  .contrib-website {
    text-decoration: none;
    p {
      font-family: ${theme.type.semibold};
      font-size: 2rem;
      line-height: 2.2rem;
    }
  }
  h4 {
    color: ${theme.colours.soil};
    font-size: 2.8rem;
    line-height: 25px;
    text-align: center;
    margin-bottom: 30px;
    ${theme.mediaQuery.sm`
 text-align: left;
  `}
  }
  .icon {
    width: 30px;
    height: 30px;
    margin: 15px 0;
    ${theme.mediaQuery.sm`
margin: initial;
  `}
  }
`;

export default function TeamPage({ teamMember, posts }) {
  return (
    <PageWrapper
      SEOtitle={teamMember.title.rendered}
      metadescription={`${teamMember.title.rendered} - Meet the Asparagus Magazine Team `}
    >
      <div className="container pt-5">
        <h1 className="text-center pb-5">{teamMember.title.rendered}</h1>
        <hr />
        <ContribHeader>
          <div className="contrib--image">
            <Image
              src={teamMember._embedded["wp:featuredmedia"]["0"].source_url}
              layout="fill"
              objectFit="cover"
              alt="teamMember photo"
            />
          </div>
          <div className="contrib--details">
            {teamMember.acf.title && <h4>{teamMember.acf.title}</h4>}
            <div className="bio">
              <p>{teamMember.acf.bio}</p>
            </div>
            <div className="where-to-find">
              {teamMember.acf.which_social_media_network == "instagram" ? (
                <div className="icon">
                  <img src="/insta.png" />
                </div>
              ) : teamMember.acf.which_social_media_network == "twitter" ? (
                <div className="icon">
                  <img src="/twitter.png" />
                </div>
              ) : (
                <div className="icon">
                  <img src="/insta.png" />
                </div>
              )}
              <a
                className="contrib-website"
                href={`https://www.${teamMember.acf.website}`}
                rel="noreferrer"
                target="_blank"
              >
                <p>{teamMember.acf.website}</p>
              </a>
            </div>
          </div>
        </ContribHeader>
        <ul className="card--grid">
          {posts.map((post, index) => {
            return (
              <React.Fragment key={uuidv4()}>
                {post.acf.photographer[0]?.ID == teamMember.id ? (
                  <ArticleCard post={post} />
                ) : null}
                {post.acf.writer[0]?.ID == teamMember.id ? (
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
        </ul>
      </div>
    </PageWrapper>
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
