import "../scss/global.scss";
import { getArticles } from "../utils/wordpress";

function MyApp({ Component, pageProps }) {
  console.log("pageprops: ", pageProps);

  return <Component {...pageProps} />;
}

export default MyApp;
