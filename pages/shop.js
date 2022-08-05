import Head from "next/head";
import PageWrapper from "../components/Global/PageWrapper";
import { Config } from "../config";
import fetch from "isomorphic-fetch";
import Link from "next/link";

export default function Shop() {
  return (
    <PageWrapper pageTitle="Shop">
      <h1>I am the Shop</h1>
    </PageWrapper>
  );
}

// this will be deleted. the shop is NextCommerce on a subdomain
