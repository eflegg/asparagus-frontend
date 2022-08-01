import Link from "next/link";
import styled from "styled-components";
import theme from "../components/Global/Theme";

const SupportBlock = styled.div`
width: 100%;
border: solid teal;
height: 40vh;
${theme.mediaQuery.sm`
height: 80vh;
`}
.image-container {
border: solid black;
position: relative;
width: 100%;
height: 100%;
object-fit: cover;
  img {
width: 100%;
height: 100%;
object-fit: cover;
${theme.mediaQuery.sm`
object-fit: cover;
object-position: 0px -300px;
`}
    }  
}
.support-text {
position: absolute;
z-index: 1;
width: 90%;
max-width: 2000px;
left: 0;
right: 0;
margin: 0 auto;
text-align: center;
margin-top: 10%;
h1 {
    margin-bottom: 10px;
}
.support-subtitle {
    font-family: ${theme.type.medium};
    margin-bottom: 5%;
}
}
`;

export default function SupportCard() {
    return (
<SupportBlock>
    <div className="support-text">
    <h1>Asparagus Depends on Readers</h1>
    <h5 className="support-subtitle">Support our Work by Subscribing, Donating or Purchasing Sustainable Swag</h5>
    <button className="btn--primary">Visit Shop</button>
    </div>
<div className="image-container">
    <img src="supportmountains2.jpg" alt=""/>
</div>
</SupportBlock>
    );
}