import { useEffect, useState } from "react";
import CategoryList from "./Category";
import { useQuery } from "@apollo/client";
import EditCategoryForm from "../../forms/edit/EditCategoryForm";
import CreateCategoryForm from "@/components/forms/create/CreateCategoryForm";
import { Category, GetCategoriesQuery } from "@/gql/generate/graphql";
import { GET_CATEGORIES } from "@/gql/requests/queries";
import Loader from "@/components/loader/Loader";
import { toast } from "react-toastify";

function CategoriesTable() {
  const [isEditionPanelAdmin, setIsEditionPanelAdmin] = useState(false);
  const [isCreationPanelAdmin, setIsCreationPanelAdmin] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const [searchCategory, setSearchCategory] = useState("");

  useEffect(() => {
    if (isEditionPanelAdmin || isCreationPanelAdmin) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [isEditionPanelAdmin, isCreationPanelAdmin]);

  const openEditionPanelAdmin = (category: Category) => {
    setCurrentCategory(category);
    setIsEditionPanelAdmin(true);
  };

  const closeEditionPanelAdmin = () => {
    setIsEditionPanelAdmin(false);
    setCurrentCategory(null);
  };

  const {
    data: categoriesData,
    loading,
    error,
    refetch,
  } = useQuery<GetCategoriesQuery>(GET_CATEGORIES);

  if (loading) return <Loader />;

  if (error) return toast.error(error.message);

  const sortedCategories = [...(categoriesData?.categories || [])].sort(
    (a, b) => {
      const firstElementIncludes = a.name
        .toLowerCase()
        .includes(searchCategory.toLowerCase());
      const secondElementIncludes = b.name
        .toLowerCase()
        .includes(searchCategory.toLowerCase());

      if (firstElementIncludes && !secondElementIncludes) return -1;
      if (!firstElementIncludes && secondElementIncludes) return 1;
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
                  openEditionPanelAdmin={openEditionPanelAdmin}
                  refetch={refetch}
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
          <div className="fixed inset-0 z-50 bg-gray-800 backdrop-blur-sm bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-2 rounded-lg shadow-lg overflow-y-auto">
              <CreateCategoryForm
                setIsCreationPanelAdmin={setIsCreationPanelAdmin}
                refetchCategoryData={refetch}
              />
            </div>
          </div>
        )}
        {isEditionPanelAdmin && currentCategory && (
          <div className="fixed inset-0 z-50 bg-gray-800 backdrop-blur-sm bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-2 rounded-lg shadow-lg overflow-y-auto">
              <EditCategoryForm
                key={currentCategory.id}
                category={currentCategory}
                setIsEditionPanelAdmin={closeEditionPanelAdmin}
                refetch={refetch}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default CategoriesTable;
