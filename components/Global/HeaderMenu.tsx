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
// import nameplateMobile from "../../public/Asparagus_Nameplate_notag.png";
// import nameplateDesktop from "../../public/Asparagus_Nameplate_Color.png";

const MenuContainer = styled.div`
  .logo-tagline--container {
    min-width: 320px;
    width: 100%;
    @media ${theme.devices.md} {
    }
  }
  .nameplate-container {
    width: 80%;
    margin: 0 auto;
    position: relative;
    top: 35px;
    @media ${theme.devices.md} {
      margin: 0;
      width: 100%;
      top: 0;
    }
    @media ${theme.devices.md} {
      max-width: 457px;
      transition: all 0.15s ease-in-out;
    }
    @media ${theme.devices.lg} {
      max-width: 518px;
      transition: all 0.15s ease-in-out;
    }
  }

  .custom-tagline {
    width: 80%;
    position: relative;
    top: 35px;
    margin: 0 auto;
    font-size: 1.2rem;
    line-height: 1.4rem;
    font-family: ${theme.type.italic};
    @media ${theme.devices.md} {
      display: none;
    }
  }

  .nameplate {
    @media ${theme.devices.md} {
      max-width: 457px;
      transition: all 0.15s ease-in-out;
    }
    @media ${theme.devices.lg} {
      max-width: 518px;
      transition: all 0.15s ease-in-out;
    }
  }
  @media ${theme.devices.md} {
    // position: sticky;
    z-index: 10;
    // top: -121px;
  }
  @media ${theme.devices.lg} {
    position: sticky;
    z-index: 10;
    top: -134px;
  }
  .nav-link {
    cursor: pointer;
    .no-button {
      height: 42px;
    }
    button {
      cursor: pointer;
      font-family: ${theme.type.medium};

      color: ${theme.colours.gusGreen};
    }
    &:focus {
      border: 1px solid orange;
    }

    z-index: 20;
    margin: 0px 10px;
    display: flex;
    flex-direction: column-reverse;
    ul {
      padding-left: 0;
    }
  }
  margin: 0px 15px 30px;
  @media ${theme.devices.md} {
    margin: 30px 57px 0px 57px;
  }
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
    width: 20px;
    top: 15px;
    left: 10px;
  }
  .nav-link {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    font-size: 2rem;
    color: ${theme.colours.gusGreen};
    font-weight: bold;
    margin: 10px 0;
    cursor: pointer;
  }
  .subnav {
    flex: 1;
    margin-left: 10px;
    margin: 15px 0 20px -10px;
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
  @media ${theme.devices.md} {
    // flex: 0 0 60%;
    align-items: flex-start;
    margin-left: 20px;
  }
  @media ${theme.devices.lg} {
    margin-left: 50px;
  }
`;

const DesktopNav = styled.nav`
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
    left: 50%;
    transform: translateX(-50%);
    background-color: transparent;
    transition: all 0.25s ease-in-out;
    &:after {
      content: "";
      position: absolute;

      height: 58px;
      width: 110%;
      width: 100%;
      left: 50%;
      top: -10px;
      transform: translateX(-50%);
      background-color: transparent;
      transition: all 0.25s ease-in-out;
    }
    &.desktopnavcolorchange {
      transition: all 0.25s ease-in-out;
      position: fixed;
      top: 10px;
      .subnav {
        width: 100%;
      }
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
    line-height: 22px;
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
  @media ${theme.devices.md} {
    flex-direction: row;
    margin-bottom: 20px;
  }
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
    .connect--link {
      position: relative;
      opacity: 1;
      top: 0px;
      width: initial;
      transition: all 0.5s ease-in-out;
      &:nth-of-type(2) {
        width: initial;
      }
      transition: all 0.5s ease-in-out;
    }
    &.scrolled--mobile {
      position: fixed;
      top: 0;

      background: ${theme.colours.darkWheat};
      transition: all 0.5s ease-in-out;
      padding: 10px 10px;
      li.connect--link {
        /* display: none; */
        opacity: 0;
        width: 0px;
        transition: all 0.5s ease-in-out;
        &:nth-of-type(2) {
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
    @media ${theme.devices.sm} {
      font-size: 2rem;
    }
  }
  li {
    display: block;
    transition: all 0.25s ease-in-out;
    flex: none;
    @media ${theme.devices.md} {
      padding: 3px 20px;
    }
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
      &:nth-of-type(3) {
        &::after {
          content: "";
          width: 54%;
          transition: all 0.25s ease-out;
        }
      }
      &:nth-of-type(4) {
        &::after {
          content: "";
          width: 54%;
          transition: all 0.25s ease-out;
        }
      }
    }
  }
  li.connect--link:nth-of-type(2) {
    background-color: ${theme.colours.gusYellow};
    padding: 3px 5px;
    border-radius: 5px;
    @media ${theme.devices.md} {
      padding: 3px 30px;
    }
  }
`;

export default function HeaderMenu() {
  const [links, setLinks] = useState<any>([]);
  const [connectLinks, setConnectLinks] = useState<any>([]);
  const [footerLinks, setFooterLinks] = useState<any>([]);
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

 

  interface WindowSpecs {
    width: any;
    height: any;
    scrollY: any;
  }

  function useWindowSpecs() {
    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
    const [windowSpecs, setWindowSpecs] = useState<WindowSpecs>({
      width: undefined,
      height: undefined,
      scrollY: undefined,
    });

    useEffect(() => {
      //sets the window size when client loads
      // only execute all the code below in client side
      //nextjs needs this or will throw an error that variable doesn't exist
      function handleResize() {
        // Set window width/height to state
        setWindowSpecs({
          width: window.innerWidth,
          height: window.innerHeight,
          scrollY: window.scrollY,
        });
      }
      if (typeof window !== "undefined") {
        // Handler to call on window resize

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
                <a
                  aria-label="Link to go to Home page"
                  className=" d-block nameplate-container"
                >
                  {size.width < 1000 ? (
                    <Image
                      layout="responsive"
                      width={345}
                      height={98}
                      src="/Asparagus_Nameplate_notag.png"
                      alt="Asparagus Magazine logo"
                      priority={true}
                    />
                  ) : (
                    <Image
                      layout="responsive"
                      width={457}
                      height={99}
                      src="/Asparagus_Nameplate_Color.png"
                      alt="Asparagus Magazine logo"
                      priority={true}
                    />
                  )}
                </a>
              </Link>
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
                  <li className="mobile--home-stalk">
                    <Link href="/">
                      <Image
                        src="/triplestalk.svg"
                        alt="Asparagus Magazine logo"
                        layout="fixed"
                        width="53px"
                        height="56px"
                      />
                    </Link>
                  </li>
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
                  <li>
                    <Search
                      scrolled={
                        size.scrollY > 2 && size.width < 1000 ? true : false
                      }
                    />
                  </li>
                  {size.width < 1000 && (
                    <li>
                      <HamburgerMenuButton
                        navActive={navActive}
                        onClick={() => {
                          setNavActive(!navActive);
                        }}
                      />
                    </li>
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
                {links?.items?.map((link: any, index) => {
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
                      src="/Asparagus_Nameplate_Color.png"
                    />
                  </a>
                </Link>
              </HamburgerLogoContainer>
              <MobileNav>
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
                          />
                          {link.child_items ? (
                            <div className="position-relative menu-chevron">
                              <Image
                                src="/hamburger-arrow.svg"
                                width="20px"
                                height="13px"
                                layout="responsive"
                                alt="Chevron icon to activate submenu"
                              />
                            </div>
                          ) : null}
                          {link.child_items && subnav == link.ID ? (
                            <>
                              <ul className="subnav">
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
                  {footerLinks?.items?.map((footerLink: any, index) => {
                    return (
                      <li
                        className="nav-link"
                        key={uuidv4()}
                        onClick={() => handleSubnavClick(footerLink.ID)}
                      >
                        <span
                          className="position-relative"
                          dangerouslySetInnerHTML={{ __html: footerLink.title }}
                        />
                        {footerLink.child_items ? (
                          <div className="position-relative menu-chevron">
                            <Image
                              src="/hamburger-arrow.svg"
                              width="20px"
                              height="13px"
                              layout="responsive"
                              alt="Chevron icon to activate submenu"
                            />
                          </div>
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
