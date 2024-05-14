"use client";
import { Main } from "@/components/home/Main";
import PlaceSearchBar from "@/components/home/PlaceSearchBar";
import { CategoriesSearchFilter } from "@/components/home/CategoriesSearchFilter";
import SideBar from "@/components/home/SideBar";
import PlaceContext from "@/contexts/PlaceContext";
import { Place } from "@/gql/graphql";
import { useState } from "react";
import SurroundingPlacesContext from "@/contexts/SurroundingPlacesContext";

export default function index() {
  const [place, setPlace] = useState<Place | undefined>(undefined);
  const [surroundingPlaces, setSurroundingPlaces] = useState<Place[] | []>([]);

  return (
    <SurroundingPlacesContext.Provider
      value={{ surroundingPlaces, setSurroundingPlaces }}
    >
      <PlaceContext.Provider value={{ place, setPlace }}>
        <div className="flex h-screen">
          <div className="grid grid-cols-3 p-8 absolute z-20 w-full">
            <div className="col-span-1 flex items-center justify-end">
              <CategoriesSearchFilter />
            </div>
            <div className="col-span-1 flex justify-center">
              <PlaceSearchBar />
            </div>
          </div>
          <Main />
          <SideBar />
        </div>
      </PlaceContext.Provider>
    </SurroundingPlacesContext.Provider>
  );
}
