import PageWrapper from "../components/Global/PageWrapper";
import { getTeamMembers } from "../utils/wordpress";
import ContributorCard from "../components/ContributorCard";
import React from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { Config } from "../config";
import fetch from "isomorphic-fetch";

const TeamMemberContainer = styled.ul`
  width: 90%;
  margin: 0 auto;
`;

export default function Team({ teamMembers }) {
  const fallbackImage =
    "https://www.asparagusmagazine.com/Asparagus_Tip_Logo.svg";

  console.log("team members: ", teamMembers);

  return (
    <PageWrapper
      canonicalUrl={`https://asparagusmagazine.com/team`}
      ogImageUrl={fallbackImage}
      ogTwitterImage={fallbackImage}
      SEOtitle="Asparagus Team"
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
                tag={member.tags.length > 0 ? member.tags[0] : null}
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

  const allTagsQuery = await fetch(`${Config.apiUrl}/wp-json/wp/v2/tags`);
  const tags = await allTagsQuery.json();
  return {
    props: {
      teamMembers,
    },
    // revalidate: 1200,
  };
}
