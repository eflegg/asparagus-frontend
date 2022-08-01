import Link from "next/link";
import styled from "styled-components";
import theme from "../components/Global/Theme";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import { getIssues, getArticles } from "../utils/wordpress";

export default function RelatedPosts({ articles, currentPost }) {
  return <h4>I am the related posts component</h4>;
}

export async function getStaticProps({ params }) {
  const articles = await getArticles();

  return {
    props: {
      articles,
    },
    revalidate: 10, // In seconds
  };
}
