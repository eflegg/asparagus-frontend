import Link from "next/link";
import styled from "styled-components";
import theme from "../components/Global/Theme";

const EventCard = styled.div`
border: solid pink;
display: flex;
flex-direction: column;
${theme.mediaQuery.sm`
flex-direction: row;
`}
width: 75%;
margin: 26px auto;
.event--image {
    flex: none;
    border: solid blue;
    ${theme.mediaQuery.sm`
        width: 40%;
        `}
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}
.event--info {
    border: solid purple;
    padding 40px;
    ${theme.mediaQuery.sm`
    width: 60%;
    `}
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