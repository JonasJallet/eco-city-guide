import { SignInFormMutationVariables } from "@/gql/graphql";
import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SIGN_IN } from "@/gql/mutations";
import { GET_PROFILE } from "@/gql/requests/queries";
import logo from "../../../../public/images/logo.png";
import Image from "next/image";

export default function SignInPage() {
  const router = useRouter();

  const { data: myProfileData, refetch } = useQuery(GET_PROFILE);

  useEffect(() => {
    if (myProfileData?.myProfile) {
      router.push("/home");
    }
  }, [myProfileData]);

  const [formData, setFormData] = useState<SignInFormMutationVariables>({
    email: "",
    password: "",
  });

  const updateFormData = (
    partialFormData: Partial<SignInFormMutationVariables>,
  ) => {
    setFormData({ ...formData, ...partialFormData });
  };

  const [signInMutation, { error }] = useMutation(SIGN_IN);

  const signIn = async () => {
    try {
      const { data } = await signInMutation({
        variables: formData,
      });
      if (data && data.signIn) {
        refetch();
        router.push("/home");
      }
    } catch (error) {}
  };

  return (
    <div className="h-screen bg-primary_color flex justify-center items-center">
      <div className="flex flex-col items-center">
        <Image src={logo} alt="logo eco-city-guide" />
        <div>
          <form
            className="bg-form_color mt-10 p-10 rounded-lg shadow-lg shadow-gray-300 min-w-full"
            onSubmit={(event) => {
              event.preventDefault();
              signIn();
            }}
            aria-label="form"
          >
            <h1 className="text-center text-2xl mb-4 text-dark_text_color font-bold font-sans">
              Se connecter
            </h1>
            <div>
              <input
                className="w-full bg-white-200 px-4 py-2 rounded-3xl transition-all duration-300 outline-none  focus:outline-none mb-2 border border-tertiary_color hover:border-white hover:bg-input_hover_bg"
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
                className="w-full bg-white-200 px-4 py-2 rounded-3xl transition-all duration-300 outline-none  focus:outline-none mb-2 border border-tertiary_color hover:border-white hover:bg-input_hover_bg"
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
            {error && (
              <div className="w-full mt-4 text-md text-red-600">
                {error.message}
              </div>
            )}
            <button
              type="submit"
              className="w-full mt-4 border bg-tertiary_color rounded-3xl px-4 py-2 text-lg text-white tracking-wide font-semibold font-sans transition-all duration-300 hover:bg-white hover:text-tertiary_color hover:border hover:border-tertiary_color"
            >
              Se connecter
            </button>
            <div className="px-4 py-2 mt-2 text-center">
              <p>
                Première visite ? <br /> Vous pouvez créer un compte{" "}
                <a
                  className="underline hover:text-tertiary_color"
                  href="sign-up"
                >
                  ici
                </a>
                .
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
