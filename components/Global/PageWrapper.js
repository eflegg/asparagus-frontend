import HeaderMenu from "./HeaderMenu";
import Footer from "./footer";
import Head from "next/head";
import styled from "styled-components";
import AdBanner from "./AdBanner";

const OuterContainer = styled.main`
  width: 100%;
`;

export default function PageWrapper({
  children,
  pageTitle,
  metadescription,
  SEOtitle,
}) {
  console.log("seo title: ", SEOtitle);
  return (
    <OuterContainer>
      <Head>
        <title>{SEOtitle}</title>
        <meta name="description" content={metadescription} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="page-wrapper">
        <HeaderMenu />
        {children}
        <Footer />
      </div>
      {/* <AdBanner /> */}
    </OuterContainer>
  );
}
