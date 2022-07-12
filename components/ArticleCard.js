import Link from "next/link";
import styled from "styled-components";
import theme from "../components/Global/Theme";
const Card = styled.div`
  border: 2px solid ${theme.colours.grey};
`;

export default function ArticleCard({ title, slug }) {
  return (
    <Card>
      <Link href={"/articles/[slug]"} as={`/articles/${slug}`}>
        <a>
          <h3
            className="card-text pb-5"
            dangerouslySetInnerHTML={{ __html: title }}
          ></h3>
          <p>I will be a repeating square</p>
        </a>
      </Link>
    </Card>
  );
}
