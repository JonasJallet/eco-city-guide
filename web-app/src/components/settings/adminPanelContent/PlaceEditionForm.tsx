import {
  Place,
  MutationUpdatePlaceArgs,
  Category,
  GetCategoriesQuery,
} from "@/gql/generate/graphql";
import { UPDATE_PLACE } from "@/gql/requests/mutations";
import { GET_CATEGORIES } from "@/gql/requests/queries";
import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { GrUpdate } from "react-icons/gr";
import { MdClose } from "react-icons/md";
import { toast } from "react-toastify";

interface Props {
  place: Place;
  setIsEditionPanelAdmin: (isEditionPanelAdmin: boolean) => void;
  refetch: () => void;
}

function PlaceEditionForm({ place, setIsEditionPanelAdmin, refetch }: Props) {
  const [selectedCategories, setSelectedCategories] = useState(
    place.categories,
  );
  const [updatedPlace, setUpdatedPlace] = useState({
    id: place.id,
    name: place.name,
    address: place.address,
    description: place.description,
    categoryIds: place.categories.map((category) => category.id),
  });
  const { data: categoriesData } = useQuery<GetCategoriesQuery>(GET_CATEGORIES);

  const [UpdatePlaceMutation] =
    useMutation<MutationUpdatePlaceArgs>(UPDATE_PLACE);

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const { data } = await UpdatePlaceMutation({
        variables: updatedPlace,
      });
      if (data) {
        toast.success("Le lieu a bien été modifié !");
        refetch();
      }
    } catch (error) {
      toast.error("Une erreur est survenue !");
    }
    setIsEditionPanelAdmin(false);
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-white-100">
      <div className="w-80 flex flex-col animate-fade items-center z-10 border border-gray-300 rounded-2xl overflow-y-auto">
        <button
          onClick={() => setIsEditionPanelAdmin(false)}
          className="self-start text-2xl text-gray-500 rounded-xl transition-all duration-300 hover:bg-gray-100 hover:text-tertiary_color p-2 m-1 z-20"
        >
          <MdClose />
        </button>
        <div className="w-full">
          <div className="border-b border-gray-200">
            <p className="text-center text-2xl text-dark_text_color font-bold font-sans cursor-default mb-2">
              Modifier lieu
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
              value={updatedPlace.name || ""}
              onChange={(event) => {
                setUpdatedPlace({
                  ...updatedPlace,
                  name: event.target.value,
                });
              }}
            />
            <label>Adresse</label>
            <input
              className="w-full bg-white-200 px-4 py-2 rounded-3xl transition-all duration-300 outline-none  hover:border-white hover:bg-input_hover_bg focus:outline-none mb-2 border border-tertiary_color"
              type="text"
              name="adresse"
              id="adresse"
              value={updatedPlace.address || ""}
              onChange={(event) => {
                setUpdatedPlace({
                  ...updatedPlace,
                  address: event.target.value,
                });
              }}
            />
            <label>Ville</label>
            <input
              className="w-full bg-white-200 px-4 py-2 rounded-3xl transition-all duration-300 outline-none mb-2 border border-gray-300"
              type="text"
              name="cityName"
              id="cityName"
              disabled
              value={place.city.name || ""}
            />
            <label>Description</label>
            <textarea
              className="w-full h-32 bg-white-200 px-4 py-2 rounded-2xl transition-all duration-300 outline-none  hover:border-white hover:bg-input_hover_bg focus:outline-none mb-2 border border-tertiary_color"
              value={updatedPlace.description}
              onChange={(event) => {
                setUpdatedPlace({
                  ...updatedPlace,
                  description: event.target.value,
                });
              }}
            />
            {selectedCategories.length > 0 && (
              <div className="flex flex-wrap gap-2 rounded-2xl mb-2">
                {selectedCategories.map((category) => (
                  <span
                    className="cursor-pointer text-white text-xs bg-tertiary_color py-1 px-2 rounded-lg m-01 transition-all duration-300 hover:bg-input_hover_bg"
                    key={category.id}
                    onClick={() => {
                      setSelectedCategories(
                        selectedCategories.filter(
                          (selectedCategory) =>
                            selectedCategory.id !== category.id,
                        ),
                      );
                      setUpdatedPlace({
                        ...updatedPlace,
                        categoryIds: updatedPlace.categoryIds.filter(
                          (selectedCategory) =>
                            selectedCategory !== category.id,
                        ),
                      });
                    }}
                  >
                    {category.name} X
                  </span>
                ))}
              </div>
            )}
            <select
              name="categories"
              id="categories"
              multiple
              className="w-full bg-white-200 px-4 py-2 rounded-xl mb-2 border border-tertiary_color focus:outline-none"
            >
              {categoriesData &&
                categoriesData.categories.map(
                  (category) =>
                    !selectedCategories.some(
                      (selectedCategory) => selectedCategory.id === category.id,
                    ) && (
                      <option
                        key={category.id}
                        className="text-text_color px-3 rounded-xl cursor-pointer transition-all duration-300 hover:bg-input_hover_bg"
                        onClick={() => {
                          setSelectedCategories(
                            selectedCategories.concat([category]),
                          );
                          setUpdatedPlace({
                            ...updatedPlace,
                            categoryIds: updatedPlace.categoryIds.concat([
                              category.id,
                            ]),
                          });
                        }}
                        value={category.id}
                      >
                        {category.name}
                      </option>
                    ),
                )}
            </select>
            <button
              type="submit"
              className="flex items-center justify-center text-center w-full mt-6 mb-10 border bg-tertiary_color rounded-3xl px-4 py-2 text-white tracking-wide font-semibold font-sans transition-all duration-300 hover:bg-white hover:text-tertiary_color hover:border hover:border-tertiary_color"
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

export default PlaceEditionForm;
