import DisplayPanelContext, {
  DisplayPanelType,
} from "@/contexts/DisplayPanelContext";
import { MutationCreateCategoryArgs } from "@/gql/generate/graphql";
import { CREATE_CATEGORY } from "@/gql/requests/mutations";
import { useMutation } from "@apollo/client";
import { useContext, useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdClose } from "react-icons/md";
import { SideBarContentEnum } from "../../home/sideBarContent.type";
import { toast } from "react-toastify";

export default function CreateCategoryForm({
  setIsCreationPanelAdmin,
  refetchCategoryData,
}: {
  setIsCreationPanelAdmin?: (isCreationPanelAdmin: boolean) => void;
  refetchCategoryData?: () => void;
}) {
  const [formData, setFormData] = useState<MutationCreateCategoryArgs>({
    name: "",
    icon: "",
  });
  const [categoryName, setCategoryName] = useState("");
  const [categoryIcon, setCategoryIcon] = useState("");
  const { setSideBarEnum } = useContext(
    DisplayPanelContext,
  ) as DisplayPanelType;

  const [createCategoryMutation, { error }] =
    useMutation<MutationCreateCategoryArgs>(CREATE_CATEGORY);

  const createCategory = async () => {
    try {
      const { data } = await createCategoryMutation({
        variables: formData,
      });

      if (data) {
        setIsCreationPanelAdmin ? setIsCreationPanelAdmin(false) : null;
        if (refetchCategoryData) refetchCategoryData();
        toast.success("La catégorie a bien été créée !");
      }
    } catch (error) {}
  };

  const updateFormData = (
    partialFormData: Partial<MutationCreateCategoryArgs>,
  ) => {
    setFormData({ ...formData, ...partialFormData });
  };

  const handleCloseButton = () => {
    setIsCreationPanelAdmin
      ? setIsCreationPanelAdmin(false)
      : setSideBarEnum(SideBarContentEnum.NO_CONTENT);
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setCategoryName("");
    setCategoryIcon("");
  };

  return (
    <div className="flex flex-col items-center w-80 animate-fade">
      <button
        onClick={handleCloseButton}
        className="self-start text-2xl text-gray-500 rounded-xl transition-all duration-300 hover:bg-gray-100 hover:text-tertiary_color p-2 m-1 z-20"
      >
        <MdClose />
      </button>
      <div
        className="w-full"
        onSubmit={(event) => {
          event.preventDefault();
          createCategory();
        }}
      >
        <div className="border-b border-gray-200">
          <p className="text-center text-2xl text-dark_text_color font-bold font-sans cursor-default mb-2">
            Créer catégorie
          </p>
        </div>
        <form className="pt-10">
          <div className="px-8">
            <input
              className="w-full bg-white-200 px-4 py-2 rounded-3xl transition-all duration-300 outline-none  focus:outline-none hover:border-white hover:bg-input_hover_bg mb-2 border border-tertiary_color"
              type="text"
              name="name"
              id="name"
              placeholder="Nom"
              required
              value={categoryName}
              autoComplete="one-time-code"
              onChange={(event) => {
                setCategoryName(event.target.value);
                updateFormData({ name: event.target.value });
              }}
            />
            <input
              className="w-full bg-white-200 px-4 py-2 rounded-3xl transition-all duration-300 outline-none  focus:outline-none hover:border-white hover:bg-input_hover_bg mb-2 border border-tertiary_color"
              type="text"
              name="icon"
              id="icon"
              placeholder="Icône"
              required
              value={categoryIcon}
              autoComplete="one-time-code"
              onChange={(event) => {
                setCategoryIcon(event.target.value);
                updateFormData({ icon: event.target.value });
              }}
            />
            {error && (
              <div className="w-full mt-4 text-md text-red-600 text-center">
                {error.message}
              </div>
            )}
            <button
              type="submit"
              onSubmit={(event) => {
                handleFormSubmit(event);
              }}
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
