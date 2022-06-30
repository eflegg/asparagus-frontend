import React, { useEffect, useState } from "react";
import { Config } from "../../config";
import fetch from "isomorphic-fetch";
import Link from "next/link";
import ActiveLink from "./ActiveLink";

export default function HeaderMenu() {
  const [links, setLinks] = useState([]);
  const [connectLinks, setConnectLinks] = useState([]);
  useEffect(() => {
    async function loadLinks() {
      const response = await fetch(
        `${Config.apiUrl}/wp-json/menus/v1/menus/header-menu`
      );
      const connect = await fetch(`${Config.apiUrl}/wp-json/menus/v2/connect`);
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

  console.log("links.items: ", links);
  return (
    <div className="menu--container">
      <h3>Header menu</h3>
      <ul>
        <li>
          <ActiveLink activeClassName="navlink--active" href="/" to="/">
            <a>Home</a>
          </ActiveLink>
        </li>
        {links &&
          links.items.map((link, index) => {
            return (
              <li key={index}>
                {/* <ActiveLink
                  activeClassName="navlink--active"
                  href={`/${link.title}`}
                  to={`/${link.url}`}
                >
                  <a>{link.title}</a>
                </ActiveLink> */}
                menu item
                {link.child_items &&
                  link.child_items.map((childItem, childIndex) => {
                    return <li key={childIndex}>child menu item</li>;
                  })}
              </li>
            );
          })}{" "}
      </ul>
      <h3>Connect Menu</h3>
      <ul>
        {connectLinks.map((connectLink, index) => {
          return (
            <li key={index}>
              <ActiveLink
                activeClassName="navlink--active"
                href={`/${connectLink.title}`}
                to={`/${connectLink.url}`}
              >
                <a>{connectLink.title}</a>
              </ActiveLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
