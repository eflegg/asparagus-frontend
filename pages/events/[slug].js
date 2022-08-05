import Link from "next/link";
import { getEvent, getSlugs } from "../../utils/wordpress";
import theme from "../../components/Global/Theme";
import styled from "styled-components";
import PageWrapper from "../../components/Global/PageWrapper";
import { v4 as uuidv4 } from "uuid";
import React from "react";
import Image from "next/image";

const SingleEvent = styled.div`
  // border: solid blue;
  width: 80%;
  margin: 0 auto;

  .image-container {
    position: relative;
    height: initial;
    min-height: 300px;
    ${theme.mediaQuery.md`
  width: 50%;

  `}/* img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    } */
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
    // border: solid red;
    padding: 20px;
    ${theme.mediaQuery.md`
  width: 50%;
  padding-top: 0px;
  `}
  }

  .event--description {
    margin-bottom: 30px;
  }
`;

const Gallery = styled.div`
  .event-gallery {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(25.5rem, 100%), 1fr));
    grid-row-gap: 50px;
    grid-column-gap: 50px;
    justify-content: center;
    width: 80%;
    margin: 65px auto;
    list-style: none;
    ${theme.mediaQuery.md`
  `}
  }
  .event-image {
    position: relative;
    /* img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    } */
  }
`;

export default function EventPage({ event, image }) {
  console.log("event: ", event);
  const gallery = event.acf.event_images;

  const eventDate = event.acf.date;
  const stringEventDate = new Date(eventDate).getTime();
  const stringCurrentDate = new Date().getTime();

  console.log("gallery", gallery);
  return (
    <PageWrapper
      canonicalUrl={`https://asparagusmagazine.com/${event.slug}`}
      ogImageUrl={event.yoast_head_json.og_image}
      ogType={event.yoast_head_json.og_type}
      ogTwitterImage={event.yoast_head_json.twitter_card}
      SEOtitle={event.title.rendered}
      metadescription={event.acf.excerpt}
    >
      <h1 className="text-center">{event.title.rendered}</h1>
      <hr />
      <SingleEvent>
        <div className="wrapper">
          <div className="image-container">
            <Image
              src={event._embedded["wp:featuredmedia"]["0"].source_url}
              alt={event._embedded["wp:featuredmedia"]["0"].alt_text}
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="event-info">
            <p className="single-event--date">{event.acf.date}</p>
            <p className="event--location">{event.acf.location}</p>
            <p className="event--description">{event.acf.description}</p>
            {stringEventDate >= stringCurrentDate ? (
              <Link href="/">
                <a>
                  <button className="btn btn--primary">Get Tickets</button>
                </a>
              </Link>
            ) : null}
          </div>
        </div>
      </SingleEvent>
      <Gallery>
        <div className="event-gallery">
          {gallery && gallery.length > 0
            ? gallery.map((galleryImage, index) => {
                return (
                  <React.Fragment key={uuidv4()}>
                    <div className="event-image">
                      <Image
                        src={galleryImage?.url}
                        alt=""
                        layout="responsive"
                        width="500"
                        height="500"
                        objectFit="cover"
                      />
                    </div>
                  </React.Fragment>
                );
              })
            : null}
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
