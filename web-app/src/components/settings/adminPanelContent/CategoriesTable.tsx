import { useState } from "react";
import CategoryList from "./Category";
import { useQuery } from "@apollo/client";
import CategoryEditionForm from "./CategoryEditionForm";
import CreateCategoriesForm from "@/components/forms/CreateCategoriesForm";
import { Category } from "@/gql/generate/graphql";
import { GET_CATEGORIES } from "@/gql/requests/queries";

function CategoriesTable() {
  const [isEditionPanelAdmin, setIsEditionPanelAdmin] = useState(false);
  const [isCreationPanelAdmin, setIsCreationPanelAdmin] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const [searchCategory, setSearchCategory] = useState("");

  const setIsEditionModeGlobal = (category: Category) => {
    setCurrentCategory(category);
    setIsEditionPanelAdmin(true);
  };

  const closeEditionMode = () => {
    setIsEditionPanelAdmin(false);
    setCurrentCategory(null);
  };
  const { data: categoriesData, loading, error } = useQuery(GET_CATEGORIES);
  console.log(categoriesData);
  if (loading) return <p>Loading...</p>;

  const sortedCategories = [...(categoriesData?.categories || [])].sort(
    (a, b) => {
      const aIncludes = a.name
        .toLowerCase()
        .includes(searchCategory.toLowerCase());
      const bIncludes = b.name
        .toLowerCase()
        .includes(searchCategory.toLowerCase());

      if (aIncludes && !bIncludes) return -1;
      if (!aIncludes && bIncludes) return 1;
      return 0;
    },
  );
  return (
    <>
      <div className="px-3 py-4 overflow-x-scroll">
        <div className="mb-3 font-semibold flex justify-start items-center">
          <p>Rechercher</p>
          <input
            value={searchCategory}
            onChange={(e) => setSearchCategory(e.target.value)}
            className="ml-2 px-4 py-1 rounded-3xl hover:bg-input_hover_bg focus:outline-none"
            type="text"
            name="searchCategory"
          />
          <button
            onClick={() => {
              setIsCreationPanelAdmin(true);
            }}
            className="mx-3 px-2 font-semibold bg-white text-blue-400 border-2 border-blue-400 rounded-3xl duration-200 hover:text-white hover:border-blue-400 hover:bg-blue-400"
          >
            Créer
          </button>
        </div>
        <table className="w-full text-md bg-white shadow-md rounded mb-4">
          <tbody>
            <tr className="border-b">
              <th className="p-3 px-5">Nom</th>
              <th className="p-3 px-5">Icon</th>
              <th className="p-3 px-5">Actions</th>
            </tr>
            {!categoriesData?.categories ||
            categoriesData?.categories.length !== 0 ? (
              sortedCategories?.map((category: Category) => (
                <CategoryList
                  key={`category ${category.id}`}
                  category={category}
                  setIsEditionModeGlobal={setIsEditionModeGlobal}
                />
              ))
            ) : (
              <tr>
                <th colSpan={7} className="py-5 px-2 text-red-600">
                  Pas de données catégories
                </th>
              </tr>
            )}
          </tbody>
        </table>
        {isCreationPanelAdmin && (
          <div className="w-screen h-screen bg-white fixed inset-0 px-2 z-10 overflow-hidden flex items-center justify-center">
            <div className="pb-12 border border-gray-300 rounded-2xl">
              <CreateCategoriesForm
                setIsCreationPanelAdmin={setIsCreationPanelAdmin}
              />
            </div>
          </div>
        )}
        {isEditionPanelAdmin && currentCategory && (
          <div className="w-screen h-screen fixed inset-0 px-2 z-10 overflow-hidden flex items-center justify-center">
            <CategoryEditionForm
              key={currentCategory.id}
              category={currentCategory}
              setIsEditionPanelAdmin={closeEditionMode}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default CategoriesTable;
