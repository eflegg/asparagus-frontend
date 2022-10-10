import React, { useState, useEffect } from "react";
import { Config } from "../../config";
import fetch from "isomorphic-fetch";

import styled from "styled-components";

import { useRouter } from "next/router";

const AdBannerContainer = styled.div`
  width: 97%;
  margin: 60px auto;

  height: auto;
  max-height: 150px;
  overflow: hidden;
  position: relative;
  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
  h3 {
    padding: 20px;
    text-align: center;
  }
`;

export default function AdBanner() {
  // const dynamicRoute = useRouter().asPath;
  const [adIndex, setAdIndex] = useState(1);
  const [ads, setAds] = useState([]);

  useEffect(() => {
    async function loadLinks() {
      const response = await fetch(`${Config.apiUrl}/wp-json/wp/v2/pages/604`);

      if (!response.ok) {
        // oops! something went wrong
        return;
      }

      const ads = await response.json();
      setAds(ads);
    }

    loadLinks();
  }, []);

  const randomAd = () => {
    if (!ads) {
      return;
    }
    const length = ads?.acf?.banner_ads?.length;
    setAdIndex(Math.floor(Math.random() * length));
  };

  // console.log("ads: ", ads);

  useEffect(() => {
    randomAd();
  });

  return (
    <AdBannerContainer>
      <a
        href={ads?.acf?.banner_ads[adIndex]?.advertiser_link}
        rel="noreferrer"
        target="_blank"
      >
        {ads.length !== 0 ? (
          <>
            {/* <Image
              src={ads?.acf?.banner_ads[adIndex]?.banner_image.url}
              layout="responsive"
              width="97%"
              height="150px"
              alt={ads?.acf?.banner_ads[adIndex]?.advertiser_name}
            /> */}
            <img
              id={`banner-ad--${adIndex}`}
              src={ads?.acf?.banner_ads[adIndex]?.banner_image.url}
              alt=""
            />
          </>
        ) : (
          <h3>your ad here</h3>
        )}
      </a>
    </AdBannerContainer>
  );
}
