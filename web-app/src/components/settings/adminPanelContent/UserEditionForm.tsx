import { User, MutationUpdateUserArgs } from "@/gql/generate/graphql";
import { UPDATE_USER } from "@/gql/requests/mutations";
import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { GrUpdate } from "react-icons/gr";
import { MdClose } from "react-icons/md";

interface Props {
  user: User;
  setIsEditionPanelAdmin: (isEditionPanelAdmin: boolean) => void;
}

export default function UserEditionForm({
  user,
  setIsEditionPanelAdmin,
}: Props) {
  const [updatedUser, setUpdatedUser] = useState<User>({
    ...user,
  });

  const [
    UpdateUserMutation,
    { loading: loadingUpdateUser, error: updateUserError },
  ] = useMutation<MutationUpdateUserArgs>(UPDATE_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      await UpdateUserMutation({ variables: updatedUser });
    } catch (error) {
      console.log(error);
    }
    setIsEditionPanelAdmin(false);
  };

  return (
    <div className="w-screen h-screen bg-white fixed inset-0 px-2 z-10 overflow-hidden flex items-center justify-center">
      <div className="flex flex-col animate-fade items-center w-80 opacity-100 z-20 border border-gray-300 rounded-2xl">
        <button
          onClick={() => setIsEditionPanelAdmin(false)}
          className="self-start text-2xl text-gray-500 rounded-xl transition-all duration-300 hover:bg-gray-100 hover:text-tertiary_color p-2 m-1 z-20"
        >
          <MdClose />
        </button>
        <div className="w-full">
          <div className="border-b border-gray-200">
            <p className="text-center text-2xl text-dark_text_color font-bold font-sans cursor-default mb-2">
              Modifier utilisateur
            </p>
          </div>
          <form
            className="pt-10 px-8"
            onSubmit={(event) => {
              handleFormSubmit(event);
            }}
          >
            <label>Prénom</label>
            <input
              className="w-full bg-white-200 px-4 py-2 rounded-3xl transition-all duration-300 outline-none  hover:border-white hover:bg-input_hover_bg focus:outline-none mb-2 border border-tertiary_color"
              type="text"
              name="name"
              id="name"
              required
              value={updatedUser.firstName || ""}
              onChange={(event) => {
                setUpdatedUser({
                  ...updatedUser,
                  firstName: event.target.value,
                });
              }}
            />
            <label>Nom</label>
            <input
              className="w-full bg-white-200 px-4 py-2 rounded-3xl transition-all duration-300 outline-none  hover:border-white hover:bg-input_hover_bg focus:outline-none mb-2 border border-tertiary_color"
              type="text"
              name="name"
              id="name"
              required
              value={updatedUser.lastName || ""}
              onChange={(event) => {
                setUpdatedUser({
                  ...updatedUser,
                  lastName: event.target.value,
                });
              }}
            />
            <label>Email</label>
            <input
              className="w-full bg-white-200 px-4 py-2 rounded-3xl transition-all duration-300 outline-none  hover:border-white hover:bg-input_hover_bg focus:outline-none mb-2 border border-tertiary_color"
              type="email"
              name="name"
              id="name"
              required
              value={updatedUser.email || ""}
              onChange={(event) => {
                setUpdatedUser({
                  ...updatedUser,
                  email: event.target.value,
                });
              }}
            />
            <label>Rôle</label>
            <button
              type="submit"
              className="flex items-center justify-center text-center w-full mt-6 mb-12 border bg-tertiary_color rounded-3xl px-4 py-2 text-white tracking-wide font-semibold font-sans transition-all duration-300 hover:bg-white hover:text-tertiary_color hover:border hover:border-tertiary_color"
            >
              <GrUpdate className="text-xl" />
              <p className="ms-4 text-lg">Valider</p>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
