import React, { useEffect, useState } from "react";
import { Config } from "../../config";
import fetch from "isomorphic-fetch";
import Link from "next/link";
import ActiveLink from "./ActiveLink";

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

  console.log("footerLinks: ", footerLinks);
  return (
    <div className="footer--container">
      {footerLinks?.items?.map((link, index) => {
        return (
          <li key={index}>
            <ActiveLink
              activeClassName="footerlink--active"
              href={`/${link.slug}`}
              to={`/${link.slug}`}
            >
              <a>{link.title}</a>
            </ActiveLink>
          </li>
        );
      })}
    </div>
  );
}
