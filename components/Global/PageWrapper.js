import HeaderMenu from "./HeaderMenu";
import Footer from "./footer";
import Head from "next/head";
import styled from "styled-components";

import AdBanner from "./AdBanner";

const OuterContainer = styled.main`
  width: 100%;
  position: relative;
  margin-bottom: ${(props) => (props.team ? "0px" : "105px")};
`;

export default function PageWrapper({
  children,
  canonicalUrl,
  ogTwitterImage,
  ogType,
  metadescription,
  SEOtitle,
  ogImageUrl,
  noAd,
}) {
  // const TRACKING_ID = "G-CT5R7MCS1Y";

  // console.log("seo title: ", SEOtitle);
  return (
    <OuterContainer noAd={noAd}>
      <div>
        <Head>
          <title>{SEOtitle}</title>
          <meta name="description" content={metadescription} />
          <link rel="icon" href="/favicon.ico" />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:site" content="@asparagusmag" />
          <meta name="twitter:title" content={SEOtitle} />
          <meta name="twitter:description" content={metadescription} />
          <meta name="twitter:image" content={ogTwitterImage} />

          <link rel="canonical" href={canonicalUrl} />

          <meta property="og:locale" content="en_US" />
          <meta property="og:site_name" content="Asparagus Magazine" />
          <meta property="og:type" content={ogType} />
          <meta property="og:title" content={SEOtitle} />
          <meta property="og:description" content={metadescription} />
          <meta property="og:image" content={ogImageUrl} />
          <meta property="og:url" content={canonicalUrl} />
        </Head>
      </div>

      <div className="page-wrapper">
        <HeaderMenu />
        {children}
        <Footer />
      </div>
      {!noAd ? <AdBanner /> : null}
    </OuterContainer>
  );
}
