import CreateCategoriesForm from "../forms/CreateCategoriesForm";
import CreatePlaceForm from "../forms/CreatePlaceForm";
import FavoritesContent from "./FavoritesContent";
import PlaceContent from "./PlaceContent";
import { Place } from "@/gql/graphql";
import { SideBarContentEnum } from "./sideBarContent.type";

export default function SideBarContent({
  enumValue,
  selectedPlace,
}: {
  enumValue: SideBarContentEnum;
  selectedPlace?: Place;
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
      contentComponent = enumValue === SideBarContentEnum.PLACE &&
        selectedPlace && <PlaceContent selectedPlace={selectedPlace} />;
      break;
    default:
      contentComponent = null;
      break;
  }

  return (
    <div className="bg-white transition-all border-r-gray-200 border-r-[1px] shadow-lg shadow-gray-300 z-20">
      {contentComponent}
    </div>
  );
}
