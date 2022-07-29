import React, { useEffect, useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import theme from "../components/Global/Theme";
import PropTypes from "prop-types";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import { Card } from "../components/Global/styles";

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
        <a className="card--inner">
          <div>
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
          </div>
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
