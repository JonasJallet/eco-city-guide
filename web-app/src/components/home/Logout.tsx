import { SignOutMutation, SignOutMutationVariables } from "@/gql/graphql";
import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { SIGN_OUT } from "@/gql/queries";
import { REACT_LOADABLE_MANIFEST } from "next/dist/shared/lib/constants";

export default function Logout() {
  const router = useRouter();

  const [signOutMutation, { error }] = useMutation<
    SignOutMutation,
    SignOutMutationVariables
  >(SIGN_OUT);

  const signOut = async () => {
    try {
      const { data } = await signOutMutation();
      if (data && data.signOut) {
        router.push("/home");
      }
    } catch (error) {}
  };

  return (
    <>
      <p
        className="p-2 hover:text-tertiary_color"
        onClick={() => {
          signOut();
          location.reload();
        }}
      >
        Quitter
      </p>
    </>
  );
}
