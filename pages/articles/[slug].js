import Link from "next/link";
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

const SingleContainer = styled.div`
  .related--header {
    width: 90%;
    margin: 50px auto 0;
    line-height: 100%;
  }
`;

const SingleHero = styled.div`
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
`;

export default function ArticlePage({ article, allArticles, categories }) {
  console.log("single article: ", article);
  console.log("categories: ", categories);

  let subcategories = categories.filter((newCat) => newCat.parent !== 0);
  console.log("subcategories: ", subcategories);
  console.log("subcategory one: ", subcategories[5].name);

  const postCategories = article._embedded["wp:term"]["0"].map((category) => {
    return category.name;
  });

  const matchingCats = [];
  subcategories.forEach((subcategory) => {
    if (postCategories.includes(subcategory.name)) {
      matchingCats.push(subcategory.name);
    }
  });
  console.log("matching categories: ", matchingCats[0]);

  return (
    <PageWrapper>
      <SingleContainer>
        <SingleHero>
          <div className="d-flex categories">
            {matchingCats.slice(0, 2).map((cat, index) => {
              return (
                <>
                  <h5 key={index}>{cat}</h5>
                </>
              );
            })}
          </div>
          <hr />
        </SingleHero>

        <h1 className="text-center pb-5">{article.title.rendered}</h1>
        <div
          className="card-text pb-5"
          dangerouslySetInnerHTML={{ __html: article.content.rendered }}
        ></div>
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
