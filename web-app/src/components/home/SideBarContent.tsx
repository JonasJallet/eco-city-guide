import CreateCategoriesForm from "../forms/CreateCategoriesForm";
import CreatePlaceForm from "../forms/CreatePlaceForm";
import FavoritesContent from "./FavoritesContent";
import PlaceContent from "./PlaceContent";
import PlacesByCategoryContent from "./PlacesByCategory";
import { SideBarContentEnum } from "./sideBarContent.type";

export default function SideBarContent({
  enumValue,
}: {
  enumValue: SideBarContentEnum;
}) {
  let contentComponent;

  switch (enumValue) {
    case SideBarContentEnum.NO_CONTENT:
      contentComponent = null;
      break;
    case SideBarContentEnum.FAVORITES:
      contentComponent = <FavoritesContent />;
      break;
    case SideBarContentEnum.CREATE_PLACE:
      contentComponent = <CreatePlaceForm />;
      break;
    case SideBarContentEnum.CREATE_CATEGORY:
      contentComponent = <CreateCategoriesForm />;
      break;
    case SideBarContentEnum.PLACE:
      contentComponent = <PlaceContent />;
      break;
    case SideBarContentEnum.PLACES_BY_CATEGORY:
      contentComponent = <PlacesByCategoryContent />;
      break;
    default:
      contentComponent = null;
      break;
  }

  return (
    <div className=" bg-white border-r-gray-200 border-r-[1px] shadow-lg shadow-gray-300 z-20 mr-20">
      {contentComponent}
    </div>
  );
}
