import { MutationDeleteUserArgs, type User } from "@/gql/generate/graphql";
import { DELETE_USER } from "@/gql/requests/mutations";
import { useMutation } from "@apollo/client";
import { toast } from "react-toastify";

interface Props {
  user: User;
  openEditionPanelAdmin: (user: User) => void;
  refetch: () => void;
}

export default function User({ user, openEditionPanelAdmin, refetch }: Props) {
  const [deleteUserMutation] = useMutation<MutationDeleteUserArgs>(DELETE_USER);

  const handleDelete = async () => {
    try {
      const { data } = await deleteUserMutation({
        variables: {
          deleteUserId: user.id,
        },
      });
      if (data) {
        toast.success("L'utilisateur a bien été supprimé !");
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
          <p>{user.firstName || "-"}</p>
        </td>
        <td className="py-3 px-2 text-center">
          <p>{user.lastName || "-"}</p>
        </td>
        <td className="py-3 px-2 text-center">
          <p>{user.email || "-"}</p>
        </td>
        <td className="py-3 px-2 text-center">
          <p>{user.role || "-"}</p>
        </td>
        <td className="py-3 px-2 flex justify-center">
          <button
            onClick={() => openEditionPanelAdmin(user)}
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
