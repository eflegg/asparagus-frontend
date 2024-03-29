import React from "react";
import Image from "next/image";
import styled from "styled-components";
import theme from "./Global/Theme";
import Link from "next/link";
import TwoAuthorCard from "./TwoAuthorCard";

const LeadStory = styled.section`
  margin-top: 90px;
  margin-bottom: 50px;
  position: relative;
  display: flex;
  flex-direction: column;
  @media ${theme.devices.md} {
    flex-direction: row;
    margin-bottom: 80px;
    margin-top: 35px;
  }

  .lead-image {
    height: 400px;
    width: 100%;
    position: relative;
    @media ${theme.devices.md} {
      width: 60%;
      height: initial;
    }
  }
  .lead-text {
    padding: 30px;
    width: 100%;
    text-align: left;
    position: relative;
    background: ${theme.colours.darkWheat};
    @media ${theme.devices.md} {
      width: 40%;
    }
    h1 {
      position: absolute;
      top: 0;
      transform: translateY(-110%);
      color: white;
      @media ${theme.devices.md} {
        transform: translateY(0);
        position: relative;
        color: ${theme.colours.gusGreen};
      }
    }
    hr {
      display: none;
      @media ${theme.devices.md} {
        display: block;

        height: 4px;
        border: 0px;
        margin: 20px 0px;
        background-color: ${theme.colours.soil};
      }
    }
    .lead-text--inner {
      .article-details {
        margin: 10px 0;
        align-items: flex-start;
        p {
          margin: 0 5px 0 0;
        }
      }
      display: flex;
      flex-direction: column-reverse;
      @media ${theme.devices.md} {
        flex-direction: column;
      }
    }
    .lead-story--excerpt {
      font-size: 2.4rem;
      line-height: 4rem;
      width: 80%;
      margin-left: auto;
    }
  }
  .byline--index-feature {
    position: relative;
    span {
      &::before {
        content: "\\00B7";
        font-size: 40px;
        line-height: 5px;
        position: relative;
        top: 8px;
      }
    }
  }
`;

export default function LeadStoryBlock({ post }) {
  let initialDate = post.acf.publication_date;
  let formattedDate = new Date(initialDate).toLocaleDateString("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  });

  return (
    <LeadStory>
      <div className="lead-image">
        {post._embedded["wp:featuredmedia"] ? (
          <Image
            src={post._embedded["wp:featuredmedia"]["0"].source_url}
            layout="fill"
            objectFit="cover"
            alt={post._embedded["wp:featuredmedia"]["0"].alt_text}
            priority={true}
          />
        ) : null}
      </div>
      <div className="lead-text">
        <Link href={"/articles/[slug]"} as={`/articles/${post.slug}`}>
          <a>
            <h1
              dangerouslySetInnerHTML={{ __html: post.title.rendered }}
              className="article--title"
            ></h1>
          </a>
        </Link>
        <div className="lead-text--inner">
          {post.acf.secondary_author == "Yes" ? (
            <TwoAuthorCard post={post} />
          ) : post.acf.writer[0].acf.contributor ? (
            <Link
              href={"/contributors/[slug]"}
              as={`/contributors/${post.acf.writer[0].post_name}`}
            >
              <a>
                <div className="lead-story--details">
                  <p className="byline--index-feature">
                    {post.acf.writer[0].post_title}
                  </p>
                  <p className="byline--index-feature">
                    {formattedDate}{" "}
                    <span> {post.acf.time_to_read} min read</span>
                  </p>
                </div>
              </a>
            </Link>
          ) : (
            <div className="lead-story--details">
              <Link
                href={"/team/[slug]"}
                as={`/team/${post.acf.writer[0].post_name}`}
              >
                <a>
                  <p className="byline--index-feature">
                    {post.acf.writer[0].post_title}
                  </p>
                </a>
              </Link>
              <p className="byline--index-feature">
                {formattedDate} <span> {post.acf.time_to_read} min read</span>
              </p>
            </div>
          )}

          <hr />
          <p className="text-right deck--index-feature">{post.acf.dek}</p>
        </div>
      </div>
    </LeadStory>
  );
}
