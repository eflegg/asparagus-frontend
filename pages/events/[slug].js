import Link from "next/link";
import { getEvent, getSlugs } from "../../utils/wordpress";
import theme from "../../components/Global/Theme";
import styled from "styled-components";
import PageWrapper from "../../components/Global/PageWrapper";
import { v4 as uuidv4 } from "uuid";
import React from "react";

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

const Gallery = styled.div`
.event-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, 300px);
  grid-row-gap: 70px;
  grid-column-gap: 70px;
  justify-content: center;
  width: 90%;
  margin: 20px auto;
  list-style: none;
  ${theme.mediaQuery.md`
  grid-template-columns: repeat(auto-fit, 450px);
  `}
}
.event-image {
  height: 450px;
  width: 450px;
  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
}
`;

export default function EventPage({ event, image }) {
  console.log("event: ", event);
  const gallery = event.acf.event_images;
  const galleryImage1 = gallery[0].title;
  console.log("galleryImage1", galleryImage1);
  console.log("gallery", gallery);
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
          <p className="single-event--date">{event.acf.date}</p>
          <p className="event--location">{event.acf.location}</p>
          <p className="event--description">{event.acf.description}</p>
          <Link href="/">
          <a className="btn btn--primary">Get Tickets</a>
        </Link>
      </div>
      </div>  
    </SingleEvent>
    <Gallery>
      <div className="event-gallery">
      {gallery.map((galleryImage, index)=>{
        return (
          <React.Fragment key={uuidv4()}>
          <div className="event-image">
          <img src={galleryImage.url} alt=""></img>
          </div>
          </React.Fragment>
        )
      })}
      </div>
      </Gallery>
    
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
