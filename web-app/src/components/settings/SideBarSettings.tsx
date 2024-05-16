import { useState } from "react";
import { FaRegStar } from "react-icons/fa";
import { BsPersonCircle } from "react-icons/bs";
import Image from "next/image";
import logo from "../../../public/images/earth-logo.png";
import { IoSettingsOutline } from "react-icons/io5";
import { IoMdLogOut } from "react-icons/io";


type ClickedItemSideBarType = string;

interface SideBarSettingsProps {
 setActiveItemSideBarSettings: React.Dispatch<React.SetStateAction<ClickedItemSideBarType>>;
 
}

// export default function SideBarSettings({setClickedItemSideBarSettings} : {setClickedItemSideBarSettings : }) {
  const SideBarSettings: React.FC<SideBarSettingsProps> = ({
   setActiveItemSideBarSettings,
  }) => {
  
  return (
    <div className="flex fixed top-0 right-0">
      <div
        className={`flex flex-col items-center w-28 h-screen py-6 space-y-8 bg-white 
       shadow-lg shadow-gray-300`}
      >
       
        <button
         onClick={()=>setActiveItemSideBarSettings("Profil")}
          className="flex flex-col items-center text-gray-500 focus:outline-nones transition-colors duration-200 hover:text-green-500"
        >
          <BsPersonCircle  className="w-6 h-6" />
          Profil
        </button>
        <button
         onClick={()=>setActiveItemSideBarSettings("Favoris")}
          className="flex flex-col items-center text-gray-500 focus:outline-nones transition-colors duration-200 hover:text-green-500"
        >
          <FaRegStar className="w-6 h-6" />
          Favoris
        </button>
        <button
         onClick={()=>setActiveItemSideBarSettings("Settings")}
          className="flex flex-col items-center text-gray-500 focus:outline-nones transition-colors duration-200 hover:text-green-500"
        >
          <IoSettingsOutline className="w-6 h-6"/>
          Paramètres 
        </button>
        <button
         onClick={()=>setActiveItemSideBarSettings("Logout")}
          className="flex flex-col items-center text-gray-500 focus:outline-nones transition-colors duration-200 hover:text-green-500"
        >
          <IoMdLogOut className="w-6 h-6"/>
          Déconnexion 
        </button>
      </div>
    </div>
  );
}

export default SideBarSettings;