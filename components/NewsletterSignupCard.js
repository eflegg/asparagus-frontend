import Link from "next/link";
import styled from "styled-components";
import theme from "../components/Global/Theme";
import React, { useState } from "react";

const NewsletterBlock = styled.div`
  position: relative;
  box-sizing: border-box;
  align-items: center;
  width: 100%;
  margin: 45px auto;
  background-color: ${theme.colours.darkWheat};
  button {
    font-size: 2rem;
    ${theme.mediaQuery.md`
  font-size: 2.2rem;
  `};
    ${theme.mediaQuery.md`
  font-size: 2.6rem;
  `};
  }
  .signupWrapper {
    // border: solid red;
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    /* this is how you use the & in scss */
    &.wrapper--support {
      width: 100%;
      // border: solid rebeccapurple;
      align-items: stretch;
    }
  }
  width: 100%;
  position: relative;
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
    border: solid blue;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    ${theme.mediaQuery.md`
   width: 40%;
   `}
  }

  .btn--primary {
    width: 75%;
    ${theme.mediaQuery.sm`
 width: 35%;
 `}
    font-family: ${theme.type.semibold};
  }
  form {
    position: relative;
    width: 100%;
    margin: 0 auto;
  }
`;

const TripleStalk = styled.div`
  // border: 3px solid orangered;
  height: 100%;
  max-height: 800px;
  min-width: 40%;
  ${theme.mediaQuery.sm`
  min-width: 30%;
  `}
  ${theme.mediaQuery.md`
  position: relative;
  left: -40px;
  min-width: 30%;
  `}

  flex-direction: row;
  padding: 2%;
`;

const PhotoStyled = styled.div`
  width: 75%;
  // border: solid hotpink;
  .image-container {
    // border: 2px solid green;

    object-fit: cover;
    height: 100%;
    // width: 65%;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;

const SignUp = styled.div`
  // border: 3px solid black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 30px 0px 20px 20px;
  ${theme.mediaQuery.sm`
   padding: 30px;
  `}
  ${theme.mediaQuery.md`
  position: relative;
  left: 40px;
  padding: 40px;
  `}
  input {
    height: 38px;
    max-width: 280px;
    ${theme.mediaQuery.xs`
    width: 200px;
    margin-right: 20px;
  `}
  }
  &.text--support {
    padding: 20px;
  }
`;

export default function NewsletterSignup({ title, subtitle, image, support }) {
  const [emailValue, setEmailValue] = useState("");
  const [newsletterValue, setNewsletterValue] = useState("");
  const [suggestedValue, setSuggestedValue] = useState("");

  return (
    <NewsletterBlock>
      <div className={`${support ? "wrapper--support" : " "} signupWrapper`}>
        <SignUp className={`${support ? "text--support" : " "} `}>
          <p className="newsletter-header--primary">{title}</p>
          <p className="newsletter-subheader--primary">{subtitle}</p>
          {support ? (
            <button className="btn--primary">
              <a
                href="https://shop.asparagusmagazine.com"
                target="_blank"
                rel="noreferrer"
              >
                Donate
              </a>
            </button>
          ) : (
            <div className="d-flex flex-column flex-sm-row align-items-center">
              <div id="mc_embed_signup">
                <form
                  action="https://eepurl.us16.list-manage.com/subscribe/post?
u=48412d1cef9610dca90286de4&amp;id=4e95f09911&amp;f_id=00d7abe0f0"
                  method="post"
                  id="mc-embedded-subscribe-form"
                  name="mc-embedded-subscribe-form"
                  className="validate"
                  target="_self"
                >
                  <div id="mc_embed_signup_scroll">
                    <div className="mc-field-group">
                      <label htmlFor="mce-EMAIL">
                        Email Address (required)*
                      </label>
                      <input
                        type="email"
                        name="EMAIL"
                        className="required email"
                        id="mce-EMAIL"
                        required
                        value={emailValue}
                        onChange={(e) => setEmailValue(e.target.value)}
                      />
                      <span
                        id="mce-EMAIL-HELPERTEXT"
                        className="helper_text"
                      ></span>
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
                        <option value="Both newsletters">
                          Both newsletters
                        </option>
                      </select>
                      <span
                        id="mce-MMERGE7-HELPERTEXT"
                        className="helper_text"
                      ></span>
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
                          className="button btn--primary"
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )}
        </SignUp>

        {support ? (
          <PhotoStyled>
            <div className="image-container">
              <img src={image} alt="nature image" />
            </div>
          </PhotoStyled>
        ) : (
          <TripleStalk>
            <img src={image} alt="asparagus logo" />
          </TripleStalk>
        )}
      </div>
    </NewsletterBlock>
  );
}
