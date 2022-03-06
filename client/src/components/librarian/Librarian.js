import React, { useContext } from "react";
import Menu from "../admin/Menu";
import { Menubar } from "../../store/Store";
import { MenuIcon } from "@heroicons/react/outline";
import { Outlet } from "react-router-dom";

function Librarian() {
  const [visible, setVisible] = useContext(Menubar);
  return (
    <div>
      <MenuIcon
        onClick={() => {
          setVisible(!visible);
        }}
        className="w-8 h-8 fixed z-20 top-4 left-4 text-white"
      />
      <div
        className={` ${
          visible ? "block" : "hidden"
        } h-screen bg-gray-800 w-80 pl-4 fixed overflow-y-auto`}
      >
        <div>
          <div className="mt-20"></div>
          <h3 className="text-gray-400">Main Menu</h3>

          <Menu name="Dashboard" sub2="Librarian Dashboard" link2="dashboard" />
          <Menu
            name="Students"
            sub1="Student List"
            sub2="Student View"
            sub3="Student Add"
            sub4="Student Edit"
            link1="studentlist"
            link2="studentview"
            link3="studentadd"
            link4="studentedit"
          />
          <Menu
            name="Books"
            sub1="Book List"
            sub2="Book View"
            sub3="Book Add"
            sub4="Book Edit"
            link1="booklist"
            link2="bookview"
            link3="bookadd"
            link4="bookedit"
          />
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default Librarian;
