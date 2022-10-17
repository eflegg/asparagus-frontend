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
import Byline from "../../components/ArticleComponents/Byline";
import Link from "next/link";

const SingleContainer = styled.div`
  height: 100%;

  figure {
    display: table;
    text-align: center;
    margin: 50px auto;
    /* &.size-large {
      img {
        height: 100%;
        width: 100%;
      }
    } */
  }

  figcaption {
    &.credit {
      /* position: absolute; */
    }
    width: 90%;
    max-width: 680px;
    ${theme.mediaQuery.md`
     width: 100%;
    `}
    margin: 0 auto;
    font-family: ${theme.type.accent};
    font-size: 1.6rem;
    &.caption {
      p {
        font-size: 1.6rem;
        margin-left: 0px;
        margin-bottom: 45px;
        font-family: ${theme.type.header};
        font-style: italic;
        font-weight: 700;
        line-height: 2rem;
        ${theme.mediaQuery.md`
         margin-bottom: 85px;
        `}
      }
    }
    strong {
      font-family: ${theme.type.header};
      font-style: italic;
      position: relative;
      // top: 5px;
    }
  }
  li {
    margin: 0 auto 20px;
    width: 80%;
    max-width: 680px;
    list-style: disc;
    letter-spacing: 0;
  }

  h2 {
    width: 90%;
    max-width: 680px;
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
  .body-content {
    h3,
    h4 {
      width: 90%;
      max-width: 680px;
      margin: 0 auto;
      font-size: 1.6rem;
    }
    p {
      width: 90%;
      max-width: 680px;
      margin: 17px auto;
      letter-spacing: 0;
      ${theme.mediaQuery.sm`
       margin: 25px auto;
    `}
    }
    a {
      letter-spacing: 0;
    }
    em {
      font-size: 1.7rem;
      font-weight: 600;
      ${theme.mediaQuery.md`
      font-size: 2rem;
      `}
    }
    strong {
      em {
        font-family: ${theme.type.semibold};
        letter-spacing: 0;
        /* font-size: 1.7rem;
        font-weight: 800;
        ${theme.mediaQuery.md`
      font-size: 2rem;
      `} */
      }
    }
    a {
      text-decoration: underline;
      text-decoration-skip-ink: auto;
      font-family: ${theme.type.bodyFont};
      color: black;
      font-weight: 400;
    }

    a:visited {
      color: ${theme.colours.soil};
    }

    a:hover {
      color: ${theme.colours.gusGreen};
    }

    a:active {
      color: ${theme.colours.gusYellow};
    }

    .wp-block-pullquote {
      p {
        font-size: 18px;
        font-weight: 600;
        color: ${theme.colours.gusGreen};
        width: 80%;
        margin: 20px auto;
        text-align: center;
        font-family: ${theme.type.semibold};
        ${theme.mediaQuery.md`
      font-size: 2.8rem;
     `}
      }
      em {
        font-size: 18px;
        font-weight: 600;
        font-family: ${theme.type.italic};
        ${theme.mediaQuery.md`
        font-size: 2.8rem;
       `}
      }
    }

    .related--header {
      width: 90%;
      margin: 50px auto 0;
      line-height: 100%;
    }
    .content--container {
    }
  }
  .print-details {
    width: 90%;
    text-align: center;
    margin: 45px auto;
    p {
      margin: 5px auto;
      font-style: italic;
      font-weight: 600;
    }
  }

  .share-block {
    width: 90%;
    max-width: 680px;
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
  margin-bottom: 45px;
  .categories {
    width: 90%;
    h5 {
      line-height: 100%;
    }
    margin: 70px 0 5px 36px;
    ${theme.mediaQuery.sm`
        margin: 70px 0 15px 36px;
          `}
    ${theme.mediaQuery.md`
        margin: 50px 0 20px 36px;
     
          `}
    .category-label {
      margin-right: 20px;
      position: relative;
      &:first-child {
        &::after {
          content: "\\00B7";
          font-size: 35px;
          line-height: 5px;
          position: absolute;
          top: 50%;
          transform: translateX(-50%);
          right: -22px;
          display: table;
          margin-left: auto;
          ${theme.mediaQuery.md`
          // top: 3px;
          // left: 3px;
          font-size: 40px;
          `}
        }
      }
      &:only-child {
        &::after {
          content: "";
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
    margin: 0 auto 50px;
    `}
    .hero--image {
      width: 100%;
      /* height: 250px; */
      ${theme.mediaQuery.xs`
      // height: 350px;
      `}
      ${theme.mediaQuery.sm`
      width: 57%;
      flex: none;
      // height: 450px;
      `}
      .hero-right--inner {
        /* height: 500px; */
        position: relative;
        /* height: 100%; */
      }
    }
    .hero--text {
      padding: 30px;
      ${theme.mediaQuery.sm`
      padding: 0px 20px 0 0;
      `}
    }
    .article-details {
      align-items: flex-start;
      ${theme.mediaQuery.sm`
      justify-content: flex-start;
      `}
    }
  }
  .categories {
    ${theme.mediaQuery.md`
  // margin: 30px 0 0 80px;
  `}
  }
  hr {
    margin-bottom: 26px;
    ${theme.mediaQuery.md`
    margin-bottom: 38px;
    `}
  }
  .article--title {
    /* margin-top: 30px; */
    font-size: 2.6rem;
    ${theme.mediaQuery.md`
    font-size: 5.2rem;
    margin-top: 0;
    `}
  }
  .byline {
    margin: 0px auto;
  }
  .byline--single-article {
    margin: 0px 0 0 0;
    font-size: 1.4rem;
    font-weight: 700;
    ${theme.mediaQuery.md`
    font-size: 1.6rem;
    line-height: 2rem;
    `}
  }
  .date--single-article {
    margin: 0 0 0 0;
  }
`;

export default function ArticlePage({ article, categories }) {
  console.log("article: ", article);

  let subcategories = categories.filter((newCat) => newCat.parent !== 0);

  const postCategories = article._embedded["wp:term"]["0"].map((category) => {
    return category.name;
  });

  const matchingCats = [];
  subcategories.forEach((subcategory) => {
    if (postCategories.includes(subcategory.name)) {
      // matchingCats.push(subcategory.name);
      matchingCats.push(subcategory);
    }
  });
  console.log("matching cats: ", matchingCats);

  const fallbackImage =
    "https://www.asparagusmagazine.com/Asparagus_Tip_Logo.svg";

  return (
    <PageWrapper
      canonicalUrl={`https://asparagusmagazine.com/articles/${article.slug}`}
      ogImageUrl={
        article._embedded["wp:featuredmedia"]
          ? article._embedded["wp:featuredmedia"]["0"].source_url
          : fallbackImage
      }
      ogType={article.yoast_head_json.og_type}
      ogTwitterImage={
        article._embedded["wp:featuredmedia"]
          ? article._embedded["wp:featuredmedia"]["0"].source_url
          : article.yoast_head_json.twitter_card
      }
      SEOtitle={
        article.yoast_head_json.title
          ? article.yoast_head_json.title
          : article.title.rendered
      }
      metadescription={
        article.yoast_head_json.description
          ? article.yoast_head_json.description
          : article.acf.dek
      }
    >
      <SingleContainer itemscope itemtype="https://schema.org/Article">
        <SingleHero>
          <div className="d-flex categories">
            {matchingCats.slice(0, 2).map((cat, index) => {
              return (
                <React.Fragment key={uuidv4()}>
                  <Link
                    href={"/categories/[slug]"}
                    as={`/categories/${cat.slug}`}
                  >
                    <a className="category-label display-flex">
                      <h5
                        dangerouslySetInnerHTML={{ __html: cat.name }}
                        key={index}
                      ></h5>
                    </a>
                  </Link>
                </React.Fragment>
              );
            })}
          </div>
          <hr />
          <div className="hero d-flex">
            <div className="hero--text">
              <h1
                itempprop="name"
                className="article--title"
                dangerouslySetInnerHTML={{ __html: article.title.rendered }}
              ></h1>
              <p className="excerpt deck">{article.acf.dek}</p>
              <Byline article={article} />
            </div>
            <div className="hero--image position-relative">
              <div className="hero-right--inner">
                {article._embedded["wp:featuredmedia"] ? (
                  <Image
                    src={article._embedded["wp:featuredmedia"]["0"].source_url}
                    alt={article._embedded["wp:featuredmedia"]["0"].alt_text}
                    layout="responsive"
                    width="600px"
                    height="450"
                    objectFit="cover"
                    priority
                  />
                ) : (
                  <Image
                    src="/triplestalk.svg"
                    layout="fill"
                    objectFit="cover"
                    alt="Asparagus Magazine three-stalk logo"
                    priority
                  />
                )}
              </div>
              {article._embedded["wp:featuredmedia"] ? (
                <>
                  <figcaption className="credit">
                    {article._embedded["wp:featuredmedia"]["0"].title.rendered}
                  </figcaption>
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
                </>
              ) : null}
              {/* hero right inner */}
            </div>
          </div>
        </SingleHero>
        <div
          className="body-content"
          dangerouslySetInnerHTML={{ __html: article.content.rendered }}
        ></div>
        {article.acf.print_issue === "Yes" && article.acf.appears_in != "" ? (
          <div className="print-details">
            <p className="content--container">
              Print Issue: <span>{article.acf.appears_in[0].post_title}</span>
            </p>

            {article.acf.print_title ? (
              <p className="content--container">
                Print Title: <span>{article.acf.print_title}</span>
              </p>
            ) : null}
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
        <RelatedPosts currentArticle={article} />
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
  const categories = await getCategories();

  const notFound = !article;
  return {
    props: {
      article,
      categories,
    },
    revalidate: 1200, // In seconds
    notFound,
  };
}
