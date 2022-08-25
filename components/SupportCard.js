import Link from "next/link";
import styled from "styled-components";
import theme from "../components/Global/Theme";
import Image from "next/image";

const SupportBlock = styled.div`
  width: 100%;
  min-height: 350px;
  height: 50vh;
  margin-bottom: 40px;
  ${theme.mediaQuery.sm`
height: 80vh;
min-height: 550px;
`}
  ${theme.mediaQuery.md`

min-height: 500px;
`}
  .image-container {
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
    .support-title {
      margin-bottom: 10px;
    }
    .support-subtitle {
      font-family: ${theme.type.medium};
      margin-bottom: 10px;
      color: ${theme.colours.darkWheat};
    }
  }
`;

export default function SupportCard({}) {
  return (
    <SupportBlock>
      <div className="support-text">
        <h1 className="support-title">Asparagus Depends on Readers</h1>
        <h5 className="support-subtitle">
          Support our Work by Subscribing, Donating or Purchasing Sustainable
          Swag
        </h5>
        <button className="btn--primary">Visit Shop</button>
      </div>
      <div className="image-container">
        <Image
          src="/supportmountains2.jpg"
          alt=""
          layout="fill"
          objectFit="cover"
        />
      </div>
    </SupportBlock>
  );
}
