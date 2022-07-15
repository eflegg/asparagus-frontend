import Head from "next/head";
import theme from "../components/Global/Theme";
import PageWrapper from "../components/Global/PageWrapper";
import { getTeamMembers } from "../utils/wordpress";
import ContributorCard from "../components/ContributorCard";
import React from "react";
import Link from "next/link";
import styled from "styled-components";

const TeamMemberContainer = styled.ul`
  width: 80%;
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
                team
                image={member._embedded["wp:featuredmedia"]["0"].source_url}
                slug={member.slug}
                name={member.title.rendered}
                bio={member.acf.bio}
                title={member.acf.title}
              />
              <p>id: {member.id}</p>
              <p>title: {member.title.rendered}</p>
              <Link href={"/team/[slug]"} as={`/team/${member.slug}`}>
                <a> link</a>
              </Link>
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
