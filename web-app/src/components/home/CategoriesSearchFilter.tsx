import { GET_CATEGORIES } from "@/gql/queries";
import { useQuery } from "@apollo/client";
import { useState } from "react";


// THIS IS A WIP
export function CategoriesSearchFilter() {
  const [categoriesList, setCategoriesList] = useState([]);
  const { data: categoriesData, loading, error } = useQuery(GET_CATEGORIES);

  if (loading) {
    return;
  }

  return (
    <div className="mr-4">
      <span
        onClick={() => setCategoriesList([{ name: "test" }, { name: "test2" }])}
        className={`w-full bg-white px-4 py-2 cursor-pointer ${
          categoriesList?.length > 0 ? "rounded-t-3xl" : "rounded-3xl"
        } border border-border_color focus:outline-none`}
      >
        Catégories
      </span>
      {categoriesList?.length > 0 && (
        <div className="flex flex-col absolute z-20 top-10 rounded-b-3xl border border-border_color bg-white">
          {categoriesList.map((category, index) => (
            <div
              className="w-full px-4 py-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => {
                setCategoriesList([]);
              }}
              key={index}
            >
              {category.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
