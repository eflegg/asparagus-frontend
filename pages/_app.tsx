import "../scss/global.scss";
import { useRouter } from "next/router";
import Loader from "../components/Global/Loader";
import { useState, useEffect } from "react";
import ReactGA4 from "react-ga4";
import TagManager from "react-gtm-module";
import Script from "next/script";
import React from "react";

const TRACKING_ID = "G-CT5R7MCS1Y";

ReactGA4.initialize(TRACKING_ID);

const tagManagerArgs = {
  gtmId: "GTM-WWFDF6N",
};

if (process.browser) {
  TagManager.initialize(tagManagerArgs);
}

function MyApp({ Component, pageProps }) {
  // console.log("pageprops: ", pageProps);
  // useEffect(() => {
  //   TagManager.initialize({ gtmId: "GTM-WWFDF6N" });
  // }, []);

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url) => url !== router.asPath && setLoading(true);

    const handleComplete = (url) => url === router.asPath && setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  });
  return (
    <>
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script
        strategy="lazyOnload"
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${TRACKING_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
 window.dataLayer = window.dataLayer || [];
 function gtag(){dataLayer.push(arguments);}
 gtag('js', new Date());
 gtag('config', '${TRACKING_ID}', {
   page_path: window.location.pathname,
 });
`,
        }}
      />

      {loading ? <Loader /> : <Component {...pageProps} />}
    </>
  );
}

export default MyApp;
