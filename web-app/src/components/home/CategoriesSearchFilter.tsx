import { Category } from "@/gql/generate/graphql";
import { GET_CATEGORIES } from "@/gql/requests/queries";
import { useQuery } from "@apollo/client";
import { useState } from "react";
import { TbCategoryPlus } from "react-icons/tb";

interface Props {
  setCategory: (category: Category | undefined) => void;
  setIsCategorySelected: (isCategorySelected: boolean) => void;
}

export function CategoriesSearchFilter({
  setCategory,
  setIsCategorySelected,
}: Props) {
  const [categoriesList, setCategoriesList] = useState<Category[]>([]);
  const { data: categoriesData, loading } = useQuery(GET_CATEGORIES);

  if (loading) {
    return;
  }

  const handleSelectedCategory = (category: Category) => {
    setCategoriesList([]);
    setCategory(category as Category);
    setIsCategorySelected(true);
  };

  return (
    <div className="relative mt-3 sm:ml-0 md:ml-4 md:mt-0">
      <button
        onClick={() =>
          categoriesList.length > 0
            ? setCategoriesList([])
            : setCategoriesList(categoriesData.categories)
        }
        className={`flex items-center justify-around w-36 bg-white border border-tertiary_color px-4 py-1 cursor-pointer font-medium text-tertiary_color transition-all duration-300 ${
          categoriesList?.length > 0
            ? "rounded-t-3xl"
            : "rounded-3xl hover:bg-tertiary_color hover:text-white"
        } focus:outline-none`}
      >
        <TbCategoryPlus size={18} />
        <p>Catégories</p>
      </button>
      {categoriesList?.length > 0 && (
        <div className="h-44 w-36 animate-fade flex flex-col absolute z-20 top-8 rounded-b-3xl border border-tertiary_color bg-white overflow-y-scroll">
          {categoriesList.map((category, index) => (
            <div
              className="w-full m-1 px-3 rounded-3xl hover:bg-input_hover_bg cursor-pointer"
              onClick={() => {
                handleSelectedCategory(category);
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
