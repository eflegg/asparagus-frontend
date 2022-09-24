import React, { useEffect, useState } from "react";
import { Config } from "../../config";
import fetch from "isomorphic-fetch";
import ActiveLink from "./ActiveLink";
import styled from "styled-components";
import theme from "./Theme";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
import Loader from "./Loader";
import Image from "next/image";
import Search from "./search";
import HamburgerMenuButton from "../HeaderMenuComponents/HamburgerMenuButton";

const MenuContainer = styled.div`
  .nameplate-container {
    position: relative;
    top: 35px;
    ${theme.mediaQuery.md`
    top: 0;
    `}
  }
  .custom-tagline {
    width: 80%;
    position: relative;
    top: 35px;
    margin: 0 auto;
    font-size: 1.2rem;
    line-height: 1.4rem;
    font-family: ${theme.type.italic};
    ${theme.mediaQuery.md`
    display: none;
    `}
  }
  .custom-tagline--desktop {
    width: 80%;
    font-size: 1.6rem;
    line-height: 1.8rem;
    display: none;
    font-family: ${theme.type.italic};
    ${theme.mediaQuery.md`
    // display: none;
    `}
  }
  .nameplate {
    ${theme.mediaQuery.md`
  max-width: 457px;
  transition: all .15s ease-in-out;
  `};
    ${theme.mediaQuery.lg`
  max-width: 518px;
  transition: all .15s ease-in-out;
  `};
  }
  ${theme.mediaQuery.md`
    position: sticky;
    z-index: 10;
    top: -121px;
  `};
  ${theme.mediaQuery.lg`
    position: sticky;
    z-index: 10;
    top: -134px;
  `};
  .nav-link {
    button {
      font-family: ${theme.type.medium};
      /* font-size: 2.4rem; */
      color: ${theme.colours.gusGreen};
    }
    &:focus {
      border: 1px solid orange;
    }
    /* position: relative; */
    z-index: 20;
    margin: 15px 10px;
    display: flex;
    flex-direction: column-reverse;
    ul {
      padding-left: 0;
    }
  }
  margin: 0px 15px 30px;
  ${theme.mediaQuery.md`
    margin: 30px 57px 0px 57px;
  `};
`;

const MobileNavContainer = styled.div`
  background-color: ${theme.colours.darkWheat};
  height: 100%;
  width: 100%;
  position: fixed;
  z-index: 20;
  top: 0;
  left: 0;
  padding: 60px 36px 0px 36px;
  ul {
    position: relative;
    width: 100%;
    top: 20px;
  }
`;
const MobileNav = styled.nav`
  .menu-chevron {
    position: relative;
    top: 5px;
    left: 5px;
  }
  .nav-link {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
  }
  .subnav {
    flex: 1;
    margin-left: 10px;
  }
  a.card-text {
    font-family: ${theme.type.medium};
    color: ${theme.colours.black};
    font-size: 1.8rem;
  }
`;
const HamburgerLogoContainer = styled.div`
  margin-top: 25px;
`;

const ConnectMenuContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2%;
  ${theme.mediaQuery.md`
    // flex: 0 0 60%; 
    align-items: flex-start; 
    margin-left: 20px;
  
  `};
  ${theme.mediaQuery.lg`

    margin-left: 50px;
  
  `};
`;

const DesktopNav = styled.nav`
  //  position: fixed;
  z-index: 1;
  width: 100%;
  ul.desktopnav {
    display: flex;
    justify-content: space-between;
    position: relative;
    z-index: 20;
    padding-left: 2%;
    padding-right: 2%;
    width: 100%;
    /* width: 100vw; */
    /* padding-left: 30px; */
    /* padding-right: 30px; */
    /* border: 2px solid orange; */
    /* margin: 0px -57px 0px -57px; */
    background-color: transparent;
    transition: all 0.25s ease-in-out;
    &:after {
      content: "";
      position: absolute;
      height: 58px;
      width: 110%;
      left: 50%;
      top: -10px;
      transform: translateX(-50%);
      background-color: transparent;
      transition: all 0.25s ease-in-out;
    }
    &.desktopnavcolorchange {
      transition: all 0.25s ease-in-out;
      &:after {
        transition: all 0.25s ease-in-out;
        background-color: ${theme.colours.gusYellow};
      }
    }
  }
  ul.subnav {
    display: flex;
    align-items: center;
    padding: 14px 20px;
    background-color: ${theme.colours.gusYellow};
    justify-content: space-around;
    position: absolute;
    width: 115%;
    top: 48px;
    transform: translateX(-50%);
    z-index: 1;
    height: 0px;
    left: 50%;
    opacity: 0;
    display: none;
    transition: all 1s ease-in-out;
    &.subnav-open {
      height: auto;
      opacity: 1;
      display: flex;
      transition: all 1s ease-in-out;
    }
  }
  li.subnav-link {
    border-right: 1px solid;
    border-color: ${theme.colours.grey};
    width: 100%;
    text-align: center;
  }
  li.subnav-link:last-of-type {
    border: none;
  }
  a.card-text {
    font-family: ${theme.type.semibold};
    color: ${theme.colours.gusGreen};
    font-size: 1.8rem;
  }
`;

const LogoConnectMenuContainer = styled.div`
  display: flex;
  flex-direction: column-reverse;
  justify-content: space-between;
  align-items: flex-start;
  position: relative;
  margin-bottom: 60px;
  .img {
    /* flex: 0 0 50%; */
    height: 100%;
    width: 100%;
  }
  ${theme.mediaQuery.md`
    flex-direction: row;
    margin-bottom: 20px;
    `};
`;
const ConnectMenuNav = styled.nav`
  margin-left: 15px;
  width: 100%;
  position: relative;
  transition: all 0.5s ease-in-out;
  ul.connect-ul {
    position: relative;
    .mobile--home-stalk {
      position: absolute;
      opacity: 0;
      left: -500px;
      transition: all 0.25s ease-in-out;
    }
    &.nav-active--mobile {
      position: fixed;
      padding: 0px 3%;
      background: transparent;
      transition: all 0.5s ease-in-out;
    }
    li {
      position: relative;
      opacity: 1;
      top: 0px;
      width: initial;
      transition: all 0.5s ease-in-out;
      &:first-of-type {
        width: initial;
      }
      transition: all 0.5s ease-in-out;
    }
    &.scrolled--mobile {
      position: fixed;
      top: 0;

      background: ${theme.colours.darkWheat};
      transition: all 0.5s ease-in-out;
      padding: 10px 0px;
      li {
        /* display: none; */
        opacity: 0;
        width: 0px;
        transition: all 0.5s ease-in-out;
        &:first-of-type {
          /* display: block; */
          position: relative;
          opacity: 1;
          top: 0;
          width: initial;
          transition: all 0.5s ease-in-out;
        }
        transition: all 0.5s ease-in-out;
      }
      .mobile--home-stalk {
        position: relative;
        left: 0;
        opacity: 1;
        transition: all 0.55s ease-in-out;
      }
    }
    width: 100%;
    /* position: fixed;
    ${theme.mediaQuery.md`
    position: relative;
    `}; */
    left: 0;
    z-index: 30;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: nowrap;
  }
  a {
    font-size: 1.6rem;
    font-weight: 600;
    // color: ${theme.colours.soil};
    font-family: ${theme.type.semibold};
    ${theme.mediaQuery.sm`
     font-size: 2rem;
    `};
  }
  li {
    display: block;
    transition: all 0.25s ease-in-out;
    flex: none;
    ${theme.mediaQuery.md`
      padding: 3px 20px; 
    `};
    position: relative;
    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      border-bottom: 2px solid ${theme.colours.soil};
      width: 0;
      transition: all 0.25s ease-out;
    }
    &:hover {
      &:not(:first-of-type) {
        &::after {
          content: "";
          width: 54%;
          transition: all 0.25s ease-out;
        }
      }
    }
  }
  li:first-of-type {
    background-color: ${theme.colours.gusYellow};
    padding: 3px 5px;
    border-radius: 5px;
    ${theme.mediaQuery.md`
      padding: 3px 30px; 
    `};
  }
`;

export default function HeaderMenu() {
  const [links, setLinks] = useState([]);
  const [connectLinks, setConnectLinks] = useState([]);
  const [footerLinks, setFooterLinks] = useState([]);
  const [navActive, setNavActive] = useState(false);
  const [subnav, setSubnav] = useState(null);

  // console.log("links: ", links);

  const handleSubnavClick = (menuId) => {
    if (subnav == menuId) {
      setSubnav(null);
    } else {
      setSubnav(menuId);
    }
  };

  useEffect(() => {
    async function loadLinks() {
      const response = await fetch(
        `${Config.apiUrl}/wp-json/menus/v1/menus/header-menu`
      );
      const connect = await fetch(
        `${Config.apiUrl}/wp-json/menus/v1/menus/connect-menu`
      );

      const footer = await fetch(
        `${Config.apiUrl}/wp-json/menus/v1/menus/footer-menu`
      );

      if (!response.ok) {
        // oops! something went wrong
        return;
      }

      const links = await response.json();
      setLinks(links);
      const connectLinks = await connect.json();
      setConnectLinks(connectLinks);
      const footerLinks = await footer.json();
      setFooterLinks(footerLinks);
    }

    loadLinks();
  }, []);

  function useWindowSpecs() {
    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
    const [windowSpecs, setWindowSpecs] = useState({
      width: undefined,
      height: undefined,
      scrollY: undefined,
    });

    useEffect(() => {
      //sets the window size when client loads
      // only execute all the code below in client side
      //nextjs needs this or will throw an error that variable doesn't exist
      if (typeof window !== "undefined") {
        // Handler to call on window resize
        function handleResize() {
          // Set window width/height to state
          setWindowSpecs({
            width: window.innerWidth,
            height: window.innerHeight,
            scrollY: window.scrollY,
          });
        }

        // Add event listener
        window.addEventListener("resize", handleResize);
        window.addEventListener("scroll", handleResize);

        // Call handler right away so state gets updated with initial window size
        handleResize();

        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", handleResize);
      }
    }, []); // Empty array ensures that effect is only run on mount
    return windowSpecs;
  }

  //updates when the client loads so you can use it
  const size = useWindowSpecs();
  // const imgRef = useRef();

  // console.log("connect links: ", connectLinks);
  // console.log("footer links: ", footerLinks);

  return (
    <>
      {links.length < 1 ? (
        <Loader />
      ) : (
        <MenuContainer className="menu--container">
          <LogoConnectMenuContainer>
            <p className="custom-tagline text-center">
              Telling large and small stories of how we can live sustainably.
            </p>
            <div className="logo-tagline--container">
              <Link href="/">
                <a className="position-relative d-block nameplate-container">
                  {size.width < 1000 ? (
                    <img
                      className="nameplate nameplate--desktop"
                      src="/Asparagus_Nameplate_notag.png"
                      alt="Asparagus Magazine logo"
                    />
                  ) : (
                    <img
                      className="nameplate nameplate--desktop"
                      src="/Asparagus_Nameplate_Color.png"
                      alt="Asparagus Magazine logo"
                    />
                  )}
                </a>
              </Link>
              <p className="custom-tagline--desktop ">
                Telling large and small stories of how we can live sustainably.
              </p>
            </div>
            <ConnectMenuContainer>
              <ConnectMenuNav>
                <ul
                  className={`${
                    navActive && size.width < 1000
                      ? "nav-active--mobile"
                      : size.scrollY > 2 && size.width < 1000
                      ? "scrolled--mobile"
                      : ""
                  } connect-ul`}
                >
                  <div className="mobile--home-stalk">
                    <Link href="/">
                      <Image
                        src="/triplestalk.svg"
                        alt="Asparagus Magazine logo"
                        layout="fixed"
                        width="53px"
                        height="56px"
                      />
                    </Link>
                  </div>
                  {connectLinks?.items?.map((connectLink, index) => {
                    return (
                      <li className="connect--link" key={uuidv4()}>
                        {connectLink.object === "page" ? (
                          <ActiveLink
                            activeClassName="navlink--active"
                            href={`/${connectLink.slug}`}
                            to={`/${connectLink.slug}`}
                          >
                            <a>{connectLink.title}</a>
                          </ActiveLink>
                        ) : (
                          <a href={connectLink.url}>{connectLink.title}</a>
                        )}
                      </li>
                    );
                  })}
                  <Search
                    scrolled={
                      size.scrollY > 2 && size.width < 1000 ? true : false
                    }
                  />
                  {size.width < 1000 && (
                    <HamburgerMenuButton
                      navActive={navActive}
                      onClick={() => {
                        setNavActive(!navActive);
                      }}
                    />
                  )}
                </ul>
              </ConnectMenuNav>
            </ConnectMenuContainer>
          </LogoConnectMenuContainer>
          {size.width >= 1000 && (
            <DesktopNav>
              <ul
                className={`${
                  size.scrollY >= 142 ? "desktopnavcolorchange" : ""
                } desktopnav`}
              >
                {links?.items?.map((link, index) => {
                  return (
                    <React.Fragment key={uuidv4()}>
                      <li
                        className="nav-link"
                        onClick={() => handleSubnavClick(link.ID)}
                      >
                        <button
                          className="no-button"
                          dangerouslySetInnerHTML={{ __html: link.title }}
                        ></button>
                        {/* {link.child_items && subnav == link.ID ? ( */}
                        <ul
                          className={`${
                            link.child_items && subnav == link.ID
                              ? "subnav-open"
                              : ""
                          } subnav `}
                        >
                          {link?.child_items?.map((childItem, childIndex) => {
                            return (
                              <li key={uuidv4()} className="subnav-link">
                                {childItem.object == "page" ? (
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
                                ) : (
                                  <ActiveLink
                                    activeClassName="navlink--active"
                                    href={"/categories/[slug]"}
                                    as={`/categories/${childItem.slug}`}
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
                        {/* // ) : null} */}
                      </li>
                    </React.Fragment>
                  );
                })}{" "}
              </ul>
            </DesktopNav>
          )}
          {navActive ? (
            <MobileNavContainer>
              <HamburgerLogoContainer>
                <Link href="/">
                  <a onClick={() => setNavActive(false)}>
                    <img
                      className="nameplate nameplate--mobile"
                      // ref={imgRef}
                      src="/Asparagus_Nameplate_Color.png"
                    />
                  </a>
                </Link>
              </HamburgerLogoContainer>
              <MobileNav>
                <ul>
                  {/* <Link href="/">
                    <a>Home</a>
                  </Link> */}
                  {links?.items?.map((link, index) => {
                    return (
                      <React.Fragment key={uuidv4()}>
                        <li
                          className="nav-link"
                          onClick={() => handleSubnavClick(link.ID)}
                        >
                          <span
                            dangerouslySetInnerHTML={{ __html: link.title }}
                          />
                          {link.child_items && subnav == link.ID ? (
                            <>
                              <ul className="subnav">
                                <img
                                  src="/hamburger-arrow.svg"
                                  width="20px"
                                  height="13px"
                                />
                                {link?.child_items?.map(
                                  (childItem, childIndex) => {
                                    return (
                                      <li
                                        onClick={() => setNavActive(false)}
                                        key={uuidv4()}
                                        className="subnav-link"
                                      >
                                        {childItem.object == "page" ? (
                                          <ActiveLink
                                            activeClassName="navlink--active"
                                            href={`/[slug]}`}
                                            as={`/${childItem.slug}`}
                                          >
                                            <a
                                              className="card-text pb-5"
                                              dangerouslySetInnerHTML={{
                                                __html: childItem.title,
                                              }}
                                            />
                                          </ActiveLink>
                                        ) : (
                                          <ActiveLink
                                            activeClassName="navlink--active"
                                            href={"/categories/[slug]"}
                                            as={`/categories/${childItem.slug}`}
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
                                  }
                                )}
                              </ul>
                            </>
                          ) : null}
                        </li>
                      </React.Fragment>
                    );
                  })}{" "}
                </ul>
                <ul>
                  {footerLinks?.items?.map((footerLink, index) => {
                    return (
                      <li
                        className="nav-link"
                        key={uuidv4()}
                        onClick={() => handleSubnavClick(footerLink.ID)}
                      >
                        <span
                          dangerouslySetInnerHTML={{ __html: footerLink.title }}
                        />
                        {footerLink.child_items ? (
                          <img
                            className="menu-chevron"
                            src="/hamburger-arrow.svg"
                            width="20px"
                            height="13px"
                          />
                        ) : null}
                        {footerLink.child_items && subnav == footerLink.ID ? (
                          <ul className="subnav">
                            {footerLink?.child_items?.map(
                              (childItem, childIndex) => {
                                return (
                                  <li key={uuidv4()} className="subnav-link">
                                    {childItem.object == "page" ? (
                                      <ActiveLink
                                        activeClassName="navlink--active"
                                        href={`/[slug]}`}
                                        as={`/${childItem.slug}`}
                                      >
                                        <a
                                          className="card-text pb-5"
                                          dangerouslySetInnerHTML={{
                                            __html: childItem.title,
                                          }}
                                        />
                                      </ActiveLink>
                                    ) : childItem.object == "custom" ? (
                                      <a
                                        href={childItem.url}
                                        className="card-text pb-5"
                                        dangerouslySetInnerHTML={{
                                          __html: childItem.title,
                                        }}
                                      />
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
                                        />
                                      </ActiveLink>
                                    )}
                                  </li>
                                );
                              }
                            )}
                          </ul>
                        ) : null}
                      </li>
                    );
                  })}
                </ul>
              </MobileNav>
            </MobileNavContainer>
          ) : null}
        </MenuContainer>
      )}
    </>
  );
}
