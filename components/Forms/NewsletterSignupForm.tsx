import styled from "styled-components";
import theme from "../Global/Theme";
import React, { useState, useEffect } from "react";
import { event } from "nextjs-google-analytics";
import InputField from "./InputField";

const NewsletterForm = styled.form`
  input {
    height: 35px;
    width: 80%;
    flex: 1 1 0%;
    @media ${theme.devices.sm} {
      flex: initial;
      width: 90%;
    }
  }
  h3 {
    color: ${theme.colours.soil};
    font-size: 18px;
    max-width: 320px;
  }
  .position-relative {
    /* border: 2px solid blue; */
  }
  .button {
    position: relative;
    width: 75%;
    padding: 0;
    margin-top: 10px;
    @media ${theme.devices.sm} {
      width: 100px;
      height: 25px;
      position: absolute;
      margin-bottom: 0;
      bottom: 0;
      right: 0;
      transform: translateX(100%);
    }
  }
  .error-message {
    font-size: 1.4rem;
    color: #f2384a;
    line-height: 100%;
    font-weight: bold;
    @media ${theme.devices.sm} {
      position: absolute;
      transform: translateY(175%);
    }
  }
  @media ${theme.devices.sm} {
    .form-inner-container {
      display: flex;
      align-items: flex-end;
    }
  }
`;

const NewsletterSignupForm = ({ status, message, onValidated }) => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [newsletterValue, setNewsletterValue] = useState("");

  function testEmail() {
    let validEmail = /\S+@\S+\.\S+/.test(email);
    validEmail ? setEmailError(false) : setEmailError(true);
    console.log("valid email? ", validEmail);
  }

  useEffect(() => {
    if (status === "success") clearFields();
  }, [status]);

  const clearFields = () => {
    setEmail("");
    setNewsletterValue("");
  };

  const handleSubmit = (e: any) => {
    console.log("footer form submit clicked");
    e.preventDefault();
    testEmail();

    email &&
      email.indexOf("@") > -1 &&
      onValidated({
        EMAIL: email,
      });
    event("submit_form", {
      category: "FullWidthSignup",
      label: email,
      newsletterValue,
    });
  };

  return (
    <NewsletterForm onSubmit={(e) => handleSubmit(e)} className="mc__form">
      <h3 className="mc__title">{status === "success" ? "Success!" : ""}</h3>
      {status === "sending" && (
        <h3 className="mc__alert mc__alert--sending">sending...</h3>
      )}
      {status === "error" && (
        <h3
          className="mc__alert mc__alert--error"
          // dangerouslySetInnerHTML={{ __html: message }}
        >
          Sorry! It looks like something has gone wrong on our end. Please
          refresh and try again.
        </h3>
      )}
      {status === "success" && (
        <h3
          className="mc__alert mc__alert--success"
          dangerouslySetInnerHTML={{ __html: message }}
        />
      )}
      <div className="position-relative">
        {status !== "success" ? (
          <div className="form-inner-container">
            <InputField
              id="footer_email"
              onBlur={testEmail}
              label="Email Address (required)"
              onChangeHandler={(e: any) => setEmail(e.target.value)}
              type="text"
              value={email}
              placeholder=""
              isRequired
              name="email"
            />
            {emailError ? (
              <p className="error-message">Please enter a valid email</p>
            ) : null}
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
              <span id="mce-MMERGE7-HELPERTEXT" className="helper_text"></span>
            </div>
          </div>
        ) : null}

        {status === "success" ? (
          <button className="button btn--primary">Thank you!</button>
        ) : (
          <button
            className=" btn--primary button"
            type="submit"
            onClick={handleSubmit}
          >
            Sign Up
          </button>
        )}
      </div>
    </NewsletterForm>
  );
};

export default NewsletterSignupForm;
