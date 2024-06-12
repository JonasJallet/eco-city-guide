import { FaRegStar } from "react-icons/fa";
import Image from "next/image";
import { IoSettingsOutline } from "react-icons/io5";
import { IoMdLogOut } from "react-icons/io";
import earthLogo from "../../../public/images/earth-logo.png";
import { IoMapOutline } from "react-icons/io5";
import { useState } from "react";
import { useRouter } from "next/router";
import { HiOutlineUser } from "react-icons/hi2";

type ClickedItemSideBarType = string;

interface SideBarSettingsProps {
  setActiveItemSideBarSettings: React.Dispatch<
    React.SetStateAction<ClickedItemSideBarType>
  >;
  firstnameProfile: string;
}

const SideBarSettings: React.FC<SideBarSettingsProps> = ({
  setActiveItemSideBarSettings,
  firstnameProfile,
  //logout
}) => {
  //--

  const router = useRouter();

  return (
    <div
      className="fixed top-0 flex items-center justify-between w-screen p-2 bg-white
         shadow-lg shadow-gray-300"
    >
      <button className="flex ml-3 mb-1 mt-1">
        <a className="" href="/home">
          <Image
            src={earthLogo as unknown as string}
            alt="Eco City Guide logo"
            className=" w-auto h-10"
          />
        </a>
        <h1 className="ml-5 mt-2 text-center font-medium text-xl text-warmGray-700">
          Bienvenue {firstnameProfile}
        </h1>
      </button>
      <div className="mt-1 mr-3 grid grid-cols-5 gap-7">
        <button
          onClick={() => setActiveItemSideBarSettings("Profil")}
          className="flex flex-col items-center text-gray-500 text-sm focus:outline-nones transition-colors duration-300 hover:text-tertiary_color"
        >
          <HiOutlineUser size={23} />
          profil
        </button>
        <button
          onClick={() => {
            setActiveItemSideBarSettings("Profil");
            router.push("/home");
          }}
          className="flex flex-col items-center text-gray-500 text-sm focus:outline-nones transition-colors duration-300 hover:text-tertiary_color"
        >
          <IoMapOutline size={23} />
          carte
        </button>
        <button
          onClick={() => setActiveItemSideBarSettings("Favoris")}
          className="flex flex-col items-center text-gray-500 text-sm focus:outline-nones transition-colors duration-300 hover:text-tertiary_color"
        >
          <FaRegStar size={23} />
          favoris
        </button>
        <button
          onClick={() => setActiveItemSideBarSettings("Settings")}
          className="flex flex-col items-center text-gray-500 text-sm focus:outline-nones transition-colors duration-300 hover:text-tertiary_color"
        >
          <IoSettingsOutline size={23} />
          réglages
        </button>
        <button
          onClick={() => setActiveItemSideBarSettings("Logout")}
          className="flex flex-col items-center text-gray-500 text-sm focus:outline-nones transition-colors duration-300 hover:text-tertiary_color"
        >
          <IoMdLogOut size={23} />
          quitter
        </button>
      </div>
    </div>
  );
};

export default SideBarSettings;
