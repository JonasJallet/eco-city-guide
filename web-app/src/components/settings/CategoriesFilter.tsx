import React, { useEffect } from "react";
import { useState } from "react";
import { GET_CATEGORIES } from "@/gql/requests/queries";
import { useQuery } from "@apollo/client";
import { Category } from "@/gql/generate/graphql";

interface CategoriesFilterProps {
  selectedCategories: string[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function CategoriesFilter({
  selectedCategories,
  setSelectedCategories,
}: CategoriesFilterProps) {
  const [showCategoriesMenu, setShowCategoriesMenu] = useState(false);
  const [categories, setCategories] = useState<Partial<Category>[]>([]);
  const { data, loading, refetch } = useQuery(GET_CATEGORIES);

  useEffect(() => {
    if (data) {
      setCategories(data.categories);
    }
  }, [data]);

  const handleCheckboxChange = (categoryName: string) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(categoryName)
        ? prevSelected.filter((name) => name !== categoryName)
        : [...prevSelected, categoryName],
    );
  };

  return (
    <div className=" relative flex flex-col items-center justify-center md:ml-1">
      <button
        id="dropdownDefault"
        data-dropdown-toggle="dropdown"
        className={` hover:text-tertiary_color hover:border hover:border-tertiary_color hover bg-slate-100 hover:bg-primary-800 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center  ${showCategoriesMenu ? "text-tertiary_color border border-tertiary_color" : "text-slate-900 border border-slate-300"}  `}
        type="button"
        onClick={() => setShowCategoriesMenu(!showCategoriesMenu)}
      >
        Catégorie
        <svg
          className="w-4 h-4 ml-2"
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>
      <div
        id="dropdown"
        className={` ml-20 z-50 absolute shadow-sm shadow-slate-400 bg-slate-100 w-48 p-3 ${showCategoriesMenu ? "" : "hidden"} rounded-lg shadow top-full mt-2 mb-20`}
      >
        <ul className="space-y-2 text-sm" aria-labelledby="dropdownDefault">
          {categories &&
            categories.length > 0 &&
            categories.map((category, index) => (
              <li
                className="flex items-center rounded-lg cursor-pointer"
                onClick={() => handleCheckboxChange(category.name!)}
              >
                <input
                  id={`category-${index}`}
                  type="checkbox"
                  checked={selectedCategories.includes(category.name as string)}
                  className="w-4 h-4 rounded text-primary-600"
                />
                <label
                  id={category.name}
                  className="ml-2 text-sm font-medium text-gray-900 cursor-pointer"
                >
                  {category.name}
                </label>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
