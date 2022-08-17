import Head from "next/head";
import PageWrapper from "../components/Global/PageWrapper";
import { Config } from "../config";
import fetch from "isomorphic-fetch";
import Link from "next/link";

export default function SignUp() {
  return (
    <PageWrapper
      canonicalUrl={`https://asparagusmagazine.com/sign-up`}
      ogImageUrl="triplestalk.svg"
      ogTwitterImage="triplestalk.svg"
      SEOtitle="Newsletter Sign Up"
      metadescription="Sign up to receive Asparagus Magazine's pleasantly infrequent newsletter"
    >
      <h1>Newsletter Sign Up</h1>
    </PageWrapper>
  );
}

// query the page with the slug sign-up
