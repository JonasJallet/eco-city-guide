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
      userInitials
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
          className="p-3 mt-2 ml-4 mr-40 bg-tertiary_color rounded-full text-fontSizeModale shadow-lg shadow-secondary_color text-primary_color tracking-wide font-semibold font-sans"
        >
          {data.myProfile.userInitials}
          {isModalOpen && (
            <UserModal onClose={toggleModal}>
              <div className="fixed block px-4 py-2 bg-primary_color border-2 text-fontSizeModale border-secondary_color top-20 right-40  border-opacity-30 rounded-lg text-center text-secondary_color">
                <p className="p-2 hover:text-tertiary_color">
                  <a href="/settings">Mon compte</a>
                </p>
                <p className="p-2 hover:text-tertiary_color">Se déconnecter</p>
              </div>
            </UserModal>
          )}
        </button>
      ) : (
        <button className="px-4 py-2 mt-2 ml-4 mr-40 bg-primary_color border-2 text-fontSizeModale border-secondary_color top-20 right-40 rounded-full tracking-wide font-semibold font-sans text-secondary_color hover:text-tertiary_color">
          <p>
            <a href="/login/sign-in">Se connecter</a>
          </p>
        </button>
      )}
    </>
  );
}
