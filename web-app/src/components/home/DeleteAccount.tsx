import {
  GetMyProfileSignInQuery
} from "@/gql/graphql";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";

export const DELETE_USER = gql`
  mutation DeleteUser($deleteUserId: ID!) {
    deleteUser(id: $deleteUserId) {
      id
    }
  }
`;

export default function DeleteAccount() {
  const router = useRouter();

//   const { myProfile: myProfileData, refetch } = useQuery<GetMyProfileSignInQuery>(
//     GET_MY_PROFILE_SIGN_IN,
//   );

  const [deleteUserMutation, { error }] = useMutation(DELETE_USER);

  //   console.log("this is my profile", myProfileData?.myProfile.id);
  const deleteUser = async () => {
    try {
      const { data } = await deleteUserMutation({
        variables: myProfile.id,
      });
      if (data && data.deleteUser) {
        console.log("je passe ici");
        router.push("/home");
      }
    } catch (error) {}
  };

  return (
    <>
      <p
        className="p-2 hover:text-tertiary_color"
        onClick={() => {
          deleteUser();
        }}
      >
        Supprimer son compte
      </p>
    </>
  );
}
