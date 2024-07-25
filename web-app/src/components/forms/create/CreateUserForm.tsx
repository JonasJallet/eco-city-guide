import { MutationCreateUserArgs } from "@/gql/generate/graphql";
import { CREATE_USER } from "@/gql/requests/mutations";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdClose } from "react-icons/md";
import { toast } from "react-toastify";

enum UserRole {
  webAdministrator = "webAdministrator",
  cityAdministrator = "cityAdministrator",
  user = "user",
}

interface Props {
  setIsCreationPanelAdmin: (isCreationPanelAdmin: boolean) => void;
  refetch: () => void;
}

export default function CreateUserForm({
  setIsCreationPanelAdmin,
  refetch,
}: Props) {
  const [formData, setFormData] = useState<MutationCreateUserArgs>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: UserRole.user,
  });

  const [createUserMutation, { error }] =
    useMutation<MutationCreateUserArgs>(CREATE_USER);

  const createUser = async () => {
    try {
      const { data } = await createUserMutation({
        variables: formData,
      });

      if (data) {
        toast.success("L'utilisateur a bien été créé !");
        refetch();
      }
      setIsCreationPanelAdmin ? setIsCreationPanelAdmin(false) : null;
    } catch (error) {}
  };

  const updateFormData = (partialFormData: Partial<MutationCreateUserArgs>) => {
    setFormData({ ...formData, ...partialFormData });
  };

  return (
    <div className="flex flex-col items-center w-80 animate-fade">
      <button
        onClick={() => {
          setIsCreationPanelAdmin(false);
        }}
        className="self-start text-2xl text-gray-500 rounded-xl transition-all duration-300 hover:bg-gray-100 hover:text-tertiary_color p-2 m-1 z-20"
      >
        <MdClose />
      </button>
      <div
        className="w-full"
        onSubmit={(event) => {
          event.preventDefault();
          createUser();
        }}
      >
        <div className="border-b border-gray-200">
          <p className="text-center text-2xl text-dark_text_color font-bold font-sans cursor-default mb-2">
            Créer utilisateur
          </p>
        </div>
        <form className="pt-10">
          <div className="px-8">
            <input
              className="w-full bg-white-200 px-4 py-2 rounded-3xl transition-all duration-300 outline-none  focus:outline-none hover:border-white hover:bg-input_hover_bg mb-2 border border-tertiary_color"
              type="text"
              name="firstName"
              id="firstName"
              placeholder="Prénom"
              required
              onChange={(event) => {
                updateFormData({ firstName: event.target.value });
              }}
            />
            <input
              className="w-full bg-white-200 px-4 py-2 rounded-3xl transition-all duration-300 outline-none  focus:outline-none hover:border-white hover:bg-input_hover_bg mb-2 border border-tertiary_color"
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Nom"
              required
              onChange={(event) => {
                updateFormData({ lastName: event.target.value });
              }}
            />
            <input
              className="w-full bg-white-200 px-4 py-2 rounded-3xl transition-all duration-300 outline-none  focus:outline-none hover:border-white hover:bg-input_hover_bg mb-2 border border-tertiary_color"
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              required
              onChange={(event) => {
                updateFormData({ email: event.target.value });
              }}
            />
            <div className="flex flex-col">
              <label className="ml-4" htmlFor="role">
                Rôle
              </label>
              <select
                className="px-4 py-2 cursor-pointer rounded-3xl transition-all duration-300 outline-none  focus:outline-none hover:border-white hover:bg-input_hover_bg mb-2 border border-tertiary_color"
                name="role"
                id="role"
                onChange={(event) => {
                  updateFormData({ role: event.target.value });
                }}
              >
                <option className="cursor-pointer" value={UserRole.user}>
                  User
                </option>
                <option
                  className="cursor-pointer"
                  value={UserRole.cityAdministrator}
                >
                  City Administrator
                </option>
                <option
                  className="cursor-pointer"
                  value={UserRole.webAdministrator}
                >
                  Web Administrator
                </option>
              </select>
            </div>
            <input
              className="w-full bg-white-200 px-4 py-2 rounded-3xl transition-all duration-300 outline-none  focus:outline-none hover:border-white hover:bg-input_hover_bg mb-2 border border-tertiary_color"
              type="password"
              name="password"
              id="password"
              placeholder="Mot de passe"
              required
              onChange={(event) => {
                updateFormData({ password: event.target.value });
              }}
            />
            {error && (
              <div className="w-full mt-4 text-md text-red-600 text-center">
                {error.message}
              </div>
            )}
            <button
              type="submit"
              className="flex items-center justify-center text-center w-full mt-6 mb-4 border bg-tertiary_color rounded-3xl px-4 py-2 text-white tracking-wide font-semibold font-sans transition-all duration-300 hover:bg-white hover:text-tertiary_color hover:border hover:border-tertiary_color"
            >
              <IoMdAddCircleOutline className="text-xl" />
              <p className="ms-4 text-lg">Ajouter</p>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
