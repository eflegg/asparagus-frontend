import HeaderMenu from "./HeaderMenu";
import Footer from "./footer";
import Head from "next/head";
import styled from "styled-components";
import AdBanner from "./AdBanner";

const OuterContainer = styled.main`
  width: 100%;
`;

export default function PageWrapper({ children, pageTitle }) {
  return (
    <OuterContainer>
      <Head>
        <title>Asparagus Magazine - {pageTitle}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="page-wrapper">
        <HeaderMenu />
        {children}
        <Footer />
      </div>
      <AdBanner />
    </OuterContainer>
  );
}
