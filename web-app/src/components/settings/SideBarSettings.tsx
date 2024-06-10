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
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className="flex items-center justify-between w-screen p-2 bg-white
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
      {/* <div className="flex space-x-8 mr-6"> */}
      <div className="mt-1 mr-3 grid grid-cols-5 gap-7">
        <button
          onClick={() => setActiveItemSideBarSettings("Profil")}
          className="flex flex-col items-center text-gray-500 text-sm focus:outline-nones transition-colors duration-300 hover:text-tertiary_color"
        >
          <HiOutlineUser size={23} />
          profil
        </button>
        <button
          onClick={() => setActiveItemSideBarSettings("Profil")}
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

    // <nav className="bg-green-700 shadow-lg border-gray-200  dark:bg-gray-900 relative">
    //   <div className="flex justify-between items-center  p-3 ">
    //     <a className="flex-none" href="/home">
    //       <Image
    //         src={earthLogo as unknown as string}
    //         alt="Eco City Guide logo"
    //         className=" w-auto h-10"
    //       />
    //     </a>
    //     <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse relative">
    //       <div className="flex flex-row ">
    //         <button
    //           type="button"
    //           className="flex flex-col mr-4 items-center text-white focus:outline-none transition-colors duration-200 hover:text-green-500 text-xs lg:ml-0 ml-4"
    //           id="map-button"
    //           onClick={() => router.push("/home")}
    //         >
    //           <IoMapOutline size={23} className="text-white" />
    //           Carte
    //         </button>
    //         <button
    //           type="button"
    //           className="flex flex-col items-center text-white focus:outline-none transition-colors duration-200 hover:text-green-500 text-xs"
    //           id="user-menu-button"
    //           aria-expanded={isOpen}
    //           onClick={() => setIsOpen(!isOpen)}
    //         >
    //           <BsPersonCircle size={23} className="text-white" />
    //           Compte
    //         </button>
    //       </div>
    //       <div
    //         className={`absolute right-0 top-full mt-2 mr-2  w-48 bg-white border border-gray-200 rounded-lg shadow-lg transition ${
    //           isOpen ? "block" : "hidden"
    //         } z-50`}
    //         id="user-dropdown"
    //       >
    //         <div className="px-4 py-3">
    //           <span className="block text-sm text-gray-900 dark:text-white">
    //             {firstnameProfile}
    //           </span>
    //           <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
    //             name@flowbite.com
    //           </span>
    //         </div>
    //         <ul className="py-2" aria-labelledby="user-menu-button">
    //           <li>
    //             <a
    //               href="#"
    //               className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
    //               onClick={() => setActiveItemSideBarSettings("Profil")}
    //             >
    //               Informations personnelles
    //             </a>
    //           </li>
    //           <li>
    //             <a
    //               href="#"
    //               className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
    //               onClick={() => setActiveItemSideBarSettings("Favoris")}
    //             >
    //               Favoris
    //             </a>
    //           </li>
    //           <li>
    //             <a
    //               href="#"
    //               className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
    //               onClick={() => setActiveItemSideBarSettings("Settings")}
    //             >
    //               Paramètres
    //             </a>
    //           </li>
    //           <li>
    //             <a
    //               href="#"
    //               className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
    //               // onClick={() => Logout}
    //             >
    //               Déconnexion
    //             </a>
    //           </li>
    //         </ul>
    //       </div>
    //     </div>
    //     <h1 className="flex-grow text-white mt-1">
    //       &nbsp;&nbsp; Bienvenue {firstnameProfile}
    //     </h1>
    //   </div>
    // </nav>
  );
};

export default SideBarSettings;
