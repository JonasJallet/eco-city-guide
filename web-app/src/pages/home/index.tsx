"use client";
import Initials from "@/components/home/Initials";
import { Main } from "@/components/home/Main";
import PlaceSearchBar from "@/components/home/PlaceSearchBar";
import { CategoriesSearchFilter } from "@/components/home/CategoriesSearchFilter";
import SideBar from "@/components/home/SideBar";
import PlaceContext from "@/contexts/PlaceContext";
import { Place } from "@/gql/graphql";
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
      <div className=" flex justify-end">
        <div className="absolute z-20">
          <Initials />
        </div>
      </div>
      <SurroundingPlacesContext.Provider
        value={{ surroundingPlaces, setSurroundingPlaces }}
      >
        <DisplayPanelContext.Provider value={{ sideBarEnum, setSideBarEnum }}>
          <div className="flex h-screen">
            <div className="flex justify-center absolute inset-0 mt-8 mx-auto z-20 w-2/3 h-20">
              <div className="col-span-1 flex items-center justify-start">
                <CategoriesSearchFilter />
              </div>
              <div className="col-span-1 mt-4 flex justify-center">
                <PlaceSearchBar />
              </div>
            </div>
            <Main />
            <SideBar />
          </div>
        </DisplayPanelContext.Provider>
      </SurroundingPlacesContext.Provider>
    </>
  );
}
