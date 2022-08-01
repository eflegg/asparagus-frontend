import Link from "next/link";
import { getEvent, getSlugs } from "../../utils/wordpress";
import theme from "../../components/Global/Theme";
import styled from "styled-components";
import PageWrapper from "../../components/Global/PageWrapper";

const SingleEvent = styled.div`
border: solid blue;
width: 80%;
margin: 0 auto;
.image-container {
  border: solid black;
  ${theme.mediaQuery.md`
  width: 50%;
  `}
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
.wrapper {
  display: flex;
  flex-direction: column;
  // margin-top: 50px;
  ${theme.mediaQuery.md`
  flex-direction: row;
  `}
}

.event-info {
  border: solid red;
  padding: 20px;
  ${theme.mediaQuery.md`
  width: 50%;
  `}
}

.event--description {
  margin-bottom: 30px;
}
`;

export default function EventPage({ event, image }) {
  console.log("event: ", event);
  return (
    <PageWrapper>
      <h1 className="text-center">{event.title.rendered}</h1>
      <hr/>
   <SingleEvent>
       <div className="wrapper">
        <div className="image-container">
          <img src={event._embedded["wp:featuredmedia"]["0"].source_url} alt=""/>
        </div>
      <div className="event-info">
          <p className="event--date">{event.acf.date}</p>
          <p className="event--location">{event.acf.location}</p>
          <p className="event--description">{event.acf.description}</p>
          <Link href="/">
          <a className="btn btn--primary">Get Tickets</a>
        </Link>
      </div>
      </div>  
    </SingleEvent>
    </PageWrapper>
  );
}

//hey Next, these are the possible slugs
export async function getStaticPaths() {
  const paths = await getSlugs("events");

  return {
    paths,
    //this option below renders in the server (at request time) pages that were not rendered at build time
    //e.g when a new blogpost is added to the app
    fallback: "blocking",
  };
}

//access the router, get the id, and get the medatada for that post

export async function getStaticProps({ params }) {
  const event = await getEvent(params.slug);

  return {
    props: {
      event,
    },
    revalidate: 10, // In seconds
  };
}
