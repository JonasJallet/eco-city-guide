"use client";

import Initials from "@/components/home/Initials";
import { Main } from "@/components/home/Main";

export default function index() {
  return (
    <>
      <div className=" flex justify-end">
        <div className="absolute z-10">
          <Initials />
        </div>
      </div>
        <div className="relative z-0" style={{ height: "100%", width: "100%" }}>
          <Main />
        </div>
    </>
  );
}
