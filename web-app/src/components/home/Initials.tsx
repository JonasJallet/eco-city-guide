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
          className="w-12 h-12 mt-4 ml-4 mr-4 bg-button_bg_color rounded-full px-1 py-1 text-xl text-black tracking-wide font-semibold font-sans"
        >
          {data.myProfile.initials}
          {isModalOpen && (
            <UserModal onClose={toggleModal}>
              {/* <div className="fixed top-20 right-4 bg-button_bg_color rounded-lg"> */}
              <div className="fixed grid grid-cols-2 gap-4 w-60 h-40 text-sm border-2 border-black top-20 right-4 bg-button_bg_color rounded-lg">
                <h2 className="text-xl col-span-2">
                  Bienvenue {data.myProfile.firstName}
                </h2>
                <Image
                  className="flex justify-center w-16 h-16 col-span-2"
                  src={user}
                  alt="logo user-icon"
                />
                <a href="/my-profile">Mon compte</a>
                <p>Se déconnecter</p>
              </div>
            </UserModal>
          )}
        </button>
      ) : (
        <button className="h-16 mt-4 ml-4 mr-4 bg-secondary_color rounded-full px-1 py-1 text-3xl button_text_color tracking-wide font-semibold font-sans">
          <a href="/login/sign-in">{"Me connecter"}</a>
        </button>
      )}
      {/* <Container> */}
      {/* <button onClick={toggleModal}>Afficher la modale</button>
      {isModalOpen && (
        <Modal onClose={toggleModal}>
          <h1>Bienvenue {data.myProfile.firstName}</h1>
          <h1>Bienvenue {data.myProfile.lastName}</h1>
        </Modal>
      )} */}
      {/* </Container> */}
    </>
  );
}
