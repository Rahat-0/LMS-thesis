import React, { useEffect } from "react";
import jwt from "jwt-decode";
import Cookies from "js-cookie";
import { useNavigate, Outlet } from "react-router-dom";
import "../../assets/css/common.module.css";
import Menus from "./Menus";

function Admin() {
  const navigate = useNavigate();

  useEffect(() => {
    const key = Cookies.get("auth");

    if (key) {
      if (key.length > 10) {
        const data = jwt(key);
        if (data.userType !== "admin") {
          navigate("/notfound");
        }
      } else {
        navigate("/login");
      }
    } else {
      navigate("/notfound");
    }
  }, []);

  return (
    <div>
      <Menus />
      <Outlet />
    </div>
  );
}

export default Admin;
