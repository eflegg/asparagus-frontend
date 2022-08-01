import Link from "next/link";
import styled from "styled-components";
import theme from "../components/Global/Theme";
import Image from "next/image";

const Card = styled.div`
  .cover-image {
    display: block;

    overflow: hidden;
    img {
      height: ;
    }
  }
`;

export default function IssueCard({ title, slug, image, coverLine }) {
  return (
    <Card>
      <Link href={"/issues/[slug]"} as={`/issues/${slug}`}>
        <a>
          <div className="cover-image">
            <Image
              src={image}
              layout="responsive"
              width="200px"
              height="250px"
              alt="Cover photo"
            />
          </div>
          <h3
            className="card-text pb-5"
            dangerouslySetInnerHTML={{ __html: title }}
          ></h3>
          <p dangerouslySetInnerHTML={{ __html: coverLine }}></p>
        </a>
      </Link>
    </Card>
  );
}
