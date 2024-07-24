import React, { useEffect, useState } from "react";
import {
  DeleteUserMutation,
  GetProfileQuery,
  MutationUpdateUserArgs,
  RemoveFavoritePlaceMutation,
  SignOutMutation,
} from "@/gql/generate/graphql";
import { useQuery, useMutation } from "@apollo/client";
import FavoriteCard from "@/components/settings/FavoriteCard";
import NavBarSettings from "@/components/settings/NavBarSettings";
import { GET_PROFILE } from "@/gql/requests/queries";
import {
  REMOVE_FAVORITE_PLACE,
  UPDATE_USER,
  DELETE_USER,
  SIGN_OUT,
} from "@/gql/requests/mutations";
import Loader from "@/components/loader/Loader";
import { useRouter } from "next/router";
import { Place } from "@/gql/generate/graphql";
import { UserUpdateInterface } from "@/interfaces/UserUpdate";
import { toast } from "react-toastify";
import CategoriesFilter from "@/components/settings/CategoriesFilter";
import AdminPanel from "@/components/settings/AdminPanel";

export default function Settings() {
  const [showInputs, setShowInputs] = useState<string>("");
  const [errorUpdateUser, setErrorUpdateUser] = useState(false);
  const [passwordValueInput, setPasswordValueInput] = useState<string>(
    "Modifier mon mot de passe",
  );
  const [isModalOpened, SetIsModalOpened] = useState(false);
  const [activeItemNavBarSettings, setActiveItemNavBarSettings] =
    useState("Admin");
  const [favorites, setFavorites] = useState<Place[]>([]);
  const [inputType, setInputType] = useState<string>("text");
  const [showCancelButton, setShowCancelButton] = useState(false);
  const { data, loading, refetch } = useQuery<GetProfileQuery>(GET_PROFILE);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const filteredFavorites =
    selectedCategories.length > 0
      ? favorites.filter((favorite) =>
          favorite.categories.some((category) =>
            selectedCategories.includes(category.name),
          ),
        )
      : favorites;

  const router = useRouter();

  useEffect(() => {
    if (!loading && !data) {
      router.push("/home");
    }
  }, [data, loading]);

  let dataProfile: UserUpdateInterface = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    id: "",
  };

  if (data) {
    dataProfile = {
      firstName: data.myProfile.firstName,
      lastName: data.myProfile.lastName,
      email: data.myProfile.email,
      password: data.myProfile.hashedPassword,
      id: data.myProfile.id,
    };
  }

  const [formData, setFormData] = useState<UserUpdateInterface>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    id: "",
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
  ] = useMutation<MutationUpdateUserArgs>(UPDATE_USER);

  const UpdateProfileData = async () => {
    try {
      await UpdateUserMutation({
        variables: formData,
      });
      setShowInputs("");
      setShowCancelButton(false);
      passwordValueInput == "Modifier mon mot de passe" &&
        toast.success("Votre profil a bien été modifié !");
      passwordValueInput !== "Modifier mon mot de passe" && Logout();
      setPasswordValueInput("Modifier mon mot de passe");
      setInputType("text");
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

  const [RemoveFavorite, { loading: loadingRemoveFavorite }] =
    useMutation<RemoveFavoritePlaceMutation>(REMOVE_FAVORITE_PLACE);

  const RemoveFavoritePlace = async (idPlace: string) => {
    await RemoveFavorite({
      variables: {
        placeId: idPlace,
      },
    });
    await refetch();
  };

  const [signOut] = useMutation<SignOutMutation>(SIGN_OUT);

  const Logout = async () => {
    toast.success(
      "Vous avez modifié votre mot de passe, vous allez être déconnecté(e).",
    );

    try {
      const { data } = await signOut();
      if (data && data.signOut) {
        await router.push("/home");
        location.reload();
      }
    } catch (error) {}

    location.reload();
  };

  const [deleteUserMutation] = useMutation<DeleteUserMutation>(DELETE_USER);

  const deleteUser = async () => {
    let id = data?.myProfile.id;
    try {
      const { data } = await deleteUserMutation({
        variables: { deleteUserId: id },
      });

      if (data && data.deleteUser) {
        toast.success("Votre compte a bien été supprimé !");
        router.push("/home");
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
    <div className="relative">
      <div>
        <NavBarSettings
          setActiveItemNavBarSettings={setActiveItemNavBarSettings}
          firstnameProfile={dataProfile.firstName}
        />
        <div className="z-0">
          {activeItemNavBarSettings == "Admin" && <AdminPanel />}
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
                    <label className="text-secondary_color text-base ml-4">
                      Nom
                    </label>
                    <div className="flex">
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
                    <label className="text-secondary_color text-base ml-4">
                      Prénom
                    </label>
                    <div className="flex">
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
                    <label className="text-secondary_color text-base ml-4">
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
                    <label className="text-secondary_color text-base ml-4">
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
                    <p className="text-red-600 w-64 text-center mt-4">
                      {updateUserError.message}
                    </p>
                  )}
                </form>
              </div>
            </div>
          )}

          {activeItemNavBarSettings === "Settings" && (
            <>
              <div className="flex flex-col  items-center justify-center mt-6">
                <div style={{ width: 580 }}>
                  <h1 className="font-bold font-sans text-2xl text-dark_text_color mt-4 text-center">
                    Données et confidentialité
                  </h1>
                  <p className="font-medium mt-4 text-secondary_color ">
                    EcoCityGuide s'engage pour le respect de vos données.
                  </p>
                  <p className=" text-secondary_color  text-fontSizeText">
                    Vos données personnelles sont confidentielles et ne sont
                    jamais partagées avec des tiers privés ou partenaires
                    professionnels.
                  </p>
                  <p className="text-secondary_color  text-fontSizeText">
                    Vos données d'utilisation de l'application ne sont jamais
                    partagées ni à des tiers privés ni à des professionnels. Ces
                    données d'utilisation sont seulement utilisées à des fins
                    statistiques pour le propriétaire de l'application. Pour
                    tout complément d'information, nous vous invitons à vous
                    rendre sur le{" "}
                    <a
                      className="text-tertiary_color font-bold"
                      href="https://www.cnil.fr/fr"
                      target="_blank"
                    >
                      site de la CNIL
                    </a>
                    .
                  </p>
                </div>
                <div style={{ width: 580 }}>
                  <h1 className="font-bold font-sans text-2xl text-dark_text_color mt-16 text-center">
                    Supprimer mon compte
                  </h1>
                  <p className="font-medium mt-4 text-secondary_color ">
                    Attention, la suppression de votre compte est définitive.
                  </p>
                  <p className="text-secondary_color text-fontSizeText">
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
                      <h3 className="text-secondary_color font-bold text-base">
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
            <div className="mb-10">
              <h2 className="font-bold font-sans text-2xl text-dark_text_color mt-10 text-center ">
                Mes Favoris
              </h2>
              {favorites && favorites.length == 0 ? (
                <p className="text-secondary_color text-center mt-10 mr-10">
                  Vous n'avez pas encore de favoris.
                </p>
              ) : (
                favorites && (
                  <div className="flex flex-col items-center">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 mt-2">
                      <div
                        className={`flex justify-start mt-4 md:col-span-3 sm:col-span-2 col-span-1 ${filteredFavorites.length > 0 ? "" : "ml-10 md:ml-0"}`}
                      >
                        <CategoriesFilter
                          selectedCategories={selectedCategories}
                          setSelectedCategories={setSelectedCategories}
                        />
                      </div>
                      {filteredFavorites && filteredFavorites.length > 0 ? (
                        filteredFavorites.map((favorite, index) => (
                          <div key={index} className="flex justify-center mt-4">
                            <FavoriteCard
                              favorite={favorite}
                              removeFromFavorites={() =>
                                RemoveFavoritePlace(favorite.id)
                              }
                            />
                          </div>
                        ))
                      ) : (
                        <p className="text-secondary_color sm:col-span-2 md:col-span-3 col-span-1 flex mt-4 ml-10 sm:ml-4 mr-10">
                          Vous n'avez pas encore de favoris pour le filtrage
                          appliqué.
                        </p>
                      )}
                    </div>
                  </div>
                )
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
