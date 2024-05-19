import React, { useEffect, useState } from "react";
import {
  GetMyProfileQuery,
  MutationUpdateUserArgs,
  UpdateUserMutationVariables,
} from "@/gql/graphql";
import { gql, useQuery, useMutation } from "@apollo/client";
import { RxCross1 } from "react-icons/rx";
import Image from "next/image";

import SideBarSettings from "@/components/settings/SideBarSettings";

const GET_MY_PROFILE = gql`
  query GetMyProfile {
    myProfile {
      id
      email
      firstName
      lastName
      hashedPassword
    }
  }
`;

const UPDATE_MY_PROFILE = gql`
  mutation UpdateUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
    $updateUserId: ID!
  ) {
    updateUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
      id: $updateUserId
    ) {
      id
      firstName
      lastName
      email
      hashedPassword
    }
  }
`;

export default function settings() {
  const [showInputs, setShowInputs] = useState<string>("");
  const { data, loading } = useQuery<GetMyProfileQuery>(GET_MY_PROFILE);
  const [activeItemSideBarSettings, setActiveItemSideBarSettings] =
    useState("Profil");


console.log(data?.myProfile)

  let dataProfile: UpdateUserMutationVariables = {
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

  const [formData, setFormData] = useState<UpdateUserMutationVariables>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    updateUserId: "",
  });

  useEffect(() => {
    if (dataProfile) {
      setFormData(dataProfile);
    }
  }, [data]);
  const updateFormData = (
    partialFormData: Partial<UpdateUserMutationVariables>,
  ) => {
    console.log("Partial form data received:", partialFormData);
    setFormData({ ...formData, ...partialFormData });
  };

  const [UpdateUserMutation, { error }] =
    useMutation<MutationUpdateUserArgs>(UPDATE_MY_PROFILE);

  const UpdateProfileData = async (
    updatedData: UpdateUserMutationVariables,
  ) => {
    console.log(formData)
    try {
      const { data } = await UpdateUserMutation({
        variables: formData,
      });
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(()=>{
  },[formData])

  return (
    <div>
      <div className="">
        <SideBarSettings
          setActiveItemSideBarSettings={setActiveItemSideBarSettings}
          firstnameProfile={dataProfile.firstName}
        />
        <div className="">
          {activeItemSideBarSettings == "Profil" && (
            <div className="flex justify-center items-center flex-col mt-6">
              <div>
                <form
                  className="bg-form_color p-8 rounded-lg shadow-lg shadow-gray-300 min-w-full flex flex-col"
                  onSubmit={(event) => {
                    UpdateProfileData(formData);
                    event.preventDefault();
                  }}
                  aria-label="form"
                >
                  <h1 className="font-medium text-2xl text-gray-600 text-center mb-4">
                    Modifier mes informations
                  </h1>
                  <div>
                    <label className="text-gray-600 text-sm">Nom</label>
                    <div className="flex">
                      {" "}
                      <input
                        className="w-full p-1 bg-white-200 rounded-lg mb-2 border focus:border-blue-500 focus:outline-none"
                        name="lastname"
                        id="lastname"
                        placeholder={data ? formData.lastName : ""}
                        onChange={(event) => {
                          updateFormData({ lastName: event.target.value });
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-gray-600 text-sm">Prénom</label>
                    <div className="flex">
                      {" "}
                      <input
                        className="w-full p-1 bg-white-200 rounded-lg mb-2 border focus:border-blue-500 focus:outline-none"
                        type="text"
                        name="firstname"
                        id="firstname"
                        placeholder={formData ? formData.firstName : ""}
                        onChange={(event) => {
                          updateFormData({
                            firstName: event.target.value,
                          });
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-gray-600 text-sm">Email</label>
                    <div className="flex">
                      {" "}
                      <input
                        className="w-full p-1 bg-white-200 rounded-lg mb-2 border focus:border-blue-500 focus:outline-none"
                        type="text"
                        name="email"
                        id="email"
                        placeholder={formData? formData.email : ""}
                        onChange={(event) => {
                          updateFormData({ email: event.target.value });
                       }}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-gray-600 text-sm">
                      Mot de passe
                    </label>
                    <div className="flex">
                      {" "}
                      <input
                        className="w-full p-1 bg-white-200 rounded-lg mb-2 border focus:border-blue-500 focus:outline-none"
                        name="password"
                        id="password"
                        placeholder="Modifier mon mot de passe"
                        onChange={(event) => {
                          updateFormData({
                            password: event.target.placeholder,
                          });
                        }}
                        onClick={()=>setShowInputs("password")}
                      />
                    </div>
                  </div>
                  {showInputs == "password" && (
                    <div className="flex flex-col">
                      <div
                        className="flex items-center"
                      >
                        <input
                          type="password"
                          placeholder="Confirmer le mot de passe"
                          className="bg-white-200 w-full p-1 rounded-lg mr-2 border  focus:border-blue-500 focus:outline-none"
                          minLength={12}
                          onChange={(event) => {
                            updateFormData({
                              password: event.target.value,
                            });
                          }}
                        />
                        <button
                          onClick={() => {
                            // setIsEditing(null);
                            setShowInputs("");
                            updateFormData({
                              password: formData.password,
                            });

                          }}
                        >
                          <RxCross1
                            size={24}
                            className="cursor-pointer"
                            style={{ color: "black" }}
                          />
                        </button>
                      </div>
                    </div>
                  )}
                  <button type="submit" className="bg-tertiary_color p-2 rounded-lg text-white w-36 self-center mt-4">
                    Enregistrer
                  </button>
                </form>
              </div>
            </div>
          )}
          {activeItemSideBarSettings == "Settings" && (
            <>
              <div className="text-center ml-80 mr-80">
                <h1 className="font-medium text-xl text-gray-500 mt-8  text-center">
                  Données et confidentialité
                </h1>
                <p className="font-medium mt-4 text-warmGray-700">
                  EcoCityGuide s'engage pour le respect de vos données.
                </p>
                <p className="mt-2 text-warmGray-700 text-fontSizeText">
                  Vos données personnelles sont confidentielles et ne sont
                  jamais partagées avec des tiers privés ou partenaires
                  professionnels.
                </p>
                <p className="mt-2 text-warmGray-700 text-fontSizeText">
                  Vos données d'utilisation de l'application ne sont jamais
                  partagées ni à des tiers privés ni à des professionnels.
                </p>
                <p className="mt-2 text-warmGray-700 text-fontSizeText">
                  Ces données sont seulement utilisées à des fins statistiques
                  pour le propriétaire de l'application.
                </p>
              </div>

              <div className="text-center ml-80 mr-80">
                <h1 className="font-medium text-xl text-gray-500 mt-16 text-center">
                  Supprimer mon compte
                </h1>
                <p className="font-medium mt-4 text-warmGray-700">
                  Attention, la suppression de votre compte est définitive.
                </p>
                <p className="mt-2 text-warmGray-700 text-fontSizeText">
                  Toutes les données personnelles et relatives à la gestion de
                  votre application seront définitivement supprimées.
                </p>
                <p className="mt-2 text-warmGray-700">
                  Les commentaires que vous avez écris seront anonymisés mais
                  toujours visibles sur EcoCityGuide.
                </p>
                <button className=" bg-red-600 text-white py-2 w-36 rounded-lg px-2 mt-4">
                  {" "}
                  Supprimer
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
