import React, { useEffect, useState, Suspense } from "react";
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

const MenuContainer = styled.div`
  .subnav {
  }
  .nav-link {
    font-family: ${theme.type.medium};
    font-size: 2.4rem;
    color: ${theme.colours.gusGreen};
    margin: 10px;
    display: flex;
    flex-direction: column;
    ul {
      padding-left: 0;
    }
  }
  margin: 30px 15px;
  ${theme.mediaQuery.md`
    margin: 30px 57px;
  `};
`;

const MobileNav = styled.nav``;

const ConnectMenuContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${theme.mediaQuery.md`
    flex: 0 0 50%; 
    margin-top: 30px; 
    align-items: flex-start; 
  `};
`;
const HamburgerMenuButton = styled.div`
  .btn-nav {
    cursor: pointer;
    &:focus {
      outline: none;
    }
    height: 50px;
    width: 50px;
    z-index: 3;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: transparent;
    border: 0px;
    span {
      width: 35px;
      height: 5px;
      margin-bottom: 1px;
      border-radius: 3px;
      margin-top: 5px;
      background: ${theme.colours.soil};
      z-index: 2;
    }
    .burger-2 {
      position: relative;
    }
    &.nav-close {
      .burger-1 {
        position: relative;
        transform: rotate(-45deg);
        top: 8px;
        transition: all 0.15s ease-in-out;
      }
      .burger-2 {
        position: relative;
        background: transparent;
        transition: all 0.15s ease-in-out;
      }
      .burger-3 {
        position: relative;
        top: -15px;
        transform: rotate(45deg);
        transition: all 0.15s ease-in-out;
      }
    }
    &.nav-open {
      .burger-1 {
        transform: rotate(0deg);

        transition: all 0.15s ease-in-out;
      }
      .burger-2 {
        overflow: hidden;
        transition: all 0.15s ease-in-out;
      }
      .burger-3 {
        transform: rotate(0deg);
        transition: all 0.15s ease-in-out;
      }
    }
  }
`;

const DesktopNav = styled.nav`
  ul {
    display: flex;
    justify-content: space-between;
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
    position: relative;
    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 30px;
      border-bottom: 2px solid ${theme.colours.soil};
      width: 0;
      transition: all 0.25s ease-out;
    }
    &:hover {
      &:not(:first-child) {
        &::after {
          content: "";

          width: 50%;
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
      if (!response.ok) {
        // oops! something went wrong
        return;
      }

      const links = await response.json();
      setLinks(links);
      const connectLinks = await connect.json();
      setConnectLinks(connectLinks);
    }

    loadLinks();
  }, []);

  function useWindowSize() {
    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
    const [windowSize, setWindowSize] = useState({
      width: undefined,
      height: undefined,
    });

    useEffect(() => {
      //sets the window size when client loads
      // only execute all the code below in client side
      //nextjs needs this or will throw an error that variable doesn't exist
      if (typeof window !== "undefined") {
        // Handler to call on window resize
        function handleResize() {
          // Set window width/height to state
          setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
          });
        }

        // Add event listener
        window.addEventListener("resize", handleResize);

        // Call handler right away so state gets updated with initial window size
        handleResize();

        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", handleResize);
      }
    }, []); // Empty array ensures that effect is only run on mount
    return windowSize;
  }

  //updates when the client loads so you can use it
  const size = useWindowSize();

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
              <img src="/Asparagus_Nameplate_Color.png" alt="" />
            </a>
          </Link>
          <ConnectMenuContainer>
            <ConnectMenuNav>
              <ul>
                {connectLinks?.items?.map((connectLink, index) => {
                  return (
                    <li className="connect--link" key={uuidv4()}>
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
              <HamburgerMenuButton>
                <button
                  className={`btn-nav ${navActive ? "nav-close" : "nav-open"}`}
                  onClick={() => {
                    setNavActive(!navActive);
                  }}
                >
                  <span className="burger-1"></span>
                  <span className="burger-2"></span>
                  <span className="burger-3"></span>
                </button>
                <button
                  role="button"
                  aria-controls="navMenu"
                  style={{ display: "none" }}
                  className="accessibility-close"
                >
                  Close Nav
                </button>
              </HamburgerMenuButton>
            )}
          </ConnectMenuContainer>
        </LogoConnectMenuContainer>

        {size.width >= 1000 ? (
          <DesktopNav>
            <ul>
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
        ) : (
          <MobileNav>
            {navActive ? (
              <ul>
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
            ) : null}
          </MobileNav>
        )}
      </Suspense>
    </MenuContainer>
  );
}
