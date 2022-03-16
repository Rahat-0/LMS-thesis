import React, {useContext} from "react";
import "../../assets/css/common.module.css";
import Menu from "./Menu";
import { Menubar } from "../../store/Store";
import { MenuIcon } from "@heroicons/react/outline";

function Menus(props) {
  const [visible, setVisible] = useContext(Menubar);
  return (
    <div>
      <MenuIcon
        onClick={() => {
          setVisible(!visible);
        }}
        className="w-8 h-8 fixed z-20 hidden lg:block top-4 left-4 text-white"
      />
      <div
        className={` ${
          visible ? "block" : "hidden"
        } h-screen bg-gray-800 w-80 pl-4 fixed overflow-y-auto`}
      >
        <div>
          <div className="mt-20"></div>
          <h3 className="text-gray-400">Main Menu</h3>
          <Menu
            name="Dashboard"
            sub1="Admin Dashboard"
            sub2="Librarian Dashboard"
            sub3="Student Dashboard"
            sub4="Book Dashboard"
            link1="dashboard"
            link2="libdashboard"
            link3="student_dashboard"
            link4="book_dashboard"
          />
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
            name="Librarians"
            sub1="Librairan List"
            sub2="Librairan View"
            sub3="Librairan Add"
            sub4="Librairan Edit"
            link1="librarianlist"
            link2="librairanview"
            link3="librairanadd"
            link4="librairanedit"
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
    </div>
  );
}

export default Menus;
