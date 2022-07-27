import Link from "next/link";
import styled from "styled-components";
import theme from "./Global/Theme";
import { ContribImage } from "./Global/styles";
import Image from "next/image";

const Card = styled.li`
  margin: 0 auto 50px;
  max-width: 550px;
  display: flex;
  align-items: center;
  flex-direction: ${(props) => (props.team ? "column" : "row")};
  ${theme.mediaQuery.sm`
  max-width: 900px;
  flex-direction: row;
  align-items: flex-start;
  margin-bottom: 100px;
  `}
  a {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    text-decoration: none;
    ${theme.mediaQuery.sm`
   align-items: flex-start;
    `}
  }
  /* p {
    line-height: 25px;
  } */
  .team--title {
    font-size: 1.4rem;
    font-family: ${theme.type.semibold};
    color: black;
    display: flex;
    flex-direction: column;
    ${theme.mediaQuery.sm`
    display: inline-block;
    `}
  }
  .long-dash {
    display: none;
    ${theme.mediaQuery.sm`
  display: inline-block;
  `}
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
    <Card className="team--card" team={team}>
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
              <h3 className="team-name">
                {name} {""}
                {title ? (
                  <span className="team--title">
                    <span className="long-dash"> &#8212;</span> {title}
                  </span>
                ) : null}
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
              <h3 className="contributor-name">{name}</h3>

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
