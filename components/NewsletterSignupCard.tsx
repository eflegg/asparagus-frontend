import Link from "next/link";
import styled from "styled-components";
import theme from "./Global/Theme";
import React, { useState } from "react";
import Image from "next/image";
import MailchimpSubscribe from "react-mailchimp-subscribe";
import NewsletterSignupForm from "./Forms/NewsletterSignupForm";

const NewsletterBlock = styled.div`
  position: relative;
  box-sizing: border-box;
  align-items: center;
  width: 100%;
  margin: 45px auto;
  background-color: ${theme.colours.darkWheat};
  button {
    font-size: 2rem;
    @media ${theme.devices.md} {
      font-size: 2.2rem;
    }
    @media ${theme.devices.md} {
      font-size: 2.6rem;
    }
  }
  .signupWrapper {
    // border: solid red;
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    /* justify-content: space-between; */
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
    @media ${theme.devices.md} {
      width: 90%;
    }
    @media ${theme.devices.lg} {
      width: 70%;
    }
    font-size: 2.4rem;
    @media ${theme.devices.md} {
      font-size: 4.8rem;
    }
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
    @media ${theme.devices.md} {
      font-size: 1.8rem;
    }
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
    @media ${theme.devices.md} {
      font-size: 1.8rem;
    }
  }
  .newsletter-options {
    position: relative;
    border: solid blue;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    @media ${theme.devices.md} {
      width: 40%;
    }
  }

  .btn--primary {
    width: 75%;
    @media ${theme.devices.sm} {
      width: 35%;
    }
    a {
      font-family: ${theme.type.semibold};
    }
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
  @media ${theme.devices.sm} {
    min-width: 30%;
  }
  @media ${theme.devices.md} {
    position: relative;
    left: -40px;
    min-width: 30%;
  }

  flex-direction: row;
  padding: 2%;
`;

const PhotoStyled = styled.div`
  width: 75%;
  // border: solid hotpink;
  .image-container {
    // border: 2px solid green;
    position: relative;
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
  @media ${theme.devices.sm} {
    padding: 30px;
  }
  @media ${theme.devices.md} {
    position: relative;
    left: 40px;
    padding: 40px;
  }
  input {
    height: 38px;
    max-width: 280px;
    @media ${theme.devices.xs} {
      width: 200px;
      margin-right: 20px;
    }
  }
  &.text--support {
    padding: 20px;
  }
`;

export default function NewsletterSignup({ title, subtitle, image, support }) {
  const [emailValue, setEmailValue] = useState("");
  const [newsletterValue, setNewsletterValue] = useState("");
  const [suggestedValue, setSuggestedValue] = useState("");

  const postUrl = `https://eepurl.us16.list-manage.com/subscribe/post?u=48412d1cef9610dca90286de4&amp;id=4e95f09911&amp;f_id=00d7abe0f0`;

  return (
    <NewsletterBlock>
      <div className={`${support ? "wrapper--support" : " "} signupWrapper`}>
        <SignUp className={`${support ? "text--support" : " "} `}>
          <p className="newsletter-header--primary">{title}</p>
          <p className="newsletter-subheader--primary">{subtitle}</p>
          {support ? (
            <button className="btn--primary">
              <a
                href="https://shop.asparagusmagazine.com/product/donation/"
                target="_blank"
                rel="noreferrer"
              >
                Donate
              </a>
            </button>
          ) : (
            <div className="mc__form-container">
              <MailchimpSubscribe
                url={postUrl}
                render={({ subscribe, status, message }) => (
                  <NewsletterSignupForm
                    status={status}
                    message={message}
                    onValidated={(formData) => subscribe(formData)}
                  />
                )}
              />
            </div>
          )}
        </SignUp>

        {support ? (
          <PhotoStyled>
            <div className="image-container">
              {/* <img src={image} alt="nature image" /> */}
              <Image
                // width={457}
                // height={99}
                layout="fill"
                src={image}
                alt="nature image"
              />
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
