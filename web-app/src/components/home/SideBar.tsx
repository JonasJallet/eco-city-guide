import { useContext, useEffect, useState } from "react";
import { TbCategory } from "react-icons/tb";
import { MdAddCircleOutline } from "react-icons/md";
import { SideBarContentEnum } from "./sideBarContent.type";
import Image from "next/image";
import logo from "../../../public/images/earth-logo.png";
import SideBarContent from "./SideBarContent";
import DisplayPanelContext, {
  DisplayPanelType,
} from "@/contexts/DisplayPanelContext";
import { FaRegStar } from "react-icons/fa";

export default function SideBar() {
  const [enumValue, setEnumValue] = useState<SideBarContentEnum>(
    SideBarContentEnum.NO_CONTENT,
  );

  const { sideBarEnum, setSideBarEnum } = useContext(
    DisplayPanelContext,
  ) as DisplayPanelType;

  useEffect(() => {
    if (sideBarEnum) {
      setEnumValue(sideBarEnum);
      setSideBarEnum(undefined);
    }
  }, [sideBarEnum]);

  return (
    <>
      <SideBarContent enumValue={enumValue} />
      <div className="flex z-20">
        <div
          className={`flex flex-col items-center w-20 h-screen py-6 space-y-8 bg-white ${
            enumValue === SideBarContentEnum.NO_CONTENT
              ? "shadow-lg shadow-gray-300"
              : "shadow-lg shadow-gray-300"
          }`}
        >
          <button onClick={() => setEnumValue(SideBarContentEnum.NO_CONTENT)}>
            <Image src={logo as unknown as string} alt="Eco City Guide logo" />
          </button>
          <button
            onClick={() =>
              enumValue !== SideBarContentEnum.CREATE_PLACE
                ? setEnumValue(SideBarContentEnum.CREATE_PLACE)
                : setEnumValue(SideBarContentEnum.NO_CONTENT)
            }
            className="flex flex-col items-center text-gray-500 focus:outline-nones transition-colors duration-300 hover:text-tertiary_color"
          >
            <MdAddCircleOutline className="w-6 h-6" />
            créer lieu
          </button>
          <button
            onClick={() =>
              enumValue !== SideBarContentEnum.CREATE_CATEGORY
                ? setEnumValue(SideBarContentEnum.CREATE_CATEGORY)
                : setEnumValue(SideBarContentEnum.NO_CONTENT)
            }
            className="flex flex-col items-center text-gray-500 focus:outline-nones transition-colors duration-300 hover:text-tertiary_color"
          >
            <TbCategory className="w-6 h-6" />
            créer catégorie
          </button>
          <button
            onClick={() =>
              enumValue !== SideBarContentEnum.FAVORITES
                ? setEnumValue(SideBarContentEnum.FAVORITES)
                : setEnumValue(SideBarContentEnum.NO_CONTENT)
            }
            className="flex flex-col items-center text-gray-500 focus:outline-nones transition-colors duration-300 hover:text-tertiary_color"
          >
            <FaRegStar className="w-6 h-6" />
            favoris
          </button>
        </div>
      </div>
    </>
  );
}
