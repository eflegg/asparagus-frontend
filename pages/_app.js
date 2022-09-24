import "../scss/global.scss";
import { useRouter } from "next/router";
import Loader from "../components/Global/Loader";
import { useState, useEffect } from "react";
import ReactGA4 from "react-ga4";
import TagManager from "react-gtm-module";

const TRACKING_ID = "G-CT5R7MCS1Y";

ReactGA4.initialize(TRACKING_ID);

function MyApp({ Component, pageProps }) {
  // console.log("pageprops: ", pageProps);
  useEffect(() => {
    TagManager.initialize({ gtmId: "GTM-WWFDF6N" });
  }, []);

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
  return <>{loading ? <Loader /> : <Component {...pageProps} />}</>;
}

export default MyApp;
