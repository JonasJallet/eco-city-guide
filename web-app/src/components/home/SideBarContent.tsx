import CreateCategoriesForm from "../forms/CreateCategoriesForm";
import CreatePlaceForm from "../forms/CreatePlaceForm";
import FavoriesContent from "./FavoriesContent";
import { SideBarContentEnum } from "./sideBarContent.type";

export default function SideBarContent({
  enumValue,
}: {
  enumValue: SideBarContentEnum;
}) {
  if (enumValue === SideBarContentEnum.NO_CONTENT) {
    return null;
  }

  if (enumValue === SideBarContentEnum.FAVORIES) {
    return (
      <div className=" bg-white transition-all w-80 border-r-gray-200 border-r-[1px] shadow-lg shadow-gray-300">
        <FavoriesContent />
      </div>
    );
  }

  if (enumValue === SideBarContentEnum.CREATE_PLACE) {
    return (
      <div className="bg-white transition-all w-80 border-r-gray-200 border-r-[1px] shadow-lg shadow-gray-300">
        <CreatePlaceForm />
      </div>
    );
  }

  if (enumValue === SideBarContentEnum.CREATE_CATEGORY) {
    return (
      <div className=" bg-white transition-all w-80 border-r-gray-200 border-r-[1px] shadow-lg shadow-gray-300">
        <CreateCategoriesForm />
      </div>
    );
  }
}
