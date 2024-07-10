import Layout from "@/components/Layout";
import type { AppProps } from "next/app";
import "@/styles/output.css";
import "@/styles/leaflet-style.css";
import { ApolloProvider } from "@apollo/client";
import createApolloClient from "../apollo-client";
import "leaflet/dist/leaflet.css";
import PlaceContext from "@/contexts/PlaceContext";
import { useState } from "react";
import { Place } from "@/gql/graphql";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }: AppProps) {
  const apolloClient = createApolloClient();
  const [place, setPlace] = useState<Place | undefined>(undefined);

  return (
    <PlaceContext.Provider value={{ place, setPlace }}>
      <ApolloProvider client={apolloClient}>
        <Layout>
        <ToastContainer theme="dark" closeOnClick={true} />
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </PlaceContext.Provider>
  );
}
