import React from "react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import {
  GetMyProfileSignInQuery,
  SignUpMutation,
  SignUpMutationVariables,
} from "@/gql/graphql";
import { gql, useMutation, useQuery } from "@apollo/client";
import logo from "../../../../public/images/logo.png";
import Image from "next/image";

const SIGN_UP_FORM = gql`
  mutation SignUp(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    signUp(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      id
      firstName
      lastName
      email
    }
  }
`;

const GET_MY_PROFILE_SIGN_IN = gql`
  query GetMyProfileSignIn {
    myProfile {
      id
      email
      firstName
      lastName
    }
  }
`;

export default function index() {
  const router = useRouter();

  const { data: myProfileData } = useQuery<GetMyProfileSignInQuery>(
    GET_MY_PROFILE_SIGN_IN,
  );
  useEffect(() => {
    if (myProfileData?.myProfile) {
      router.push("/home");
    }
  }, [myProfileData]);

  const [formData, setFormData] = useState<SignUpMutationVariables>({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
  });

  const updateFormData = (
    partialFormData: Partial<SignUpMutationVariables>,
  ) => {
    setFormData({ ...formData, ...partialFormData });
  };

  const [signUpMutation, { loading, error }] = useMutation<
    SignUpMutation,
    SignUpMutationVariables
  >(SIGN_UP_FORM);

  const signUp = async () => {
    const { data } = await signUpMutation({
      variables: formData,
    });

    if (data && data.signUp) {
      router.push("/login/sign-in");
    }
  };

  return (
    <div className="h-screen bg-primary_color flex justify-center items-center">
      <div className="flex flex-col items-center">
        <Image src={logo} alt="logo eco-city-guide" />
        <div>
          <form
            className="bg-white p-10 rounded-lg shadow-lg shadow-gray-300 min-w-full"
            onSubmit={(event) => {
              event.preventDefault();
              signUp();
            }}
          >
            <h1 className="text-center text-2xl mb-4 text-gray-600 font-bold font-sans">
              Créer un compte
            </h1>
            <div>
              <input
                className="w-full bg-white-200 px-4 py-2 rounded-lg focus:outline-none mb-2 border border-border_color"
                type="text"
                name="firstname"
                id="firstname"
                placeholder="Prénom"
                onChange={(event) => {
                  updateFormData({ firstName: event.target.value });
                }}
              />
            </div>
            <div>
              <input
                className="w-full bg-white-200 px-4 py-2 rounded-lg focus:outline-none mb-2 border border-border_color"
                type="text"
                name="lastname"
                id="lastname"
                placeholder="Nom de famille"
                onChange={(event) => {
                  updateFormData({ lastName: event.target.value });
                }}
              />
            </div>
            <div>
              <input
                className="w-full bg-white-200 px-4 py-2 rounded-lg focus:outline-none mb-2 border border-border_color"
                type="text"
                name="email"
                id="email"
                placeholder="@email"
                onChange={(event) => {
                  updateFormData({ email: event.target.value });
                }}
              />
            </div>
            <div>
              <input
                className="w-full bg-white-200 px-4 py-2 rounded-lg focus:outline-none mb-2 border border-border_color"
                type="password"
                name="password"
                id="password"
                placeholder="Mot de passe"
                minLength={12}
                onChange={(event) => {
                  updateFormData({ password: event.target.value });
                }}
              />
            </div>
            <div>
              <input
                className="w-full bg-white-200 px-4 py-2 rounded-lg focus:outline-none mb-4 border border-border_color"
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
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  aria-describedby="terms"
                  type="checkbox"
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                  required
                />
              </div>
              <div className="ml-3 text-sm">
                <label
                  htmlFor="terms"
                  className="font-light text-gray-500 dark:text-gray-300"
                >
                  J'accepte les{" "}
                  <a
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    href="#"
                  >
                    conditions générales
                  </a>
                  .
                </label>
              </div>
            </div>
            <button
              type="submit"
              className="w-full mt-4 bg-tertiary_color rounded-lg px-4 py-2 text-lg text-white tracking-wide font-semibold font-sans"
            >
              S'inscrire
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
