import Head from "next/head";
import PageWrapper from "../components/Global/PageWrapper";
import { Config } from "../config";
import fetch from "isomorphic-fetch";
import Link from "next/link";
import { getTeamMembers } from "../utils/wordpress";
import { ContribImage } from "../components/Global/styles";
import ContributorCard from "../components/ContributorCard";
import React from "react";
import styled from "styled-components";
import theme from "../components/Global/Theme";

const TeamMemberContainer = styled.ul`
  width: 90%;
  margin: 0 auto;
`;

export default function Team({ teamMembers }) {
  console.log("team members: ", teamMembers);
  return (
    <PageWrapper pageTitle="Team">
      <TeamMemberContainer>
        {teamMembers.map((member, index) => {
          return (
            <React.Fragment key={index}>
              <ContributorCard
                image={member._embedded["wp:featuredmedia"]["0"].source_url}
                slug={member.slug}
                name={member.title.rendered}
                bio={member.acf.bio}
                title={member.acf.title}
              />
            </React.Fragment>
          );
        })}
      </TeamMemberContainer>
    </PageWrapper>
  );
}

export async function getStaticProps({ params }) {
  const teamMembers = await getTeamMembers();
  return {
    props: {
      teamMembers,
    },
    revalidate: 10,
  };
}
