import Link from "next/link";
import styled from "styled-components";
import theme from "../components/Global/Theme";

const EventCard = styled.div`
border: solid pink;
display: flex;
flex-direction: row;
width: 75%;
margin: 0 auto;
.event--image {
    border: solid blue;
    width: 38%;
    object-fit: cover;
}
.event--info {
    border: solid purple;
    padding 40px;
    max-width: 68%;
}
`;

export default function EventBlock() {
    return (
        <EventCard>
            <div className="event--image">
            <img src="cherryblossoms.jpg" alt="picture of cherry blossoms"></img>
            </div>
                <div className="event--info">
                    <h3 className="event--name"> Event Name</h3>
                    <p className="event--date">Date</p>
                    <p className="event--location">Location</p>
                    <p className="event--description">Description lala lalaDescription lala lalaDescription lala lalaDescription lala lalaDescription lala lalaDescription lala lalaDescription lala lalaDescription lala lalaDescription lala lalaDescription lala lalaDescription lala lalaDescription lala lalaDescription lala lala</p>
                    <button className="btn--primary">Learn More</button>
                </div>
        </EventCard>
    );

}