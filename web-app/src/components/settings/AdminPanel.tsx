import { useState } from "react";
import { TbCategory } from "react-icons/tb";
import { MdOutlinePlace } from "react-icons/md";
import { HiOutlineUsers } from "react-icons/hi2";
import { useQuery } from "@apollo/client";
import CategoriesTable from "./adminPanelContent/CategoriesTable";
import PlacesTable from "./adminPanelContent/PlacesTable";
import UsersTable from "./adminPanelContent/UsersTable";
import { GET_PROFILE } from "@/gql/requests/queries";
import { GetProfileQuery } from "@/gql/generate/graphql";

function AdminPanel() {
  const [activeItemAdminPanel, setActiveItemAdminPanel] =
    useState("PlacesTable");
  const { data } = useQuery<GetProfileQuery>(GET_PROFILE);
  const userRole = data?.myProfile?.role;

  return (
    <div className="mb-10">
      <h2 className="font-bold font-sans text-2xl text-dark_text_color mt-10 text-center ">
        Panneau Administrateur
      </h2>
      <div className="m-10">
        <div className="flex text-gray-500 font-medium">
          <span
            onClick={() => setActiveItemAdminPanel("PlacesTable")}
            className={`flex items-center py-2 px-4 ${activeItemAdminPanel === "PlacesTable" ? "bg-slate-100" : "bg-slate-300 cursor-pointer  hover:bg-slate-400 hover:text-white"} rounded-t-xl rounded-tl-3xl transition-all duration-200`}
          >
            <MdOutlinePlace className="w-6 h-6 mr-1" />
            Lieux
          </span>
          <span
            onClick={() => setActiveItemAdminPanel("CategoriesTable")}
            className={`flex items-center py-2 px-4 ${activeItemAdminPanel === "CategoriesTable" ? "bg-slate-100" : "bg-slate-300 cursor-pointer  hover:bg-slate-400 hover:text-white"} rounded-t-xl rounded-tl-3xl transition-all duration-200`}
          >
            <TbCategory className="w-6 h-6 mr-1" />
            Catégories
          </span>
          <span
            onClick={() => setActiveItemAdminPanel("UsersTable")}
            className={`flex items-center py-2 px-4 ${activeItemAdminPanel === "UsersTable" ? "bg-slate-100" : "bg-slate-300 cursor-pointer  hover:bg-slate-400 hover:text-white"} rounded-t-xl rounded-tl-3xl transition-all duration-200`}
          >
            <HiOutlineUsers className="w-6 h-6 mr-1" />
            Utilisateurs
          </span>
        </div>
        <section className="bg-slate-100 rounded-r-xl rounded-b-xl">
          {activeItemAdminPanel === "PlacesTable" && <PlacesTable />}
          {activeItemAdminPanel === "CategoriesTable" && <CategoriesTable />}
          {activeItemAdminPanel === "UsersTable" &&
            userRole === "webAdministrator" && <UsersTable />}
        </section>
      </div>
    </div>
  );
}

export default AdminPanel;
