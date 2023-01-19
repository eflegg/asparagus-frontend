import Head from "next/head";
import PageWrapper from "../components/Global/PageWrapper";
import { Config } from "../config";
import fetch from "isomorphic-fetch";
import Link from "next/link";
import styled from "styled-components";
import theme from "../components/Global/Theme";
import Image from "next/image";
import React, { useState } from "react";
import { useFormFields, useMailChimpForm } from "use-mailchimp-form";

const NewsLetter = styled.div`
  .helper_text {
    font-size: 16px;
    position: relative;
    top: 5px;
    color: ${theme.colours.soil};
  }
  width: 100%;
  position: relative;
  padding: 80px 0px;
  margin-bottom: 40px;
  overflow: hidden;
  ${theme.mediaQuery.md`
  padding: 140px 0;
  `}
  h2 {
    position: relative;
    color: ${theme.colours.soil};
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
    width: 100%;
    height: 45px;
    position: relative;
    padding-left: 10px;
  }

  label,
  .label {
    position: relative;
    font-family: ${theme.type.semibold};
    color: ${theme.colours.soil};
    font-size: 1.6rem;
    ${theme.mediaQuery.md`
    font-size: 1.8rem;
  `}
    // border: solid hotpink;
    display: flex;
    flex-direction: column;
    width: 75%;
    margin-top: 20px;
    margin-bottom: 15px;
  }
  select {
    position: relative;
    width: 100%;
    height: 45px;
    padding-left: 10px;
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
    height: 100%;

    img {
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  button {
    background: blue;
    border: 2px solid yellow;
    position: relative;
  }
  .btn--primary {
    width: 75%;
    ${theme.mediaQuery.sm`
  width: 30%;
  `}
    font-family: ${theme.type.semibold};
  }
  form {
    position: relative;
    width: 80%;
    margin: 0 auto;
    ${theme.mediaQuery.sm`
  width: 60%;
  `}
    ${theme.mediaQuery.md`
  width: 50%;
  `}
  }
`;

export default function SignUp() {
  const [emailValue, setEmailValue] = useState("");
  const [newsletterValue, setNewsletterValue] = useState("");
  const [suggestedValue, setSuggestedValue] = useState("");

  // const url =
  // "https://eepurl.us16.list-manage.com/subscribe/post?u=48412d1cef9610dca90286de4&amp;id=4e95f09911&amp;f_id=00d7abe0f0";
  // const { loading, error, success, message, handleSubmit } =
  // useMailChimpForm(url);
  // const { fields, handleFieldChange } = useFormFields({
  // EMAIL: "",
  // NEWSLETTER: "",
  // SUGGEST: "",
  // });

  const fallbackImage =
    "https://www.asparagusmagazine.com/Asparagus_Tip_Logo.svg";

  return (
    <PageWrapper
      canonicalUrl={`https://asparagusmagazine.com/sign-up`}
      ogImageUrl={fallbackImage}
      ogTwitterImage={fallbackImage}
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

        <div id="mc_embed_signup">
          <form
            action="https://eepurl.us16.list-manage.com/subscribe/post?u=48412d1cef9610dca90286de4&amp;id=4e95f09911&amp;f_id=00d7abe0f0"
            method="post"
            id="mc-embedded-subscribe-form"
            name="mc-embedded-subscribe-form"
            className="validate"
            target="_self"
          >
            <div id="mc_embed_signup_scroll">
              <div className="mc-field-group">
                <label htmlFor="mce-EMAIL">Email Address (required)*</label>
                <input
                  type="email"
                  name="EMAIL"
                  className="required email"
                  id="mce-EMAIL"
                  required
                  value={emailValue}
                  onChange={(e) => setEmailValue(e.target.value)}
                />
                <span id="mce-EMAIL-HELPERTEXT" className="helper_text"></span>
              </div>
              <div className="mc-field-group">
                <label htmlFor="mce-MMERGE7">
                  Which newsletter(s) interest you? (required)*
                </label>
                <select
                  name="MMERGE7"
                  className=""
                  id="mce-MMERGE7"
                  value={newsletterValue}
                  onChange={(e) => setNewsletterValue(e.target.value)}
                >
                  {/* <option value=""></option> */}
                  <option value="Asparagus Tips">Asparagus Tips</option>
                  <option value="Letters from the Editor">
                    Letters from the Editor
                  </option>
                  <option value="Both newsletters">Both newsletters</option>
                </select>
                <span id="mce-MMERGE7-HELPERTEXT" className="helper_text">
                  Strategies for sustainable living, or updates from the team
                </span>
              </div>

              {/* who suggested? */}
              <div className="mc-field-group">
                <label htmlFor="mce-SUGGEST">
                  Who suggested that you sign up?{" "}
                </label>
                <input
                  type="text"
                  name="SUGGEST"
                  className=""
                  id="mce-SUGGEST"
                  value={suggestedValue}
                  onChange={(e) => setSuggestedValue(e.target.value)}
                />
                <span id="mce-SUGGEST-HELPERTEXT" className="helper_text">
                  Let us know so we can sign them up for a prize!
                </span>
              </div>
              {/* who suggested */}
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
              <div
                style={{ position: "absolute", left: "-5000px" }}
                aria-hidden="true"
              >
                <input
                  type="text"
                  name="b_48412d1cef9610dca90286de4_4e95f09911"
                  tabIndex="-1"
                  value="defaultValue"
                />
              </div>
              <div className="optionalParent">
                <div className="clear foot">
                  <input
                    type="submit"
                    value="Subscribe"
                    name="subscribe"
                    id="mc-embedded-subscribe"
                    className="button btn--primary"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </NewsLetter>
    </PageWrapper>
  );
}
