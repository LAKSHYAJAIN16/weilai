import { UserProvider } from "../logic/userContext";
import Timer from "../components/Timer";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <Component {...pageProps} />
      <Timer ui={false}/>
    </UserProvider>
  );
}

export default MyApp;
