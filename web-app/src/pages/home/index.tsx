"use client";

import Initials from "@/components/home/Initials";
import { Main } from "@/components/home/Main";
import SideBar from "@/components/home/SideBar";

export default function index() {
  return (
    <>
      <div className=" flex justify-end">
        <div className="absolute z-10">
          <Initials />
        </div>
      </div>
        <div className="relative z-0" className="flex h-full w-full relative">
          <Main />
      <SideBar />
        </div>
    </>
  );
}
