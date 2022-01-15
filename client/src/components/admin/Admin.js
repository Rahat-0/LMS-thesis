import React, { useEffect } from "react";
import jwt from 'jwt-decode'
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import "../../assets/css/common.module.css";
import Menus from "./Menus";
import Table from "./Table";

function Admin() {
  const [visible, setVisible] = React.useState(true)
  const navigate = useNavigate()

  useEffect(() => {  
  const key = Cookies.get('auth')
  const data = jwt(key)
    if(data.userType !== "admin")
      navigate('/')
  }, [])

  
  return (
    <div>
      <Menus states ={[visible, setVisible]} />
      <Table states ={[visible]} />
    </div>
  );
}

export default Admin;
