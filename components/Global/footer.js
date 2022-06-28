import React, { useEffect, useState } from "react";
import { Config } from "../../config";
import fetch from "isomorphic-fetch";
import Link from "next/link";
import ActiveLink from "./ActiveLink";

export default function Footer() {
  const [footerLinks, setFooterLinks] = useState([]);
  useEffect(() => {
    async function loadLinks() {
      const response = await fetch(`${Config.apiUrl}/wp-json/menus/v2/footer`);
      if (!response.ok) {
        // oops! something went wrong
        return;
      }

      const footerLinks = await response.json();
      setFooterLinks(footerLinks);
    }

    loadLinks();
  }, []);

  console.log("footerLinks: ", footerLinks);
  return (
    <div className="footer--container">
      {footerLinks &&
        footerLinks.map((link, index) => {
          return (
            <li key={index}>
              <ActiveLink
                activeClassName="footerlink--active"
                href={`/${link.title}`}
                to={`/${link.url}`}
              >
                <a>{link.title}</a>
              </ActiveLink>
            </li>
          );
        })}
    </div>
  );
}
