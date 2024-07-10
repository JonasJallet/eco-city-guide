import React, { useEffect, useState } from "react";
import { MutationUpdateUserArgs } from "@/gql/graphql";
import { useQuery, useMutation } from "@apollo/client";
import FavoriteCard from "@/components/settings/FavoriCard";
import NavBarSettings from "@/components/settings/NavBarSettings";
import { GET_MY_PROFILE_FAVORITES } from "@/gql/queries";
import { REMOVE_FAVORITE_PLACE } from "@/gql/mutations";
import { UPDATE_MY_PROFILE, DELETE_USER } from "@/gql/mutations";
import Loader from "@/components/loader/Loader";
import { updateUserArgs } from "@/interfaces/updateUserArgs";
import { useRouter } from "next/router";
import { Place } from "@/gql/graphql";
import { toast } from "react-toastify";

export default function Settings() {
  const [showInputs, setShowInputs] = useState<string>("");
  const [errorUpdateUser, setErrorUpdateUser] = useState(false);
  const [passwordValueInput, setPasswordValueInput] = useState<string>(
    "Modifier mon mot de passe",
  );
  const [isModalOpened, SetIsModalOpened] = useState(false);
  const [activeItemNavBarSettings, setActiveItemNavBarSettings] =
    useState("Profil");
  const [favorites, setFavorites] = useState<Place[]>([]);
  const [inputType, setInputType] = useState<string>("text");
  const [showCancelButton, setShowCancelButton] = useState(false);
  const { data, loading, refetch } = useQuery(GET_MY_PROFILE_FAVORITES);
  const router = useRouter();

  let dataProfile: updateUserArgs = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    updateUserId: "",
  };

  if (data) {
    dataProfile = {
      firstName: data.myProfile.firstName,
      lastName: data.myProfile.lastName,
      email: data.myProfile.email,
      password: data.myProfile.hashedPassword,
      updateUserId: data.myProfile.id,
    };
  }

  const [formData, setFormData] = useState<updateUserArgs>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    updateUserId: "",
  });

  useEffect(() => {
    if (dataProfile) {
      setFormData(dataProfile);
      setFavorites(data?.myProfile.favoritesPlaces as Place[]);
    }
  }, [data]);

  const updateFormData = (partialFormData: Partial<MutationUpdateUserArgs>) => {
    setFormData({ ...formData, ...partialFormData });
  };

  const [
    UpdateUserMutation,
    { loading: loadingUpdateUser, error: updateUserError },
  ] = useMutation<MutationUpdateUserArgs>(UPDATE_MY_PROFILE);

  const UpdateProfileData = async () => {
    try {
      await UpdateUserMutation({
        variables: formData,
      });
      setShowInputs("");
      setShowCancelButton(false);
      setPasswordValueInput("Modifier mon mot de passe");
      setInputType("text");
      toast.success("Votre profil a bien été modifié !");
    } catch (error) {
      setErrorUpdateUser(true);
    }
  };

  const resetForm = () => {
    setFormData(dataProfile);
    setPasswordValueInput("Modifier mon mot de passe");
    setInputType("text");
    setShowInputs("");
  };

  const [RemoveFavorite, { loading: loadingRemoveFavorite }] = useMutation(
    REMOVE_FAVORITE_PLACE,
  );

  const RemoveFavoritePlace = async (idPlace: string) => {
    await RemoveFavorite({
      variables: {
        placeId: idPlace,
      },
    });
    await refetch();
  };

  const [deleteUserMutation] = useMutation(DELETE_USER);

  const deleteUser = async () => {
    let id = data?.myProfile.id;
    try {
      const { data } = await deleteUserMutation({
        variables: { deleteUserId: id },
      });
      if (data && data.deleteUser) {
        toast.success("Votre compte a bien été supprimé !");
        router.push("/home");
        location.reload();
      }
    } catch (error) {}
  };

  if (loading || loadingRemoveFavorite || loadingUpdateUser) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div>
      <div>
        <NavBarSettings
          setActiveItemNavBarSettings={setActiveItemNavBarSettings}
          firstnameProfile={dataProfile.firstName}
        />
        <div className="mt-20 z-0">
          {activeItemNavBarSettings == "Profil" && (
            <div className="flex justify-center items-center flex-col mt-7">
              <div>
                <form
                  className="bg-form_color mt-6 p-10 rounded-lg shadow-lg shadow-gray-300 min-w-full"
                  onSubmit={(event) => {
                    UpdateProfileData();
                    event.preventDefault();
                  }}
                  aria-label="Formulaire pour modifer ses inforations personnelles"
                >
                  <h1 className="font-bold font-sans text-2xl text-dark_text_color text-center mb-4">
                    Modifier mes informations
                  </h1>
                  <div>
                    <label className="text-gray-600 text-base ml-4">Nom</label>
                    <div className="flex">
                      {" "}
                      <input
                        aria-label="Renseigner son nom de famille"
                        className="w-full bg-white-200 px-4 py-2 rounded-3xl focus:outline-none mb-2 border border-tertiary_color hover:border-white hover:bg-input_hover_bg"
                        type="text"
                        name="lastname"
                        id="lastname"
                        value={formData.lastName || ""}
                        onChange={(event) => {
                          updateFormData({
                            lastName: event.target.value.trim(),
                          });
                          setShowCancelButton(true);
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-gray-600 text-base ml-4">
                      Prénom
                    </label>
                    <div className="flex">
                      {" "}
                      <input
                        aria-label="Renseigner son prénom"
                        className="w-full bg-white-200 px-4 py-2 rounded-3xl focus:outline-none mb-2 border border-tertiary_color hover:border-white hover:bg-input_hover_bg"
                        type="text"
                        name="firstname"
                        id="firstname"
                        value={formData.firstName || ""}
                        onChange={(event) => {
                          updateFormData({
                            firstName: event.target.value.trim(),
                          });
                          setShowCancelButton(true);
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-gray-600 text-base ml-4">
                      Email
                    </label>
                    <div className="flex">
                      <input
                        aria-label="Renseigner son email"
                        className="w-full bg-white-200 px-4 py-2 rounded-3xl focus:outline-none mb-2 border border-tertiary_color hover:border-white hover:bg-input_hover_bg"
                        type="text"
                        name="email"
                        id="email"
                        value={formData.email || ""}
                        onChange={(event) => {
                          updateFormData({ email: event.target.value.trim() });
                          setShowCancelButton(true);
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-gray-600 text-base ml-4">
                      Mot de passe
                    </label>
                    <div className="flex">
                      <input
                        aria-label="Renseigner son nouveau mot de passe"
                        className="w-full bg-white-200 px-4 py-2 rounded-3xl focus:outline-none mb-2 border border-tertiary_color hover:border-white hover:bg-input_hover_bg"
                        type={inputType}
                        name="password"
                        id="password"
                        value={passwordValueInput || ""}
                        placeholder="Modifier mon mot de passe"
                        minLength={12}
                        onChange={(event) => {
                          setShowCancelButton(true);
                          const value = event.target.value;
                          updateFormData({ password: value });
                          setPasswordValueInput(value);
                          setInputType(value ? "password" : "text");
                          if (value) setShowInputs("password");
                        }}
                        onClick={() => {
                          if (
                            passwordValueInput === "Modifier mon mot de passe"
                          ) {
                            setPasswordValueInput("");
                            setInputType("password");
                          }
                        }}
                      />
                    </div>
                  </div>
                  {showInputs == "password" && (
                    <div className="flex flex-col">
                      <div className="flex items-center">
                        <input
                          aria-label="Confirmer son nouveau mot de passe"
                          className="w-full bg-white-200 px-4 py-2 rounded-3xl focus:outline-none mb-2 border border-tertiary_color hover:border-white hover:bg-input_hover_bg"
                          type="password"
                          name="confirm"
                          id="confirm"
                          minLength={12}
                          placeholder="Confirmer le mot de passe"
                          pattern={formData.password}
                          title="Les mots de passe ne correspondent pas"
                          required
                        />
                      </div>
                    </div>
                  )}
                  <div className="justify-center">
                    <button
                      aria-label="Enregistrer les modifications"
                      className="w-full mt-4 border bg-tertiary_color rounded-3xl px-4 py-2 text-lg text-white tracking-wide font-semibold font-sans transition-all duration-300 hover:bg-white hover:text-tertiary_color hover:border hover:border-tertiary_color"
                      type="submit"
                    >
                      Enregistrer
                    </button>
                    {showCancelButton && (
                      <button
                        aria-label="Annuler les modifications"
                        className="w-full mt-4 border bg-red-500 rounded-3xl px-4 py-2 text-lg text-white tracking-wide font-semibold font-sans transition-all duration-300 hover:bg-white hover:text-red-500 hover:border hover:border-red-500"
                        onClick={() => {
                          setShowCancelButton(false);
                          setErrorUpdateUser(false);
                          resetForm();
                        }}
                      >
                        Annuler
                      </button>
                    )}
                  </div>
                  {errorUpdateUser && updateUserError && (
                    <p className="text-red-600">{updateUserError.message}</p>
                  )}
                </form>
              </div>
            </div>
          )}

          {activeItemNavBarSettings === "Settings" && (
            <>
              <div className="flex flex-col  items-center justify-center">
                <div style={{ width: 580 }}>
                  <h1 className="font-medium text-xl text-gray-500 mt-4 text-center">
                    Données et confidentialité
                  </h1>
                  <p className="font-medium mt-4 text-warmGray-700">
                    EcoCityGuide s'engage pour le respect de vos données.
                  </p>
                  <p className=" text-warmGray-700 text-fontSizeText">
                    Vos données personnelles sont confidentielles et ne sont
                    jamais partagées avec des tiers privés ou partenaires
                    professionnels.
                  </p>
                  <p className="text-warmGray-700 text-fontSizeText">
                    Vos données d'utilisation de l'application ne sont jamais
                    partagées ni à des tiers privés ni à des professionnels. Ces
                    données d'utilisation sont seulement utilisées à des fins
                    statistiques pour le propriétaire de l'application.
                  </p>
                </div>
                <div style={{ width: 580 }}>
                  <h1 className="font-medium text-xl text-gray-500 mt-16 text-center">
                    Supprimer mon compte
                  </h1>
                  <p className="font-medium mt-4 text-warmGray-700">
                    Attention, la suppression de votre compte est définitive.
                  </p>
                  <p className="text-warmGray-700 text-fontSizeText">
                    Toutes les données personnelles et relatives à la gestion de
                    votre application seront définitivement supprimées. Les
                    commentaires que vous avez écrits seront anonymisés mais
                    toujours visibles sur EcoCityGuide.
                  </p>
                  <div className="flex justify-center">
                    <button
                      aria-label="Supprimer mon compte"
                      className="bg-red-600 border border-red-600 text-white py-2 px-4 w-36 rounded-3xl mt-5 items-center tracking-wide font-semibold font-sans transition-all duration-300 hover:bg-white hover:text-red-600 hover:border hover:border-red-600"
                      onClick={() => SetIsModalOpened(!isModalOpened)}
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              </div>
              {isModalOpened && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="border-2 rounded-lg w-80 p-6 bg-white z-10">
                    <div className="text-center">
                      <h3 className="text-warmGray-700 font-bold text-base">
                        Êtes-vous sûr.e de vouloir supprimer votre compte ?
                      </h3>
                      <div className="flex flex-row justify-center items-center">
                        <button
                          type="button"
                          aria-label="Confirmer la suppression de mon compte"
                          className="w-28 mt-4 mr-3 border bg-red-600 border-red-600 rounded-3xl px-2 py-1 text-white tracking-wide font-semibold font-sans transition-all duration-300 hover:bg-white hover:text-red-600 hover:border hover:border-red-600"
                          onClick={() => {
                            SetIsModalOpened(!isModalOpened);
                            deleteUser();
                          }}
                        >
                          Supprimer
                        </button>
                        <button
                          type="button"
                          aria-label="Annuler le suppression de mon compte"
                          onClick={() => SetIsModalOpened(!isModalOpened)}
                          className="w-28 mt-4 border bg-tertiary_color border-tertiary_color rounded-3xl px-2 py-1 text-white tracking-wide font-semibold font-sans transition-all duration-300 hover:bg-white hover:text-tertiary_color hover:border hover:border-tertiary_color"
                        >
                          Annuler
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
          {activeItemNavBarSettings === "Favorites" && (
            <>
              <h2 className="font-medium text-xl text-gray-500 mt-24 text-center">
                Mes Favoris
              </h2>
              <div className="flex flex-col items-center">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 mt-2">
                  {favorites &&
                    favorites.length > 0 &&
                    favorites.map((favorite, index) => (
                      <div key={index} className="flex justify-center mt-4">
                        <FavoriteCard
                          favorite={favorite}
                          RemoveFavorite={() =>
                            RemoveFavoritePlace(favorite.id)
                          }
                        />
                      </div>
                    ))}
                </div>
              </div>
              {favorites && favorites.length == 0 && (
                <p className="text-center mt-10">
                  Vous n'avez pas encore de favoris.
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
