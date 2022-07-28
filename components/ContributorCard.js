import Link from "next/link";
import styled from "styled-components";
import theme from "./Global/Theme";
import { ContribImage } from "./Global/styles";
import Image from "next/image";

const Card = styled.li`
  display: flex;
  border: 2px solid rebeccapurple;
  a {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    border: 2px solid salmon;
    justify-content: space-between;
  }
`;

export default function ContributorCard({
  name,
  slug,
  bio,
  image,
  title,
  team,
}) {
  return (
    <Card>
      <ContribImage team={team}>
        <Image
          src={image}
          layout="fill"
          objectFit="cover"
          alt="Contributor photo"
        />
      </ContribImage>
      {team ? (
        <Link href={"/team/[slug]"} as={`/team/${slug}`}>
          <a>
            <div>
              <h3>
                {name}
                {title ? <span>- {title}</span> : null}
              </h3>

              <p>{bio}</p>
            </div>
            <button className="btn--primary">Contributor Profile</button>
          </a>
        </Link>
      ) : (
        <Link href={"/contributors/[slug]"} as={`/contributors/${slug}`}>
          <a>
            <div>
              <h3>
                {name}
                {title ? <span>- {title}</span> : null}
              </h3>

              <p>{bio}</p>
            </div>
            <button className="btn--primary">Contributor Profile</button>
          </a>
        </Link>
      )}
    </Card>
  );
}
