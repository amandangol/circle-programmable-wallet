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
      <GoogleOAuthProvider clientId={clientId}>
          <ToastProvider>
            <Component {...pageProps} />
          </ToastProvider>
      </GoogleOAuthProvider>
    </>
  );
}

