import {
  GetMyProfileSignInQuery,
  SignInFormMutation,
  SignInFormMutationVariables,
} from "@/gql/graphql";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const SIGN_IN_FORM = gql`
  mutation SignInForm($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      id
      email
      firstName
      lastName
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

export default function SignInPage() {
  const router = useRouter();

  const { data: myProfileData, refetch } = useQuery<GetMyProfileSignInQuery>(
    GET_MY_PROFILE_SIGN_IN
  );
  useEffect(() => {
    if (myProfileData?.myProfile) {
      router.push("/my-profile");
    }
  }, [myProfileData]);

  const [formData, setFormData] = useState<SignInFormMutationVariables>({
    email: "",
    password: "",
  });

  const updateFormData = (
    partialFormData: Partial<SignInFormMutationVariables>
  ) => {
    setFormData({ ...formData, ...partialFormData });
  };

  const [signInMutation] = useMutation<
    SignInFormMutation,
    SignInFormMutationVariables
  >(SIGN_IN_FORM);

  const signIn = async () => {
    const { data } = await signInMutation({
      variables: formData,
    });

    if (data && data.signIn) {
      refetch();
      router.push("/home");
    }
  };

  return (
    <div className="h-screen bg-indigo-500 flex justify-center items-center">
      <div className="lg:w-2/5 md:w-1/2 w-2/3">
        <form
          className="bg-secondary_color p-10 rounded-lg shadow-lg min-w-full"
          onSubmit={(event) => {
            event.preventDefault();
            signIn();
          }}
        >
          <h1 className="text-center text-2xl mb-4 text-gray-600 font-bold font-sans">
            Se connecter
          </h1>
          <div>
            <input
              className="w-full bg-silver px-4 py-2 rounded-lg focus:outline-none mb-2"
              type="email"
              name="email"
              id="email"
              placeholder="@email"
              autoComplete="username"
              required
              onChange={(event) => {
                updateFormData({ email: event.target.value });
              }}
            />
          </div>
          <div>
            <input
              className="w-full bg-silver px-4 py-2 rounded-lg focus:outline-none mb-2"
              type="password"
              name="password"
              id="password"
              placeholder="Mot de passe"
              autoComplete="current-password"
              required
              onChange={(event) => {
                updateFormData({ password: event.target.value });
              }}
            />
          </div>
          <button
            type="submit"
            className="w-full mt-4 bg-tertiary_color rounded-lg px-4 py-2 text-lg text-white tracking-wide font-semibold font-sans"
          >
            Se connecter
          </button>
          <div className="px-4 py-2 focus:outline-none mb-2">
            <p>
              Première visite ? Vous pouvez créer un compte{" "}
              <a href="sign-up">ici</a>.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
