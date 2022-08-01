import Link from "next/link";
import RelatedPosts from "../../components/ArticleComponents/RelatedPosts";
import PageWrapper from "../../components/Global/PageWrapper";
import { getArticle, getArticles, getSlugs } from "../../utils/wordpress";

export default function ArticlePage({ article, allArticles }) {
  return (
    <PageWrapper>
      <h1 className="text-center pb-5">{article.title.rendered}</h1>
      <div
        className="card-text pb-5"
        dangerouslySetInnerHTML={{ __html: article.content.rendered }}
      ></div>
      <RelatedPosts currentArticle={article} allArticles={allArticles} />
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
  return {
    props: {
      article,
      allArticles,
    },
    revalidate: 10, // In seconds
  };
}
