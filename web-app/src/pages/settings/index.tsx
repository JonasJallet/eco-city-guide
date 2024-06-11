import React, { useEffect, useState } from "react";
import {
  Category,
  GetMyProfileQuery,
  MutationDeleteUserArgs,
  MutationUpdateUserArgs,
  Place,
} from "@/gql/graphql";
import { useQuery, useMutation } from "@apollo/client";
import FavoriCard from "@/components/settings/FavoriCard";
import SideBarSettings from "@/components/settings/SideBarSettings";
import {
  GET_MY_PROFILE_FAVORIES,
  UPDATE_MY_PROFILE,
  DELETE_ACCOUNT,
  REMOVE_FAVORI,
} from "@/gql/queries";
import { useRouter } from "next/router";
import Loader from "@/components/loader/Loader";

interface updateUserArgs {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  updateUserId: string;
}

export type coordinates = [number, number];

interface favori {
  id: string;
  name: string;
  address: string;
  coordinates: { type: "Point"; coordinates: coordinates };
  createdAt: Date;
  description: string;

  city: {
    id: string;
    name: string;
    coordinates: { type: "Point"; coordinates: coordinates };
  };
  categories: Category[];
  owner: {
    type: "User";
    id: string;
    createdAt: Date;
    firstName: string;
    lastName: string;
    userInitials: string;
    role: string;
    email: string;
    hashedPassword: string;
    favoritesPlaces: Place[];
  };
}

export default function Settings() {
  const [showInputs, setShowInputs] = useState<string>("");
  const [errorUpdateUser, setErrorUpdateUser] = useState(false);
  const [passwordValueInput, setPasswordValueInput] = useState<string>(
    "Modifier mon mot de passe",
  );
  const [activeItemSideBarSettings, setActiveItemSideBarSettings] =
    useState("Profil");
  const [favories, setFavories] = useState<favori[]>([]);
  const [inputType, setInputType] = useState<string>("text");
  const [showCancelButton, setShowCancelButton] = useState(false);
  const { data, loading, refetch } = useQuery<GetMyProfileQuery>(
    GET_MY_PROFILE_FAVORIES,
  );

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
      setFavories(data?.myProfile.favoritesPlaces as favori[]);
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

  const [RemoveFavori, { loading: loadingRemoveFavori }] = useMutation(
    REMOVE_FAVORI,
    {
      update(cache, { data: { removeFavoritePlace } }) {
        const { myProfile }: any = cache.readQuery({
          query: GET_MY_PROFILE_FAVORIES,
        });
        const updatedFavorites = myProfile.favoritesPlaces.filter(
          (favorite: any) => favorite.id !== removeFavoritePlace.id,
        );
        cache.writeQuery({
          query: GET_MY_PROFILE_FAVORIES,
          data: {
            myProfile: {
              ...myProfile,
              favoritesPlaces: updatedFavorites,
            },
          },
        });
      },
    },
  );

  const RemoveFavoriPlace = async (idPlace: string) => {
    await RemoveFavori({
      variables: {
        placeId: idPlace,
      },
    });
    await refetch();
  };

  // TODO avec le travail de Vincent sur la déconnexion
  // const [DeleteAccount, {loading : deleteAccountLoading, error: deleteAccount }] =
  //  useMutation<MutationDeleteUserArgs>(DELETE_ACCOUNT);

  // const DeleteAccountUser = async () => {
  //   console.log("Je passe ici");
  //   const userId = data?.myProfile.id;
  //   if (data?.myProfile.id) {
  //     try {
  //       // const { data } = await DeleteAccount({
  //       //   variables: {
  //       //     deleteUserId: userId,
  //       //   },
  //       // });
  //       // router.push("/home");
  //     } catch (error) {
  //       console.log(error);
  //     } // Gérer l'erreur
  //   }
  // };

  return (
    <div>
      <div className="">
        <SideBarSettings
          setActiveItemSideBarSettings={setActiveItemSideBarSettings}
          firstnameProfile={dataProfile.firstName}
        />
        <div className="mt-20">
          {activeItemSideBarSettings == "Profil" && (
            <div className="flex justify-center items-center flex-col mt-7">
              <div>
                <form
                  className="bg-form_color mt-6 p-10 rounded-lg shadow-lg shadow-gray-300 min-w-full"
                  onSubmit={(event) => {
                    UpdateProfileData();
                    event.preventDefault();
                  }}
                  aria-label="form"
                >
                  <h1 className="font-bold font-sans text-2xl text-dark_text_color text-center mb-4">
                    Modifier mes informations
                  </h1>
                  <div>
                    <label className="text-gray-600 text-base ml-4">Nom</label>
                    <div className="flex">
                      {" "}
                      <input
                        className="w-full bg-white-200 px-4 py-2 rounded-3xl focus:outline-none mb-2 border border-tertiary_color hover:border-white hover:bg-input_hover_bg"
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
                      {" "}
                      <input
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
                  {loadingUpdateUser && <Loader />}
                  <div className="justify-center">
                    <button
                      className="w-full mt-4 border bg-tertiary_color rounded-3xl px-4 py-2 text-lg text-white tracking-wide font-semibold font-sans transition-all duration-300 hover:bg-white hover:text-tertiary_color hover:border hover:border-tertiary_color"
                      type="submit"
                    >
                      Enregistrer
                    </button>
                    {showCancelButton && (
                      <button
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
          {activeItemSideBarSettings === "Settings" && (
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
                    className="bg-red-600 border border-red-600 text-white py-2 px-4 w-36 rounded-3xl mt-5 items-center tracking-wide font-semibold font-sans transition-all duration-300 hover:bg-white hover:text-red-600 hover:border hover:border-red-600"
                    //onClick={DeleteAccountUser}
                  >
                    Supprimer
                  </button>
                </div>
                {/* {deleteAccountLoading && <Loading/>} */}
              </div>
            </div>
          )}
          {activeItemSideBarSettings === "Favoris" && (
            <>
              <h2 className="font-medium text-xl text-gray-500 mt-24 text-center">
                Mes Favoris
              </h2>
              <div className="flex justify-center">
                {loadingRemoveFavori && <Loader />}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 mt-2">
                  {favories && favories.length > 0 ? (
                    favories.map((favori, index) => (
                      <div key={index} className="flex justify-center mt-4">
                        <FavoriCard
                          name={favori.name}
                          description={favori.description}
                          city={favori.city}
                          owner={favori.owner}
                          address={favori.address}
                          coordinates={favori.coordinates}
                          createdAt={favori.createdAt}
                          RemoveFavori={() => RemoveFavoriPlace(favori.id)}
                          categories={favori.categories}
                          id={favori.id}
                        />
                      </div>
                    ))
                  ) : (
                    <p className="text-center">
                      Vous n'avez pas encore de favoris
                    </p>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
