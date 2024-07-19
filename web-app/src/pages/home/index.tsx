"use client";
import { Main } from "@/components/home/Main";
import SideBar from "@/components/home/SideBar";
import { Place } from "@/gql/generate/graphql";
import { useState } from "react";
import SurroundingPlacesContext from "@/contexts/SurroundingPlacesContext";
import { SideBarContentEnum } from "@/components/home/sideBarContent.type";
import DisplayPanelContext from "@/contexts/DisplayPanelContext";

export default function index() {
  const [surroundingPlaces, setSurroundingPlaces] = useState<Place[] | []>([]);
  const [sideBarEnum, setSideBarEnum] = useState<
    SideBarContentEnum | undefined
  >(undefined);

  return (
    <>
      <SurroundingPlacesContext.Provider
        value={{ surroundingPlaces, setSurroundingPlaces }}
      >
        <DisplayPanelContext.Provider value={{ sideBarEnum, setSideBarEnum }}>
          <div className="flex h-screen">
            <Main />
            <SideBar />
          </div>
        </DisplayPanelContext.Provider>
      </SurroundingPlacesContext.Provider>
    </>
  );
}
