import React, { useEffect, useState } from "react";
import { Config } from "../../config";
import fetch from "isomorphic-fetch";
import ActiveLink from "./ActiveLink";
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";
import theme from "./Theme";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";

const MenuContainer = styled.div`
  .subnav {
  }
  .nav-link {
    font-size: 2.4rem;
    margin: 10px;
    display: flex;
    flex-direction: column;
    border: 2px solid turquoise;
    ul {
      padding-left: 0;
    }
  }
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
  }
`;

export default function HeaderMenu() {
  const [links, setLinks] = useState([]);
  const [connectLinks, setConnectLinks] = useState([]);
  const [screenWidth, setscreenWidth] = useState(800);
  const [navActive, setNavActive] = useState(false);
  const [subnav, setSubnav] = useState(null);

  const handleSubnavClick = (menuId) => {
    console.log(`subnav clicked`, menuId);
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

  useEffect(() => {
    function handleResize() {
      setscreenWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
  });

  // const isDesktop = useMediaQuery({ query: "(min-width: 1000px)" });

  return (
    <MenuContainer className="menu--container">
      <Link href="/">
        <a>
          <h3>Asparagus Logo</h3>
        </a>
      </Link>

      {screenWidth >= 1000 ? (
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

      <h3>Connect Menu</h3>
      {/* <nav> */}
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
      {/* </nav> */}
    </MenuContainer>
  );
}
