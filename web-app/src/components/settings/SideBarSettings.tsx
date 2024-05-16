import { useState } from "react";
import { FaRegStar } from "react-icons/fa";
import { BsPersonCircle } from "react-icons/bs";
import Image from "next/image";
import { IoSettingsOutline } from "react-icons/io5";
import { IoMdLogOut } from "react-icons/io";
import logo from "../../../public/images/logo.png";

type ClickedItemSideBarType = string;

interface SideBarSettingsProps {
 setActiveItemSideBarSettings: React.Dispatch<React.SetStateAction<ClickedItemSideBarType>>;
 firstnameProfile : string
}

// export default function SideBarSettings({setClickedItemSideBarSettings} : {setClickedItemSideBarSettings : }) {
  const SideBarSettings: React.FC<SideBarSettingsProps> = ({
   setActiveItemSideBarSettings, firstnameProfile
  }) => {
  
  return (
    <div className="flex">
      <div
        className="flex items-center justify-between w-screen p-2 bg-white
       shadow-lg shadow-gray-300"
      >
        <button className="ml-3 mb-1 mt-1">
          <a className="" href="/home">
            <Image
              src={logo as unknown as string}
              alt="Eco City Guide logo"
              className=" w-auto h-12"
            />
          </a> 
        </button>
        <h1 className="text-center font-medium text-xl text-warmGray-700">Bienvenue sur votre compte {firstnameProfile}</h1>
        <div className="flex space-x-10 mr-6">
        <button
         onClick={()=>setActiveItemSideBarSettings("Profil")}
          className="flex flex-col items-center text-gray-500 focus:outline-nones transition-colors duration-200 hover:text-green-500"
        >
          <BsPersonCircle  className="w-8 h-8" />
          {/* profil */}
        </button>
        <button
         onClick={()=>setActiveItemSideBarSettings("Favoris")}
          className="flex flex-col items-center text-gray-500 focus:outline-nones transition-colors duration-200 hover:text-green-500"
        >
          <FaRegStar className="w-8 h-8" />
          {/* favoris */}
        </button>
        <button
         onClick={()=>setActiveItemSideBarSettings("Settings")}
          className="flex flex-col items-center text-gray-500 focus:outline-nones transition-colors duration-200 hover:text-green-500"
        >
          <IoSettingsOutline className="w-8 h-8"/>
          {/* paramètres  */}
        </button>
        <button
         onClick={()=>setActiveItemSideBarSettings("Logout")}
          className="flex flex-col items-center text-gray-500 focus:outline-nones transition-colors duration-200 hover:text-green-500"
        >
          <IoMdLogOut className="w-8 h-8"/>
          {/* déconnexion  */}
        </button>
        </div>
       
      </div>
    </div>
  );
}

export default SideBarSettings;