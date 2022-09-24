import PageWrapper from "../components/Global/PageWrapper";
import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import theme from "../components/Global/Theme";

const Wrapper = styled.div`
  position: relative;
  width: 80%;
  margin: 100px auto;
  ${theme.mediaQuery.sm`
    width: 60%;
    `}
  h1, p {
    text-align: center;
  }
  .error-image {
    position: relative;
    height: 200px;
    width: 82px;
    margin: 0 auto;
  }
`;

export default function FourOhFour() {
  return (
    <PageWrapper>
      <Wrapper className="404-wrapper">
        <h1 className="h5">Hmm, seems there `$apos`s nothing growing here!</h1>
        <div className="error-image">
          <Image
            src="/triplestalk.svg"
            layout="responsive"
            height="732px"
            width="300px"
            alt="Asparagus Magazine logo"
          />
        </div>
        <h4>
          Visit our{" "}
          <Link href="/">
            <a>Home Page</a>
          </Link>{" "}
          or use the search bar to find somthing tasty to read
        </h4>
      </Wrapper>
    </PageWrapper>
  );
}
