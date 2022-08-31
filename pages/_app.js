import "../scss/global.scss";
import ReactGA4 from "react-ga4";
import TagManager from "react-gtm-module";

const TRACKING_ID = "G-CT5R7MCS1Y";

ReactGA4.initialize(TRACKING_ID);

function MyApp({ Component, pageProps }) {
  console.log("pageprops: ", pageProps);
  useEffect(() => {
    TagManager.initialize({ gtmId: "GTM-WWFDF6N" });
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
