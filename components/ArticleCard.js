import Head from "next/head";
import PageWrapper from "../components/Global/PageWrapper";
import Link from "next/link";

export default function ArticleCard({ title, slug }) {
  return (
    <Link href={"/articles/[slug]"} as={`/articles/${slug}`}>
      <a>
        <h1>I am an article card for: {title}</h1>
        <p>I will be a repeating square</p>
      </a>
    </Link>
  );
}
