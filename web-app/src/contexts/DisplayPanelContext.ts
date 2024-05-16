import { SideBarContentEnum } from "@/components/home/sideBarContent.type";
import { createContext } from "react";

export type DisplayPanelType = {
  sideBarEnum: SideBarContentEnum | undefined;
  setSideBarEnum: (sideBarEnum: SideBarContentEnum | undefined) => void;
};

const DisplayPanelContext = createContext<DisplayPanelType>({
  sideBarEnum: undefined,
  setSideBarEnum: () => {},
});

export default DisplayPanelContext;
