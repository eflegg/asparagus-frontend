import React, { useState, useEffect } from "react";
import { Config } from "../../config";
import fetch from "isomorphic-fetch";

import styled from "styled-components";
import Image from "next/image";
import { useRouter } from "next/router";

const AdBannerContainer = styled.div`
<<<<<<< HEAD
  width: 100%;
  a {
    min-width: 300px;

    width: 90%;
    margin: 0px auto;
    display: block;
    position: relative;
  }
  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
=======
  position: fixed;
  bottom: -10px;
  background: white;
  z-index: 20;
  width: 100%;
  .ad-banner--inner {
    width: 75%;
    max-width: 728px;

    margin: 5px auto 0;
    height: auto;
    position: relative;
    /* left: 50%;
    transform: translateX(-50%); */
    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
    h3 {
      padding: 20px;
      text-align: center;
    }
>>>>>>> f182f0357bb75091404f2a73b46e04fe863e745f
  }
  .ad-hr {
    width: 85%;
    margin: 5px auto;
    background: black;
    height: 1px;
  }
`;

export default function AdBanner() {
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

  useEffect(() => {
    randomAd();
  });

  return (
    <AdBannerContainer>
<<<<<<< HEAD
      <a
        href={ads?.acf?.banner_ads[adIndex]?.advertiser_link}
        rel="noreferrer"
        target="_blank"
      >
        {ads.length !== 0 ? (
          <>
            <Image
              id={`banner-ad--${adIndex}`}
              src={
                ads?.acf?.banner_ads[adIndex]?.banner_image.url
                  ? ads?.acf?.banner_ads[adIndex]?.banner_image.url
                  : "https://files.asparagusmagazine.com/wp-content/uploads/2022/09/Asparagus_Subscribe_eNewsletter_ad_2jpg-scaled.jpg"
              }
              layout="responsive"
              objectFit="contain"
              width={2048}
              height={428}
              alt={`Banner ad for advertiser ${ads?.acf?.banner_ads[adIndex]?.advertiser_name}`}
            />
            {/* <img
              id={`banner-ad--${adIndex}`}
              src={ads?.acf?.banner_ads[adIndex]?.banner_image.url}
              alt=""
            /> */}
          </>
        ) : (
          <h3>your ad here</h3>
        )}
      </a>
=======
      <hr className="ad-hr" />
      <div className="ad-banner--inner">
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
          ) : null}
        </a>
      </div>
>>>>>>> f182f0357bb75091404f2a73b46e04fe863e745f
    </AdBannerContainer>
  );
}
