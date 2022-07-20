import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import theme from "../components/Global/Theme";
import { useRouter } from "next/router";

export default function AdBanner() {
  const dynamicRoute = useRouter().asPath;
  const [adIndex, setAdIndex] = useState(1);

  const ads = [
    {
      id: 1,
      name: "Ad 1",
      src: "https://picsum.photos/id/237/200/300",
    },
    {
      id: 2,
      name: "Ad 2",
      src: "https://picsum.photos/seed/picsum/200/300",
    },
    {
      id: 3,
      name: "Ad 3",
      src: "https://picsum.photos/200/300?grayscale",
    },
  ];

  const randomAd = () => {
    const length = ads.length;
    setAdIndex(Math.floor(Math.random() * length));
  };

  //
  // console.log("random ad index: ", adIndex);

  useEffect(() => {
    randomAd();
  });

  //can change this to pull the image from the post type and the name of the advertiser
  return (
    <div>
      <h1>I am an ad banner</h1>
      <p>{ads[adIndex].name}</p>
      <img src={ads[adIndex].src} alt="" />
    </div>
  );
}
