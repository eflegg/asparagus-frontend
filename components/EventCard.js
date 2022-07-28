import Link from "next/link";
import styled from "styled-components";
import theme from "../components/Global/Theme";

const EventCard = styled.div`
border: solid pink;
display: flex;
flex-direction: row;
width: 75%;
margin: 0 auto;
object-fit: cover;
.event--image {
    flex: none;
    border: solid blue;
    width: 38%;
    object-fit: cover;
}
.event--info {
    border: solid purple;
    padding 40px;
    width: 60%;
}
${theme.mediaQuery.xs`
 width: 90%;
  `}
`;

export default function EventBlock({image, name, date, location, description}) {
    return (
        <EventCard>
            <div className="event--image">
            <img src={image} alt=""></img>
            </div>
                <div className="event--info">
                    <h3 className="event--name">{name}</h3>
                    <p className="event--date">{date}</p>
                    <p className="event--location">{location}</p>
                    <p className="event--description">{description}</p>
                    <button className="btn--primary">Learn More</button>
                </div>
        </EventCard>
    );

}