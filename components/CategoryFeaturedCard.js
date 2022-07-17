import Link from "next/link";
import styled from "styled-components";
import theme from "../components/Global/Theme";
const Card = styled.div`
  border: 3px solid ${theme.colours.gusYellow};
`;

// needs categories, reading time, date, image

export default function CategoryFeaturedCard({
  title,
  slug,
  writer,
  photographer,
}) {
  return (
    <Card>
      <Link href={"/articles/[slug]"} as={`/articles/${slug}`}>
        <a>
          <h4>I am a feature article</h4>
          <h3
            className="card-text pb-5"
            dangerouslySetInnerHTML={{ __html: title }}
          ></h3>
          <p className="writer">{writer}</p>
          <p className="photographer">{photographer}</p>
        </a>
      </Link>
    </Card>
  );
}
