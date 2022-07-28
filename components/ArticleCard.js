import React, { useEffect, useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import theme from "../components/Global/Theme";
import PropTypes from "prop-types";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";

const Card = styled.div`
  position: relative;
  /* Vertical lines to the left of cells in the top row */
  &:nth-child(2)::before,
  &:nth-child(3)::before {
    content: "";
    position: absolute;
    top: 0px;
    left: -35px;
    height: calc(100% + 70px);
    border-left: 1px solid ${theme.colours.grey};
  }
  /* Vertical lines to the left of cells in all other rows */
  &:nth-child(3n + 5)::before,
  &:nth-child(3n + 6)::before {
    content: "";
    position: absolute;
    top: 0;
    left: -35px;
    height: 100%;
    border-left: 1px solid ${theme.colours.grey};
  }
  /* Horizontal lines above cells in the first column */
  &:nth-child(3n + 4)::after {
    content: "";
    position: absolute;
    top: -35px;
    left: 0;
    width: 100%;
    border-top: 1px solid ${theme.colours.grey};
  }
  /* Horizontal lines above cells in all other columns */
  &:nth-child(3n + 5)::after,
  &:nth-child(3n + 6)::after {
    content: "";
    position: absolute;
    top: -35px;
    left: -70px;
    width: calc(100% + 70px);
    border-top: 1px solid ${theme.colours.grey};
  }

  /* padding: 7%; */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .card--image {
    position: relative;
    height: 160px;
    top: 0;
  }

  .category-label {
    color: ${theme.colours.soil};
    text-transform: uppercase;
    font-size: 1.5rem;
    font-family: ${theme.type.semibold};
    padding: 0;
    &:first-child {
      &::after {
        content: "\\00B7";
        font-size: 40px;
        line-height: 5px;
        position: relative;
        top: 8px;
      }
    }
  }
  .article-details {
    display: flex;
    align-items: center;
  }
  .byline--image {
    position: relative;
    overflow: hidden;
    flex: none;
    width: 50px;
    height: 50px;
    background: slateblue;
    border-radius: 50%;
    margin-right: 10px;
  }
`;

// needs categories, reading time, date, image

export default function ArticleCard({
  title,
  slug,
  byline,
  excerpt,
  categories,
  image,
  date,
  read,
  headshot,
}) {
  return (
    <Card>
      <Link href={"/articles/[slug]"} as={`/articles/${slug}`}>
        <a>
          <div className="card--image">
            <Image
              src={image && image}
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
            dangerouslySetInnerHTML={{ __html: title }}
          ></h3>

          <p className="deck--article-card">{excerpt}</p>
          <div className="article-details">
            <div className="byline--image">
              {headshot && (
                <Image
                  src={headshot}
                  layout="fill"
                  objectFit="cover"
                  alt="Author headshot"
                />
              )}
            </div>
            <div>
              <p className="byline--article-card">{byline}</p>
              <p className="date--article-card">
                {date} - <span>{read} min read</span>
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
