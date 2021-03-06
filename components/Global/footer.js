import React, { useEffect, useState } from "react";
import { Config } from "../../config";
import fetch from "isomorphic-fetch";
import Link from "next/link";
import ActiveLink from "./ActiveLink";
import styled from "styled-components";
import theme from "./Theme";
import { v4 as uuidv4 } from "uuid";

const FooterMenuContainer = styled.div`
  display: flex;
  .subnav {
    padding-left: 0;
  }
`;

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

  return (
    <FooterMenuContainer className="footer--container">
      {footerLinks?.items?.map((link, index) => {
        return (
          <li className="nav-link" key={uuidv4()}>
            <span dangerouslySetInnerHTML={{ __html: link.title }}></span>
            {link.child_items && (
              <ul className="subnav">
                {link?.child_items?.map((childItem, childIndex) => {
                  return (
                    <li key={uuidv4()} className="subnav-link">
                      {childItem.object == "general_pages" ? (
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
                          ></a>
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
                          ></a>
                        </ActiveLink>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </li>
        );
      })}
    </FooterMenuContainer>
  );
}

// export async function getStaticProps({ params }) {
//   const response = await fetch(
//     `${Config.apiUrl}/wp-json/menus/v1/menus/footer-menu`
//   );
//   if (!response.ok) {
//     ("oops! something went wrong");
//     return;
//   }

//   const footerLinks = await response.json();

//   return {
//     props: {
//       footerLinks,
//     },
//     revalidate: 10, // In seconds
//   };
// }
