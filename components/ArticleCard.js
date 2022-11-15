import React from "react";
import Link from "next/link";

import PropTypes from "prop-types";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import { Card } from "../components/Global/styles";
import Byline from "./ArticleComponents/Byline";

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

  let initialDate = post.acf.publication_date;
  // console.log("date: ", initialDate);
  let formattedDate = new Date(initialDate).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  // console.log("formatted date: ", formattedDate);
  return (
    <Card className="article-card">
      <div className="card--inner">
        <div>
          <Link href={"/articles/[slug]"} as={`/articles/${post.slug}`}>
            <a
              aria-label={`Read the rest of the article ${post.title.rendered} `}
            >
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
              <hr className="hr--article-card" />
              <p className="deck--article-card">{post.acf.dek}</p>
            </a>
          </Link>{" "}
        </div>
        <Byline article={post} />
      </div>
    </Card>
  );
}

ArticleCard.propTypes = {
  post: PropTypes.object.isRequired,
};
