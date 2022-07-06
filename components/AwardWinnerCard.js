import Link from "next/link";
import styled from "styled-components";
import theme from "../components/Global/Theme";
const Card = styled.div`
  width: 90%;
  border: 4px solid ${theme.colours.gusGreen};
`;

export default function AwardWinnerCard({ title, slug, ref }) {
  console.log("awards card slug: ");
  return (
    <Card>
      <Link ref={ref} href={"/articles/[slug]"} as={`/articles/${slug}`}>
        <a>
          <h3
            className="card-text pb-5"
            dangerouslySetInnerHTML={{ __html: title }}
          ></h3>
          <p>I am a special square</p>
        </a>
      </Link>
    </Card>
  );
}
