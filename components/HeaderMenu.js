import React, { useEffect, useState } from "react";
import { Config } from "../config";
import fetch from "isomorphic-fetch";
import Link from "next/link";

export default function HeaderMenu() {
  const [links, setLinks] = useState([]);
  useEffect(() => {
    async function loadLinks() {
      const response = await fetch(`${Config.apiUrl}/wp-json/menus/v2/header`);
      if (!response.ok) {
        // oups! something went wrong
        return;
      }

      const links = await response.json();
      setLinks(links);
    }

    loadLinks();
  }, []);

  console.log("links: ", links);
  return (
    <div className="menu--container">
      {links &&
        links.map((link, index) => {
          return <li key={index}>{link.title}</li>;
        })}
    </div>
  );
}
