import Link from "next/link";
import styled from "styled-components";
const Card = styled.div`
  width: 30%;
  border: 2px solid mediumseagreen;
`;

export default function ArticleCard({ title, slug, ref }) {
  console.log("article card slug: ");
  return (
    <Card>
      <Link ref={ref} href={"/articles/[slug]"} as={`/articles/${slug}`}>
        <a>
          <h1>I am an article card for: {title}</h1>
          <p>I will be a repeating square</p>
        </a>
      </Link>
    </Card>
  );
}
