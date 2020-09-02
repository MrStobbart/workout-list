import fetch from "cross-fetch";
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { graphqlUrl } from "../config";

const client = new ApolloClient({
  link: new HttpLink({ uri: graphqlUrl, fetch }),
  cache: new InMemoryCache(),
});

export default client;
