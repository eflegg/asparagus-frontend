import RelatedPosts from "../../components/ArticleComponents/RelatedPosts";
import PageWrapper from "../../components/Global/PageWrapper";
import {
  getArticle,
  getArticles,
  getSlugs,
  getCategories,
} from "../../utils/wordpress";
import styled from "styled-components";
import theme from "../../components/Global/Theme";
import Head from "next/head";
import Image from "next/image";
import SupportCard from "../../components/SupportCard";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
} from "next-share";
import { v4 as uuidv4 } from "uuid";
import React from "react";

const SingleContainer = styled.div`
  height: 100%;

  figure {
    text-align: center;
    margin: 50px auto;
    &.size-large {
      img {
        height: 100%;
        width: 100%;
      }
    }
  }
  figcaption {
    &.credit {
      position: absolute;
      bottom: -30px;
    }
    width: 90%;
    margin: 8px auto 0;
    font-family: ${theme.type.accent};
    font-size: 1.6rem;
    &.caption {
      position: absolute;

      bottom: -85px;
      p {
        font-size: 1.6rem;
        margin-left: 0px;
        font-family: ${theme.type.header};
        font-style: italic;
        font-weight: 700;
      }
    }
    strong {
      font-family: ${theme.type.header};
      font-style: italic;
      position: relative;
      top: 5px;
    }
  }
  li {
    margin: 0 auto 20px;
    width: 90%;
    max-width: 650px;
  }
  p {
    width: 90%;
    max-width: 650px;
    margin: 17px auto;

    ${theme.mediaQuery.sm`
       margin: 25px auto;
    `}
  }
  h2 {
    width: 90%;
    max-width: 650px;
    margin: 30px auto 20px;
    color: ${theme.colours.gusGreen};
    font-size: 1.8rem;
    ${theme.mediaQuery.sm`
      font-size: 2.3rem;
    `}
    ${theme.mediaQuery.md`
       font-size: 2.8rem;
    `}
  }
  .related--header {
    width: 90%;
    margin: 50px auto 0;
    line-height: 100%;
  }
  .content--container {
  }
  .print-details {
    width: 90%;
    max-width: 650px;
    margin: 45px auto;
    p {
      margin: 5px 0;
      font-style: italic;
      font-weight: 600;
    }
  }

  .share-block {
    width: 90%;
    max-width: 650px;
    margin: 45px auto;
    svg {
      circle {
        fill: transparent;
      }
      path {
        fill: ${theme.colours.soil};
      }
    }
    .share {
      font-family: ${theme.type.semibold};
      font-size: 1.8rem;
    }
  }
`;

const SingleHero = styled.div`
  margin-bottom: 100px;
  .categories {
    width: 90%;
    margin: 0 auto;
    h5 {
      margin-right: 10px;
      &:first-child {
        &::after {
          content: "\\00B7";
          font-size: 40px;
          line-height: 5px;
          position: relative;
          top: 3px;
          left: 3px;
        }
      }
    }
  }
  .hero {
    width: 100%;
    display: flex;
    flex-direction: column-reverse;
    ${theme.mediaQuery.sm`
    flex-direction: row;
    width: 95%;
    max-width: 1500px;
    margin: 0 auto;
    `}
    .hero--image {
      width: 100%;
      height: 450px;
      ${theme.mediaQuery.sm`
      width: 57%;
      flex: none;
      `}
      .hero--right--inner {
        /* height: 500px; */
        position: relative;
      }
    }
    .hero--text {
      padding: 30px;
      ${theme.mediaQuery.sm`
      padding: 0px 20px 0 0;
      `}
    }
    .article-details {
      justify-content: flex-end;
      ${theme.mediaQuery.sm`
      justify-content: flex-start;
      `}
    }
  }

  hr {
    margin-bottom: 26px;
    ${theme.mediaQuery.md`
    margin-bottom: 38px;
    `}
  }
  .article--title {
    font-size: 2.6rem;
    ${theme.mediaQuery.md`
    font-size: 5.2rem;
    `}
  }
`;

export default function ArticlePage({ article, allArticles, categories }) {
  console.log("article: ", article);
  let initialDate = article.date;
  let formattedDate = new Date(initialDate).toLocaleDateString("en-US", {
    month: "long",
    day: "2-digit",
  });

  let subcategories = categories.filter((newCat) => newCat.parent !== 0);

  const postCategories = article._embedded["wp:term"]["0"].map((category) => {
    return category.name;
  });

  const matchingCats = [];
  subcategories.forEach((subcategory) => {
    if (postCategories.includes(subcategory.name)) {
      matchingCats.push(subcategory.name);
    }
  });

  return (
    <PageWrapper
      canonicalUrl={`https://asparagusmagazine.com/${article.slug}`}
      ogImageUrl={article.yoast_head_json.og_image}
      ogType={article.yoast_head_json.og_type}
      ogTwitterImage={article.yoast_head_json.twitter_card}
      SEOtitle={
        article.yoast_head_json.title
          ? article.yoast_head_json.title
          : "Asparagus Magazine"
      }
      metadescription={
        article.yoast_head_json.description
          ? article.yoast_head_json.title
          : "Telling the large and small stories of how we can live more sustainably"
      }
    >
      <SingleContainer itemscope itemtype="https://schema.org/Article">
        <SingleHero>
          <div className="d-flex categories">
            {matchingCats.slice(0, 2).map((cat, index) => {
              return (
                <React.Fragment key={uuidv4()}>
                  <h5
                    dangerouslySetInnerHTML={{ __html: cat }}
                    key={index}
                  ></h5>
                </React.Fragment>
              );
            })}
          </div>
          <hr />
          <div className="hero d-flex">
            <div className="hero--text">
              <h1 itempProp="name" className="article--title">
                {article.title.rendered}
              </h1>
              <p className="excerpt deck">{article.acf.dek}</p>
              <div className="article-details">
                <div className="byline--image">
                  {article.acf.writer[0].acf.headshot.url && (
                    <Image
                      src={article.acf.writer[0].acf.headshot.url}
                      layout="fill"
                      objectFit="cover"
                      alt="Author headshot"
                    />
                  )}
                </div>
                <div>
                  <p itemProp="author" className="byline">
                    {article.acf.writer[0].post_title}
                  </p>
                  <p itemProp="datePublished" className="date--single-article">
                    {formattedDate} -{" "}
                    <span>{article.acf.time_to_read} min read</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="hero--image position-relative">
              <div className="hero-right--inner">
                {article._embedded["wp:featuredmedia"] ? (
                  <Image
                    src={article._embedded["wp:featuredmedia"]["0"].source_url}
                    alt={article._embedded["wp:featuredmedia"]["0"].alt_text}
                    layout="fill"
                    objectFit="cover"
                  />
                ) : (
                  <Image
                    src="/triplestalk.svg"
                    layout="fill"
                    objectFit="cover"
                    alt="Asparagus Magazine logo"
                  />
                )}
                <figcaption className="credit ">
                  {article._embedded["wp:featuredmedia"]["0"].title.rendered}
                </figcaption>{" "}
                <strong>
                  <figcaption
                    className="caption "
                    dangerouslySetInnerHTML={{
                      __html:
                        article._embedded["wp:featuredmedia"]["0"].caption
                          .rendered,
                    }}
                  ></figcaption>
                </strong>
              </div>
            </div>
          </div>
        </SingleHero>
        <div
          className=""
          dangerouslySetInnerHTML={{ __html: article.content.rendered }}
        ></div>
        {article.acf.print_issue == "Yes" ? (
          <div className="print-details">
            <p className="content--container">
              Print Issue: <span>{article.acf.appears_in[0].post_title}</span>
            </p>
            <p className="content--container">
              Print Title: <span>{article.acf.print_title}</span>
            </p>
          </div>
        ) : null}
        <div
          itemProp="interactionType"
          content="https://schema.org/ShareAction"
          className="share-block d-flex align-items-center justify-content-center"
        >
          <span className="share">Share</span>
          <FacebookShareButton
            url={`http://asparagusmagazine.com/articles/${article.slug}`}
          >
            <FacebookIcon size={45} round />
          </FacebookShareButton>
          <TwitterShareButton
            url={`http://asparagusmagazine.com/articles/${article.slug}`}
          >
            <TwitterIcon size={45} round />
          </TwitterShareButton>
        </div>
        <SupportCard />
        <RelatedPosts currentArticle={article} allArticles={allArticles} />
      </SingleContainer>
    </PageWrapper>
  );
}

//hey Next, these are the possible slugs
export async function getStaticPaths() {
  const paths = await getSlugs("articles");

  return {
    paths,
    //this option below renders in the server (at request time) pages that were not rendered at build time
    //e.g when a new blogpost is added to the app
    fallback: "blocking",
  };
}

//access the router, get the id, and get the data for that post
export async function getStaticProps({ params }) {
  const article = await getArticle(params.slug);
  const allArticles = await getArticles();
  const categories = await getCategories();
  return {
    props: {
      article,
      allArticles,
      categories,
    },
    revalidate: 10, // In seconds
  };
}

18442232457;
