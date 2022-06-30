import Link from "next/link";
import styled from "styled-components";
import theme from "../components/Global/Theme";
const Card = styled.div`
  width: 30%;
  border: 2px solid ${theme.colours.grey};
`;

export default function ArticleCard({ title, slug, ref }) {
  console.log("article card slug: ");
  return (
    <Card>
      <Link ref={ref} href={"/articles/[slug]"} as={`/articles/${slug}`}>
        <a>
          <h1>{title}</h1>
          <p>I will be a repeating square</p>
        </a>
      </Link>
    </Card>
  );
}
