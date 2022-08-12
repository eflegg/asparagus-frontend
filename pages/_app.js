import "../scss/global.scss";
import ReactGA4 from "react-ga4";

const TRACKING_ID = "G-CT5R7MCS1Y";

ReactGA4.initialize(TRACKING_ID);

function MyApp({ Component, pageProps }) {
  console.log("pageprops: ", pageProps);

  return <Component {...pageProps} />;
}

export default MyApp;
