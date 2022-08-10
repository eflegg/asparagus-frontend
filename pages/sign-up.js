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
position: relative;
padding-top: 40px;
margin-bottom: 40px;
h2 {
  position: relative;
  color: ${theme.colours.darkWheat};
  width: 80%;
  margin: 0 auto;
  ${theme.mediaQuery.md`
  width: 90%;
  `}
  ${theme.mediaQuery.lg`
  width: 70%;
  `}
  font-size: 2.4rem;
  ${theme.mediaQuery.md`
  font-size: 4.8rem;
`}
}
input {
  // width: 75%;
}
.newsletter-options {
  position: relative;
  // border: solid blue;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  ${theme.mediaQuery.md`
  width: 40%;
  `}
  label {
    font-family: ${theme.type.semibold};
    color: ${theme.colours.soil};
    font-size: 1.6rem;
    ${theme.mediaQuery.md`
    font-size: 1.8rem;
  `}

  }
  .input-label {
    // border: solid hotpink;
    display: flex;
    flex-direction: column;
    width: 75%;
    margin-top: 20px;
    margin-bottom: 15px;
  }
  select {
    font-family: ${theme.type.accent};
    font-size: 1.6rem;
    ${theme.mediaQuery.md`
      font-size: 1.8rem;
    `}
  }
}
.image-container {
position: absolute;
top: 0;
left: 0;
object-fit: cover;
width: 100%;
height: 80vh;
max-height: 1500px; 
img{
  width: 100%;
  height: 100%;
  object-fit: cover;
}
}

.btn--primary {
  width: 75%;
  ${theme.mediaQuery.sm`
  width: 30%;
`}
  font-family: ${theme.type.semibold};
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
      <div className="image-container">
        <img src="rocky_shore.jpg" alt=""></img>
        </div>
        <h2 className="text-center">Pleasently Infrequent Updates from Asparagus Magazine</h2>
        <div className="newsletter-options">
          <div className="input-label">
        <label>Email Address</label>
        <input type="email"/>
        </div>
        <div className="input-label">
        <label>Which Newsletters Interest You?</label>
        <select>
            <option value="asparagus-tips">Asparagus Tips</option>
            <option value="asparagus-newsletter">Asparagus Newsletter</option> 
          </select>
          </div>
          <div className="input-label">
              <label>Who Suggested that you Sing Up?</label>
            <select>
          <option value="friend">Friend</option>
          <option value="social-media">Social Media</option>
        </select>
        </div>
        <button className="btn--primary">Sign Up</button>
        </div>
      </NewsLetter>
    </PageWrapper>
  );
}

// query the page with the slug sign-up
