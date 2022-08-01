import React, { useState } from "react";
import Link from "next/link";
import { getEvents } from "../utils/wordpress";
import PageWrapper from "../components/Global/PageWrapper";
import EventCard from "../components/EventCard";

export default function Events({ events }) {
  console.log("events: ", events);

  const [isCurrent, setIsCurrent] = useState(false);
  const stringCurrentDate = new Date().getTime();

  function toggleCurrent() {
    setIsCurrent(!isCurrent);
  }

  return (
    <PageWrapper pageTitle="Events" className="">
      <div className="time-selector__btn d-flex">
        <h3 onClick={() => toggleCurrent()}>Past Events</h3>
        <h3 onClick={() => toggleCurrent()}>Upcoming Events</h3>
      </div>
      
      {isCurrent ? (
        <ul>
          {events.map((event, index) => {
            const eventDate = event.acf.date;
            const stringEventDate = new Date(eventDate).getTime();
            return (
              <>
        
                {stringEventDate >= stringCurrentDate ? (
                  <Link
                    key={index}
                    href={"/events/[slug]"}
                    as={`/events/${event.slug}`}
                  >
                    <a>
                    <EventCard name={event.title.rendered} date={event.acf.date} location={event.acf.location} description={event.acf.description}/>
                    </a>
                  </Link>
                ) : null}
              </>
            );
          })}
        </ul>
      ) : (
        <ul>
          {events.map((event, index) => {
            const eventDate = event.acf.date;
            const stringEventDate = new Date(eventDate).getTime();
            return (
              <>
                {stringEventDate < stringCurrentDate ? (
                  <Link
                    key={index}
                    href={"/events/[slug]"}
                    as={`/events/${event.slug}`}
                  >
                    <a>
                    <EventCard image={event._embedded["wp:featuredmedia"]["0"].source_url} name={event.title.rendered} date={event.acf.date} location={event.acf.location} description={event.acf.description}/>
                    </a>
                  </Link>
                ) : null}
              </>
            );
          })}
        </ul>
      )}
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
