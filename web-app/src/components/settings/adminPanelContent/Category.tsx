import { Category } from "@/gql/generate/graphql";
import { DELETE_CATEGORY } from "@/gql/requests/mutations";
import { useMutation } from "@apollo/client";

interface Props {
  category: Category;
  setIsEditionModeGlobal: (category: Category) => void;
}

function CategoryList({ category, setIsEditionModeGlobal }: Props) {
  const [deleteCategoryMutation] = useMutation(DELETE_CATEGORY);

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
            onClick={() => setIsEditionModeGlobal(category)}
            className="m-1 px-2 font-semibold bg-white text-tertiary_color border-2 border-tertiary_color rounded-3xl duration-200 hover:bg-tertiary_color hover:text-white"
          >
            Editer
          </button>
          <button
            onClick={async () => {
              await deleteCategoryMutation({ variables: { id: category.id } });
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
