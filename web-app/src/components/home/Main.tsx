import dynamic from "next/dynamic";

export const Main = dynamic(() => import("./Map").then((mod) => mod.default), {
  ssr: false,
});
