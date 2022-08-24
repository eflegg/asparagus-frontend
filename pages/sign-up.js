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
  overflow: hidden;
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
  label {
    font-family: ${theme.type.semibold};
    color: ${theme.colours.soil};
    font-size: 1.6rem;
    ${theme.mediaQuery.md`
    font-size: 1.8rem;
  `}
  }
  label {
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
  }
  .image-container {
    position: absolute;
    top: 0;
    left: 0;
    object-fit: cover;
    width: 100%;

    img {
      top: 0;
      left: 0;
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
  form {
    width: 80%;
    margin: 0 auto;
    ${theme.mediaQuery.sm`
  width: 75%;
`}
    ${theme.mediaQuery.md`
  width: 60%;
`}
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
      <hr />
      <NewsLetter>
        <div className="image-container">
          <img src="rocky_shore.jpg" alt=""></img>
        </div>
        <h2 className="text-center">
          Pleasantly Infrequent Updates from Asparagus Magazine
        </h2>

        <link
          href="//cdn-images.mailchimp.com/embedcode/classic-071822.css"
          rel="stylesheet"
          type="text/css"
        />

        <div id="mc_embed_signup">
          <form
            action="https://eepurl.us16.list-manage.com/subscribe/post?u=48412d1cef9610dca90286de4&amp;id=4e95f09911&amp;f_id=00d7abe0f0"
            method="post"
            id="mc-embedded-subscribe-form"
            name="mc-embedded-subscribe-form"
            className="validate"
            target="_blank"
            noValidate
          >
            <div id="mc_embed_signup_scroll">
              <h2>Subscribe</h2>
              <div className="indicates-required">
                <span className="asterisk">*</span> indicates required
              </div>
              <div className="mc-field-group">
                <label htmlFor="mce-EMAIL">
                  Email Address (required) <span className="asterisk">*</span>
                </label>
                <input
                  type="email"
                  value=""
                  name="EMAIL"
                  className="required email"
                  id="mce-EMAIL"
                />
                {/* <span id="mce-EMAIL-HELPERTEXT" className="helper_text"></span> */}
              </div>
              <div className="mc-field-group">
                <label htmlFor="mce-MMERGE7">
                  Which newsletter(s) interest you? (required){" "}
                </label>
                <select name="MMERGE7" className="" id="mce-MMERGE7">
                  <option value=""></option>
                  <option value="Asparagus Tips">Asparagus Tips</option>
                  <option value="Letters from the Editor">
                    Letters from the Editor
                  </option>
                  <option value="Both newsletters">Both newsletters</option>
                </select>
                {/* <span
                  id="mce-MMERGE7-HELPERTEXT"
                  className="helper_text"
                ></span> */}
              </div>
              <div id="mce-responses" className="clear foot">
                <div
                  className="response"
                  id="mce-error-response"
                  style={{ display: "none" }}
                ></div>
                <div
                  className="response"
                  id="mce-success-response"
                  style={{ display: "none" }}
                ></div>
              </div>
              {/* real people should not fill this in and expect good things - do not remove this or risk form bot signups */}
              <div
                style={{ position: "absolute", left: "-5000px" }}
                aria-hidden="true"
              >
                <input
                  type="text"
                  name="b_48412d1cef9610dca90286de4_4e95f09911"
                  tabIndex="-1"
                  value=""
                />
              </div>
              <div className="optionalParent">
                <div className="clear foot">
                  <input
                    type="submit"
                    value="Subscribe"
                    name="subscribe"
                    id="mc-embedded-subscribe"
                    className="button"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
        {/* <script type='text/javascript' src='//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js'></script><script type='text/javascript'>(function($) {window.fnames = new Array(); window.ftypes = new Array();fnames[0]='EMAIL';ftypes[0]='email';fnames[7]='MMERGE7';ftypes[7]='dropdown';fnames[5]='SUGGEST';ftypes[5]='text';}(jQuery));var $mcj = jQuery.noConflict(true);</script> */}
      </NewsLetter>
    </PageWrapper>
  );
}

// query the page with the slug sign-up
