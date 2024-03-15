import { gql, useQuery } from "@apollo/client";
import { GetMyProfileInitialsQuery } from "@/gql/graphql";
import { useState } from "react";
import { Modal } from "../modals/Modal.styled";
import UserModal from "../modals/UserModal";
import user from "../../../public/images/user.png";
import Image from "next/image";

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
    GET_MY_PROFILE_INITIALS
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
          className="w-12 h-12 mt-3 ml-4 mr-16 bg-button_bg_color rounded-full px-1 py-1 text-lg border-2 border-black text-black tracking-wide font-semibold font-sans"
        >
          {data.myProfile.initials}
          {isModalOpen && (
            <UserModal onClose={toggleModal}>
              <div className="fixed grid grid-cols-2 gap-4 w-70 h-40 text-md border-2 border-black top-20 right-3 bg-primary_color bg-opacity-90 rounded-lg">
                <h2 className="text-2xl col-span-2 flex justify-center items-center">
                  Bienvenue {data.myProfile.firstName}
                </h2>
                <a href="/my-profile">Mon compte</a>
                <p className="mr-4">Se déconnecter</p>
                <a className="text-xs" href="https://www.cnil.fr/fr" target="_blank">Confidentialité</a>
                <p className="text-xs mr-4">Conditions d'utilisation</p>
              </div>
            </UserModal>
          )}
        </button>
      ) : (
        <button className="h-12 mt-3 ml-4 mr-16 bg-secondary_color rounded-full px-3 text-lg border-2 border-black button_text_color tracking-wide font-semibold font-sans">
          <a href="/login/sign-in">{"Se connecter"}</a>
        </button>
      )}
    </>
  );
}
