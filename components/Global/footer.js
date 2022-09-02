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
  // padding: 50px 0 50px 50px; 
  display: flex; 
  flex-direction: row; 
  // border: solid black;
  .footer-inner {
    display: flex;
    flex-direction: column-reverse;
    // border: solid 2px white;
    width: 100%;
    ${theme.mediaQuery.md`
    flex-direction: row;
    `}
  }
`;
const FooterMenu = styled.div`
  display: flex;
  justify-content: space-between; 
  // border: solid hotpink;
  padding: 20px 0 20px 12px;
  ${theme.mediaQuery.md`
  padding: 40px 20px 40px 40px;
  width: 60%;
  `}
  flex-direction: column;
  .footer-menu--inner {
    // border: 3px solid yellow;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  li {
    // padding: 0 0 5px 0;
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
    // border: solid blue;
    padding-left: 0;
    a {
      font-family: ${theme.type.accent};
      font-size: 1.3rem; 
      // color: black;
      ${theme.mediaQuery.md`
      font-size: 1.8rem;
      `}
    }
  }
  .subnav a:active {
    color: ${theme.colours.gusGreen};
  }
`;

const SocialMediaLogos = styled.div`
// border: solid green;
  display: flex; 
  justify-content: center;
  ${theme.mediaQuery.md`
  justify-content: flex-start;
  `}
  img {
    height: 20px;
    margin: 5px;
    // ${theme.mediaQuery.md`
    // height: 20px;
    // `}
  
  
`;

const NewsletterContainer = styled.div`
// border: solid rebeccapurple;
display: flex;
flex-direction: row;
justify-content: flex-end;
// width: 45%;
`;
const SignUp = styled.div`
  border: 3px solid salmon;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0 10px;
  ${theme.mediaQuery.md`
  margin-top: 40px;
  `}
  
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
   position: absolute;
   font-size: 1.4rem;
   left: 165px;
   ${theme.mediaQuery.sm`
   left: 285px;
   `}
   ${theme.mediaQuery.md`
   left: 680px;
   font-size: 1.6rem;
   `}
   ${theme.mediaQuery.lg`
   left: 990px;
   `}
 }
`;

const Logo = styled.div`
// border: solid teal;
width: 100%;
min-width: 150px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    flex-grow: 1;
  }
  ${theme.mediaQuery.sm`
  min-width: 30%;
  `}
  ${theme.mediaQuery.md`
  // position: relative;
  // // left: -40px;
  min-width: 30%;
  `}

  // flex-direction: row;
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
                            activeClassName="navlink--active"
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
                        ) : (
                          <ActiveLink
                            activeClassName="navlink--active"
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
        <img src="/twitter_soil.svg" />
        <img src="/instagram_soil.svg" />
        <img src="/facebook_soil.svg" />
      </SocialMediaLogos>
        </FooterMenu>
        <NewsletterContainer>
          <div className="signupWrapper">
            <SignUp>
              <p className="newsletter-header--footer">Sign up for News from the Asparagus Patch</p>
              <p className="newsletter-subheader--footer">Pleasantly infrequent updates from Asparagus Magazine</p>
              <div className="input-container">
                <input type="test" />
                <button className="btn--primary"> Sign Up </button>
              </div>
            </SignUp>
          </div>
          <Logo>
          <img src="asparagus_tip_logo.svg" alt="asparagus logo" />
        </Logo>
        </NewsletterContainer>
        </div>
      
    </FooterContainer>
  );
}