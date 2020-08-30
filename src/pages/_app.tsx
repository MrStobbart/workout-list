/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from "react";
import { AppProps } from "next/app";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
