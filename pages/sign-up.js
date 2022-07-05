import Head from "next/head";
import PageWrapper from "../components/Global/PageWrapper";
import { Config } from "../config";
import fetch from "isomorphic-fetch";
import Link from "next/link";

export default function SignUp() {
  return (
    <PageWrapper pageTitle="Sign Up">
      <h1>Newsletter Sign Up</h1>
    </PageWrapper>
  );
}

// query the page with the slug sign-up
