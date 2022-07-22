import Link from "next/link";
import styled from "styled-components";
import theme from "../components/Global/Theme";
const Card = styled.div`
  border: 2px solid ${theme.colours.grey};
  a {
    text-decoration: none;
  }
`;

// needs categories, reading time, date, image

export default function ArticleCard({ title, slug, writer, photographer }) {
  return (
    <Card>
      <Link href={"/articles/[slug]"} as={`/articles/${slug}`}>
        <a>
          <h3
            className="card-text pb-5"
            dangerouslySetInnerHTML={{ __html: title }}
          ></h3>
          <p className="deck--article-card">I'm the deck</p>
          <p className="writer">{writer}</p>
          <p className="photographer">{photographer}</p>
        </a>
      </Link>
    </Card>
  );
}
