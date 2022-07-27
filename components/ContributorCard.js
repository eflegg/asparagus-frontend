import Link from "next/link";
import styled from "styled-components";
import theme from "./Global/Theme";
import { ContribImage } from "./Global/styles";
import Image from "next/image";

const Card = styled.li`
  margin: 0 auto;
  max-width: 550px;
  display: flex;
  a {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    justify-content: space-between;
    text-decoration: none;
  }
  p {
    line-height: 25px;
  }
`;

export default function ContributorCard({
  name,
  slug,
  bio,
  image,
  title,
  team,
  social,
  socialLink,
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
              <h1>hi</h1>
              <h3 className="team-name">
                {name}
                {title ? <span>- {title}</span> : null}
              </h3>

              <p>{bio}</p>
              <a href={socialLink} rel="noreferrer" target="_blank">
                <p>{social}</p>
              </a>
            </div>
            <button className="btn--primary">Contributor Profile</button>
          </a>
        </Link>
      ) : (
        <Link href={"/contributors/[slug]"} as={`/contributors/${slug}`}>
          <a>
            <div>
              <h3 className="contributor-name">
                {name}
                {title ? <span>- {title}</span> : null}
              </h3>

              <p>{bio}</p>
              <a href={socialLink} rel="noreferrer" target="_blank">
                <p>{social}</p>
              </a>
            </div>
            <button className="btn--primary">Contributor Profile</button>
          </a>
        </Link>
      )}
    </Card>
  );
}
