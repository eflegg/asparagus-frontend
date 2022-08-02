import React, { useState } from "react";
import Link from "next/link";
import { getEvents } from "../utils/wordpress";
import PageWrapper from "../components/Global/PageWrapper";
import EventCard from "../components/EventCard";
import styled from "styled-components";
import theme from "../components/Global/Theme";

const EventsContainer = styled.div`
hr {
  margin-bottom: 25px;
}
h6 {
  margin: 0 55px 0 25px;
  font-size: 2.4rem;
}
`;

export default function Events({ events }) {
  console.log("events: ", events);

  const [isCurrent, setIsCurrent] = useState(false);
  const stringCurrentDate = new Date().getTime();
  function toggleCurrent() {
    setIsCurrent(!isCurrent);
  }

  return (
    <PageWrapper pageTitle="Events" className="">
      <EventsContainer>
      <h1 className="text-center">Events</h1>
      <hr/>
      <div className="time-selector__btn d-flex justify-content-flex-end">
        <h6 className="text-right" onClick={() => toggleCurrent()}>Past Events</h6>
        <h6 onClick={() => toggleCurrent()}>Upcoming Events</h6>
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
                    <EventCard name={event.title.rendered} date={event.acf.date} location={event.acf.location} excerpt={event.acf.excerpt}/>
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
                    <EventCard image={event._embedded["wp:featuredmedia"]["0"].source_url} name={event.title.rendered} date={event.acf.date} location={event.acf.location} excerpt={event.acf.excerpt}/>
                    </a>
                  </Link>
                ) : null}
              </>
            );
          })}
        </ul>
      )}
      </EventsContainer>
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
