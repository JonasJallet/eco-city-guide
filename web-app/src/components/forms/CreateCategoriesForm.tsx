import { MutationCreateCategoryArgs } from "@/gql/graphql";
import { CREATE_CATEGORY } from "@/gql/mutations";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";

export default function CreateCategoriesForm() {
  const [formData, setFormData] = useState<MutationCreateCategoryArgs>({
    name: "",
  });

  const [inputValue, setInputValue] = useState("");

  const [createCategoryMutation] =
    useMutation<MutationCreateCategoryArgs>(CREATE_CATEGORY);

  const createCategory = async () => {
    await createCategoryMutation({
      variables: formData,
    });
  };

  const updateFormData = (
    partialFormData: Partial<MutationCreateCategoryArgs>,
  ) => {
    setFormData({ ...formData, ...partialFormData });
  };

  return (
    <div className="flex flex-col items-center w-80">
      <div
        className="w-full px-8"
        onSubmit={(event) => {
          event.preventDefault();
          createCategory();
        }}
      >
        <form className="pt-10">
          <h1 className="text-center text-2xl mb-6 text-gray-600 font-bold font-sans cursor-default">
            Créer catégorie
          </h1>
          <input
            className="w-full bg-white-200 px-4 py-2 rounded-3xl focus:outline-none mb-2 border border-tertiary_color"
            type="text"
            name="name"
            id="name"
            placeholder="Nom"
            required
            value={inputValue}
            onChange={(event) => {
              setInputValue(event.target.value);
              updateFormData({ name: event.target.value });
            }}
          />
          <button
            type="submit"
            onSubmit={() => {
              setInputValue("");
            }}
            className="flex items-center justify-center text-center w-full mt-4 border bg-tertiary_color rounded-3xl px-4 py-2 text-white tracking-wide font-semibold font-sans transition-colors duration-200 hover:bg-white hover:text-tertiary_color hover:border hover:border-tertiary_color"
          >
            <IoMdAddCircleOutline className="text-xl" />
            <p className="ms-4 text-lg">Ajouter</p>
          </button>
        </form>
      </div>
    </div>
  );
}
