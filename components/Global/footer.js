import React, { useEffect, useState } from "react";
import { Config } from "../../config";
import fetch from "isomorphic-fetch";
import Image from "next/image";
import ActiveLink from "./ActiveLink";
import styled from "styled-components";
import theme from "./Theme";
import { v4 as uuidv4 } from "uuid";
import { useFormFields, useMailChimpForm } from "use-mailchimp-form";

const FooterContainer = styled.footer`
  width: 100%;
  max-width: 100%;
  background: ${theme.colours.gusYellow};
  overflow: hidden;

  display: flex;
  flex-direction: row;

  .footer-inner {
    display: flex;
    flex-direction: column-reverse;

    width: 100%;
    ${theme.mediaQuery.md`
    flex-direction: row;
    `}
  }
  .footer-link {
  }
`;
const FooterMenu = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 40px 0;
  ${theme.mediaQuery.sm`
  padding: 80px;
  `}
  ${theme.mediaQuery.md`
  padding: 40px 20px 40px 40px;
  width: 70%;
  `}
  flex-direction: column;
  .footer-menu--inner {
    // border: 3px solid yellow;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0 12px 20px 12px;
  }
  li {
    padding: 0 10px 15px 0;
    list-style-type: none;
  }
  .nav-link {
    color: ${theme.colours.gusGreen};
    font-family: ${theme.type.header};
    font-size: 1.6rem;
    ${theme.mediaQuery.md`
    font-size: 2.8rem;
    `}

    font-weight: bold;
  }
  .subnav {
    padding-left: 0;
    a {
      font-family: ${theme.type.accent};
      font-size: 1.3rem;
      line-height: 1rem;

      ${theme.mediaQuery.md`
      font-size: 1.8rem;
      line-height: 1.3rem;
      `}
    }
  }
  .subnav a:active {
    color: ${theme.colours.gusGreen};
  }
`;

const SocialMediaLogos = styled.div`
  display: flex;
  justify-content: center;
  ${theme.mediaQuery.md`
  justify-content: flex-start;
  `}

  a {
    height: 30px;
    width: 30px;
    &.fb-icon {
      height: 33px;
      margin: 25px 25px 25px 5px;
      position: relative;
      top: -1px;
    }
    margin: 25px;
  }
`;

const NewsletterContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;

  ${theme.mediaQuery.md`
 align-items: initial;
 `}
`;
const SignUp = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 10px;
  ${theme.mediaQuery.md`
  padding-top: 0;
  margin-top: 40px;
  `}

  input.email {
    height: 35px;
    width: 80%;
    flex: 1;
    ${theme.mediaQuery.xs`
    width: 180px;
    margin-right: 20px;

  `}
    ${theme.mediaQuery.sm`
   width: 200px;
   margin-right: 20px;
 `}
  ${theme.mediaQuery.md`
   width: 220px;
  
 `}
  }

  label,
  .label {
    position: relative;
    font-family: ${theme.type.semibold};
    color: ${theme.colours.soil};
    font-size: 1.3rem;
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 10px 0;
    ${theme.mediaQuery.md`
    font-size: 1.6rem;
    margin: 20px 0 15px;
  `}
  }

  #mc_embed_signup {
    margin-left: 10px;
    ${theme.mediaQuery.xs`
    margin-left: 18px;
    `}
    ${theme.mediaQuery.sm`
    margin: 20px
    `}
    ${theme.mediaQuery.md`
     margin: 80px 0 40px 0;
    `}
  }

  .btn--primary {
    z-index: 1;
    /* position: absolute; */
    position: relative;
    font-size: 1.4rem;
    /* left: 165px; */
    width: 75%;
    margin: 10px 0px;
    text-align: center;
    padding: 0px;
    ${theme.mediaQuery.sm`
width: 35%;
 
   `}
    ${theme.mediaQuery.md`

   font-size: 1.6rem;
 
   `}
  }
`;

const Logo = styled.div`
  width: 100%;
  min-width: 150px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    flex-grow: 1;
  }
  ${theme.mediaQuery.sm`
  // min-width: 30%;
  `}
  ${theme.mediaQuery.md`
  // position: relative;
  // // left: -40px;
  // min-width: 30%;
  `}
`;

export default function Footer() {
  const [footerLinks, setFooterLinks] = useState([]);
  const [emailValue, setEmailValue] = useState("");

  useEffect(() => {
    async function loadLinks() {
      const response = await fetch(
        `${Config.apiUrl}/wp-json/menus/v1/menus/footer-menu`
      );
      if (!response.ok) {
        // oops! something went wrong
        return;
      }

      const footerLinks = await response.json();
      setFooterLinks(footerLinks);
    }

    loadLinks();
  }, []);

  return (
    <FooterContainer>
      <div className="footer-inner">
        <FooterMenu className="footer--container">
          <div className="footer-menu--inner">
            {footerLinks?.items?.map((link, index) => {
              return (
                <li className="nav-link" key={uuidv4()}>
                  <span dangerouslySetInnerHTML={{ __html: link.title }}></span>
                  {link.child_items && (
                    <ul className="subnav">
                      {link?.child_items?.map((childItem, childIndex) => {
                        return (
                          <li key={uuidv4()} className="subnav-link">
                            {childItem.object == "general_pages" ? (
                              <ActiveLink
                                activeClassName="navlink--active__footer"
                                href={`/[slug]}`}
                                as={`/${childItem.slug}`}
                              >
                                <a
                                  className="footer-link"
                                  dangerouslySetInnerHTML={{
                                    __html: childItem.title,
                                  }}
                                ></a>
                              </ActiveLink>
                            ) : childItem.object == "custom" ? (
                              <a
                                href={childItem.url}
                                className="footer-link card-text pb-5"
                                dangerouslySetInnerHTML={{
                                  __html: childItem.title,
                                }}
                              ></a>
                            ) : (
                              <ActiveLink
                                activeClassName="navlink--active__footer"
                                href={`/${childItem.slug}`}
                                as={`/${childItem.slug}`}
                              >
                                <a
                                  className="footer-link card-text pb-5"
                                  dangerouslySetInnerHTML={{
                                    __html: childItem.title,
                                  }}
                                ></a>
                              </ActiveLink>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              );
            })}
          </div>
          <SocialMediaLogos>
            <a
              className="position-relative"
              href="https://twitter.com/asparagusmag"
              target="_blank"
              rel="noreferrer"
            >
              <Image
                src="/twitter_soil.svg"
                alt="Twitter logo and link"
                layout="fill"
              />
            </a>
            <a
              className="position-relative"
              href="https://www.instagram.com/asparagus.mag"
              target="_blank"
              rel="noreferrer"
            >
              <Image
                src="/instagram_soil.svg"
                alt="Instagram logo and link"
                layout="fill"
              />
            </a>
            <a
              className="position-relative"
              href="https://www.facebook.com/asparagusmag"
              target="_blank"
              rel="noreferrer"
            >
              <Image
                src="/facebook_soil.svg"
                alt="Facebook logo and link"
                layout="fill"
              />
            </a>
          </SocialMediaLogos>
        </FooterMenu>
        <NewsletterContainer>
          <div className="signupWrapper">
            <SignUp>
              <p className="newsletter-header--footer">
                Sign up for our email newsletters
              </p>
              <p className="newsletter-subheader--footer">
                Get articles, events, and green-living tips in your inbox
              </p>
              <div id="mc_embed_signup">
                <form
                  action="https://eepurl.us16.list-manage.com/subscribe/post?u=48412d1cef9610dca90286de4&amp;id=4e95f09911&amp;f_id=00d7abe0f0"
                  method="post"
                  id="mc-embedded-subscribe-form"
                  name="mc-embedded-subscribe-form"
                  className="validate"
                  target="_self"
                >
                  <label htmlFor="mce-EMAIL">Email Address (required)*</label>
                  <div className="d-flex flex-column flex-sm-row">
                    <input
                      type="email"
                      name="EMAIL"
                      className="required email"
                      id="mce-EMAIL"
                      required
                      value={emailValue}
                      onChange={(e) => setEmailValue(e.target.value)}
                    />
                    <input
                      type="submit"
                      value="Sign Up"
                      name="subscribe"
                      id="mc-embedded-subscribe"
                      className="button btn--primary"
                    />
                  </div>
                </form>
              </div>
            </SignUp>
          </div>
          <Logo>
            <img src="/Asparagus_Tip_Logo.svg" alt="Asparagus logo white" />
          </Logo>
        </NewsletterContainer>
      </div>
    </FooterContainer>
  );
}
