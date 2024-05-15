import { Category } from "@/gql/graphql";
import { GET_CATEGORIES } from "@/gql/queries";
import { useQuery } from "@apollo/client";
import { useState } from "react";

// TODO: Utilize this component and fix the style
export function CategoriesSearchFilter() {
  const [categoriesList, setCategoriesList] = useState<Category[]>([]);
  const { data: categoriesData, loading } = useQuery(GET_CATEGORIES);

  if (loading) {
    return;
  }

  return (
    <div className="mr-4 relative">
      <span
        onClick={() => setCategoriesList(categoriesData.categories)}
        className={`w-21 bg-white px-6 py-2 cursor-pointer ${
          categoriesList?.length > 0
            ? "rounded-t-3xl"
            : "rounded-3xl hover:bg-green-100 hover:text-green-500"
        } border border-border_color focus:outline-none`}
      >
        Catégories
      </span>
      {categoriesList?.length > 0 && (
        <div className="h-44 flex flex-col absolute z-20 top-7 rounded-b-3xl border border-border_color bg-white overflow-y-scroll">
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
