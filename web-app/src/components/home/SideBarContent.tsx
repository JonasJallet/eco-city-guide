import CreateCategoriesForm from "../forms/CreateCategoriesForm";
import CreatePlaceForm from "../forms/CreatePlaceForm";
import FavoritesContent from "./FavoritesContent";
import { SideBarContentEnum } from "./sideBarContent.type";

export default function SideBarContent({
  enumValue,
}: {
  enumValue: SideBarContentEnum;
}) {
  if (enumValue === SideBarContentEnum.NO_CONTENT) {
    return null;
  }

  if (enumValue === SideBarContentEnum.FAVORITES) {
    return (
      <div className="bg-white transition-all w-80 border-r-gray-200 border-r-[1px] shadow-lg shadow-gray-300 z-20">
        <FavoritesContent />
      </div>
    );
  }

  if (enumValue === SideBarContentEnum.CREATE_PLACE) {
    return (
      <div className="bg-white transition-all w-80 border-r-gray-200 border-r-[1px] shadow-lg shadow-gray-300 z-20">
        <CreatePlaceForm />
      </div>
    );
  }

  if (enumValue === SideBarContentEnum.CREATE_CATEGORY) {
    return (
      <div className=" bg-white transition-all w-80 border-r-gray-200 border-r-[1px] shadow-lg shadow-gray-300 z-20">
        <CreateCategoriesForm />
      </div>
    );
  }
}
