import Link from "next/link";
import { getCategory, getSlugs } from "../../utils/wordpress";
import { Config } from "../../config";
import fetch from "isomorphic-fetch";
import ArticleCard from "../../components/ArticleCard";

export default function CategoryPage({ category, posts }) {
  console.log("posts: ", posts);
  return (
    <div className="container pt-5">
      <h1 className="text-center pb-5">{category.name}</h1>

      {/* <div dangerouslySetInnerHtml={{ __html: category.name }} /> */}

      <h2>{category.name} posts</h2>
      <ul>
        {posts.map((post, index) => {
          return (
            <li key={index}>
              <ArticleCard title={post.title.rendered} link={post.slug} />
            </li>
          );
        })}
      </ul>
      <Link href="/">
        <a className="btn btn-primary">Back to Home</a>
      </Link>
    </div>
  );
}

//hey Next, these are the possible slugs
export async function getStaticPaths() {
  const paths = await getSlugs("categories");

  return {
    paths,
    //this option below renders in the server (at request time) pages that were not rendered at build time
    //e.g when a new blogpost is added to the app
    fallback: "blocking",
  };
}

//access the router, get the id, and get the data for that post
export async function getStaticProps({ params }) {
  const category = await getCategory(params.slug);
  const categoryPosts = await fetch(
    `${Config.apiUrl}/wp-json/wp/v2/articles?categories=13`
  );
  const posts = await categoryPosts.json();

  return {
    props: {
      category,
      posts,
    },
    revalidate: 10, // In seconds
  };
}
