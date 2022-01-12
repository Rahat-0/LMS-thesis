import React from "react";
import { ArrowRightIcon, CollectionIcon } from "@heroicons/react/outline";
import "../../assets/css/common.module.css";

function Menu(props) {
    const [visible, setVisible] = React.useState(false)
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
        <div onClick={()=>{setVisible(!visible)}} className="text-gray-400 flex justify-between pr-4 pt-3 pb-3 hover:bg-gray-900 hover:text-gray-100">
          <div className="flex">
            <CollectionIcon className="block h-6 w-6" />
            <span className="pl-3"> {name} </span>
          </div>
          <ArrowRightIcon className="block h-4 w-4" aria-hidden />
        </div>
        <div className={`text-gray-400 ml-9 `}>
          <ul className={`${visible ? "block" : "hidden"}`}>
            <li className="hover:text-gray-100 pt-1">
              {" "}
              <a href={link1}> {sub1} </a>
            </li>
            <li className="hover:text-gray-100 pt-1">
              {" "}
              <a href={link2}> {sub2} </a>
            </li>
            <li className="hover:text-gray-100 pt-1">
              {" "}
              <a href={link3}> {sub3} </a>
            </li>
            <li className="hover:text-gray-100 pt-1">
              {" "}
              <a href={link4}> {sub4} </a>
            </li>
            <li className="hover:text-gray-100 pt-1">
              {" "}
              <a href={link5}> {sub5} </a>
            </li>
          </ul>
        </div>
      </div>
    
  );
}

export default Menu;
