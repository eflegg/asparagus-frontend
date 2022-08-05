import Link from "next/link";
import styled from "styled-components";
import theme from "../components/Global/Theme";
import Image from "next/image";

const EventCard = styled.div`
  // border: solid pink;
  display: flex;
  flex-direction: column;
  ${theme.mediaQuery.sm`
flex-direction: row;
`}
  width: 75%;
  max-width: 1200px;
  margin: 26px auto;
  .event--image {
    position: relative;
    flex: none;
    // border: solid blue;
    ${theme.mediaQuery.sm`
        width: 40%;
        height: 100%;
        `}
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .event--info {
    // border: solid purple;
    padding: 20px;
    ${theme.mediaQuery.sm`
    width: 60%;
    padding-top: 0px;
    `}
  }
  ${theme.mediaQuery.xs`
 width: 90%;
  `}
`;

export default function EventBlock({ event }) {
  console.log("event: ", event);
  return (
    <EventCard>
      <div className="event--image">
        <Image
          src={event._embedded["wp:featuredmedia"]["0"].source_url}
          layout="responsive"
          objectFit="cover"
          height="250px"
          width="300px"
          alt={event._embedded["wp:featuredmedia"]["0"].alt_text}
        />
      </div>
      <div className="event--info">
        <h3 className="event--name">{event.title.rendered}</h3>
        <p className="event--date">{event.acf.date}</p>
        <p className="event--location">{event.acf.location}</p>
        <p className="event--excerpt">{event.acf.excerpt}</p>
        <p className="event--description">{event.acf.description}</p>
        <button className="btn--primary">Learn More</button>
      </div>
    </EventCard>
  );
}
