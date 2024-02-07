import React from "react";
import { useRouter } from "next/router";
import { useState } from "react";
import { gql, useMutation } from "@apollo/client";

// const SIGN_UP_FORM = gql`
//   mutation SignUp(
//     $firstName: String!
//     $lastName: String!
//     $email: String!
//     $password: String!
//     $role: String!
//   ) {
//     signUp(
//       firstName: $firstName
//       lastName: $lastName
//       email: $email
//       password: $password
//       role: $role
//     ) {
//       firstName
//       lastName
//       email
//       role
//       hashedPassword
//     }
//   }
// `;

export default function index() {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
  });
  const router = useRouter();

  const updateFormData = (partialFormData: any) => {
    setFormData({ ...formData, ...partialFormData });
  };

  console.log(formData);
  // const [signUpMutation, { loading, error }] = useMutation<
  //   SignUpFormMutation,
  //   SignUpFormMutationVariables
  // >(SIGN_UP_FORM);

  // const signUp = async () => {
  //   console.log("formulaire envoyé");
  //   const { data } = await signUpMutation({
  //     variables: formData,
  //   });

  // if (data && data.signUp) {
  //   router.push("/sign-in");
  // }
  //};

  return (
    <div className="h-screen bg-tahiti flex justify-center items-center">
      <div className="lg:w-2/5 md:w-1/2 w-2/3">
        <form className="bg-white p-10 rounded-lg shadow-lg min-w-full">
          <h1 className="text-center text-2xl mb-4 text-gray-600 font-bold font-sans">
            Créer un compte
          </h1>
          <div>
            <input
              className="w-full bg-silver px-4 py-2 rounded-lg focus:outline-none mb-2"
              type="text"
              name="firstname"
              id="firstname"
              placeholder="Prénom"
              // onChange={(event) => {
              //   updateFormData({ firstName: event.target.value });
              // }}
            />
          </div>
          <div>
            <input
              className="w-full bg-silver px-4 py-2 rounded-lg focus:outline-none mb-2"
              type="text"
              name="lastname"
              id="lastname"
              placeholder="Nom de famille"
              // onChange={(event) => {
              //   updateFormData({ lastName: event.target.value });
              // }}
            />
          </div>
          <div>
            <input
              className="w-full bg-silver px-4 py-2 rounded-lg focus:outline-none mb-2"
              type="text"
              name="email"
              id="email"
              placeholder="@email"
              // onChange={(event) => {
              //   updateFormData({ email: event.target.value });
              // }}
            />
          </div>
          <div>
            <input
              className="w-full bg-silver px-4 py-2 rounded-lg focus:outline-none mb-2"
              type="text"
              name="password"
              id="password"
              placeholder="Mot de passe"
              // onChange={(event) => {
              //   updateFormData({ password: event.target.value });
              // }}
            />
          </div>
          <div>
            <input
              className="w-full bg-silver px-4 py-2 rounded-lg focus:outline-none mb-4"
              type="text"
              name="confirm"
              id="confirm"
              placeholder="Confirmer le mot de passe"
              // onChange={(event) => {
              //   updateFormData({ confirmPassword: event.target.value });
              // }}
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
            className="w-full mt-4 bg-tahiti rounded-lg px-4 py-2 text-lg text-white tracking-wide font-semibold font-sans"
            // onSubmit={() => signUp()}
          >
            S'inscrire
          </button>
        </form>
      </div>
    </div>
  );
}
