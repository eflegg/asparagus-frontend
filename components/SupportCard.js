import Link from "next/link";
import styled from "styled-components";
import theme from "../components/Global/Theme";

const SupportBlock = styled.div`
width: 100%;
border: solid teal;
height: 80vh;
.image-container {
width: 100%;
height: 100%;
object-fit: cover;
  img {
width: 100%;
height: 100%;
object-fit: cover;
}  
}

`;

export default function SupportCard() {
    return (
<SupportBlock>
<div className="image-container">
    <img src="supportmountains2.jpg" alt=""/>
</div>
</SupportBlock>
    );
}