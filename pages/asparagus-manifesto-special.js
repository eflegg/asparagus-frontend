import React from "react";
import Link from "next/link";
import { Config } from "../config";
import fetch from "isomorphic-fetch";
import PageWrapper from "/components/Global/PageWrapper";
import styled from "styled-components";
import theme from "/components/Global/Theme";
import { getContributors } from "../utils/wordpress";

export default function AsparagusManifesto({ contributors, page }) {
  return (
    <PageWrapper
      canonicalUrl={`https://asparagusmagazine.com/${page.slug}`}
      ogImageUrl={page.yoast_head_json.og_image}
      ogType={page.yoast_head_json.og_type}
      ogTwitterImage={page.yoast_head_json.twitter_card}
      SEOtitle={
        page.yoast_head_json.title
          ? page.yoast_head_json.title
          : "Asparagus Magazine"
      }
      metadescription={
        page.yoast_head_json.description
          ? page.yoast_head_json.title
          : "Telling the large and small stories of how we can live more sustainably"
      }
      className=""
    >
      <h1>Gus Manifesto</h1>
    </PageWrapper>
  );
}

//this can be made into a special page at the end

export async function getStaticProps({ params }) {
  const contributors = await getContributors();

  const pageQuery = await fetch(`${Config.apiUrl}/wp-json/wp/v2/pages/105`);
  const page = await pageQuery.json();

  return {
    props: {
      contributors,
      page,
    },
    revalidate: 600, // In seconds
  };
}
