import Link from "next/link";
import styled from "styled-components";
import theme from "./Global/Theme";
import { ContribImage } from "./Global/styles";
import Image from "next/image";
import React from "react";

const Card = styled.li`
  margin: 0 auto;
  margin-bottom: ${(props) => (props.team ? "50px" : 0)};
  max-width: 550px;
  display: flex;
  align-items: center;
  flex-direction: ${(props) => (props.team ? "column" : "row")};
  @media ${theme.devices.sm} {
    max-width: 900px;
    flex-direction: row;
    align-items: flex-start;
    margin-bottom: 100px;
  }
  .team-name {
    font-size: 1.8rem;
    @media ${theme.devices.md} {
      font-size: 2.8rem;
    }
  }
  .card-link--container {
    display: flex;
    flex-direction: column;
    align-items: ${(props) => (props.team ? "center" : "flex-start")};
    justify-content: space-between;
    text-decoration: none;
    @media ${theme.devices.sm} {
      align-items: flex-start;
    }
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
    @media ${theme.devices.sm} {
      display: inline-block;
    }
    @media ${theme.devices.md} {
      font-size: 1.8rem;
    }
  }
  .long-dash {
    display: none;
    @media ${theme.devices.sm} {
      display: inline-block;
    }
  }
  hr {
    margin-bottom: 35px;
    @media ${theme.devices.sm} {
      margin-bottom: 100px;
    }
  }
  p {
    letter-spacing: 0;
  }
`;

export default function ContributorCard({
  team,
  contributor,
  tag,
}: {
  team?: any;
  contributor?: any;
  tag?: any;
}) {
  return (
    <Card className="team--card" team={team}>
      <ContribImage team={team}>
        {contributor.acf.headshot ? (
          <Image
            src={contributor.acf.headshot.url}
            layout="fill"
            objectFit="cover"
            alt="Contributor photo"
          />
        ) : (
          <Image
            src="/singlestalk-square.svg"
            layout="responsive"
            height="100px"
            width="100px"
            alt="Contributor photo"
          />
        )}
      </ContribImage>
      {team ? (
        <>
          <div className="card-link--container">
            <h3 className="team-name">
              {contributor.title.rendered}
              {""}
              {contributor.acf.title ? (
                <span className="team--title">
                  <span className="long-dash"> &#8212;</span>{" "}
                  {contributor.acf.title}
                </span>
              ) : null}
            </h3>

            <p>{contributor.acf.bio}</p>
            {tag !== null ? (
              <Link href={"/team/[slug]"} as={`/team/${contributor.slug}`}>
                <a>
                  <button className="btn--primary">Contributor Profile</button>
                </a>
              </Link>
            ) : null}
          </div>
        </>
      ) : (
        <Link
          href={"/contributors/[slug]"}
          as={`/contributors/${contributor.slug}`}
        >
          <a className="card-link--container">
            <div>
              <h3 className="contributor-name">{contributor.title.rendered}</h3>

              <p>{contributor.acf.bio}</p>
              {/* <a
                className="social-link"
                href={socialLink}
                rel="noreferrer"
                target="_blank"
              >
                <p>{social}</p>
              </a> */}
            </div>
            <button className="btn--primary ">Contributor Profile</button>
          </a>
        </Link>
      )}
    </Card>
  );
}
