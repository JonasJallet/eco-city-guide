import { gql, useQuery } from "@apollo/client";
import { GetMyProfileInitialsQuery } from "@/gql/graphql";
import user from "../../../public/images/user.png";
import Image from "next/image";

const GET_MY_PROFILE_INITIALS = gql`
  query GetMyProfileInitials {
    myProfile {
      id
      initials
    }
  }
`;

export default function Initials() {
  const { data, loading } = useQuery<GetMyProfileInitialsQuery>(
    GET_MY_PROFILE_INITIALS
  );

  console.log(GET_MY_PROFILE_INITIALS);
  return (
    <>
      {!loading && (
        <button className="h-16 mt-4 ml-4 mr-4 bg-button_bg_color rounded-full px-1 py-1 text-3xl text-black tracking-wide font-semibold font-sans">
          {data?.myProfile ? (
            data.myProfile.initials
          ) : (
            <a href="/login/sign-in">
              {data?.myProfile ? data.myProfile.initials : "Me connecter"}
              {/* <Image src={user} alt="user login icon" /> */}
            </a>
          )}
          {/* {data?.myProfile ? data.myProfile.initials : "Me connecter"} */}
        </button>
      )}
    </>
  );
}
