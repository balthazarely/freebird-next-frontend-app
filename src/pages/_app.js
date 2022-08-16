import ShopProvider from "../context/cartContext";
import "../styles/globals.css";
import { useRouter } from "next/router";
import Layout from "../components/layouts/layout";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  return (
    <ShopProvider>
      <Layout>
        <Component {...pageProps} key={router.asPath} />
      </Layout>
    </ShopProvider>
  );
}

export default MyApp;
