import styled from "styled-components";
import theme from "../../components/Global/Theme";
import React, { useState, useEffect } from "react";
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
      margin-left: 10px;
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
    position: relative;
    width: 30px;
    height: 30px;
    margin: 15px 0;
    ${theme.mediaQuery.sm`
margin: initial;
  `}
  }
`;

export default function TeamPage({ teamMember, posts }) {
  // let contribTag = tags.filter(
  //   (newTag) => newTag.name == teamMember.title.rendered
  // );

  const [contribPosts, setContribPosts] = useState([]);

  // useEffect(() => {
  //   async function loadLinks() {
  //     if (contribTag > 0) {
  //       const response = await fetch(
  //         `${Config.apiUrl}/wp-json/wp/v2/articles?_embed&tags=${contribTag[0].id}&per_page=100`
  //       );
  //       if (!response.ok) {
  //         // oops! something went wrong
  //         return;
  //       }
  //       const posts = await response.json();
  //       setContribPosts(posts);
  //     }
  //   }

  //   loadLinks();
  // }, [contribTag]);

  const fallbackImage =
    "https://www.asparagusmagazine.com/Asparagus_Tip_Logo.svg";

  console.log("team member posts: ", posts);

  return (
    <PageWrapper
      canonicalUrl={`https://asparagusmagazine.com/team/${teamMember.slug}`}
      ogImageUrl={teamMember.yoast_head_json.og_image}
      ogType={teamMember.yoast_head_json.og_type}
      ogTwitterImage={teamMember.yoast_head_json.twitter_card}
      SEOtitle={teamMember.title.rendered}
      metadescription={`${teamMember.title.rendered} - Meet the Asparagus Magazine Team `}
    >
      <div className="container pt-5">
        <h1 className="text-center pb-5">{teamMember.title.rendered}</h1>
        <hr />
        <ContribHeader>
          <div className="contrib--image">
            {teamMember.acf.headshot.url ? (
              <Image
                src={teamMember.acf.headshot.url}
                layout="fill"
                objectFit="cover"
                alt={`Team member ${teamMember.title.rendered}`}
              />
            ) : (
              <Image
                src="/singlestalk-square.svg"
                layout="responsive"
                height="100px"
                width="100px"
                alt="Contributor photo"
              />
            )}
          </div>
          <div className="contrib--details">
            {teamMember.acf.title && <h4>{teamMember.acf.title}</h4>}
            <div className="bio">
              <p>{teamMember.acf.bio}</p>
            </div>
            <div className="where-to-find">
              {teamMember.acf.which_social_network == "Instagram" ? (
                <a
                  href={teamMember.acf.social_media_link}
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className="icon">
                    <Image
                      src="/insta.png"
                      alt="Instagram logo and link"
                      layout="fill"
                    />
                  </div>
                </a>
              ) : teamMember.acf.which_social_network == "Twitter" ? (
                <a
                  href={teamMember.acf.social_media_link}
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className="icon">
                    <Image
                      src="/twitter.png"
                      alt="Twitter logo and link"
                      layout="fill"
                    />
                  </div>
                </a>
              ) : null}
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
        <ul className="card--grid single-page">
          {posts.length > 0
            ? posts.map((post, index) => {
                return (
                  <React.Fragment key={uuidv4()}>
                    <>
                      <ArticleCard post={post} />
                    </>
                  </React.Fragment>
                );
              })
            : null}
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
    fallback: "blocking",
  };
}

//access the router, get the id, and get the medatada for that post

export async function getStaticProps({ params }) {
  const teamMember = await getTeamMember(params.slug);

  const teamPosts = await fetch(
    `${Config.apiUrl}/wp-json/wp/v2/articles?_embed&tags=${teamMember.tags[0]}&per_page=100`
  );

  const posts = await teamPosts.json();

  const notFound = !teamMember;

  return {
    props: {
      teamMember,
      posts,
      // tags,
    },
    //revalidate: 600, // In seconds
    notFound,
  };
}
