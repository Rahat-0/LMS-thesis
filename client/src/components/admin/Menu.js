import React from "react";
import { NavLink } from "react-router-dom";
import { ArrowRightIcon, CollectionIcon } from "@heroicons/react/outline";
import "../../assets/css/common.module.css";

function Menu(props) {
  const [visible, setVisible] = React.useState(false);
  const {
    name,
    sub1,
    sub2,
    sub3,
    sub4,
    sub5,
    link1,
    link2,
    link3,
    link4,
    link5,
  } = props;

  return (
    <div>
      <div
        onClick={() => {
          setVisible(!visible);
        }}
        className="text-gray-400 flex justify-between pr-4 pt-3 pb-3 hover:bg-gray-900 hover:text-gray-100"
      >
        <div className="flex">
          <CollectionIcon className="block h-6 w-6" />
          <span className="pl-3"> {name} </span>
        </div>
        <ArrowRightIcon className="block h-4 w-4" aria-hidden />
      </div>
      <div className={`text-gray-500 ml-9 `}>
        <ul className={`${visible ? "block" : "hidden"}`}>
          <li>
          <NavLink
            to={link1}
            className={({ isActive }) =>
              isActive
                ? "text-gray-50 bg-gray-700 py-2 block"
                : "hover:text-gray-100 py-2 block"
            }
          >
           
            {sub1}
          </NavLink>
          </li>


          <li>
          <NavLink
            to={link2}
            className={({ isActive }) =>
              isActive
                ? "text-gray-50 bg-gray-700 py-2 block"
                : "hover:text-gray-100 py-2 block"
            }
          >
            {" "}
            {sub2}
          </NavLink>
          </li>

          <li>
          <NavLink
            to={link3 || ''}
            className={({ isActive }) =>
              isActive
                ? "text-gray-50 bg-gray-700 py-2 block"
                : "hover:text-gray-100 py-2 block"
            }
          >
            {" "}
            {sub3}
          </NavLink>
          </li>

            <li>
          <NavLink
            to={link4 || ''}
            className={({ isActive }) =>
              isActive
                ? "text-gray-50 bg-gray-700 py-2 block"
                : "hover:text-gray-100 py-2 block"
            }
          >
            {" "}
            {sub4 || null}
          </NavLink>
          </li>


          
        </ul>
      </div>
    </div>
  );
}

export default Menu;
