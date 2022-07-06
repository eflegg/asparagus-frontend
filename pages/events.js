import React from "react";
import Link from "next/link";
import { getEvents } from "../utils/wordpress";
import PageWrapper from "../components/Global/PageWrapper";

export default function Events({ events }) {
  console.log("events: ", events);
  return (
    <PageWrapper className="">
      <h1>List of Posts</h1>
      <ul>
        {events.map((event, index) => {
          return (
            <Link
              key={index}
              href={"/events/[slug]"}
              as={`/events/${event.slug}`}
            >
              <a>
                <li>{event.title.rendered}</li>
              </a>
            </Link>
          );
        })}
      </ul>
    </PageWrapper>
  );
}

export async function getStaticProps({ params }) {
  const events = await getEvents();

  return {
    props: {
      events,
    },
    revalidate: 10, // In seconds
  };
}
