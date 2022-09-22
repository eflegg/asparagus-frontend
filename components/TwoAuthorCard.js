import Link from "next/link";
import React from "react";
import styled from "styled-components";
import theme from "../components/Global/Theme";

const DoubleAuthor = styled.div`
  .article-details {
    display: flex;
    flex-direction: column;
    .byline--single-article {
      font-size: 1.6rem;
      font-weight: 700;
      &:first-child {
        margin-right: 5px;
      }
    }
  }
`;

export default function TwoAuthorCard({ post }) {
  let initialDate = post.date;
  let formattedDate = new Date(initialDate).toLocaleDateString("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  });
  return (
    <DoubleAuthor className="double-author">
      <div className="article-details">
        <div className="double-byline d-flex">
          {post.acf.writer[0].acf.contributor ? (
            <Link
              href={"/contributors/[slug]"}
              as={`/contributors/${post.acf.writer[0].post_name}`}
            >
              <a>
                <p className="byline--single-article">
                  {post.acf.writer[0].post_title},
                </p>
              </a>
            </Link>
          ) : (
            <Link
              href={"/team/[slug]"}
              as={`/team/${post.acf.writer[0].post_name}`}
            >
              <a>
                <p className="byline--single-article">
                  {post.acf.writer[0].post_title},
                </p>
              </a>
            </Link>
          )}
          {post.acf.secondary_author_name[0].acf.contributor ? (
            <Link
              href={"/contributors/[slug]"}
              as={`/contributors/${post.acf.secondary_author_name[0].post_name}`}
            >
              <a>
                <p className="byline--single-article">
                  {post.acf.secondary_author_name[0].post_title}
                </p>
              </a>
            </Link>
          ) : (
            <Link
              href={"/team/[slug]"}
              as={`/team/${post.acf.secondary_author_name[0].post_name}`}
            >
              <a>
                <p className="byline--single-article">
                  {post.acf.secondary_author_name[0].post_title}
                </p>
              </a>
            </Link>
          )}
        </div>
        <p className="date--single-article">
          {formattedDate} - <span>{post.acf.time_to_read} min read</span>
        </p>
      </div>
    </DoubleAuthor>
  );
}
