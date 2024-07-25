import { useState } from "react";
import { GrUpdate } from "react-icons/gr";
import { MdClose } from "react-icons/md";
import { useMutation } from "@apollo/client";
import { Category, MutationUpdateCategoryArgs } from "@/gql/generate/graphql";
import { UPDATE_CATEGORY } from "@/gql/requests/mutations";
import { toast } from "react-toastify";

interface Props {
  category: Category;
  setIsEditionPanelAdmin: (isEditionPanelAdmin: boolean) => void;
  refetch: () => void;
}

function EditCategoryForm({
  category,
  setIsEditionPanelAdmin,
  refetch,
}: Props) {
  const [updatedCategory, setUpdatedCategory] = useState<Category>({
    ...category,
  });

  const [updateCategoryMutation, { error }] =
    useMutation<MutationUpdateCategoryArgs>(UPDATE_CATEGORY);

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const { data } = await updateCategoryMutation({
        variables: updatedCategory,
      });
      if (data) {
        setIsEditionPanelAdmin(false);
        toast.success("La catégorie a bien été modifié !");
        refetch();
      }
    } catch (error) {}
  };

  return (
    <div className="flex flex-col animate-fade items-center w-80 opacity-100 z-20">
      <button
        onClick={() => setIsEditionPanelAdmin(false)}
        className="self-start text-2xl text-gray-500 rounded-xl transition-all duration-300 hover:bg-gray-100 hover:text-tertiary_color p-2 m-1 z-20"
      >
        <MdClose />
      </button>
      <div className="w-full">
        <div className="border-b border-gray-200">
          <p className="text-center text-2xl text-dark_text_color font-bold font-sans cursor-default mb-2">
            Modifier Catégorie
          </p>
        </div>
        <form
          className="pt-10 px-8"
          onSubmit={(event) => {
            handleFormSubmit(event);
          }}
        >
          <label>Nom</label>
          <input
            className="w-full bg-white-200 px-4 py-2 rounded-3xl transition-all duration-300 outline-none  hover:border-white hover:bg-input_hover_bg focus:outline-none mb-2 border border-tertiary_color"
            type="text"
            name="name"
            id="name"
            required
            value={updatedCategory.name || ""}
            onChange={(event) => {
              setUpdatedCategory({
                ...updatedCategory,
                name: event.target.value,
              });
            }}
          />
          <label>Icon</label>
          <input
            className="w-full bg-white-200 px-4 py-2 rounded-3xl transition-all duration-300 outline-none  hover:border-white hover:bg-input_hover_bg focus:outline-none mb-2 border border-tertiary_color"
            type="text"
            name="name"
            id="name"
            required
            value={updatedCategory.icon}
            onChange={(event) => {
              setUpdatedCategory({
                ...updatedCategory,
                icon: event.target.value,
              });
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
            <GrUpdate className="text-xl" />
            <p className="ms-4 text-lg">Valider</p>
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditCategoryForm;
