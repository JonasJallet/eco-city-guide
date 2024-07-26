"use client";
import { Main } from "@/components/home/Main";
import SideBar from "@/components/home/SideBar";
import { Category, Place } from "@/gql/generate/graphql";
import { useState } from "react";
import SurroundingPlacesContext from "@/contexts/SurroundingPlacesContext";

export default function index() {
  const [surroundingPlaces, setSurroundingPlaces] = useState<Place[] | []>([]);
  const [category, setCategory] = useState<Category | undefined>(undefined);

  return (
    <>
      <SurroundingPlacesContext.Provider
        value={{
          surroundingPlaces,
          setSurroundingPlaces,
          category,
          setCategory,
        }}
      >
        <div className="flex h-screen">
          <Main />
          <SideBar />
        </div>
      </SurroundingPlacesContext.Provider>
    </>
  );
}
