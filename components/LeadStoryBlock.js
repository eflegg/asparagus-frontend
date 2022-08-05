import React from "react";
import Image from "next/image";
import styled from "styled-components";
import theme from "../components/Global/Theme";
import Link from "next/link";

const LeadStory = styled.section`
  margin-bottom: 50px;
  position: relative;
  display: flex;
  flex-direction: column;
  ${theme.mediaQuery.md`
  flex-direction: row;
  margin-bottom: 80px;
  `}

  .lead-image {
    height: 400px;
    width: 100%;
    position: relative;
    ${theme.mediaQuery.md`
    width: 60%;
    height: initial;
    `}
  }
  .lead-text {
    padding: 30px;
    width: 100%;
    text-align: left;
    position: relative;
    background: ${theme.colours.darkWheat};
    ${theme.mediaQuery.md`
    width: 40%;
  
    `}
    h1 {
      position: absolute;
      top: 0;
      transform: translateY(-110%);
      color: white;
      ${theme.mediaQuery.md`
      transform: translateY(0);
      position: relative;
      color: ${theme.colours.gusGreen};
      `}
    }
    hr {
      display: none;
      ${theme.mediaQuery.md`
        display: block;
  
        height: 4px;
        border: 0px;
        margin: 20px 0px;
        background-color: ${theme.colours.soil};
    `}
    }
    .lead-text--inner {
      display: flex;
      flex-direction: column-reverse;
      ${theme.mediaQuery.md`
  
  flex-direction: column;
  `}
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
  let initialDate = post.date;
  let formattedDate = new Date(initialDate).toLocaleDateString("en-US", {
    month: "long",
    day: "2-digit",
  });
  return (
    <LeadStory>
      <div className="lead-image">
        <Image
          src={post._embedded["wp:featuredmedia"]["0"].source_url}
          layout="fill"
          objectFit="cover"
          alt="Contributor photo"
        />
      </div>
      <div className="lead-text">
        <Link href={"/articles/[slug]"} as={`/articles/${post.slug}`}>
          <a>
            <h1>{post.title.rendered}</h1>
          </a>
        </Link>
        <div className="lead-text--inner">
          <div className="">
            <p className="byline--index-feature">
              {post.acf.writer[0].post_title}
            </p>
            <p className="byline--index-feature">
              {formattedDate} <span> {post.acf.time_to_read} min read</span>
            </p>
          </div>

          <hr />
          <p className="text-right deck--index-feature">{post.acf.dek}</p>
        </div>
      </div>
    </LeadStory>
  );
}
