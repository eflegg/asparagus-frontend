import Link from "next/link";
import styled from "styled-components";
import theme from "../components/Global/Theme";
const Card = styled.div`
  border: 2px solid ${theme.colours.grey};
`;

// needs categories, reading time, date, image

export default function ArticleCard({
  title,
  slug,
  writer,
  photographer,
  excerpt,
}) {
  return (
    <Card>
      <Link href={"/articles/[slug]"} as={`/articles/${slug}`}>
        <a>
          <h3
            className="card-text pb-5"
            dangerouslySetInnerHTML={{ __html: title }}
          ></h3>
          <p className="writer">{writer}</p>
          <p className="photographer">{photographer}</p>
          <p className="excerpt">{excerpt}</p>
        </a>
      </Link>
    </Card>
  );
}
