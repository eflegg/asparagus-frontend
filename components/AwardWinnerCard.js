import Link from "next/link";
import styled from "styled-components";
import theme from "../components/Global/Theme";
const Card = styled.div`
  border: 4px solid ${theme.colours.gusGreen};
`;

export default function AwardWinnerCard({ post }) {
  console.log("award post: ", post);
  let initialDate = post.date;
  let formattedDate = new Date(initialDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });
  return (
    <Card>
      <Link href={"/articles/[slug]"} as={`/articles/${post.slug}`}>
        <a>
          <p>{formattedDate}</p>
          <h3
            className="card-text pb-5"
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          ></h3>
          <p>I am a special square</p>
        </a>
      </Link>
    </Card>
  );
}
