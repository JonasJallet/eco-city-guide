import React, { useEffect, useState } from "react";
import {
  GetMyProfileQuery,
  MutationUpdateUserArgs,
  UpdateUserMutationVariables,
} from "@/gql/graphql";
import { gql, useQuery, useMutation } from "@apollo/client";
import { RxCross1 } from "react-icons/rx";
import Image from "next/image";
import logo from "../../../public/images/logo.png";

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
  const [activeTab, setActiveTab] = useState("Profil> Informations personnelles"); 
  const [showDropDown, setShowDropDown] = useState(false);
  const [toggleDropDown, setToggleDropDown] = useState<boolean>(false);
  const { data, loading } = useQuery<GetMyProfileQuery>(GET_MY_PROFILE);

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


  const UpdateProfileData = async (updatedData : UpdateUserMutationVariables) => {
    try {
      const { data } = await UpdateUserMutation({
        variables: formData,
     });
    } catch (error) {}
  };

  return (
    <div>
      <nav className="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <button
            data-collapse-toggle="navbar-dropdown"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-dropdown"
            aria-expanded="false"
            onClick={() => setToggleDropDown(!toggleDropDown)}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div
            className={`${
              toggleDropDown ? "block" : "hidden"
            } w-full md:block md:w-auto`}
            id="navbar-dropdown"
          >
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <button
                  id="dropdownNavbarLink"
                  data-dropdown-toggle="dropdownNavbar"
                  className="flex items-center justify-between w-full py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
                  onClick={() => setShowDropDown(!showDropDown)}
                >
                  Profil{" "}
                  <svg
                    className="w-2.5 h-2.5 ms-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>
                <div
                  id="dropdownNavbar"
                  className={`z-10 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 absolute ${
                    showDropDown ? "" : "hidden"
                  }`}
                >
                  <ul
                    className="py-2 text-sm text-gray-700 dark:text-gray-400"
                    aria-labelledby="dropdownLargeButton"
                  >
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        onClick={() => {
                          setActiveTab("Profil> Informations personnelles");
                          setShowDropDown(!showDropDown);
                        }}
                      >
                        Informations personnelles
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        onClick={() => {
                          setActiveTab("Profil> Données et confidentialité");
                          setShowDropDown(!showDropDown);
                        }}
                      >
                        Données et confidentialités
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        onClick={() => {
                          setActiveTab("Profil> Supprimer mon compte");
                          setShowDropDown(!showDropDown);
                        }}
                      >
                        Supprimer mon compte
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  onClick={() => {
                    setActiveTab("Favoris");
                    setShowDropDown(false);
                  }}
                >
                  Favoris
                </a>
              </li>
            </ul>
          </div>
          <a className="absolute right-4 top-4 " href="/home">
            <Image
              src={logo as unknown as string}
              alt="Eco City Guide logo"
              sizes="20"
            />
          </a>
        </div>
      </nav>
      <div className="bg-primary_color h-full">
        <p className="font-light text-xs ml-2 mt-8 mb-5 sm:ml-16 ">
          {activeTab}
        </p>

        {activeTab == "Profil> Informations personnelles" && (
          <div className="flex justify-center items-center flex-col mt-6">
            <div >
              <form
                className="bg-form_color p-10 rounded-lg shadow-lg shadow-gray-300 min-w-full"
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
                  <label className="text-gray-600 text-sm">
                    Nom
                  </label>
                  <div className="flex">
                    {" "}
                    <input
                      className="w-full bg-white-200 px-4 py-2 rounded-lg focus:outline-none mb-2 border"
                      name="lastname"
                      id="lastname"
                     value={data ? data.myProfile?.lastName : ""}
                      readOnly={isEditing !== "lastname"}
                      style={{
                        cursor: isEditing === "lastname" ? "text" : "default",
                        marginRight: "10px",
                      }}
                    />
                    <button
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
                          ? "bg-red-600"
                          : "bg-button_bg_color"
                      } rounded-lg text-white font-semibold font-sans px-4 py-2 mb-2`}
                    >
                      {isEditing === "lastname" ? "Valider" : "Modifier"}
                    </button>
                  </div>
                </div>
                {showInputs == "lastname" && (
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
                        updateFormData({ lastName: event.target.value });
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
                )}
                <div>
                  <label className="text-gray-600 text-sm">
                    Prénom
                  </label>
                  <div className="flex">
                    {" "}
                    <input
                      className="w-full bg-white-200 px-4 py-2 rounded-lg focus:outline-none mb-2 border "
                      type="text"
                      name="firstname"
                      id="firstname"
                      value={data ? data.myProfile?.firstName : ""}
                      readOnly={isEditing !== "firstname"}
                      style={{
                        cursor: isEditing === "firstname" ? "text" : "default",
                        marginRight: "10px",
                      }}
                    />
                    <button
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
                          ? "bg-red-600"
                          : "bg-button_bg_color"
                      } rounded-lg text-white font-semibold font-sans px-4 py-2  mb-2`}
                    >
                      {isEditing === "firstname" ? "Valider" : "Modifier"}
                    </button>
                  </div>
                </div>
                {showInputs == "firstname" && (
                  <div
                    className="flex items-center"
                    style={{ marginLeft: "6px" }}
                  >
                    <input
                      type="text"
                      placeholder="Nouveau prénom"
                      className="bg-white-200 px-4 py-1 rounded-lg focus:outline-none mr-2 border border-gray-300"
                      style={{ width: "250px" }}
                      onChange={(event) => {
                         updateFormData({ firstName: event.target.value });
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
                )}
                <div>
                  <label className="text-gray-600 text-sm">
                    Email
                  </label>
                  <div className="flex">
                    {" "}
                    <input
                      className="w-full bg-white-200 px-4 py-2 rounded-lg focus:outline-none mb-2 border "
                      type="text"
                      name="email"
                      id="email"
                      defaultValue={data ? data.myProfile?.email : ""}
                      readOnly={isEditing !== "email"}
                      style={{
                        cursor: isEditing === "email" ? "text" : "default",
                        marginRight: "10px",
                      }}
                    
                    />
                    <button
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
                          ? "bg-red-600"
                          : "bg-button_bg_color"
                      } rounded-lg text-white font-semibold font-sans px-4 py-2  mb-2`}
                    >
                      {isEditing === "email" ? "Valider" : "Modifier"}
                    </button>
                  </div>
                </div>
                {showInputs == "email" && (
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
                         updateFormData({ email: event.target.value });
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
                )}
                <div>
                  <label className="text-gray-600 text-sm">
                    Mot de passe
                  </label>
                  <div className="flex">
                    {" "}
                    <input
                      className="w-full bg-white-200 px-4 py-2 rounded-lg focus:outline-none mb-2 border "
                      name="password"
                      id="password"
                      placeholder="Modifier mon mot de passe"
                      readOnly={isEditing !== "password"}
                      // style={{ cursor: isEditing === "password" ? "text" : "default" }}
                      style={{
                        cursor: "default",
                        marginRight: "10px",
                      }}
                      
                    />
                    <button
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
                          ? "bg-red-600"
                          : "bg-button_bg_color"
                      } rounded-lg text-white font-semibold font-sans px-4 py-2 mb-2`}
                    >
                      {" "}
                      {isEditing === "password" ? "Valider" : "Modifier"}
                    </button>
                  </div>
                </div>
                {showInputs == "password" && (
                  <div className="flex flex-col">
                    <div
                      className="flex items-center"
                      style={{ marginLeft: "6px" }}
                    >
                      <input
                        type="password"
                        placeholder="Nouveau mot de passe"
                        className="bg-white-200 px-4 py-1 rounded-lg focus:outline-none mr-2 border border-gray-300"
                        style={{ width: "250px" }}
                        minLength={12}
                        onChange={(event) => {
                           updateFormData({ password: event.target.value });
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
                      // value={confirmPassword}
                      // onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                )}
              </form>
            </div>
          </div>
        )}
        {activeTab == "Profil> Données et confidentialité" && (
          <div
            className="mb-10 text-center"
            style={{ maxWidth: "30rem", margin: "0 auto" }}
          >
            <h1 className="font-medium text-xl text-gray-600 mt-14 mb-7">
              Données et confidentialité
            </h1>
            <p className="font-medium mb-4">
              EcoCityGuide s'engage pour le respect de vos données.
            </p>{" "}
            <p className="mb-4">
              {" "}
              Vos données personnelles sont confidentielles et ne sont jamais
              partagées avec des tiers privés ou partenaires professionnels.
            </p>
            <p className="mb-4">
              {" "}
              Vos données d'utilisation de l'application ne sont jamais
              partagées ni à des tiers privés ni à des professionnels. Ces
              données sont seulement utilisés à des fins statitiques pour le
              propriétaire de l'application.
            </p>
          </div>
        )}
        {activeTab == "Profil> Supprimer mon compte" && (
          <div
            className="mb-10 text-center"
            style={{ maxWidth: "30rem", margin: "0 auto" }}
          >
            <h1 className="font-medium text-xl text-gray-600 mt-14 mb-7">
              Supprimer mon compte
            </h1>

            <p className="font-medium mb-4">
              Attention, la suppression de votre compte est définitive.
            </p>
            <p className="mb-4">
              Toutes les données personnelles et relatives à la gestion de votre
              application seront définitivement supprimées.
            </p>
            <button className=" bg-red-600 text-white py-2 rounded-lg px-2">
              {" "}
              Supprimer
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
