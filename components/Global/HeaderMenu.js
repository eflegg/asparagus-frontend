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
  border: 1px solid red; 
  margin: 30px 57px; 
`;
const MobileNav = styled.nav`
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
    position: absolute;
    position: fixed;
    top: 18px;
    right: 15px;
    span {
      width: 35px;
      height: 5px;
      margin-bottom: 1px;
      border-radius: 3px;
      margin-top: 5px;
      background: ${theme.colours.gusGreen};
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
        left: 150px;
        overflow: hidden;
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
  border: 1px solid black; 
  justify-content: space-evenly; 
  align-items: center; 
`
const ConnectMenuNav = styled.nav`
  /* display: flex;
  flex-direction: row;  */
  border: 1px solid black; 
`

const ConnectMenuList = styled.ul`
  display: flex;
  justify-content: space-between; 
`

const ConnectMenuItem = styled.a`
  font-size: 20px; 
  font-weight: 600; 
  color: ${theme.colours.soil};
  font-family: ${theme.type.semibold}; 
`

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
            <a>
              <h3>Asparagus Logo</h3>
            </a>
          </Link>
          <ConnectMenuNav>
            <ConnectMenuList>
              {connectLinks?.items?.map((connectLink, index) => {
                return (
                  <li key={uuidv4()}>
                    <ActiveLink
                      activeClassName="navlink--active"
                      href={`/${connectLink.slug}`}
                      to={`/${connectLink.slug}`}
                    >
                      <ConnectMenuItem>{connectLink.title}</ConnectMenuItem>
                    </ActiveLink>
                  </li>
                );
              })}
            </ConnectMenuList>
          </ConnectMenuNav>
        </LogoConnectMenuContainer>

        {size.width >= 1000 ? (
          <DesktopNav>
            <ul>
              {links?.items?.map((link, index) => {
                return (
                  <>
                    <li
                      className="nav-link"
                      key={uuidv4()}
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
                  </>
                );
              })}{" "}
            </ul>
          </DesktopNav>
        ) : (
          <MobileNav>
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
            {navActive ? (
              <ul>
                {links?.items?.map((link, index) => {
                  return (
                    <>
                      <li
                        className="nav-link"
                        key={uuidv4()}
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
                    </>
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
