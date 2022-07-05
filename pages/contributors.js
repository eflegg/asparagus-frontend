import React from "react";
import Link from "next/link";
import { getContributors } from "../utils/wordpress";

export default function Topics({ contributors }) {
  console.log("contributors: ", contributors);
  return (
    <div className="">
      <h1>List of Posts</h1>
      <ul>
        {contributors.map((contributor, index) => {
          return (
            <Link
              key={index}
              href={"/contributors/[slug]"}
              as={`/contributors/${contributor.slug}`}
            >
              <a>
                <li>{contributor.title.rendered}</li>
              </a>
            </Link>
          );
        })}
      </ul>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const contributors = await getContributors();

  return {
    props: {
      contributors,
    },
    revalidate: 10, // In seconds
  };
}
