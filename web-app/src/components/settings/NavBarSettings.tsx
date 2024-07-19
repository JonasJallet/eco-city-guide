import Image from "next/image";
import earthLogo from "../../../public/images/earth-logo.png";
import { useRouter } from "next/router";
import { SIGN_OUT } from "@/gql/requests/mutations";
import { useMutation } from "@apollo/client";
import { SignOutMutation } from "@/gql/generate/graphql";
import { toast } from "react-toastify";
import { useState } from "react";

interface Props {
  setActiveItemNavBarSettings: (activeItemNabBarSettings: string) => void;
  firstnameProfile: string;
}

const NavBarSettings: React.FC<Props> = ({
  setActiveItemNavBarSettings,
  firstnameProfile,
}) => {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);

  const [SignOut] = useMutation<SignOutMutation>(SIGN_OUT);

  const Logout = async () => {
    await SignOut();
    toast.success("Vous êtes bien déconnecté(e) !");
    await router.push("/home");
    location.reload();
  };

  return (
    <nav className="bg-white border-gray-200 shadow-lg shadow-gray-300">
      <div className="flex flex-wrap items-center justify-between mx-auto p-3">
        <a
          href="/home"
          className="flex items-center space-x-3 rtl:space-x-reverse ml-4"
        >
          <Image
            src={earthLogo as unknown as string}
            alt="Eco City Guide logo"
            className=" w-auto h-10"
          />

          <span className="self-center ml-5 mt-2 text-center font-medium text-xl text-dark_text_color whitespace-nowrap">
            Bienvenue {firstnameProfile}
          </span>
        </a>
        <button
          data-collapse-toggle="navbar-multi-level"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none "
          aria-controls="navbar-multi-level"
          aria-expanded="false"
          onClick={() => setShowMenu(!showMenu)}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          className={`md:block md:w-auto ${showMenu ? "" : "hidden"} absolute z-50 md:relative md:z-auto md:mt-0 mt-72 md:right-auto right-0 md:mr-0 mr-4`}
          id="navbar-multi-level"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
            <li className="md:mb-0 mb-2 hover:bg-gray-100 p-2 md:hover:bg-transparent rounded-lg md:p-0 hover:text-tertiary_color text-gray-500">
              <button
                onClick={() => setActiveItemNavBarSettings("Profil")}
                className="flex md:flex-col flex-row  items-center text-sm 
                 transition-colors duration-300 "
              >
                <i
                  className="fa-regular fa-user md:mr-0 mr-3"
                  style={{ fontSize: "20px" }}
                ></i>
                profil
              </button>
            </li>
            <li className="md:mb-0 mb-2 hover:bg-gray-100 md:p-0 p-2 md:hover:bg-transparent rounded-lg hover:text-tertiary_color text-gray-500">
              <button
                onClick={() => {
                  router.push("/home");
                }}
                className="flex md:flex-col flex-row items-center text-sm transition-colors duration-300"
              >
                <i
                  className="fa-regular fa-map md:mr-0 mr-2"
                  style={{ fontSize: "20px" }}
                ></i>
                carte
              </button>
            </li>
            <li className="md:mb-0 mb-2 hover:bg-gray-100 md:p-0 p-2  md:hover:bg-transparent rounded-lg hover:text-tertiary_color text-gray-500">
              <button
                onClick={() => setActiveItemNavBarSettings("Favorites")}
                className="flex md:flex-col flex-row  items-center text-sm  transition-colors duration-300"
              >
                <i
                  className="fa-regular fa-star md:mr-0 mr-2"
                  style={{ fontSize: "20px" }}
                ></i>
                favoris
              </button>
            </li>
            <li className="md:mb-0 mb-2 hover:bg-gray-100 p-2 md:p-0 rounded-lg md:hover:bg-transparent hover:text-tertiary_color text-gray-500">
              <button
                onClick={() => setActiveItemNavBarSettings("Settings")}
                className="flex md:flex-col flex-row  items-center  text-sm transition-colors duration-300"
              >
                <i
                  className="fa-solid fa-sliders md:mr-0 mr-3 "
                  style={{ fontSize: "20px" }}
                ></i>
                réglages
              </button>
            </li>
            <li className="md:mb-0 mb-2 hover:bg-gray-100 md:p-0 md:hover:bg-transparent p-2 rounded-lg hover:text-tertiary_color text-gray-500">
              <button
                onClick={() => Logout()}
                className="flex md:flex-col flex-row items-center text-sm transition-colors duration-300"
              >
                <i
                  className="fa-solid fa-arrow-right-from-bracket md:mr-0 mr-3"
                  style={{ fontSize: "20px" }}
                ></i>
                quitter
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBarSettings;
