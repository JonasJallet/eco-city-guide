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
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [showInputs, setShowInputs] = useState<string>("");
  const { data, loading } = useQuery<GetMyProfileQuery>(GET_MY_PROFILE);
  const [activeItemSideBarSettings, setActiveItemSideBarSettings] =
    useState("Profil");

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
    try {
      const { data } = await UpdateUserMutation({
        variables: formData,
      });
    } catch (error) {}
  };

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
                    event.preventDefault();
                    UpdateProfileData(formData);
                  }}
                  aria-label="form"
                >
                  <h1 className="font-medium text-2xl text-gray-600 text-center mb-4">
                    Informations personnelles
                  </h1>
                  <div>
                    <label className="text-gray-600 text-sm">Nom</label>
                    <div className="flex">
                      {" "}
                      <input
                        className="w-full p-1 bg-white-200 rounded-lg focus:outline-none mb-2 border"
                        name="lastname"
                        id="lastname"
                        placeholder={data ? data.myProfile?.lastName : ""}
                        //readOnly={isEditing !== "lastname"}
                        // style={{
                        //   cursor: isEditing === "lastname" ? "text" : "default",
                        //   marginRight: "10px",
                        // }}
                      />
                      {/* <button
                     type="submit"
                      onClick={() => {
                        if (isEditing === "lastname") {
                          UpdateProfileData(formData); 
                          setIsEditing("");
                          setShowInputs("");
                        } else {
                          setIsEditing("lastname");
                          setShowInputs("lastname");
                        }
                      }}
                      className={`${
                        isEditing == "lastname"
                          ? "bg-tertiary_color"
                          : "bg-gray-400"
                      } rounded-lg text-white font-semibold font-sans px-4 py-2 mb-2`}
                    >
                      {isEditing === "lastname" ? "Valider" : "Modifier"}
                    </button> */}
                    </div>
                  </div>
                  {/* {showInputs == "lastname" && (
                  <div
                    className="flex items-center"
                    style={{ marginLeft: "6px" }}
                  >
                    <input
                      type="text"
                      placeholder="Nouveau nom"
                      className="bg-white-200 px-4 py-1 rounded-lg focus:outline-none mr-2 border border-gray-300"
                      style={{ width: "250px" }}
                      onChange={(event) => {
                        updateFormData({ lastName: event.target.placeholder });
                      }}
                    />
                    <button
                      onClick={() => {
                        setIsEditing(null);
                        setShowInputs("");
                      }}
                    >
                      <RxCross1
                        size={24}
                        className="cursor-pointer"
                        style={{ color: "black" }}
                      />
                    </button>
                  </div>
                )} */}
                  <div>
                    <label className="text-gray-600 text-sm">Prénom</label>
                    <div className="flex">
                      {" "}
                      <input
                        className="w-full p-1 bg-white-200 rounded-lg focus:outline-none mb-2 border"
                        type="text"
                        name="firstname"
                        id="firstname"
                        placeholder={data ? data.myProfile?.firstName : ""}
                        // readOnly={isEditing !== "firstname"}
                        // style={{
                        //   cursor: isEditing === "firstname" ? "text" : "default",
                        //   marginRight: "10px",
                        // }}
                        onChange={(event) => {
                          updateFormData({
                            firstName: event.target.placeholder,
                          });
                        }}
                      />
                      {/* <button
                      type="submit"
                      onClick={() => {
                        if (isEditing === "firstname") {
                          UpdateProfileData(formData); 
                          setIsEditing("");
                          setShowInputs("");
                        } else {
                          setIsEditing("firstname");
                          setShowInputs("firstname");
                        }
                      }}
                      className={`${
                        isEditing == "firstname"
                          ? "bg-tertiary_color"
                          : "bg-gray-400"
                      } rounded-lg text-white font-semibold font-sans px-4 py-2  mb-2`}
                    >
                      {isEditing === "firstname" ? "Valider" : "Modifier"}
                    </button> */}
                    </div>
                  </div>
                  {/* {showInputs == "firstname" && (
                  <div
                    className="flex items-center"
                    style={{ marginLeft: "6px" }}
                  >
                    <input
                      type="text"
                      // placeholder="Nouveau prénom"
                      placeholder={data ? data.myProfile?.firstName : ""}
                      className="bg-white-200 px-4 py-1 rounded-lg focus:outline-none mr-2 border border-gray-300"
                      style={{ width: "250px" }}
                      onChange={(event) => {
                         updateFormData({ firstName: event.target.placeholder });
                      }}
                    />
                    <button
                      onClick={() => {
                        setIsEditing("");
                        setShowInputs("");
                      }}
                    >
                      <RxCross1
                        size={24}
                        className="cursor-pointer"
                        style={{ color: "black" }}
                      />
                    </button>
                  </div>
                )} */}
                  <div>
                    <label className="text-gray-600 text-sm">Email</label>
                    <div className="flex">
                      {" "}
                      <input
                        className="w-full p-1 bg-white-200 rounded-lg focus:outline-none mb-2 border"
                        type="text"
                        name="email"
                        id="email"
                        placeholder={data ? data.myProfile?.email : ""}
                        // readOnly={isEditing !== "email"}
                        // style={{
                        //   cursor: isEditing === "email" ? "text" : "default",
                        //   marginRight: "10px",
                        // }}
                      />
                      {/* <button
                      onClick={() => {
                        if (isEditing === "email") {
                          UpdateProfileData(formData); 
                          setIsEditing("");
                          setShowInputs("");
                        } else {
                          setIsEditing("email");
                          setShowInputs("email");
                        }
                      }}
                      className={`${
                        isEditing == "email"
                          ? "bg-tertiary_color"
                          : "bg-gray-400"
                      } rounded-lg text-white font-semibold font-sans px-4 py-2  mb-2`}
                    >
                      {isEditing === "email" ? "Valider" : "Modifier"}
                    </button> */}
                    </div>
                  </div>
                  {/* {showInputs == "email" && (
                  <div
                    className="flex items-center"
                    style={{ marginLeft: "6px" }}
                  >
                    <input
                      type="text"
                      placeholder="Nouvel email"
                      className="bg-white-200 px-4 py-1 rounded-lg focus:outline-none mr-2 border border-gray-300"
                      style={{ width: "250px" }}
                      onChange={(event) => {
                         updateFormData({ email: event.target.placeholder });
                      }}
                    />
                    <button
                      onClick={() => {
                        setIsEditing(null);
                        setShowInputs("email");
                      }}
                    >
                      <RxCross1
                        size={24}
                        className="cursor-pointer"
                        style={{ color: "black" }}
                      />
                    </button>
                  </div>
                )} */}
                  <div>
                    <label className="text-gray-600 text-sm">
                      Mot de passe
                    </label>
                    <div className="flex">
                      {" "}
                      <input
                        className="w-full p-1 bg-white-200 rounded-lg focus:outline-none mb-2 border"
                        name="password"
                        id="password"
                        placeholder="Modifier mon mot de passe"
                        // readOnly={isEditing !== "password"}
                        // style={{ cursor: isEditing === "password" ? "text" : "default" }}
                        // style={{
                        //   cursor: "default",
                        //   marginRight: "10px",
                        // }}
                      />
                      {/* <button
                       onClick={() => {
                        if (isEditing === "password") {
                          UpdateProfileData(formData);
                          setIsEditing("password");
                          setShowInputs("password");
                        } else {
                          // Sinon, changer le mode d'édition
                          setIsEditing("password");
                          setShowInputs("password");
                        }
                      }}
                      className={`${
                        isEditing == "password"
                          ? "bg-tertiary_color"
                          : "bg-gray-400"
                      } rounded-lg text-white font-semibold font-sans px-4 py-2 mb-2`}
                    >
                      {" "}
                      {isEditing === "password" ? "Valider" : "Modifier"}
                    </button> */}
                    </div>
                  </div>
                  {showInputs == "password" && (
                    <div className="flex flex-col">
                      <div
                        className="flex items-center"
                        // style={{ marginLeft: "6px" }}
                      >
                        <input
                          type="password"
                          placeholder="Nouveau mot de passe"
                          className="bg-white-200 w-full p-1 rounded-lg focus:outline-none mr-2 border border-gray-300"
                          // style={{ width: "250px" }}
                          minLength={12}
                          onChange={(event) => {
                            updateFormData({
                              password: event.target.placeholder,
                            });
                          }}
                        />
                        <button
                          onClick={() => {
                            setIsEditing(null);
                            setShowInputs("");
                          }}
                        >
                          <RxCross1
                            size={24}
                            className="cursor-pointer"
                            style={{ color: "black" }}
                          />
                        </button>
                      </div>
                      <input
                        type="password"
                        placeholder="Confirmer le mot de passe"
                        className="flex-grow bg-white-200 px-4 py-1 rounded-lg focus:outline-none mb-9 border border-gray-300"
                        minLength={12}
                        style={{ width: "250px", marginLeft: "6px" }}
                        // placeholder={confirmPassword}
                        // onChange={(e) => setConfirmPassword(e.target.placeholder)}
                      />
                    </div>
                  )}
                  <button className="bg-tertiary_color p-2 rounded-lg text-white w-36 self-center mt-4">
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
