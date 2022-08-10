import Head from "next/head";
import PageWrapper from "../components/Global/PageWrapper";
import { Config } from "../config";
import fetch from "isomorphic-fetch";
import Link from "next/link";
import styled from "styled-components";
import theme from "../components/Global/Theme";
import Image from "next/image";

const NewsLetter = styled.div`
width: 100%;
height: 1500px;
position: relative;
h2 {
  color: ${theme.colours.darkWheat};
  width: 80%;
  ${theme.mediaQuery.md`
  width: 90%;
  `}
  ${theme.mediaQuery.lg`
  width: 70%;
  `}
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translate(-50%);
}
input {
  width: 50%;
}
.newsletter-options {
  // border: solid blue;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 80%;
  position: absolute;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);
  ${theme.mediaQuery.md`
  width: 40%;
  `}
  p {
    font-family: ${theme.type.semibold};
    color: ${theme.colours.soil};
  }
  select {
    font-family: ${theme.type.accent};
    font-size: 1.6rem;
    width: 50%;
    ${theme.mediaQuery.md`
      font-size: 1.8rem;
    `}
  }
}
.image-container {
height: 100vh;
img{
  width: 100%;
  height: 100%;
  object-fit: cover;
}
}

.btn--primary {
  width: 30%;
}

`;

export default function SignUp() {
  return (
    <PageWrapper
      canonicalUrl={`https://asparagusmagazine.com/sign-up`}
      ogImageUrl="triplestalk.svg"
      ogTwitterImage="triplestalk.svg"
      SEOtitle="Newsletter Sign Up"
      metadescription="Sign up to receive Asparagus Magazine's pleasantly infrequent newsletter"
    >
      <h1 className="text-center">Asparagus News</h1>
      <hr/>
      <NewsLetter>
        <h2 className="text-center">Pleasently Infrequent Updates from Asparagus Magazine</h2>
        <div className="newsletter-options">
        <p>Email Address</p>
        <input type="email"/>
        <p>Which Newsletters Interest You?</p>
        <select>
            <option value="asparagus-tips">Asparagus Tips</option>
            <option value="asparagus-newsletter">Asparagus Newsletter</option> 
          </select>
              <p>Who Suggested that you Sing Up?</p>
            <select>
          <option value="friend">Friend</option>
          <option value="social-media">Social Media</option>
        </select>
        <button className="btn--primary">Sign Up</button>
        </div>
        <div className="image-container">
        <img src="rocky_shore.jpg" alt=""></img>
        </div>
      </NewsLetter>
    </PageWrapper>
  );
}

// query the page with the slug sign-up
