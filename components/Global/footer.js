import React, { useEffect, useState } from "react";
import { Config } from "../../config";
import fetch from "isomorphic-fetch";
import Link from "next/link";
import ActiveLink from "./ActiveLink";
import styled from "styled-components";
import theme from "./Theme";
import { v4 as uuidv4 } from "uuid";

const FooterContainer = styled.footer`
  width: 100%;
  max-width: 100%;
  background: ${theme.colours.gusYellow};
  overflow: hidden;
  padding-top: 50px; 
  display: flex; 
  flex-direction: column; 
`;
const FooterMenu = styled.div`
  display: flex;
  justify-content: space-between; 
  li {
    padding: 5px;
    list-style-type: none; 
    ${theme.mediaQuery.xs`
    font-size: calc(16px + 2 * ((100vw - 320px) / 680));
   `}
    ${theme.mediaQuery.md`
    @include font-size(1.8);
   `}
  }
  .nav-link {
    color: ${theme.colours.gusGreen}; 
    font-family: ${theme.type.header};
    font-size: 2.8rem; 
    font-weight: bold; 
  }
  .subnav {
    padding-left: 0;
    a {
      font-family: ${theme.type.accent};
      font-size: 1.8rem; 
    }
  }
`;

const SocialMediaLogos = styled.div`
  display: flex; 
`

const NewsletterContainer = styled.div`

`
const SignUp = styled.div`
  // &.text--support {
  //   border: 3px solid rebeccapurple;
  // }
  /* border: 3px solid rebeccapurple; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  /* padding: 30px 0px 20px 20px; */
  /* ${theme.mediaQuery.sm`
   padding: 30px;
  `}
  ${theme.mediaQuery.md`
  position: relative;
  left: 40px;
  padding: 40px;
  `} */
  input {
    height: 38px;
    max-width: 280px;
    flex: 1; 
    ${theme.mediaQuery.xs`
    width: 200px;
    margin-right: 20px;
  `}
  }
 .input-container {
   display: flex; 
   align-items: center; 
   
 }
 .btn--primary {
   z-index: 1; 

 }
 .newsletter-header {
   font-family: ${theme.type.header};
   font-size: 2.8rem; 
   color: ${theme.colours.gusGreen}
 }
 .newsletter-subheader {
   font-family: ${theme.type.accent};
   font-size: 2rem; 
   color: ${theme.colours.soil}; 
   line-height: 2.4rem; 
 }
`;

const Logo = styled.div`
  height: 100%;
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
`;

export default function Footer() {
  const [footerLinks, setFooterLinks] = useState([]);

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
      <FooterMenu className="footer--container">
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
                            activeClassName="navlink--active"
                            href={`/[slug]}`}
                            as={`/${childItem.slug}`}
                          >
                            <a
                              className=""
                              dangerouslySetInnerHTML={{
                                __html: childItem.title,
                              }}
                            ></a>
                          </ActiveLink>
                        ) : (
                          <ActiveLink
                            activeClassName="navlink--active"
                            href={`/${childItem.slug}`}
                            as={`/${childItem.slug}`}
                          >
                            <a
                              className="card-text pb-5"
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
        <NewsletterContainer>
          <div className="signupWrapper">
            <SignUp>
              <p className="newsletter-header">Sign up for News from the Asparagus Patch</p>
              <p className="newsletter-subheader">Pleasantly infrequent updates from Asparagus Magazine</p>
              <div className="input-container">
                <input type="test" />
                <button className="btn--primary"> Sign Up </button>
              </div>
            </SignUp>
          </div>
        </NewsletterContainer>
        <Logo>
          <img src="asparagus_tip_logo.svg" alt="asparagus logo" />
        </Logo>
      </FooterMenu>
      <SocialMediaLogos>
        <img src="/twitter_soil.svg" />
        <img src="/instagram_soil.svg" />
        <img src="/facebook_soil.svg" />
      </SocialMediaLogos>
    </FooterContainer>
  );
}