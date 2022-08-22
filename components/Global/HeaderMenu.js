import React, { useEffect, useState, Suspense, useRef } from "react";
import { Config } from "../../config";
import fetch from "isomorphic-fetch";
import ActiveLink from "./ActiveLink";
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";
import theme from "./Theme";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
import Loader from "./Loader";
import Image from "next/image";
import Search from "./search";
import HamburgerMenuButton from "../HeaderMenuComponents/HamburgerMenuButton";

const MenuContainer = styled.div`
  position: sticky;
  z-index: 10;
  top: -175px;
  .nav-link {
    font-family: ${theme.type.medium};
    font-size: 2.4rem;
    color: ${theme.colours.gusGreen};
    margin: 10px;
    display: flex;
    flex-direction: column-reverse;
    ul {
      padding-left: 0;
    }
  }
  margin: 30px 15px;
  ${theme.mediaQuery.md`
    margin: 30px 57px 0px 57px;
  `};
`;

const MobileNavContainer = styled.div`
  background-color: ${theme.colours.darkWheat};
  height: 100%;
  width: 100%;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  padding: 20px 36px 0px 36px;

  ul {
    position: relative;
    width: 100%;
  }
`;
const MobileNav = styled.nav`
  .nav-link {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
  }
  .subnav {
    flex: 1;
    margin-left: 10px;
  }
  a.card-text.pb-5 {
    font-family: ${theme.type.medium};
    color: ${theme.colours.black};
    font-size: 1.8rem;
  }
`;
const HamburgerLogoContainer = styled.div`
  margin-top: 25px;
`;

const ConnectMenuContainer = styled.div`
  display: ${(props) => (props.scroll && props.mobile ? "none" : "flex")};
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
  ${theme.mediaQuery.md`
    flex: 0 0 50%; 
    padding-top: 30px; 
    align-items: flex-start; 
  `};
`;

const DesktopNav = styled.nav`
  /* position: fixed; */

  z-index: 1;
  width: 100vw;

  ul.desktopnav {
    display: flex;
    justify-content: space-between;
    position: relative;
    width: 100vw;
    padding-left: 30px;
    padding-right: 30px;
    /* border: 2px solid orange; */
    margin: 0px -57px 0px -57px;
    background-color: transparent;
    transition: all 0.25s ease-in-out;
    &.desktopnavcolorchange {
      transition: all 0.25s ease-in-out;
      background-color: ${theme.colours.gusYellow};
    }
  }

  ul.subnav {
    display: flex;
    align-items: center;
    padding: 14px 20px;
    background-color: ${theme.colours.gusYellow};
    justify-content: space-around;
    position: absolute;
    width: 100%;
    top: 100%;
    left: 0;
    z-index: 1;
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
  a.card-text.pb-5 {
    font-family: ${theme.type.semibold};
    color: ${theme.colours.gusGreen};
    font-size: 1.8rem;
  }
`;

const LogoConnectMenuContainer = styled.div`
  display: flex;
  flex-direction: column-reverse;
  justify-content: space-around;
  position: relative;

  .img {
    flex: 0 0 50%;
    height: 100%;
    width: 100%;
  }
  ${theme.mediaQuery.md`
    flex-direction: row;
    `};
`;
const ConnectMenuNav = styled.nav`
  flex: 1;
  ul {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-wrap: nowrap;
  }
  a {
    font-size: 2rem;
    font-weight: 600;
    color: ${theme.colours.soil};
    font-family: ${theme.type.semibold};
  }
  li {
    flex: none;
    ${theme.mediaQuery.md`
      padding: 3px 30px; 
    `};
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
const ConnectScrollMenuContainer = styled.div`
  display: flex;
  direction: row;
  align-items: center;
  justify-content: space-evenly;
  background-color: ${theme.colours.darkWheat};
  position: fixed;

  z-index: 1;
  top: 0;
  width: 100vw;
  padding: 10px 20px;
  margin-left: -15px;
  div.left-container {
    display: flex;
    align-items: center;
    flex: 1;
  }
  div.right-container {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex: 1;
  }
  div.donate-button {
    background-color: ${theme.colours.gusYellow};
    padding: 3px 5px;
    border-radius: 5px;
  }
  div.search-container {
    margin-right: 15px;
  }
`;

export default function HeaderMenu() {
  const [links, setLinks] = useState([]);
  const [connectLinks, setConnectLinks] = useState([]);
  const [footerLinks, setFooterLinks] = useState([]);
  const [navActive, setNavActive] = useState(false);
  const [subnav, setSubnav] = useState(null);

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
  const imgRef = useRef();

  return (
    <MenuContainer className="menu--container">
      <Suspense fallback={<Loader />}>
        <LogoConnectMenuContainer>
          <Link href="/">
            <a className="position-relative d-block">
              {/*           
              <Image
                src="/Asparagus_Nameplate_Color.png"
                alt="Asparagus Magazine logo"
                layout="responsive"
                objectFit="cover"
                width="604px"
                height="173px"
              /> */}
              <img
                ref={imgRef}
                src="/Asparagus_Nameplate_Color.png"
                alt="Asparagus Magazine logo"
              />
            </a>
          </Link>
          {size.scrollY >= 10 && size.width < 1000 && (
            <ConnectScrollMenuContainer>
              <div className="left-container">
                <Link href="/">
                  <Image
                    src="/triplestalk.svg"
                    alt="Asparagus Magazine logo"
                    layout="fixed"
                    width="53px"
                    height="56px"
                  />
                </Link>
                <div className="donate-button">
                  <ActiveLink
                    activeClassName="navlink--active"
                    href={`/${connectLinks?.items?.[0].slug}`}
                    to={`/${connectLinks?.items?.[0].slug}`}
                  >
                    <a>{connectLinks?.items?.[0].title}</a>
                  </ActiveLink>
                </div>
              </div>
              <div className="right-container">
                <div className="search-container">
                  <Search />
                </div>
                <HamburgerMenuButton
                  navActive={navActive}
                  onClick={() => {
                    setNavActive(!navActive);
                  }}
                />
              </div>
            </ConnectScrollMenuContainer>
          )}
          <ConnectMenuContainer
            scroll={size.scrollY >= 10 ? true : false}
            mobile={size.width < 1000 ? true : false}
          >
            <ConnectMenuNav>
              <ul>
                {connectLinks?.items?.map((connectLink, index) => {
                  return (
                    <li key={uuidv4()}>
                      <ActiveLink
                        activeClassName="navlink--active"
                        href={`/${connectLink.slug}`}
                        to={`/${connectLink.slug}`}
                      >
                        <a>{connectLink.title}</a>
                      </ActiveLink>
                    </li>
                  );
                })}
                <Search />
              </ul>
            </ConnectMenuNav>

            {size.width < 1000 && (
              <HamburgerMenuButton
                navActive={navActive}
                onClick={() => {
                  setNavActive(!navActive);
                }}
              />
            )}
          </ConnectMenuContainer>
        </LogoConnectMenuContainer>

        {size.width >= 1000 && (
          <DesktopNav>
            <ul
              // style={
              //   size.scrollY >= 10
              //     ? { top: -10 - imgRef.current.clientHeight }
              //     : null
              // }
              className={`${
                size.scrollY >= 175 ? "desktopnavcolorchange" : ""
              } desktopnav`}
              // {
              //   size.scrollY >= 175 ? "desktopnavcolorchange" : "desktopnav"
              // }
            >
              {links?.items?.map((link, index) => {
                return (
                  <React.Fragment key={uuidv4()}>
                    <li
                      className="nav-link"
                      onClick={() => handleSubnavClick(link.ID)}
                    >
                      <span
                        dangerouslySetInnerHTML={{ __html: link.title }}
                      ></span>
                      {link.child_items && subnav == link.ID ? (
                        <ul className="subnav">
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
                      ) : null}
                    </li>
                  </React.Fragment>
                );
              })}{" "}
            </ul>
          </DesktopNav>
        )}

        {navActive ? (
          <MobileNavContainer>
            <ConnectMenuNav>
              <ul>
                {connectLinks?.items?.map((connectLink, index) => {
                  return (
                    <li key={uuidv4()}>
                      <ActiveLink
                        activeClassName="navlink--active"
                        href={`/${connectLink.slug}`}
                        to={`/${connectLink.slug}`}
                      >
                        <a>{connectLink.title}</a>
                      </ActiveLink>
                    </li>
                  );
                })}
              </ul>
            </ConnectMenuNav>
            <HamburgerLogoContainer>
              <Link href="/">
                <a>
                  <img ref={imgRef} src="/Asparagus_Nameplate_Color.png" />
                </a>
              </Link>
            </HamburgerLogoContainer>
            <MobileNav>
              <ul>
                <li>
                  <a className="nav-link" href="/">
                    Home
                  </a>
                </li>
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
                                    <li key={uuidv4()} className="subnav-link">
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
                                        />
                                      </ActiveLink>
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

                      {footerLink.child_items && subnav == footerLink.ID ? (
                        <ul className="subnav">
                          <img
                            src="/hamburger-arrow.svg"
                            width="20px"
                            height="13px"
                          />
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
      </Suspense>
    </MenuContainer>
  );
}
