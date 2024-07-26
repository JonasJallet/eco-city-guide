import Layout from "@/components/Layout";
import type { AppProps } from "next/app";
import "@/styles/output.css";
import "@/styles/leaflet-style.css";
import { ApolloProvider } from "@apollo/client";
import createApolloClient from "../apollo-client";
import "leaflet/dist/leaflet.css";
import PlaceContext from "@/contexts/PlaceContext";
import { useState } from "react";
import { Place } from "@/gql/generate/graphql";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SideBarContentEnum } from "@/components/home/sideBarContent.type";
import DisplayPanelContext from "@/contexts/DisplayPanelContext";

export default function App({ Component, pageProps }: AppProps) {
  const apolloClient = createApolloClient();
  const [place, setPlace] = useState<Place | undefined>(undefined);
  const [sideBarEnum, setSideBarEnum] = useState<
    SideBarContentEnum | undefined
  >(undefined);
  return (
    <PlaceContext.Provider value={{ place, setPlace }}>
      <DisplayPanelContext.Provider value={{ sideBarEnum, setSideBarEnum }}>
        <ApolloProvider client={apolloClient}>
          <Layout>
            <ToastContainer
              theme="light"
              closeOnClick={true}
              position="bottom-right"
            />
            <Component {...pageProps} />
          </Layout>
        </ApolloProvider>
      </DisplayPanelContext.Provider>
    </PlaceContext.Provider>
  );
}
