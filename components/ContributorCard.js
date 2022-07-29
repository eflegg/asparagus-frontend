import Link from "next/link";
import styled from "styled-components";
import theme from "./Global/Theme";
import { ContribImage } from "./Global/styles";
import Image from "next/image";

const Card = styled.li`
  margin: 0 auto;
  margin-bottom: ${(props) => (props.team ? "50px" : 0)};
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
  .card-link--container {
    display: flex;
    flex-direction: column;
    align-items: ${(props) => (props.team ? "center" : "flex-start")};
    justify-content: space-between;
    text-decoration: none;
    ${theme.mediaQuery.sm`
   align-items: flex-start;
    `}
  }
  .social-link {
    display: table;

    p {
      line-height: 25px;
    }
  }
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
  hr {
    margin-bottom: 35px;
    ${theme.mediaQuery.sm`
 margin-bottom: 100px;
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
          <a className="card-link--container">
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
              {/* <a
                className="social-link"
                href={socialLink}
                rel="noreferrer"
                target="_blank"
              >
                <p>{social}</p>
              </a> */}
            </div>
            <button className="btn--primary">Contributor Profile</button>
          </a>
        </Link>
      ) : (
        <Link href={"/contributors/[slug]"} as={`/contributors/${slug}`}>
          <a className="card-link--container">
            <div>
              <h3 className="contributor-name">{name}</h3>

              <p>{bio}</p>
              {/* <a
                className="social-link"
                href={socialLink}
                rel="noreferrer"
                target="_blank"
              >
                <p>{social}</p>
              </a> */}
            </div>
            <button className="btn--primary">Contributor Profile</button>
          </a>
        </Link>
      )}
    </Card>
  );
}
