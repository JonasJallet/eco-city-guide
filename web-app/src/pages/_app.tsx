import Layout from "@/components/Layout";
import type { AppProps } from "next/app";
import "@/styles/output.css";
import { ApolloProvider } from "@apollo/client";

import createApolloClient from "./apollo-client";
import "leaflet/dist/leaflet.css";

export default function App({ Component, pageProps }: AppProps) {
  const apolloClient = createApolloClient();

  return (
    <ApolloProvider client={apolloClient}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
}
