import React from "react";
import "../../assets/css/common.module.css";
import Menu from "./Menu";
import { MenuIcon } from "@heroicons/react/outline";

function Menus(props) {
  const [visible, setVisible] = props.states;
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
          <h3 className="text-gray-200">Main Menu</h3>
          <Menu
            name="Dashboard"
            sub1="Admin Dashboard"
            sub2="Librarian Dashboard"
            sub3="Student Dashboard"
            link1="admin"
            link2="librarian"
            link3="student"
          />
          <Menu
            name="Students"
            sub1="Student List"
            sub2="Student View"
            sub3="Student Add"
            sub4="Student Edit"
            link1="list"
            link2="view"
            link3="add"
            link4="edit"
          />
          <Menu
            name="Teachers"
            sub1="Teacher List"
            sub2="Teacher View"
            sub3="Teacher Add"
            sub4="Teacher Edit"
            link1="list"
            link2="view"
            link3="add"
            link4="edit"
          />
          <Menu
            name="Books"
            sub1="Book List"
            sub2="Book View"
            sub3="Book Add"
            sub4="Book Edit"
            link1="list"
            link2="view"
            link3="add"
            link4="edit"
          />
        </div>
      </div>
    </div>
  );
}

export default Menus;
