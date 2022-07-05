import Head from "next/head";
import PageWrapper from "../components/Global/PageWrapper";
import { Config } from "../config";
import fetch from "isomorphic-fetch";
import Link from "next/link";

export default function Team() {
  return (
    <PageWrapper pageTitle="Sign Up">
      <h1>Team</h1>
    </PageWrapper>
  );
}
