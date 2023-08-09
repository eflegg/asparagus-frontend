import Link from "next/link";
import styled from "styled-components";
import theme from "./Global/Theme";
import Image from "next/image";
import Byline from "./ArticleComponents/Byline";
import React from "react";

const Card = styled.div`
  // border: 4px solid ${theme.colours.gusGreen};
  margin-bottom: 30px;
  position: relative;
  width: 100%;
  h3.awards-hed {
    position: absolute;
    top: 220px;
    margin-left: 5%;
    width: 90%;
    color: white;
    z-index: 1;
    @media ${theme.devices.sm} {
      top: 100px;
    }
    @media ${theme.devices.md} {
      top: 170px;
      width: 80%;
    }
    @media ${theme.devices.lg} {
      top: 175px;
      width: 70%;
    }
  }
  .image-container {
    /* // border: solid blue; */
    position: relative;
    height: 50vh;
    min-height: 350px;
    object-fit: cover;
    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }
  .award-text-wrap {
    border: solid ${theme.colours.darkWheat};
    background-color: ${theme.colours.darkWheat};
  }
  .award-text {
    // border: 2px solid teal;
    margin-left: 5%;
    margin-top: 40px;
    margin-bottom: 40px;
    margin-right: 5%;
  }
  .award-text--lower {
    // border: solid black;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
    @media ${theme.devices.md} {
      flex-direction: row;
    }
  }
  .deck--topic-feature {
    margin-bottom: 20px;
  }

  .award-title {
    color: ${theme.colours.gusGreen};
    font-family: ${theme.type.italic};
    font-style: italic;
    margin: 20px 0 20px 0;
  }
  .article-details {
    // border: solid blue;
    .byline--image {
      margin-left: 10px;
    }
  }
  .award-graphic {
    position: absolute;
    top: 20px;
    right: 20px;
    height: 100px;
    width: 100px;
  }
`;

export default function AwardWinnerCard({ post }) {
  // console.log("award post: ", post);
  let initialDate = post.date;
  let formattedDate = new Date(initialDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });
  return (
    <Card>
      <Link href={"/articles/[slug]"} as={`/articles/${post.slug}`}>
        <a>
          <h3
            className="card-text awards-hed"
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          ></h3>
          <div className="image-container">
            {post._embedded["wp:featuredmedia"] ? (
              <Image
                src={post._embedded["wp:featuredmedia"]["0"].source_url}
                alt={post._embedded["wp:featuredmedia"]["0"].alt_text}
                layout="fill"
                objectFit="cover"
              />
            ) : (
              <Image
                src="/triplestalk.svg"
                layout="fill"
                objectFit="cover"
                alt="Author headshot"
              />
            )}
            {post.acf.award_graphic ? (
              <div className="award-graphic">
                <Image
                  src={post.acf.award_graphic.url}
                  alt={post.acf.award_graphic.alt}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            ) : null}
          </div>
        </a>
      </Link>
      <div className="award-text-wrap">
        <div className="award-text">
          <p className="deck--topic-feature">{post.acf.dek}</p>
          <div className="award-text--lower">
            <p className="award-title">{`${
              post.acf.award_title
                ? post.acf.award_title
                : post.acf.nominated_award_title + " (Finalist)"
            }`}</p>
            <Byline article={post} />
          </div>
        </div>
      </div>
    </Card>
  );
}
