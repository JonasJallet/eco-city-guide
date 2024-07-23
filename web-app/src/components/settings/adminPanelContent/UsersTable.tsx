import { User } from "@/gql/generate/graphql";
import { GET_USERS } from "@/gql/requests/queries";
import { useQuery } from "@apollo/client";
import { useState } from "react";
import UserEdition from "./User";
import UserEditionForm from "./UserEditionForm";
import CreateUserForm from "@/components/forms/CreateUserForm";

function UsersTable() {
  const [isEditionPanelAdmin, setIsEditionPanelAdmin] = useState(false);
  const [isCreationPanelAdmin, setIsCreationPanelAdmin] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [searchUser, setSearchUser] = useState("");

  const openEditionPanelAdmin = (user: User) => {
    setCurrentUser(user);
    setIsEditionPanelAdmin(true);
  };

  const closeEditionPanelAdmin = () => {
    setIsEditionPanelAdmin(false);
    setCurrentUser(null);
  };

  const { data: usersData, loading, error, refetch } = useQuery(GET_USERS);

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error</p>;

  const sortedUsers = [...(usersData?.users || [])].sort((a, b) => {
    const firstElementIncludes =
      a.firstName.toLowerCase().includes(searchUser.toLowerCase()) ||
      a.lastName.toLowerCase().includes(searchUser.toLowerCase()) ||
      a.email.toLowerCase().includes(searchUser.toLowerCase()) ||
      a.role.toLowerCase().includes(searchUser.toLowerCase());
    const secondElementIncludes =
      b.firstName.toLowerCase().includes(searchUser.toLowerCase()) ||
      b.lastName.toLowerCase().includes(searchUser.toLowerCase()) ||
      b.email.toLowerCase().includes(searchUser.toLowerCase()) ||
      b.role.toLowerCase().includes(searchUser.toLowerCase());

    if (firstElementIncludes && !secondElementIncludes) return -1;
    if (!firstElementIncludes && secondElementIncludes) return 1;
    return 0;
  });
  return (
    <>
      <div className="px-3 py-4 overflow-x-scroll">
        <div className="mb-3 font-semibold flex justify-start items-center">
          <p>Rechercher</p>
          <input
            value={searchUser}
            onChange={(e) => setSearchUser(e.target.value)}
            className="ml-2 px-4 py-1 rounded-3xl hover:bg-input_hover_bg focus:outline-none"
            type="text"
            name="searchUser"
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
              <th className="p-3 px-5">Prénom</th>
              <th className="p-3 px-5">Nom</th>
              <th className="p-3 px-5">Email</th>
              <th className="p-3 px-5">Rôle</th>
              <th className="p-3 px-5">Actions</th>
            </tr>
            {!usersData?.users || usersData?.users.length !== 0 ? (
              sortedUsers?.map((user: User) => (
                <UserEdition
                  key={`category ${user.id}`}
                  user={user}
                  openEditionPanelAdmin={openEditionPanelAdmin}
                  refetch={refetch}
                />
              ))
            ) : (
              <tr>
                <th colSpan={7} className="py-5 px-2 text-red-600">
                  Pas de données utilisateurs
                </th>
              </tr>
            )}
          </tbody>
        </table>
        {isCreationPanelAdmin && (
          <div className="w-screen h-screen bg-white fixed inset-0 px-2 z-10 overflow-hidden flex items-center justify-center">
            <div className="pb-12 border border-gray-300 rounded-2xl">
              <CreateUserForm
                setIsCreationPanelAdmin={setIsCreationPanelAdmin}
                refetch={refetch}
              />
            </div>
          </div>
        )}
        {isEditionPanelAdmin && currentUser && (
          <div className="w-screen h-screen fixed inset-0 px-2 z-10 overflow-hidden flex items-center justify-center">
            <UserEditionForm
              user={currentUser}
              setIsEditionPanelAdmin={closeEditionPanelAdmin}
              refetch={refetch}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default UsersTable;
