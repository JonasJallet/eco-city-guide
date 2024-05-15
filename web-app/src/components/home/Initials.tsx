import { gql, useQuery } from "@apollo/client";
import { GetMyProfileInitialsQuery } from "@/gql/graphql";
import { useState } from "react";
import UserModal from "../modals/UserModal";

const GET_MY_PROFILE_INITIALS = gql`
  query GetMyProfileInitials {
    myProfile {
      id
      firstName
      lastName
      initials
    }
  }
`;

export default function Initials() {
  const { data, loading } = useQuery<GetMyProfileInitialsQuery>(
    GET_MY_PROFILE_INITIALS,
  );

  const [isModalOpen, setIsModalOpen] = useState(false);

  function toggleModal() {
    return setIsModalOpen(!isModalOpen);
  }

  return (
    <>
      {!loading && data?.myProfile ? (
        <button
          onClick={toggleModal}
          className="w-12 h-12 mt-8 ml-4 mr-24 bg-green-500 rounded-full px-1 py-1 text-lg shadow-lg shadow-gray-400 text-white tracking-wide font-semibold font-sans"
        >
          {data.myProfile.initials}
          {isModalOpen && (
            <UserModal onClose={toggleModal}>
              <div className="fixed block px-4 py-2 border-2 text-sm border-gray-500 top-24 right-24 bg-white bg-opacity-90 border-opacity-40 rounded-lg text-center text-gray-500">
                <p className="p-2 hover:text-green-500">
                  <a href="/settings">Mon compte</a>
                </p>
                <p className="p-2 hover:text-green-500">Se déconnecter</p>
              </div>
            </UserModal>
          )}
        </button>
      ) : (
        <button className="w-40 h-12 mt-8 ml-4 mr-24 bg-white bg-opacity-90 rounded-full px-3 text-lg border-2 border-gray-700 tracking-wide font-semibold font-sans text-gray-700 hover:text-green-500">
          <p>
            <a href="/login/sign-in">Se connecter</a>
          </p>
        </button>
      )}
    </>
  );
}
