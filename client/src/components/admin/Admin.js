import React, { useEffect } from "react";
import jwt from "jwt-decode";
import Cookies from "js-cookie";
import { useNavigate, Outlet } from "react-router-dom";
import "../../assets/css/common.module.css";
import Menus from "./Menus";
import AdDashboard from "./AdDashboard";
// import Table from "./Tables";

function Admin() {
  const navigate = useNavigate();

  useEffect(() => {
    const key = Cookies.get("auth");


    if(key.length > 10){
      const data = jwt(key);
      if (data.userType !== "admin") {
        navigate("/")
      }
    }else{
      navigate('/login')
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
