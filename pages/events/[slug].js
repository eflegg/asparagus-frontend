import Link from "next/link";
import { getEvent, getSlugs } from "../../utils/wordpress";
import theme from "../../components/Global/Theme";
import styled from "styled-components";
import PageWrapper from "../../components/Global/PageWrapper";
import { v4 as uuidv4 } from "uuid";
import React from "react";
import Image from "next/image";
import SupportCard from "../../components/SupportCard";

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

  .btn-container {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
    ${theme.mediaQuery.md`
    margin-bottom: 40px;
    `}
  }
  .btn--secondary {
    position: relative;
    font-size: 1.6rem;
    ${theme.mediaQuery.md`
    font-size: 2.4rem;
    `}
    margin: 0 auto;
    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 30px;
      border-bottom: 2px solid ${theme.colours.soil};
      width: 0;
      transition: all 0.25s ease-out;
    }
    &:hover {
      &::after {
        content: "";
        width: 73%;
        transition: all 0.25s ease-out;
      }
    }
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

const RuleBox = styled.div`
  hr {
    margin-bottom: 20px;
  }
`;

export default function EventPage({ event, image }) {
  const gallery = event.acf.event_images;

  const eventDate = event.acf.date;
  const stringEventDate = new Date(eventDate).getTime();
  const stringCurrentDate = new Date().getTime();

  const fallbackImage =
    "https://www.asparagusmagazine.com/Asparagus_Tip_Logo.svg";

  return (
    <PageWrapper
      canonicalUrl={`https://asparagusmagazine.com/${event.slug}`}
      ogImageUrl={
        event._embedded["wp:featuredmedia"]
          ? event._embedded["wp:featuredmedia"]["0"].source_url
          : fallbackImage
      }
      ogType={event.yoast_head_json.og_type}
      ogTwitterImage={
        event._embedded["wp:featuredmedia"]
          ? event._embedded["wp:featuredmedia"]["0"].source_url
          : fallbackImage
      }
      SEOtitle={event.title.rendered}
      metadescription={event.acf.excerpt}
    >
      <h1 itemProp="name" className="text-center">
        {event.title.rendered}
      </h1>
      <RuleBox>
        <hr />
      </RuleBox>

      <SingleEvent itemscope itemtype="https://schema.org/Event">
        <div className="btn-container">
          <Link href={"/events"}>
            <a>
              <button className="btn--secondary">Back to Events</button>
            </a>
          </Link>
        </div>
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
            <p itemProp="startDate" className="single-event--date">
              {event.acf.date}
            </p>
            <p itemProp="address" className="event--location">
              {event.acf.location}
            </p>
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
      <SupportCard></SupportCard>
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

  const notFound = !event;

  return {
    props: {
      event,
    },
    revalidate: 1200, // In seconds
    notFound,
  };
}
