"use client";

import Initials from "@/components/home/Initials";
import { Main } from "@/components/home/Main";

export default function index() {
  return (
    <>
      <div className="flex justify-end">
        <Initials />
      </div>
      <div style={{ height: "100%", width: "100%" }}>
        <Main />
      </div>
    </>
  );
}
