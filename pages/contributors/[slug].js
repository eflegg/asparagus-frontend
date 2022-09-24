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
    width: 30px;
    height: 30px;
    margin: 15px 0;
    ${theme.mediaQuery.sm`
margin: initial;
  `}
  }
`;

export default function ContributorPage({ contributor, posts }) {
  console.log("contributor id: ", contributor.id);
  console.log("contributor posts: ", posts);

  return (
    <PageWrapper
      SEOtitle={contributor.title.rendered}
      metadescription={contributor.acf.bio}
    >
      <div className="container pt-5">
        <h1 className="text-center pb-5">{contributor.title.rendered}</h1>
        <hr />

        <ContribHeader>
          <div className="contrib--image">
            {contributor.acf.headshot ? (
              <Image
                src={contributor.acf.headshot.url}
                layout="fill"
                objectFit="cover"
                alt="Contributor photo"
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
            {contributor.acf.title && <h4>{contributor.acf.title}</h4>}
            <div className="bio">
              <p>{contributor.acf.bio}</p>
            </div>

            <div className="where-to-find">
              {contributor.acf.which_social_media_network === "Instagram" ? (
                <a
                  href={contributor.acf.social_media_link}
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className="icon">
                    <img src="/insta.png" />
                  </div>
                </a>
              ) : contributor.acf.which_social_media_network == "Twitter" ? (
                <a
                  href={contributor.acf.social_media_link}
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className="icon">
                    <img src="/twitter.png" />
                  </div>
                </a>
              ) : (
                <a
                  href={contributor.acf.social_media_link}
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className="icon">
                    <img src="/insta.png" />
                  </div>
                </a>
              )}
              <a
                className="contrib-website"
                href={`https://${contributor.acf.website}`}
                rel="noreferrer"
                target="_blank"
              >
                <p>{contributor.acf.website}</p>
              </a>
            </div>
          </div>
        </ContribHeader>
        <div className="card--grid single-page">
          {posts.map((post, index) => {
            return (
              <React.Fragment key={uuidv4()}>
                {post.acf.photographer[0]?.ID == contributor.id ? (
                  <>
                    <ArticleCard post={post} />
                  </>
                ) : null}
                {post.acf.writer[0]?.ID == contributor.id ? (
                  <>
                    <ArticleCard post={post} />
                  </>
                ) : null}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </PageWrapper>
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
    `${Config.apiUrl}/wp-json/wp/v2/articles?_embed&per_page=300`
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
