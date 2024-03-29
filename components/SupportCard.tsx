import styled from "styled-components";
import theme from "./Global/Theme";
import Image from "next/image";

const SupportBlock = styled.div`
  width: 100%;
  min-height: 350px;
  height: 30vh;
  margin-bottom: 40px;
  @media ${theme.devices.sm} {
    height: 50vh;
    // min-height: 550px;
  }
  @media ${theme.devices.md} {
    height: 80vh;
    min-height: 550px;
  }

  .image-container {
    position: relative;
    width: 100%;
    height: 100%;
    object-fit: cover;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      @media ${theme.devices.sm} {
        object-fit: cover;
        object-position: 0px -300px;
      }
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
        <h1 className="support-title">Asparagus depends on readers.</h1>
        <h2 className="support-subtitle h5">
          Support our work by subscribing, donating, or buying sustainable swag.
        </h2>
        <a
          href="https://shop.asparagusmagazine.com/product/donation/"
          rel="noreferrer"
          target="_blank"
        >
          <button className="btn--primary">Support Now</button>
        </a>
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
