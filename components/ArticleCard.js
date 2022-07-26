import React, { useEffect, useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import theme from "../components/Global/Theme";
import PropTypes from "prop-types";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";

import { getContributors } from "../utils/wordpress";

const Card = styled.div`
  border: 2px solid ${theme.colours.grey};
  padding: 5%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .card--image {
    position: relative;
    height: 160px;
    top: 0;
  }
  h3 {
    font-size: 2.2rem;
  }

  .category-label {
    color: ${theme.colours.soil};
    text-transform: uppercase;
    font-size: 1.5rem;
    font-family: ${theme.type.halcyonSemibold};
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
    flex: none;
    width: 50px;
    height: 50px;
    background: slateblue;
    border-radius: 50%;
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
  bylineID,
  contributors,
}) {
  console.log("article card contribs: ", contributors);
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
          <h3 className="" dangerouslySetInnerHTML={{ __html: title }}></h3>

          <p className="excerpt">{excerpt}</p>
          <div className="article-details">
            <div className="byline--image"></div>
            <div>
              <p className="byline--article-card">{byline}</p>
              <p>
                {date} - <span>{read} min read</span>
              </p>
            </div>
          </div>
        </a>
      </Link>
    </Card>
  );
}

export async function getStaticProps({ params }) {
  const contributors = await getContributors();

  return {
    props: {
      contributors,
    },
    revalidate: 10, // In seconds
  };
}

ArticleCard.propTypes = {
  title: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  excerpt: PropTypes.string.isRequired,
  categories: PropTypes.array.isRequired,
};
