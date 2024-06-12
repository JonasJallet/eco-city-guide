import { ReactNode } from "react";
import Head from "next/head";
// import { config } from "@fortawesome/fontawesome-svg-core";
// import "@fortawesome/fontawesome-svg-core/styles.css";
// config.autoAddCss = false;

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Head>
        <title>Eco City Guide</title>
        <meta
          name="description"
          content="Une magnifique carte pour sauver la planète et les dauphins."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>{children}</main>
    </>
  );
}
