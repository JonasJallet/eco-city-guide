import { type User } from "@/gql/generate/graphql";
import { DELETE_USER } from "@/gql/requests/mutations";
import { useMutation } from "@apollo/client";

interface Props {
  user: User;
  setIsEditionModeGlobal: (user: User) => void;
}

export default function User({ user, setIsEditionModeGlobal }: Props) {
  const [deleteUserMutation] = useMutation(DELETE_USER);

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
            onClick={() => setIsEditionModeGlobal(user)}
            className="m-1 px-2 font-semibold bg-white text-tertiary_color border-2 border-tertiary_color rounded-3xl duration-200 hover:bg-tertiary_color hover:text-white"
          >
            Editer
          </button>
          <button
            onClick={async () => {
              await deleteUserMutation({
                variables: { deleteUserId: user.id },
              });
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
