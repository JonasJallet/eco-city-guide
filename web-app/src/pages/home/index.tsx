"use client";

import { Main } from "@/components/home/Main";
import SideBar from "@/components/home/SideBar";

export default function index() {
  return (
    <div className="flex h-full w-full relative">
      <Main />
      <SideBar />
    </div>
  );
}
