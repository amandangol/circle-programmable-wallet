import { ToastProvider } from "@/providers/ToastProvider";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  return (
    <>
      <Head>
        <title>FortCircle</title>
        <meta name="description" content="" />
      </Head>
      <GoogleOAuthProvider clientId="71383060909-o57a6uhvctifm1v9na5mgttcesat04no.apps.googleusercontent.com">
          <ToastProvider>
            <Component {...pageProps} />
          </ToastProvider>
      </GoogleOAuthProvider>
    </>
  );
}

