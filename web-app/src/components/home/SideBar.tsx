import { useState } from "react";
import { FaRegStar } from "react-icons/fa";
import { TbCategory } from "react-icons/tb";
import { MdAddCircleOutline } from "react-icons/md";
import Image from "next/image";

import SideBarContent from "./SideBarContent";
import logo from "../../../public/images/earth-logo.png";
import { SideBarContentEnum } from "./sideBarContent.type";

export default function SideBar() {
  const [enumValue, setEnumValue] = useState<SideBarContentEnum>(
    SideBarContentEnum.NO_CONTENT,
  );
  return (
    <div className="flex absolute z-20 right-0">
      <SideBarContent enumValue={enumValue} />
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
          className="flex flex-col items-center text-gray-500 focus:outline-nones transition-colors duration-200 hover:text-green-500"
        >
          <MdAddCircleOutline className="w-6 h-6" />
          create place
        </button>
        <button
          onClick={() =>
            enumValue !== SideBarContentEnum.CREATE_CATEGORY
              ? setEnumValue(SideBarContentEnum.CREATE_CATEGORY)
              : setEnumValue(SideBarContentEnum.NO_CONTENT)
          }
          className="flex flex-col items-center text-gray-500 focus:outline-nones transition-colors duration-200 hover:text-green-500"
        >
          <TbCategory className="w-6 h-6" />
          create category
        </button>
        <button
          onClick={() =>
            enumValue !== SideBarContentEnum.FAVORIES
              ? setEnumValue(SideBarContentEnum.FAVORIES)
              : setEnumValue(SideBarContentEnum.NO_CONTENT)
          }
          className="flex flex-col items-center text-gray-500 focus:outline-nones transition-colors duration-200 hover:text-green-500"
        >
          <FaRegStar className="w-6 h-6" />
          favories
        </button>
      </div>
    </div>
  );
}
