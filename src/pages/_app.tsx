/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from "react";
import { AppProps } from "next/app";
import "../styles/globals.css";
import "antd/dist/antd.css";
import { ApolloProvider } from "@apollo/client";
import { Layout } from "antd";
import client from "../apollo";
import Header from "../components/header";

const { Content } = Layout;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Layout>
        <Header />
        <Content style={{ marginTop: 32 }}>
          <Component {...pageProps} />
        </Content>
      </Layout>
    </ApolloProvider>
  );
}

export default MyApp;
