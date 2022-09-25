import Head from "next/head";
import theme from "../components/Global/Theme";
import PageWrapper from "../components/Global/PageWrapper";
import { getTeamMembers } from "../utils/wordpress";
import ContributorCard from "../components/ContributorCard";
import React from "react";
import Link from "next/link";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

const TeamMemberContainer = styled.ul`
  width: 90%;
  margin: 0 auto;
`;

export default function Team({ teamMembers }) {
  return (
    <PageWrapper
      canonicalUrl={`https://asparagusmagazine.com/team`}
      ogImageUrl="triplestalk.svg"
      ogTwitterImage="triplestalk.svg"
      SEOtitle="Team"
      metadescription="Meet the team at Asparagus Magazine telling large and small stories of sustainability"
    >
      <h1 className="text-center">Team</h1>
      <hr />
      <TeamMemberContainer>
        {teamMembers.map((member, index) => {
          return (
            <React.Fragment key={uuidv4()}>
              <ContributorCard
                contributor={member}
                team
                image={member.acf.headshot.url}
                slug={member.slug}
                name={member.title.rendered}
                bio={member.acf.bio}
                title={member.acf.title}
                social={member.acf.social_media_handle}
                socialLink={member.acf.social_media_link}
              />
            </React.Fragment>
          );
        })}
      </TeamMemberContainer>
      <h1 className="text-center">Columnists</h1>
      <hr />
    </PageWrapper>
  );
}

export async function getStaticProps({ params }) {
  const teamMembers = await getTeamMembers();
  return {
    props: {
      teamMembers,
    },
    revalidate: 600,
  };
}
