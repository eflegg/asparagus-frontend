import React, { useState, useEffect, useCallback } from "react";
import { Config } from "../../config";
import fetch from "isomorphic-fetch";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import theme from "./Theme";
import { useRouter } from "next/router";
import { getAds } from "../../utils/wordpress";

const AdBannerContainer = styled.div`
  width: 75%;
  margin: 60px auto;
  height: 150px;
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
  const dynamicRoute = useRouter().asPath;
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
              layout="fill"
              alt={ads?.acf?.banner_ads[adIndex]?.advertiser_name}
              objectFit="cover"
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
