/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from "react";
import { AppProps } from "next/app";
import "../styles/globals.css";
import "antd/dist/antd.css";
import { ApolloProvider } from "@apollo/client";
import client from "../apollo";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
