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

  const subcategories = categories.filter(
    (subCat) =>
      subCat.id !== 6 &&
      subCat.id !== 7 &&
      subCat.id !== 8 &&
      subCat.id !== 9 &&
      subCat.id !== 10
  );

  let initialDate = post.date;
  let formattedDate = new Date(initialDate).toLocaleDateString("en-US", {
    month: "long",
    day: "2-digit",
  });
  return (
    <Card>
      <div className="card--inner">
        <div>
          <Link href={"/articles/[slug]"} as={`/articles/${post.slug}`}>
            <a>
              <div className="card--image">
                {post._embedded["wp:featuredmedia"] ? (
                  <Image
                    src={post._embedded["wp:featuredmedia"]["0"].source_url}
                    layout="fill"
                    objectFit="cover"
                    alt={post._embedded["wp:featuredmedia"]["0"].alt_text}
                  />
                ) : (
                  <Image
                    src="/triplestalk.svg"
                    layout="fill"
                    objectFit="cover"
                    alt="Asparagus Magazine logo"
                  />
                )}
              </div>
            </a>
          </Link>
          <div className="categories">
            {subcategories &&
              subcategories.slice(0, 2).map((category, index) => {
                return (
                  <React.Fragment key={uuidv4()}>
                    <Link
                      href={"/categories/[slug]"}
                      as={`/categories/${category.slug}`}
                    >
                      <a
                        className="category-label"
                        dangerouslySetInnerHTML={{ __html: category.name }}
                      ></a>
                    </Link>
                  </React.Fragment>
                );
              })}
          </div>
          <Link href={"/articles/[slug]"} as={`/articles/${post.slug}`}>
            <a>
              <h3
                className="head--article-card"
                dangerouslySetInnerHTML={{ __html: post.title.rendered }}
              ></h3>
              <hr className="hr--article-card"/>
              <p className="deck--article-card">{post.acf.dek}</p>
            </a>
          </Link>{" "}
        </div>
        <div className="article-details">
          <div className="byline--image">
            {post.acf.writer[0].acf.headshot.url ? (
              <Image
                src={post.acf.writer[0].acf.headshot.url}
                layout="fill"
                objectFit="cover"
                alt="Author headshot"
              />
            ) : null}
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
      </div>
    </Card>
  );
}

ArticleCard.propTypes = {
  post: PropTypes.object.isRequired,
};
