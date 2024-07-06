import { FaRegStar } from "react-icons/fa";
import Image from "next/image";
import { IoSettingsOutline } from "react-icons/io5";
import { IoMdLogOut } from "react-icons/io";
import earthLogo from "../../../public/images/earth-logo.png";
import { IoMapOutline } from "react-icons/io5";
import { useRouter } from "next/router";
import { HiOutlineUser } from "react-icons/hi2";
import { SIGN_OUT } from "@/gql/mutations";
import { useMutation } from "@apollo/client";

interface Props {
  setActiveItemNavBarSettings: (activeItemNabBarSettings: string) => void;
  firstnameProfile: string;
}

const NavBarSettings: React.FC<Props> = ({
  setActiveItemNavBarSettings,
  firstnameProfile,
}) => {
  const router = useRouter();

  const [SignOut] = useMutation(SIGN_OUT);

  const Logout = async () => {
    await SignOut();
    router.push("/home");
  };

  return (
    <div
      className="fixed top-0 flex items-center justify-between w-screen p-2 bg-white
         shadow-lg shadow-gray-300"
    >
      <button className="flex ml-3 mb-1 mt-1">
        <a href="/home">
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
          onClick={() => setActiveItemNavBarSettings("Profil")}
          className="flex flex-col items-center text-gray-500 text-sm focus:outline-nones transition-colors duration-300 hover:text-tertiary_color"
        >
          {/* <HiOutlineUser size={23} /> */}
          <i
            className="fa-solid fa-user"
            style={{ fontSize: "20px", color: "#6b7280" }}
          ></i>
          profil
        </button>
        <button
          onClick={() => {
            router.push("/home");
          }}
          className="flex flex-col items-center text-gray-500 text-sm focus:outline-nones transition-colors duration-300 hover:text-tertiary_color"
        >
          {/* <IoMapOutline size={23} /> */}
          <i
            className="fa-solid fa-map"
            style={{ fontSize: "20px", color: "#6b7280" }}
          ></i>
          carte
        </button>
        <button
          onClick={() => setActiveItemNavBarSettings("Favorites")}
          className="flex flex-col items-center text-gray-500 text-sm focus:outline-nones transition-colors duration-300 hover:text-tertiary_color"
        >
          {/* <FaRegStar size={23} /> */}
          <i
            className="fa-solid fa-star"
            style={{ fontSize: "20px", color: "#6b7280" }}
          ></i>
          favoris
        </button>
        <button
          onClick={() => setActiveItemNavBarSettings("Settings")}
          className="flex flex-col items-center text-gray-500 text-sm focus:outline-nones transition-colors duration-300 hover:text-tertiary_color"
        >
          {/* <IoSettingsOutline size={23} /> */}
          <i
            className="fa-solid fa-gear"
            style={{ fontSize: "20px", color: "#6b7280" }}
          ></i>
          réglages
        </button>
        <button
          onClick={() => Logout()}
          className="flex flex-col items-center text-gray-500 text-sm focus:outline-nones transition-colors duration-300 hover:text-tertiary_color"
        >
          {/* <IoMdLogOut size={23} /> */}
          <i
            className="fa-solid fa-arrow-right-from-bracket"
            style={{ fontSize: "20px", color: "#6b7280" }}
          ></i>
          quitter
        </button>
      </div>
    </div>
  );
};

export default NavBarSettings;
