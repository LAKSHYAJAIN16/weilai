import { UserProvider } from "../logic/userContext";
import Timer from "../components/Timer";
import "../styles/globals.css";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <Head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6776078144980283"
          crossorigin="anonymous"
        ></script>
      </Head>
      <Component {...pageProps} />
      <Timer ui={false} />
    </UserProvider>
  );
}

export default MyApp;
