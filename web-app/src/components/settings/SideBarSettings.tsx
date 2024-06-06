import { FaRegStar } from "react-icons/fa";
import { BsPersonCircle } from "react-icons/bs";
import Image from "next/image";
import { IoSettingsOutline } from "react-icons/io5";
import { IoMdLogOut } from "react-icons/io";
import logo from "../../../public/images/logo.png";
import { IoMapOutline } from "react-icons/io5";

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
              className=" w-auto h-10"
            />
          </a>
        </button>
        {/* <h1 className="text-center font-medium text-xl text-warmGray-700">
          Bienvenue sur votre compte {firstnameProfile}
        </h1> */}
        <div className="flex space-x-8 mr-6">
          <button
            onClick={() => setActiveItemSideBarSettings("Profil")}
            className="flex flex-col items-center text-gray-500 focus:outline-none transition-colors duration-200 hover:text-green-500 text-fontSizeSettingsSideBar"
          >
            <BsPersonCircle size={23} />
            profil
          </button>
          <button
            onClick={() => setActiveItemSideBarSettings("Profil")}
            className="flex flex-col items-center text-gray-500 focus:outline-none transition-colors duration-200 hover:text-green-500 text-fontSizeSettingsSideBar"
          >
            <IoMapOutline size={23} />
            carte
          </button>
          <button
            onClick={() => setActiveItemSideBarSettings("Favoris")}
            className="flex flex-col items-center text-gray-500 focus:outline-none transition-colors duration-200 hover:text-green-500 text-fontSizeSettingsSideBar"
          >
            <FaRegStar size={23} />
            favoris
          </button>

          <button
            onClick={() => setActiveItemSideBarSettings("Settings")}
            className="flex flex-col items-center text-gray-500 focus:outline-none transition-colors duration-200 hover:text-green-500 text-fontSizeSettingsSideBar"
          >
            <IoSettingsOutline size={23} />
            paramètres
          </button>

          <button
            onClick={() => setActiveItemSideBarSettings("Logout")}
            className="flex flex-col items-center text-gray-500 focus:outline-none transition-colors duration-200 hover:text-green-500 text-fontSizeSettingsSideBar"
          >
            <IoMdLogOut size={23} />
            déconnexion
          </button>
        </div>
      </div>
    </div>
  );
};

export default SideBarSettings;
