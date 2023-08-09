import styled from "styled-components";
import theme from "../../components/Global/Theme";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { getContributor, getSlugs } from "../../utils/wordpress";
import { Config } from "../../config";
import fetch from "isomorphic-fetch";
import ArticleCard from "../../components/ArticleCard";
// import { ContribImage } from "../../components/Global/styles";
import PageWrapper from "../../components/Global/PageWrapper";
import { v4 as uuidv4 } from "uuid";

const ContribHeader = styled.div`
  margin: 0 auto 70px;
  width: 90%;
  max-width: 1000px;
  @media ${theme.devices.sm} {
    width: 75%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 160px;
  }
  .contrib--image {
    position: relative;
    overflow: hidden;
    margin: 10px auto 20px;
    width: 250px;
    height: 250px;
    border-radius: 50%;
    flex: none;
    @media ${theme.devices.sm} {
      margin: initial;
      margin-right: 20px;
    }
  }
  .where-to-find {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    @media ${theme.devices.sm} {
      flex-direction: row;
      justify-content: flex-start;
    }
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
    @media ${theme.devices.sm} {
      text-align: left;
    }
  }
  .icon {
    position: relative;
    width: 30px;
    height: 30px;
    margin: 15px 0;
    @media ${theme.devices.sm} {
      margin: initial;
    }
  }
`;

export default function ContributorPage({ contributor, tags, posts }) {
  console.log("contributor: ", contributor);
  console.log("contributor single posts ", posts);
  let contribTag = tags.filter(
    (newTag) => newTag.name == contributor.title.rendered
  );

  const [contribPosts, setContribPosts] = useState([]);

  useEffect(() => {
    async function loadLinks() {
      const response = await fetch(
        `${Config.apiUrl}/wp-json/wp/v2/articles?_embed&tags=${contribTag[0].id}&per_page=100`
      );
      if (!response.ok) {
        // oops! something went wrong
        return;
      }
      const posts = await response.json();
      setContribPosts(posts);
    }

    loadLinks();
  }, []);

  const fallbackImage =
    "https://www.asparagusmagazine.com/Asparagus_Tip_Logo.svg";

  return (
    <PageWrapper
      SEOtitle={contributor.title.rendered}
      metadescription={contributor.acf.bio}
      ogImageUrl={
        contributor.acf.headshot ? contributor.acf.headshot.url : fallbackImage
      }
      ogType={contributor.yoast_head_json.og_type}
      ogTwitterImage={
        contributor.acf.headshot ? contributor.acf.headshot.url : fallbackImage
      }
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
                    <Image
                      src="/insta.png"
                      alt="Instagram logo and link"
                      layout="fill"
                    />
                  </div>
                </a>
              ) : contributor.acf.which_social_media_network == "Twitter" ? (
                <a
                  href={contributor.acf.social_media_link}
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
              ) : // <a
              //   href={contributor.acf.social_media_link}
              //   target="_blank"
              //   rel="noreferrer"
              // >
              //   <div className="icon">
              //     <Image
              //       src="/insta.png"
              //       alt="Instagram logo and link"
              //       layout="fill"
              //     />
              //   </div>
              // </a>
              null}
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
          {contribPosts.map((post, index) => {
            return (
              <React.Fragment key={uuidv4()}>
                <>
                  <ArticleCard post={post} />
                </>
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

  const teamPosts = await fetch(
    `${Config.apiUrl}/wp-json/wp/v2/articles?_embed&tags=${contributor.tags[0]}&per_page=100`
  );

  const posts = await teamPosts.json();

  const allTagsQuery = await fetch(`${Config.apiUrl}/wp-json/wp/v2/tags`);
  const tags = await allTagsQuery.json();

  const notFound = !contributor;

  return {
    props: {
      contributor,
      posts,
      tags,
    },
    //revalidate: 1200, // In seconds
    notFound,
  };
}
