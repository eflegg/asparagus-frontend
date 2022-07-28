import Link from "next/link";
import styled from "styled-components";
import theme from "../components/Global/Theme";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
const Card = styled.div`
  border: 3px solid ${theme.colours.gusYellow};
  .card--image {
    position: relative;
    height: 160px;
    top: 0;
  }
`;

// needs categories, reading time, date, image

export default function CategoryFeaturedCard({
  title,
  slug,
  writer,
  photographer,
  post,
}) {
  console.log("category feature post: ", post);
  return (
    <Card>
      <Link href={"/articles/[slug]"} as={`/articles/${slug}`}>
        <a>
          <div className="card--image">
            <Image
              src={post._embedded["wp:featuredmedia"]["0"].source_url}
              layout="fill"
              objectFit="cover"
              alt="Article lead photo"
            />
          </div>
          <h3
            className="card-text pb-5"
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          ></h3>
          <p className="writer">{writer}</p>
        </a>
      </Link>
    </Card>
  );
}
