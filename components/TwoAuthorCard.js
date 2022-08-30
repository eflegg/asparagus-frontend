import Link from "next/link";
import React from "react";
import styled from "styled-components";
import theme from "../components/Global/Theme";

const DoubleAuthor = styled.div``;

export default function TwoAuthorCard({ post }) {
  //added in the date formatting so you can use the formattedDate variable
  let initialDate = post.date;
  let formattedDate = new Date(initialDate).toLocaleDateString("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  });
  return (
    <DoubleAuthor className="double-author">
      {post.acf.writer[0].acf.contributor ? (
        <Link
          href={"/contributors/[slug]"}
          as={`/contributors/${post.acf.writer[0].post_name}`}
        >
          <div className="article-details">
            <p className="byline--single-article">
              {post.acf.writer[0].post_title}
            </p>
            <p className="byline--single-article">
              {post.acf.secondary_author[0].post_title}
            </p>
            <p className="date--article-card">
              {formattedDate} - <span>{post.acf.time_to_read} min read</span>
            </p>
          </div>
        </Link>
      ) : (
        <Link
          href={"/team/[slug]"}
          as={`/team/${post.acf.writer[0].post_name}`}
        >
          <div className="article-details">
            <p className="byline--single-article">
              {post.acf.writer[0].post_title}
            </p>
            <p>{post.acf.secondary_author[0].post_title}</p>
            <p className="date--article-card">
              {formattedDate} - <span>{post.acf.time_to_read} min read</span>
            </p>
          </div>
        </Link>
      )}
    </DoubleAuthor>
  );
}
