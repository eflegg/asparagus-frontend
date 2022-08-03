import React, { useEffect, useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import theme from "../components/Global/Theme";
import PropTypes from "prop-types";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import { Card } from "../components/Global/styles";

export default function ArticleCard({ post }) {
  const categories = post._embedded["wp:term"]["0"];
  let initialDate = post.date;
  let formattedDate = new Date(initialDate).toLocaleDateString("en-US", {
    month: "long",
    day: "2-digit",
  });
  return (
    <Card>
      <Link href={"/articles/[slug]"} as={`/articles/${post.slug}`}>
        <a className="card--inner">
          <div>
            <div className="card--image">
              <Image
                src={post._embedded["wp:featuredmedia"]["0"].source_url}
                layout="fill"
                objectFit="cover"
                alt="Article lead photo"
              />
            </div>

            <div className="categories">
              {categories &&
                categories.map((category, index) => {
                  return (
                    <>
                      {index <= 1 ? (
                        <a
                          className="category-label"
                          href={category.slug}
                          key={uuidv4()}
                          dangerouslySetInnerHTML={{ __html: category.name }}
                        ></a>
                      ) : null}
                    </>
                  );
                })}
            </div>
            <h3
              className="head--article-card"
              dangerouslySetInnerHTML={{ __html: post.title.rendered }}
            ></h3>

            <p className="deck--article-card">{post.acf.dek}</p>
          </div>
          <div className="article-details">
            <div className="byline--image">
              {post.acf.writer[0].acf.headshot.url && (
                <Image
                  src={post.acf.writer[0].acf.headshot.url}
                  layout="fill"
                  objectFit="cover"
                  alt="Author headshot"
                />
              )}
            </div>
            <div>
              <p className="byline--article-card">
                {post.acf.writer[0].post_title}
              </p>
              <p className="date--article-card">
                {formattedDate} - <span>{post.acf.time_to_read} min read</span>
              </p>
            </div>
          </div>
        </a>
      </Link>
    </Card>
  );
}

ArticleCard.propTypes = {
  title: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  excerpt: PropTypes.string.isRequired,
  categories: PropTypes.array.isRequired,
};
