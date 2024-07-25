import React from "react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import {
  GetProfileQuery,
  SignUpMutation,
  SignUpMutationVariables,
} from "@/gql/generate/graphql";
import { useMutation, useQuery } from "@apollo/client";
import logo from "../../../../public/images/logo.png";
import Image from "next/image";
import { toast } from "react-toastify";
import { GET_PROFILE } from "@/gql/requests/queries";
import { SIGN_UP } from "@/gql/requests/mutations";

export default function index() {
  const router = useRouter();
  const { data: myProfileData } = useQuery<GetProfileQuery>(GET_PROFILE);
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
    role: "user",
  });

  const updateFormData = (
    partialFormData: Partial<SignUpMutationVariables>,
  ) => {
    setFormData({ ...formData, ...partialFormData });
  };

  const [signUpMutation, { error }] = useMutation<
    SignUpMutation,
    SignUpMutationVariables
  >(SIGN_UP);

  const signUp = async () => {
    try {
      const { data } = await signUpMutation({
        variables: formData,
      });

      if (data && data.signUp) {
      toast.success("Votre compte a bien été créé !");
        router.push("/login/sign-in");
      }
    } catch (error) {}
  };

  return (
    <div className="h-screen bg-primary_color flex justify-center items-center">
      <div className="m-28 flex flex-col items-center">
        <Image src={logo} alt="logo eco-city-guide" />
        <div>
          <form
            className="bg-white mt-10 p-10 rounded-lg shadow-lg shadow-gray-300"
            onSubmit={(event) => {
              event.preventDefault();
              signUp();
            }}
          >
            <h1 className="text-center text-2xl mb-4 text-dark_text_color font-bold font-sans">
              Créer un compte
            </h1>
            <div>
              <input
                className="w-full bg-white-200 px-4 py-2 rounded-3xl transition-all duration-300 outline-none  hover:border-white hover:bg-input_hover_bg focus:outline-none mb-2 border border-tertiary_color"
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
                className="w-full bg-white-200 px-4 py-2 rounded-3xl transition-all duration-300 outline-none  hover:border-white hover:bg-input_hover_bg focus:outline-none mb-2 border border-tertiary_color"
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
                className="w-full bg-white-200 px-4 py-2 rounded-3xl transition-all duration-300 outline-none  hover:border-white hover:bg-input_hover_bg focus:outline-none mb-2 border border-tertiary_color"
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
                className="w-full bg-white-200 px-4 py-2 rounded-3xl transition-all duration-300 outline-none  hover:border-white hover:bg-input_hover_bg focus:outline-none mb-2 border border-tertiary_color"
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
                className="w-full bg-white-200 px-4 py-2 rounded-3xl transition-all duration-300 outline-none  hover:border-white hover:bg-input_hover_bg focus:outline-none mb-4 border border-tertiary_color"
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
            <div className="flex items-start px-3">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  aria-describedby="terms"
                  type="checkbox"
                  className="w-4 h-4 cursor-pointer border border-gray-300 rounded bg-gray-50"
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
            {error && (
              <div className="w-64 mt-4 text-md text-red-600 text-center">
                {error.message}
              </div>
            )}
            <button
              type="submit"
              className="w-full mt-4 border bg-tertiary_color rounded-3xl px-4 py-2 text-lg text-white tracking-wide font-semibold font-sans transition-all duration-300 hover:bg-white hover:text-tertiary_color hover:border hover:border-tertiary_color"
            >
              S'inscrire
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
