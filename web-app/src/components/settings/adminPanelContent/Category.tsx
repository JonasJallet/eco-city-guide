import { Category, MutationDeleteCategoryArgs } from "@/gql/generate/graphql";
import { DELETE_CATEGORY } from "@/gql/requests/mutations";
import { useMutation } from "@apollo/client";
import { toast } from "react-toastify";

interface Props {
  category: Category;
  openEditionPanelAdmin: (category: Category) => void;
  refetch: () => void;
}

function CategoryList({ category, openEditionPanelAdmin, refetch }: Props) {
  const [deleteCategoryMutation] =
    useMutation<MutationDeleteCategoryArgs>(DELETE_CATEGORY);

  const handleDelete = async () => {
    try {
      const { data } = await deleteCategoryMutation({
        variables: {
          id: category.id,
        },
      });
      if (data) {
        toast.success("La catégorie a bien été supprimée !");
        refetch();
      }
    } catch (error) {
      toast.error("Une erreur est survenue !");
    }
  };

  return (
    <>
      <tr className="border-b hover:bg-slate-200 bg-gray-100">
        <td className="py-3 px-2 text-center">
          <p>{category.name || "-"}</p>
        </td>
        <td className="py-3 px-2 text-center">
          <p>{category.icon || "-"}</p>
        </td>
        <td className="py-3 px-2 flex justify-center">
          <button
            onClick={() => openEditionPanelAdmin(category)}
            className="m-1 px-2 font-semibold bg-white text-tertiary_color border-2 border-tertiary_color rounded-3xl duration-200 hover:bg-tertiary_color hover:text-white"
          >
            Editer
          </button>
          <button
            onClick={() => {
              handleDelete();
            }}
            className="m-1 px-2 font-semibold bg-white text-red-500 border-2 border-red-500 rounded-3xl transition-colors duration-200 hover:bg-red-500 hover:text-white"
          >
            Supprimer
          </button>
        </td>
      </tr>
    </>
  );
}

export default CategoryList;
